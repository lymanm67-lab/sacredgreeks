import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Safety keywords that trigger escalation
const CRISIS_KEYWORDS = ['suicide', 'kill myself', 'self-harm', 'self harm', 'end my life', 'want to die', 'hurting myself'];
const SAFETY_MESSAGE = `If you or someone you know is in crisis, please reach out for help immediately:\n\n🆘 **National Suicide Prevention Lifeline**: 988 (call or text)\n🆘 **Crisis Text Line**: Text HOME to 741741\n\nYou are loved. Please talk to someone you trust — a pastor, counselor, or friend — right now.`;

// Escalation triggers for spiritual certainty claims
const CERTAINTY_TRIGGERS = ['demonic portal', 'possessed', 'demon', 'deliverance needed', 'under a curse', 'spiritual attack confirmed'];

interface WorkerIntake {
  workerType: 'ritual_oath_coach' | 'founders_guide' | 'conversation_coach' | 'study_navigator';
  audience?: 'pastor' | 'parent' | 'chapter' | 'spouse' | 'friend';
  claimCategory?: 'portals' | 'oaths' | 'deity_names' | 'secrecy' | 'founders_masonry';
  userMessage?: string;
  planId?: string;
  role?: 'student' | 'alumni' | 'advisor';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const { workerType, audience, claimCategory, userMessage, planId, role } = await req.json() as WorkerIntake;

    if (!workerType) {
      return new Response(JSON.stringify({ error: 'workerType is required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get user from auth header if present
    const authHeader = req.headers.get('Authorization');
    let userId: string | null = null;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
      const userClient = createClient(supabaseUrl, anonKey);
      const { data: { user } } = await userClient.auth.getUser(token);
      userId = user?.id || null;
    }

    // SAFETY CHECK: Crisis detection
    const allText = `${userMessage || ''} ${claimCategory || ''}`.toLowerCase();
    for (const keyword of CRISIS_KEYWORDS) {
      if (allText.includes(keyword)) {
        // Log safety event (redacted)
        await supabase.from('worker_event_log').insert({
          event_type: 'safety',
          event_data_json: { trigger: 'crisis_keyword_detected', worker_type: workerType }
        });
        return new Response(JSON.stringify({
          safety: true,
          message: SAFETY_MESSAGE,
          escalated: true
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
    }

    // Create worker run record
    const { data: runData, error: runError } = await supabase.from('worker_runs').insert({
      user_id: userId,
      worker_type: workerType,
      trigger_type: 'user_tap',
      intake_json: { audience, claimCategory, role, hasMessage: !!userMessage },
      status: 'processing'
    }).select().single();

    if (runError) {
      console.error('Failed to create worker run:', runError);
    }
    const runId = runData?.id;

    // Log trigger event
    if (runId) {
      await supabase.from('worker_event_log').insert({
        worker_run_id: runId,
        event_type: 'trigger',
        event_data_json: { worker_type: workerType, audience, claim_category: claimCategory }
      });
    }

    // RETRIEVE: Pull from Golden Library (Tier 1 first)
    let sources: any[] = [];
    let objectionCard: any = null;
    let scripts: any[] = [];

    if (workerType === 'ritual_oath_coach' || workerType === 'founders_guide') {
      // Get matching objection card
      if (claimCategory) {
        const { data } = await supabase
          .from('objection_cards')
          .select('*')
          .eq('claim_category', claimCategory)
          .eq('is_active', true)
          .limit(1)
          .maybeSingle();
        objectionCard = data;
      }

      // Get related library sources
      const proofFilter = workerType === 'founders_guide' ? 'F' : null;
      let query = supabase
        .from('golden_library_sources')
        .select('*')
        .eq('is_active', true)
        .order('tier', { ascending: true })
        .limit(10);

      if (proofFilter) {
        query = query.eq('proof_category', proofFilter);
      }
      if (claimCategory) {
        query = query.contains('tags', [claimCategory]);
      }

      const { data } = await query;
      sources = data || [];
    }

    if (workerType === 'conversation_coach') {
      // Get conversation scripts for audience
      if (audience) {
        const { data } = await supabase
          .from('conversation_scripts')
          .select('*')
          .eq('audience_type', audience)
          .eq('is_active', true)
          .limit(5);
        scripts = data || [];
      }

      // Also get relevant objection cards
      if (claimCategory) {
        const { data } = await supabase
          .from('objection_cards')
          .select('*')
          .eq('claim_category', claimCategory)
          .eq('is_active', true)
          .limit(1)
          .maybeSingle();
        objectionCard = data;
      }
    }

    if (workerType === 'study_navigator') {
      // Get study plans
      const { data } = await supabase
        .from('ai_study_plans')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      sources = data || [];
    }

    // Log retrieve step
    if (runId) {
      await supabase.from('worker_event_log').insert({
        worker_run_id: runId,
        event_type: 'retrieve',
        event_data_json: {
          sources_count: sources.length,
          has_objection_card: !!objectionCard,
          scripts_count: scripts.length
        }
      });
    }

    // DRAFT: Build AI prompt with retrieved content
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: 'AI service not configured' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const systemPrompt = buildSystemPrompt(workerType, objectionCard, sources, scripts, audience, claimCategory);
    const userPrompt = buildUserPrompt(workerType, audience, claimCategory, userMessage, role);

    // Check for spiritual certainty requests
    const needsEscalation = CERTAINTY_TRIGGERS.some(t => allText.includes(t));

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.4,
        max_tokens: 4000,
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error('AI gateway error:', aiResponse.status, errText);
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again shortly.' }), {
          status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted.' }), {
          status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      return new Response(JSON.stringify({ error: 'AI service error' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content || '';

    // Parse structured output
    let output: any;
    try {
      let jsonContent = content;
      if (content.includes('```json')) {
        jsonContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (content.includes('```')) {
        jsonContent = content.replace(/```\n?/g, '');
      }
      output = JSON.parse(jsonContent.trim());
    } catch {
      output = { rawResponse: content, parseError: true };
    }

    // Build citations from sources used
    const citations = [
      ...(objectionCard ? [{
        title: `Objection Card: ${objectionCard.claim_category}`,
        section: 'PROOF Framework',
        lastUpdated: objectionCard.updated_at,
        type: 'objection_card'
      }] : []),
      ...sources.map(s => ({
        title: s.title,
        section: s.citation_ref || s.proof_category || 'General',
        lastUpdated: s.updated_at,
        type: s.source_type,
        tier: s.tier
      })),
      ...scripts.map(s => ({
        title: `${s.audience_type} Script: ${s.scenario}`,
        section: 'Conversation Scripts',
        lastUpdated: s.updated_at,
        type: 'conversation_script'
      }))
    ];

    // Add escalation note if needed
    const escalated = needsEscalation || output?.confidence_low || (citations.length === 0 && workerType !== 'study_navigator');
    const escalationReason = needsEscalation
      ? 'User message references spiritual certainty claims. Encouraging prayer, discernment, and pastoral counsel.'
      : citations.length === 0
        ? 'No approved sources found for this claim. Response based on framework guidelines only.'
        : undefined;

    // Add disclaimer for spiritual matters
    if (needsEscalation && output && typeof output === 'object') {
      output.escalationNote = '⚠️ This topic involves spiritual discernment that goes beyond what this tool can assess with certainty. We encourage you to pray, seek pastoral counsel, and study Scripture together with trusted spiritual mentors.';
    }

    // Update worker run
    if (runId) {
      await supabase.from('worker_runs').update({
        output_json: output,
        citations_json: citations,
        confidence_score: citations.length > 0 ? 0.85 : 0.50,
        escalated,
        escalation_reason: escalationReason,
        status: escalated ? 'escalated' : 'completed',
        duration_ms: Date.now() - new Date(runData.created_at).getTime()
      }).eq('id', runId);

      // Log deliver
      await supabase.from('worker_event_log').insert({
        worker_run_id: runId,
        event_type: escalated ? 'escalate' : 'deliver',
        event_data_json: { citations_count: citations.length, escalated, escalation_reason: escalationReason }
      });

      // Save to user history if authenticated
      if (userId) {
        await supabase.from('worker_output_history').insert({
          user_id: userId,
          worker_run_id: runId,
          worker_type: workerType,
          title: getWorkerTitle(workerType, claimCategory, audience),
          output_json: { output, citations, escalated, escalationReason }
        });
      }
    }

    return new Response(JSON.stringify({
      output,
      citations,
      escalated,
      escalationReason,
      objectionCard: objectionCard ? {
        sixtySecondResponse: objectionCard.sixty_second_response,
        fiveMinuteResponse: objectionCard.five_minute_response,
        proofBreakdown: objectionCard.proof_breakdown_json,
        dialogueQuestions: objectionCard.dialogue_questions,
        boundaryStatement: objectionCard.boundary_statement,
        prayer: objectionCard.prayer,
        scriptureRefs: objectionCard.scripture_refs,
        audienceNotes: objectionCard.audience_notes_json?.[audience || ''] || null
      } : null,
      runId,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('AI Worker error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

function getWorkerTitle(workerType: string, claim?: string, audience?: string): string {
  const titles: Record<string, string> = {
    ritual_oath_coach: `Ritual & Oath Clarity: ${claim || 'general'}`,
    founders_guide: `Founders & History: ${claim || 'general'}`,
    conversation_coach: `Conversation Script: ${audience || 'general'}`,
    study_navigator: 'Study Plan Navigator'
  };
  return titles[workerType] || 'AI Worker Response';
}

function buildSystemPrompt(
  workerType: string,
  objectionCard: any,
  sources: any[],
  scripts: any[],
  audience?: string,
  claimCategory?: string
): string {
  const baseRules = `You are a Sacred Greeks AI Worker — a compassionate, source-grounded assistant for Christians navigating Greek letter organization life.

ABSOLUTE RULES:
1. ONLY use information from the provided sources and objection cards. If you cannot find a source for a claim, say "This claim requires further research with approved sources" rather than guessing.
2. NEVER claim spiritual certainty about demonic activity. You may encourage prayer, discernment, and pastoral counsel.
3. NEVER mock, ridicule, or use sensational language about any position.
4. Maintain respectful tone at all times, even when addressing opposing views.
5. Every historical, theological, or scriptural claim MUST be supported by a cited source.
6. If you lack sources for a required claim, flag it for admin review.

PROOF FRAMEWORK:
- P (Pledge Process): Examining intake/membership processes through a biblical lens
- R (Rituals): Understanding ceremonial practices and their origins
- O (Oaths): Analyzing pledges/vows and their spiritual implications  
- O (Obscurity): Addressing secrecy, hidden knowledge, and exclusive practices
- F (Founders): Historical context of founders, their motivations, and connections

OUTPUT FORMAT: Always respond in valid JSON matching the requested structure.`;

  let context = '';

  if (objectionCard) {
    context += `\n\nAPPROVED OBJECTION CARD (Tier 1 source — use this as primary reference):
Claim Category: ${objectionCard.claim_category}
Claim: ${objectionCard.claim_text}
60-Second Response: ${objectionCard.sixty_second_response}
5-Minute Response: ${objectionCard.five_minute_response}
PROOF Breakdown: ${JSON.stringify(objectionCard.proof_breakdown_json)}
Dialogue Questions: ${JSON.stringify(objectionCard.dialogue_questions)}
Boundary Statement: ${objectionCard.boundary_statement}
Prayer: ${objectionCard.prayer}
Scripture References: ${JSON.stringify(objectionCard.scripture_refs)}`;

    if (audience && objectionCard.audience_notes_json?.[audience]) {
      context += `\nAudience-specific note for ${audience}: ${objectionCard.audience_notes_json[audience]}`;
    }
  }

  if (sources.length > 0) {
    context += '\n\nAPPROVED LIBRARY SOURCES:';
    sources.forEach((s, i) => {
      context += `\n[Source ${i + 1}] Tier ${s.tier} | "${s.title}" | ${s.citation_ref || 'No ref'} | Category: ${s.proof_category || 'General'}\n${s.summary || s.content.slice(0, 500)}`;
    });
  }

  if (scripts.length > 0) {
    context += '\n\nAPPROVED CONVERSATION SCRIPTS:';
    scripts.forEach((s, i) => {
      context += `\n[Script ${i + 1}] Audience: ${s.audience_type} | Scenario: ${s.scenario}\nOpening: ${s.opening_lines}\nKey Points: ${JSON.stringify(s.key_points)}\nBoundaries: ${JSON.stringify(s.boundary_statements)}`;
    });
  }

  const workerInstructions: Record<string, string> = {
    ritual_oath_coach: `\n\nWORKER ROLE: Ritual & Oath Clarity Coach
You help users respond to claims about rituals opening demonic portals, oaths competing with Christ, deity names being invocations, and secret language being occult.

Respond with JSON:
{
  "sixtySecondResponse": "A concise, grace-filled 60-second response",
  "fiveMinuteResponse": "A thorough 5-minute response with context",
  "proofBreakdown": { "P": "...", "R": "...", "O_oaths": "...", "O_obscurity": "...", "F": "..." },
  "dialogueQuestions": ["3 thoughtful questions to ask the other person"],
  "boundaryStatement": "A clear but loving boundary statement",
  "prayer": "A brief prayer for the conversation",
  "nextSteps": ["2-3 suggested in-app content to explore"],
  "citationsUsed": ["List source titles used"]
}`,

    founders_guide: `\n\nWORKER ROLE: Founders & History Context Guide
You provide balanced historical context about founders, Masonry connections, and mutual aid history.

CRITICAL NUANCE: Many Black communities in the early 1900s faced exclusion from mainstream insurance and employment networks. Fraternal networks sometimes provided mutual aid benefits (burial support, networking). Present this context only when supported by curated sources.

Respond with JSON:
{
  "historicalContext": "Balanced overview of the historical period",
  "foundersAnalysis": "What we know from approved sources about founders' motivations",
  "masonryConnection": "Factual assessment of claimed connections, with citations",
  "mutualAidContext": "Historical context of fraternal mutual aid networks",
  "proofBreakdown": { "P": "...", "R": "...", "O_oaths": "...", "O_obscurity": "...", "F": "..." },
  "dialogueQuestions": ["3 thoughtful questions"],
  "boundaryStatement": "A boundary statement",
  "prayer": "A brief prayer",
  "unsourcedClaims": ["Any claims that need admin review for proper sourcing"],
  "citationsUsed": ["List source titles used"]
}`,

    conversation_coach: `\n\nWORKER ROLE: Conversation Script Coach
You help users prepare for specific conversations with ${audience || 'someone'} about faith and Greek life.

Respond with JSON:
{
  "openingApproach": "How to begin the conversation",
  "keyTalkingPoints": ["3-5 key points to make"],
  "responsesToExpect": ["2-3 likely responses and how to handle them"],
  "questionsToAsk": ["3 good questions to ask"],
  "boundaryStatements": ["2 boundary statements"],
  "closingPrayer": "A prayer for the conversation",
  "toneGuidance": "Specific tone advice for this audience",
  "whatToAvoid": ["Things to avoid saying"],
  "citationsUsed": ["List source titles used"]
}`,

    study_navigator: `\n\nWORKER ROLE: Study Plan Navigator
You help users navigate study plans and track progress. Recommend content only from approved internal sources.

Respond with JSON:
{
  "recommendedPlan": "Which plan to start with and why",
  "todaysContent": { "title": "...", "description": "...", "proofCategory": "..." },
  "motivationalNote": "Encouragement based on progress",
  "nextMilestone": "What they're working toward",
  "citationsUsed": ["List source titles used"]
}`
  };

  return baseRules + context + (workerInstructions[workerType] || '');
}

function buildUserPrompt(
  workerType: string,
  audience?: string,
  claimCategory?: string,
  userMessage?: string,
  role?: string
): string {
  const roleContext = role ? `I am a ${role} in a Greek letter organization.` : '';
  const audienceContext = audience ? `I am talking to my ${audience}.` : '';
  const claimContext = claimCategory ? `The specific claim/topic is: ${claimCategory.replace(/_/g, ' ')}.` : '';

  const prompts: Record<string, string> = {
    ritual_oath_coach: `${roleContext} ${audienceContext} ${claimContext}\n\n${userMessage || 'Help me respond to this objection about rituals and oaths in Greek life from a faith perspective.'}`,
    founders_guide: `${roleContext} ${audienceContext} ${claimContext}\n\n${userMessage || 'Help me understand the historical context of Greek organization founders and any claimed connections to Masonry.'}`,
    conversation_coach: `${roleContext} ${audienceContext} ${claimContext}\n\n${userMessage || 'Help me prepare a script for this conversation about my faith and Greek life.'}`,
    study_navigator: `${roleContext}\n\n${userMessage || 'What study plan should I start with and what should I focus on today?'}`
  };

  return prompts[workerType] || userMessage || 'Help me with this topic.';
}
