import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { checkRateLimit, getClientIdentifier, rateLimitResponse } from "../_shared/rate-limiter.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// SECURITY: Input validation limits
const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 10000;
const MAX_TOTAL_LENGTH = 100000;
const VALID_ROLES = ["user", "assistant", "system"] as const;

interface ChatMessage {
  role: typeof VALID_ROLES[number];
  content: string;
}

function validateMessages(messages: unknown): { valid: boolean; error?: string; messages?: ChatMessage[] } {
  if (!Array.isArray(messages)) {
    return { valid: false, error: "Messages must be an array" };
  }

  if (messages.length === 0) {
    return { valid: false, error: "Messages array cannot be empty" };
  }

  if (messages.length > MAX_MESSAGES) {
    return { valid: false, error: `Maximum ${MAX_MESSAGES} messages allowed` };
  }

  let totalLength = 0;
  const validatedMessages: ChatMessage[] = [];

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    
    if (!msg || typeof msg !== "object") {
      return { valid: false, error: `Invalid message at index ${i}` };
    }

    if (!msg.role || typeof msg.role !== "string") {
      return { valid: false, error: `Invalid role at index ${i}` };
    }

    if (!VALID_ROLES.includes(msg.role as typeof VALID_ROLES[number])) {
      return { valid: false, error: `Invalid role "${msg.role}" at index ${i}` };
    }

    if (!msg.content || typeof msg.content !== "string") {
      return { valid: false, error: `Invalid content at index ${i}` };
    }

    if (msg.content.length > MAX_MESSAGE_LENGTH) {
      return { valid: false, error: `Message at index ${i} exceeds ${MAX_MESSAGE_LENGTH} character limit` };
    }

    totalLength += msg.content.length;
    
    validatedMessages.push({
      role: msg.role as typeof VALID_ROLES[number],
      content: msg.content,
    });
  }

  if (totalLength > MAX_TOTAL_LENGTH) {
    return { valid: false, error: `Total message length exceeds ${MAX_TOTAL_LENGTH} characters` };
  }

  return { valid: true, messages: validatedMessages };
}

// Keywords that trigger real-time NPHC search
const REALTIME_KEYWORDS = [
  'current president', 'current leader', 'leadership', 'who leads',
  'latest news', 'recent news', 'current events', 'upcoming events',
  'national president', 'grand basileus', 'international president',
  'current grand', 'who is the president', 'current head',
  'national convention', 'boule', 'conclave', 'centennial',
  'grand polemarch', 'supreme basileus', 'national director',
  'executive director', 'board of directors', 'national board',
  'founders day 2024', 'founders day 2025', 'conference 2024', 'conference 2025'
];

// D9 organization search mappings with official websites for scraping
const D9_ORG_DATA: Record<string, { name: string; website: string; aliases: string[]; leadershipTitle: string }> = {
  'alpha_phi_alpha': {
    name: 'Alpha Phi Alpha Fraternity, Inc.',
    website: 'https://apa1906.net',
    aliases: ['alpha phi alpha', 'alphas', 'apa', 'alpha'],
    leadershipTitle: 'General President'
  },
  'alpha_kappa_alpha': {
    name: 'Alpha Kappa Alpha Sorority, Inc.',
    website: 'https://aka1908.com',
    aliases: ['alpha kappa alpha', 'akas', 'aka', 'skee-wee'],
    leadershipTitle: 'International President'
  },
  'kappa_alpha_psi': {
    name: 'Kappa Alpha Psi Fraternity, Inc.',
    website: 'https://kappaalphapsi1911.com',
    aliases: ['kappa alpha psi', 'kappas', 'nupes', 'kappa'],
    leadershipTitle: 'Grand Polemarch'
  },
  'omega_psi_phi': {
    name: 'Omega Psi Phi Fraternity, Inc.',
    website: 'https://oppf.org',
    aliases: ['omega psi phi', 'ques', 'omega', 'omegas', 'que dogs'],
    leadershipTitle: 'Grand Basileus'
  },
  'delta_sigma_theta': {
    name: 'Delta Sigma Theta Sorority, Inc.',
    website: 'https://deltasigmatheta.org',
    aliases: ['delta sigma theta', 'deltas', 'dst', 'delta'],
    leadershipTitle: 'National President'
  },
  'phi_beta_sigma': {
    name: 'Phi Beta Sigma Fraternity, Inc.',
    website: 'https://phibetasigma1914.org',
    aliases: ['phi beta sigma', 'sigmas', 'sigma', 'blue phi'],
    leadershipTitle: 'International President'
  },
  'zeta_phi_beta': {
    name: 'Zeta Phi Beta Sorority, Inc.',
    website: 'https://zphib1920.org',
    aliases: ['zeta phi beta', 'zetas', 'zeta', 'zpb'],
    leadershipTitle: 'International President'
  },
  'sigma_gamma_rho': {
    name: 'Sigma Gamma Rho Sorority, Inc.',
    website: 'https://sgrho1922.org',
    aliases: ['sigma gamma rho', 'sgrhos', 'poodles', 'sigma gamma'],
    leadershipTitle: 'International Grand Basileus'
  },
  'iota_phi_theta': {
    name: 'Iota Phi Theta Fraternity, Inc.',
    website: 'https://iotaphitheta.org',
    aliases: ['iota phi theta', 'iotas', 'iota'],
    leadershipTitle: 'Grand Polaris'
  },
  'nphc': {
    name: 'National Pan-Hellenic Council',
    website: 'https://nphchq.com',
    aliases: ['nphc', 'divine nine', 'd9', 'pan-hellenic'],
    leadershipTitle: 'National President'
  }
};

function detectRealtimeQuery(userMessage: string): { 
  needsRealtime: boolean; 
  searchQuery: string | null; 
  orgName: string | null;
  orgData: typeof D9_ORG_DATA[string] | null;
  scrapeWebsite: boolean;
} {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check if message contains realtime keywords
  const hasRealtimeKeyword = REALTIME_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
  
  if (!hasRealtimeKeyword) {
    return { needsRealtime: false, searchQuery: null, orgName: null, orgData: null, scrapeWebsite: false };
  }
  
  // Find which organization is being asked about
  for (const [orgKey, orgData] of Object.entries(D9_ORG_DATA)) {
    const isMatch = orgData.aliases.some(alias => lowerMessage.includes(alias));
    if (isMatch) {
      const matchedKeyword = REALTIME_KEYWORDS.find(k => lowerMessage.includes(k)) || 'leadership';
      const searchQuery = `${orgData.name} ${matchedKeyword} 2024 2025`;
      // If asking specifically about president/leader, try to scrape official website
      const scrapeWebsite = lowerMessage.includes('president') || lowerMessage.includes('leader') || lowerMessage.includes('basileus') || lowerMessage.includes('polemarch');
      return { needsRealtime: true, searchQuery, orgName: orgData.name, orgData, scrapeWebsite };
    }
  }
  
  // Generic D9/NPHC query
  if (lowerMessage.includes('divine nine') || lowerMessage.includes('d9')) {
    return { 
      needsRealtime: true, 
      searchQuery: 'NPHC Divine Nine leadership news 2024 2025', 
      orgName: 'NPHC/Divine Nine',
      orgData: D9_ORG_DATA.nphc,
      scrapeWebsite: false
    };
  }
  
  return { needsRealtime: false, searchQuery: null, orgName: null, orgData: null, scrapeWebsite: false };
}

async function searchNPHCInfo(query: string): Promise<string | null> {
  try {
    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.log('FIRECRAWL_API_KEY not configured, skipping real-time search');
      return null;
    }

    console.log('Performing Firecrawl search for:', query);

    const response = await fetch('https://api.firecrawl.dev/v1/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        limit: 5,
        scrapeOptions: {
          formats: ['markdown']
        }
      }),
    });

    if (!response.ok) {
      console.error('Firecrawl search failed:', response.status);
      return null;
    }

    const data = await response.json();
    console.log('Firecrawl search results received');

    if (!data.success || !data.data || data.data.length === 0) {
      console.log('No search results found');
      return null;
    }

    // Compile search results into context
    const results = data.data.slice(0, 3).map((result: any) => {
      const title = result.title || 'Untitled';
      const url = result.url || '';
      const content = result.markdown?.substring(0, 1500) || result.description || '';
      return `**${title}**\nSource: ${url}\n${content}`;
    }).join('\n\n---\n\n');

    return results;
  } catch (error) {
    console.error('Error searching NPHC info:', error);
    return null;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // SECURITY: Rate limiting
    const clientId = getClientIdentifier(req);
    const rateLimitResult = checkRateLimit(clientId, 'ai_chat');
    
    if (!rateLimitResult.allowed) {
      console.log(`Rate limit exceeded for client: ${clientId}`);
      return rateLimitResponse(corsHeaders, rateLimitResult.resetIn, 
        'Too many AI chat requests. Please wait a moment before trying again.');
    }

    const body = await req.json();
    const { messages } = body;

    // SECURITY: Validate input
    const validation = validateMessages(messages);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Get the latest user message to check for real-time query needs
    const latestUserMessage = validation.messages?.filter(m => m.role === 'user').pop();
    let realtimeContext = '';
    
    if (latestUserMessage) {
      const { needsRealtime, searchQuery, orgName, orgData } = detectRealtimeQuery(latestUserMessage.content);
      
      if (needsRealtime && searchQuery) {
        console.log(`Real-time query detected for: ${orgName}`);
        const searchResults = await searchNPHCInfo(searchQuery);
        
        if (searchResults) {
          const leadershipHint = orgData ? `\nLeadership title for this organization: ${orgData.leadershipTitle}` : '';
          realtimeContext = `\n\n**REAL-TIME SEARCH RESULTS (Use this for current/recent information about ${orgName}):**\n${searchResults}${leadershipHint}\n\n**Note:** The above information was retrieved from a live web search. Use it to answer questions about current leadership, recent news, or events. Always cite the source when using this information.`;
          console.log('Real-time context added to prompt');
        }
      }
    }

    const systemPrompt = `You are a helpful AI assistant for Sacred Greeks Life, a faith-based app helping Christians navigate Greek life. Created by Dr. Lyman Montgomery, author of "Sacred, Not Sinful: A Christian's Guide to Navigating Greek Life".

**ABOUT THE APP:**
Sacred Greeks Life helps Christians in Greek life (fraternities/sororities) navigate the tension between faith and membership using the P.R.O.O.F. framework. Free to use, works offline as a PWA.

**P.R.O.O.F. FRAMEWORK:**
A biblical approach to evaluating Greek life membership:
- P: Purpose - What is the organization's purpose?
- R: Rituals - What rituals are involved?
- O: Obligations - What commitments are required?
- O: Outcomes - What are the spiritual outcomes?
- F: Fellowship - How does it affect Christian fellowship?

**THE DIVINE NINE (NPHC ORGANIZATIONS):**
The National Pan-Hellenic Council (NPHC) was founded May 10, 1930 at Howard University. Official website: https://nphchq.com

1. **Alpha Phi Alpha Fraternity, Inc. (ΑΦΑ)** - "Alphas"
   - Founded: December 4, 1906 at Cornell University
   - Colors: Black & Old Gold | Symbol: Sphinx | Motto: "First of All, Servants of All, We Shall Transcend All"
   - Website: https://apa1906.net | HQ: Baltimore, Maryland

2. **Alpha Kappa Alpha Sorority, Inc. (ΑΚΑ)** - "AKAs"
   - Founded: January 15, 1908 at Howard University
   - Colors: Salmon Pink & Apple Green | Symbol: Ivy Leaf | Motto: "By Culture and By Merit"
   - Website: https://aka1908.com | HQ: Chicago, Illinois

3. **Kappa Alpha Psi Fraternity, Inc. (ΚΑΨ)** - "Kappas/Nupes"
   - Founded: January 5, 1911 at Indiana University
   - Colors: Crimson & Cream | Symbol: Diamond | Motto: "Achievement in Every Field of Human Endeavor"
   - Website: https://kappaalphapsi1911.com | HQ: Philadelphia, Pennsylvania

4. **Omega Psi Phi Fraternity, Inc. (ΩΨΦ)** - "Ques/Omega Men"
   - Founded: November 17, 1911 at Howard University
   - Colors: Royal Purple & Old Gold | Symbol: Lamp | Motto: "Friendship is Essential to the Soul"
   - Cardinal Principles: Manhood, Scholarship, Perseverance, Uplift
   - Website: https://oppf.org | HQ: Decatur, Georgia

5. **Delta Sigma Theta Sorority, Inc. (ΔΣΘ)** - "Deltas"
   - Founded: January 13, 1913 at Howard University
   - Colors: Crimson & Cream | Symbol: Fortitude | Motto: "Intelligence is the Torch of Wisdom"
   - Website: https://deltasigmatheta.org | HQ: Washington, D.C.

6. **Phi Beta Sigma Fraternity, Inc. (ΦΒΣ)** - "Sigmas"
   - Founded: January 9, 1914 at Howard University
   - Colors: Royal Blue & Pure White | Symbol: Dove | Motto: "Culture for Service and Service for Humanity"
   - Constitutional Partner: Zeta Phi Beta Sorority, Inc.
   - Website: https://phibetasigma1914.org | HQ: Washington, D.C.

7. **Zeta Phi Beta Sorority, Inc. (ΖΦΒ)** - "Zetas"
   - Founded: January 16, 1920 at Howard University
   - Colors: Royal Blue & Pure White | Symbol: Dove | Motto: "A Community Conscious, Action Oriented Organization"
   - Constitutional Partner: Phi Beta Sigma Fraternity, Inc.
   - Website: https://zphib1920.org | HQ: Washington, D.C.

8. **Sigma Gamma Rho Sorority, Inc. (ΣΓΡ)** - "SGRhos/Poodles"
   - Founded: November 12, 1922 at Butler University (only D9 not founded at HBCU)
   - Colors: Royal Blue & Gold | Symbol: Poodle | Motto: "Greater Service, Greater Progress"
   - Website: https://sgrho1922.org | HQ: Cary, North Carolina

9. **Iota Phi Theta Fraternity, Inc. (ΙΦΘ)** - "Iotas"
   - Founded: September 19, 1963 at Morgan State University (youngest D9)
   - Colors: Charcoal Brown & Gilded Gold | Symbol: Centaur | Motto: "Building a Tradition, Not Resting Upon One"
   - Website: https://iotaphitheta.org | HQ: Baltimore, Maryland

**DIVINE NINE TERMINOLOGY:**
- "Stroll/Strolling" - Synchronized group dance/walk at events showcasing organization identity
- "Stepping" - Percussive group dance combining footwork, claps, and chants
- "Call" - Distinctive vocal greeting unique to each organization (Skee-Wee, OO-OOP, Yo, Roo, etc.)
- "Yard" - Central campus area where Greek organizations showcase their presence
- "Probate/Presentation" - Public ceremony introducing new members (called "Neo-phytes" or "Neos")
- "Crossing/Made" - Moment of official initiation into the organization
- "Line/Line Brothers/Sisters" - Members initiated together form a bond
- "Line Name" - Special name given during intake process
- "Prophyte" - Senior member who has been in the organization longer
- "Neo/Neophyte" - Newly initiated member
- "Paraphernalia" - Official organization merchandise and symbols
- "Greek Week" - Campus celebration of Greek life with events and competitions
- "Founders Day" - Annual celebration honoring the organization's founders
- "Plot" - Designated campus area for organization gatherings
- "Shimmy" - Dance move associated with Kappa Alpha Psi

**HAZING AWARENESS (IMPORTANT):**
All Divine Nine organizations have ZERO TOLERANCE for hazing. Hazing is:
- Illegal in most states
- Strictly prohibited by all NPHC organizations
- Contrary to Christian principles and organizational values
- Reportable to national headquarters and campus authorities
If you witness hazing, report it to the organization's national office or campus Greek life office.

**APP FEATURES:**
- **Dashboard** (/dashboard): Central hub with streak stats, verse of the day, study progress, quick check-in
- **Daily Devotional** (/devotional): Scripture readings with P.R.O.O.F. reflections, text-to-speech
- **Study Guide** (/study): 5-session structured program with certificates and social sharing
- **5 Persona Assessment** (home page): Ethical decision-making tool with personalized guidance
- **Prayer Journal** (/prayer-journal): Personal prayer tracking with voice input
- **Prayer Wall** (/prayer-wall): Community prayer requests with privacy controls
- **Prayer Guide** (/prayer-guide): Guided prayer with templates, ambient sounds, pray-along
- **Bible Study** (/bible-study): AI-powered verse search, saved searches, bookmarks
- **Service Tracker** (/service-tracker): Community service logging with hours tracking
- **Progress** (/progress): Devotional stats, journal entries, streaks, milestones
- **Achievements** (/achievements): Badges, leveling up, social sharing
- **Bookmarks** (/bookmarks): Save articles, verses, resources with notes
- **Resources Hub** (/resources): Articles, documentary "Unmasking Hope", PDFs
- **Article Library** (/articles): Featured articles with text-to-speech, offline reading
- **Podcast** (/podcast): Sacred Greeks podcast episodes
- **BGLO Objection Guide** (/guide): Biblical responses to common objections
- **Offline Mode** (/offline-settings): Save content for offline, manage storage
- **Listen Feature**: Text-to-speech throughout app with speed controls (0.5x-2x)
- **AI Assistant** (this chat): Help on every page via chat icon

**COMMON QUESTIONS:**
- "How do I listen to content?" → Look for Listen button on any page with text content
- "How to complete study sessions?" → Go to Study Guide, select session, read it, click "Complete Session"
- "How to mark devotionals complete?" → Open today's devotional, read through, click "Mark as Complete"
- "How to take assessments?" → On home page, click the "5 Persona Assessment" card
- "Where are past assessments?" → Navigate to Assessment History from dashboard
- "How to save content offline?" → Look for "Save for Offline" buttons on articles
- "How to use prayer guide?" → Go to Prayer Guide for templates and ambient sounds
- "What is P.R.O.O.F.?" → Purpose, Rituals, Obligations, Outcomes, Fellowship - core framework from Sacred, Not Sinful
- "How to install on phone?" → Use "Add to Home Screen" in browser, works like native app
- "Is it for Divine Nine?" → Yes! Designed for BGLO members with specific Objection Guide
- "Tell me about [organization name]" → Provide founding info, colors, motto, and official website
- "What are the D9 fraternities?" → Alpha Phi Alpha, Kappa Alpha Psi, Omega Psi Phi, Phi Beta Sigma, Iota Phi Theta
- "What are the D9 sororities?" → Alpha Kappa Alpha, Delta Sigma Theta, Zeta Phi Beta, Sigma Gamma Rho

**TARGET AUDIENCE:**
- Christians in fraternities/sororities
- Divine Nine (BGLO) members
- Greek life alumni
- Students considering Greek life
- Campus ministers and faith leaders
${realtimeContext}

Be friendly, helpful, and guide users to the right features. When users ask about Divine Nine organizations, provide accurate founding info, colors, mottos, and direct them to official websites for current leadership and news. When you have real-time search results available, use them to provide current information and cite your sources. Always mention the P.R.O.O.F. framework when discussing faith and Greek life decisions. If asked about something outside the app, politely redirect to relevant features.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...(validation.messages || []),
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: "An error occurred while processing your request" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
