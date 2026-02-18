import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Layers, Plus, Trash2, Edit2, Copy, Presentation, BookOpen, Users, Cross, Sparkles,
  Heart, GraduationCap, Shield, Target, Calendar, MessageCircle, Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

import type { SlideData } from "./slideTypes";
import { templateImages } from "./templateImages";

interface SlideDeck {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  is_template: boolean;
  template_category: string | null;
  slides_json: SlideData[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

// Pre-built PROOF templates
const PROOF_TEMPLATES: Omit<SlideDeck, "id" | "user_id" | "created_at" | "updated_at">[] = [
  {
    title: "PROOF Framework Overview",
    description: "5-slide introduction to the PROOF apologetics framework",
    is_template: true,
    template_category: "proof",
    is_public: true,
    slides_json: [
      { title: "The PROOF Framework", content: "Providential · Religious · Organizational · Operational · Faith-Based\nA Biblical Defense of Greek Life", layout: "title", image_url: templateImages.proofFramework, notes: "Welcome everyone warmly. Set the stage: today we're walking through the PROOF framework — a structured, evidence-based approach to understanding Greek life through a Biblical lens. Remind the audience this is about equipping, not debating. Estimated time: 20-25 minutes total." },
      { title: "P — Providential History", content: "Tracing God's hand through the founding and growth of Greek-letter organizations, connecting historical milestones to divine purpose.", notes: "Start with Alpha Phi Alpha (1906) and walk through each D9 founding. Highlight that many founders were ministers, deacons, or sons/daughters of pastors. Ask the audience: 'Do you know the faith background of your organization's founders?' Key stat: 7 of the 9 D9 organizations reference God or a higher power in their founding documents. Allow 4-5 minutes." },
      { title: "R — Religious Consistency", content: "Examining how organizational rituals, symbols, and values align with Christian scripture and doctrine.", notes: "This is the most sensitive slide — approach with care and respect for organizational secrecy. Focus on PUBLIC elements: hymns sung at meetings, prayers at events, mottos that reference virtue. Reference Philippians 4:8 as a lens. Do NOT discuss private ritual details. If someone pushes back, redirect to publicly available constitutions and bylaws. Allow 4-5 minutes." },
      { title: "O — Organizational Integrity", content: "Evaluating the ethical standards, accountability structures, and moral framework within Greek life.", notes: "Discuss how national organizations have anti-hazing policies, ethics boards, and accountability structures. Acknowledge that individual chapters sometimes fall short — that's human, not organizational. Draw parallel to churches: the church's mission isn't invalidated by individual failures. Reference Matthew 7:16 — 'By their fruits you will know them.' Allow 3-4 minutes." },
      { title: "O — Operational Fruit", content: "Measuring the tangible community impact: service hours, scholarships, mentorship programs.", notes: "This is your data slide — bring the numbers. D9 organizations collectively: 100,000+ volunteer hours annually, $50M+ in scholarships awarded, mentorship programs reaching thousands of youth. If possible, share YOUR chapter's specific numbers. This is where skeptics often soften — the fruit is undeniable. Reference Galatians 5:22-23. Allow 3-4 minutes." },
      { title: "F — Faith-Based Transformation", content: "Personal testimonies of spiritual growth and transformation through Greek membership.", notes: "This is the emotional anchor of the presentation. Share 2-3 real testimonies (get permission first). Stories should follow the arc: 'Before I joined → what I experienced → how my faith grew.' If comfortable, share your own story. End with an invitation: 'If you have a testimony of faith and Greek life, we'd love to hear it.' Allow 5 minutes including brief audience sharing." },
    ],
  },
  {
    title: "Chapter Devotional",
    description: "Template for weekly chapter devotional presentations",
    is_template: true,
    template_category: "devotional",
    is_public: true,
    slides_json: [
      { title: "Weekly Devotional", content: "Theme: [Your Theme]\nDate: [Date]", layout: "title", image_url: templateImages.chapterDevotional, notes: "Arrive 5 minutes early to set up. Have Bibles or Bible apps ready. Set the atmosphere: dim lights if possible, play soft instrumental music as people arrive. Greet each person by name. Total devotional should run 15-20 minutes." },
      { title: "Opening Scripture", content: "[Scripture Reference]\n\n\"[Scripture Text]\"", notes: "Read the scripture aloud slowly — let each word land. After reading, pause for 10-15 seconds of silence. Then read it a second time. Ask someone else to read it from a different translation if available. The repetition helps it sink in. Pro tip: display the verse on screen but don't rush past it." },
      { title: "Reflection", content: "[Key reflection points connecting scripture to Greek life]", notes: "Bridge the ancient text to modern Greek life. Example: 'When Paul talks about running the race, how does that connect to the standards we set as brothers/sisters?' Prepare 2-3 discussion questions but let the conversation flow naturally. If the room is quiet, share your own reflection first to model vulnerability. Allow 5-7 minutes." },
      { title: "Application", content: "How can we apply this to our chapter this week?", notes: "Move from abstract to concrete. Challenge each person to identify ONE specific action they'll take this week based on the scripture. Examples: 'I'll encourage a younger member,' 'I'll show up to service with a better attitude,' 'I'll pray for our chapter president daily.' Write commitments down — accountability matters. Allow 3-4 minutes." },
      { title: "Closing Prayer", content: "[Prayer text or prayer prompts]", notes: "Ask if anyone has prayer requests before closing. Write them down so you can follow up later (this builds trust). Pray specifically — not generically. Mention the chapter by name, reference the scripture, and ask God to help with the commitments made. If comfortable, invite someone else to close in prayer. End with the chapter greeting or motto as a unified close." },
    ],
  },
  {
    title: "Chapter Meeting Agenda",
    description: "Structured agenda template for chapter meetings",
    is_template: true,
    template_category: "chapter",
    is_public: true,
    slides_json: [
      { title: "Chapter Meeting", content: "[Chapter Name]\n[Date] • [Time]", layout: "title", image_url: templateImages.chapterMeeting, notes: "Start on time — it sets the tone for professionalism. Have the agenda printed or shared digitally before the meeting. Designate a timekeeper. Target total meeting length: 60-75 minutes max. Remember: a well-run meeting builds trust in leadership." },
      { title: "Call to Order", content: "• Roll Call\n• Approval of Minutes\n• Opening Prayer/Hymn", notes: "Roll call: note absences and follow up afterwards — don't shame in public. Minutes approval: ask 'Are there any corrections to last meeting's minutes?' If none, ask for a motion to approve. Opening prayer: rotate who leads prayer each meeting to develop members' spiritual leadership. Keep this section to 5-7 minutes." },
      { title: "Officer Reports", content: "• President's Report\n• Treasurer's Report\n• Secretary's Report\n• Committee Reports", notes: "Each officer gets 3-5 minutes MAX. Treasurer should always share current balance and any outstanding expenses. Pro tip: require written reports submitted 24 hours before the meeting so members can review in advance. If a report runs long, table detailed discussion for committee breakouts. Allow 15-20 minutes total." },
      { title: "Old Business", content: "• [Pending items from previous meeting]\n• [Follow-up actions]", notes: "Review action items from last meeting. For each item, ask: 'What's the status? Is it complete, in progress, or stalled?' If stalled, reassign or set a new deadline. Don't let old business dominate — if something needs extended discussion, schedule a separate committee meeting. Allow 10 minutes." },
      { title: "New Business", content: "• [New proposals]\n• [Upcoming events]\n• [Announcements]", notes: "This is where new ideas come forward. Use Robert's Rules: motion → second → discussion → vote. Encourage newer members to bring proposals — it builds ownership. For large proposals, introduce this meeting and vote next meeting to give time for reflection. Share upcoming events with dates, times, and who's responsible. Allow 15-20 minutes." },
      { title: "Adjournment", content: "• Closing remarks\n• Next meeting date\n• Closing prayer", notes: "Summarize key decisions made and action items assigned. Confirm next meeting date and any deadlines before then. End on a positive note — acknowledge something the chapter did well recently. Close in prayer or with the chapter hymn. Reminder: send meeting minutes within 48 hours while everything is fresh." },
    ],
  },
  {
    title: "New Member Orientation",
    description: "Introduce new members to chapter history, values, and expectations",
    is_template: true,
    template_category: "onboarding",
    is_public: true,
    slides_json: [
      { title: "Welcome, New Members!", content: "[Chapter Name]\nOrientation [Semester/Year]", layout: "title", image_url: templateImages.newMemberOrientation, notes: "Energy matters here — this is their first impression of chapter culture. Have current members greet new members at the door. Provide name tags. Consider having refreshments. The goal is to make them feel chosen and valued, not overwhelmed. Total orientation: 30-40 minutes with Q&A." },
      { title: "Our History", content: "• Founded: [Date]\n• National founding: [Date]\n• Key milestones in our chapter's journey", notes: "Tell the founding story like it's a story, not a lecture. Include the names of local founders if known. Share any legendary chapter moments (awards won, community impact milestones, famous alumni). Show old photos if available — history becomes real when it has faces. Connect the founding to faith: 'Our founders believed...' Allow 5-7 minutes." },
      { title: "Our Values & Motto", content: "• Motto: [Motto]\n• Core values we live by\n• How faith guides our brotherhood/sisterhood", notes: "Don't just list values — illustrate them. For each core value, share a real example: 'Last semester, Brother/Sister [Name] lived out [value] when they...' Explain how faith isn't separate from Greek life but woven into its DNA. If your motto is in Greek or another language, explain the meaning and why it matters. Ask new members: 'Which value resonates most with you?' Allow 5 minutes." },
      { title: "Member Expectations", content: "• Academic standards (minimum GPA)\n• Meeting attendance policy\n• Community service requirements\n• Financial obligations", notes: "Be transparent but not intimidating. Frame expectations as 'the standard we hold each other to because we believe in excellence.' Share the specific GPA requirement and what support is available (study groups, tutoring). Be upfront about dues — no surprises. Explain the consequences of not meeting expectations with grace: 'We don't punish — we support, then hold accountable.' Allow 5-7 minutes." },
      { title: "Getting Involved", content: "• Committees you can join\n• Upcoming events\n• Mentorship pairings\n• Communication channels (GroupMe, email, etc.)", notes: "This is where you turn passive new members into active ones. Describe each committee briefly and what kind of person thrives there. Announce mentorship pairings if ready — or explain the process. Get them added to communication channels DURING the orientation, not after. Share the next 3-4 upcoming events and personally invite them. Allow 5 minutes." },
      { title: "Next Steps", content: "• Complete your profile\n• Attend your first committee meeting\n• Connect with your mentor\n• Save important dates", notes: "End with clear, actionable next steps — not vague encouragement. Have them pull out their phones and add key dates to their calendar RIGHT NOW. Introduce their mentor by name if present. Provide a printed 'New Member Quick Start' card with contacts, dates, and links. Close with a prayer or chapter greeting that includes the new members for the first time. Allow 5 minutes + open Q&A." },
    ],
  },
  {
    title: "Community Service Report",
    description: "Showcase chapter service impact with data and stories",
    is_template: true,
    template_category: "service",
    is_public: true,
    slides_json: [
      { title: "Community Service Report", content: "[Chapter Name]\n[Semester/Year]", layout: "title", image_url: templateImages.communityService, notes: "This presentation can be used for chapter meetings, regional conferences, or community partner meetings. Adjust your tone accordingly — internal reports can be candid; external presentations should be polished. Have photos ready to supplement slides. Total: 10-15 minutes." },
      { title: "Impact at a Glance", content: "• Total volunteer hours: [X]\n• Members participating: [X]\n• Organizations served: [X]\n• Lives impacted: [X]", notes: "Lead with your strongest number. If you logged 500+ hours, say that FIRST with pride. Compare to last semester: 'That's a 30% increase.' If participation was low, own it honestly: 'We had 60% participation — our goal next semester is 80%.' Consider adding a simple bar chart or visual if presenting to leadership. This slide should take 2-3 minutes." },
      { title: "Featured Project", content: "[Project Name]\n\n[Brief description of the project, who it served, and what was accomplished]", notes: "Choose your most impactful project — the one with the best story. Structure it as: Problem → What we did → Impact. Include a quote from a community partner or beneficiary if possible. Show before/after photos if applicable. If you partnered with another organization, credit them by name. This slide can take 3-4 minutes — the story is worth telling well." },
      { title: "Member Spotlights", content: "• [Member Name] — [Contribution]\n• [Member Name] — [Contribution]\n• [Member Name] — [Contribution]", notes: "Public recognition is powerful — don't skip this. Highlight 3-5 members who went above and beyond. Be specific: 'Sister Johnson organized the entire school supply drive, recruiting 12 volunteers and collecting 200+ backpacks.' If they're in the room, ask them to stand. Mix veteran and newer members to show that service is for everyone. Allow 2-3 minutes." },
      { title: "Faith in Action", content: "\"Faith without works is dead.\" — James 2:26\n\nHow our service connects to our spiritual mission", notes: "This is the heart of a faith-centered service report. Connect the dots: we don't serve just to log hours — we serve because our faith compels us. Share how a specific service project deepened someone's faith or opened a spiritual conversation. Reference Matthew 25:35-40 ('Whatever you did for the least of these...'). This transforms a report into a testimony. Allow 2-3 minutes." },
      { title: "Looking Ahead", content: "• Upcoming service events\n• Partnership opportunities\n• Goal for next semester: [X] hours", notes: "End with momentum, not a recap. Share 2-3 confirmed upcoming service events with dates. If you're seeking new community partners, name the type of organizations you want to connect with. Set a specific, measurable goal: 'Next semester, we're aiming for 750 hours with 90% chapter participation.' Close with a call to action: 'Sign up for a committee today.' Allow 2 minutes." },
    ],
  },
  {
    title: "Fundraising Pitch",
    description: "Present fundraising goals and rally donor support",
    is_template: true,
    template_category: "fundraising",
    is_public: true,
    slides_json: [
      { title: "Fundraising Campaign", content: "[Campaign Name]\n[Chapter Name]", layout: "title", image_url: templateImages.fundraisingPitch, notes: "Know your audience: alumni donors respond to legacy and impact; corporate sponsors want visibility and ROI; fellow students want to feel part of something bigger. Adjust your energy and language accordingly. Have your giving link ready to share immediately. Total pitch: 8-12 minutes." },
      { title: "Why We're Raising", content: "• The need: [Describe the cause]\n• Who benefits: [Target beneficiaries]\n• Our chapter's connection to this mission", notes: "Open with a story, not a number. 'Last year, three of our members almost couldn't return to school because of financial hardship.' Then explain the systemic need. Make it personal — why does THIS chapter care about THIS cause? If possible, have a beneficiary share their story (live or recorded). Emotional connection drives giving more than logic alone. Allow 3-4 minutes." },
      { title: "Our Goal", content: "🎯 Target: $[Amount]\n\n• Scholarship fund: $[X]\n• Community programs: $[X]\n• Chapter operations: $[X]", notes: "Transparency builds trust. Show exactly where every dollar goes — no vague categories. If you can, show what different giving levels accomplish: '$25 buys school supplies for one child,' '$100 covers one student's conference registration,' '$500 funds a semester of tutoring.' Make the goal feel achievable: 'If every member raises just $50, we hit our target.' Allow 2-3 minutes." },
      { title: "How to Give", content: "• Online: [Link]\n• Cash/Check at events\n• Recurring monthly gifts\n• Corporate matching", notes: "Remove every barrier to giving. Have a QR code on screen that goes directly to the donation page. Mention corporate matching: 'Check if your employer matches — it could double your gift.' Offer recurring giving: 'Even $10/month adds up to $120 by year-end.' If accepting cash, have envelopes and a secure collection box. Text-to-give is another great option if available. Allow 2 minutes." },
      { title: "Thank You", content: "Every gift — large or small — makes a difference.\n\nTogether, we build something greater than ourselves.", layout: "title", image_url: templateImages.fundraisingPitch, notes: "End with genuine gratitude, not another ask. Thank specific donors or partners by name if appropriate. Share what last year's donations accomplished as proof that giving works. Close with a prayer of gratitude or a chapter blessing. After the presentation, follow up within 48 hours with a thank-you email and the giving link again." },
    ],
  },
  {
    title: "Scripture Study Series",
    description: "Multi-week Bible study template for small groups",
    is_template: true,
    template_category: "devotional",
    is_public: true,
    slides_json: [
      { title: "Scripture Study", content: "[Book/Topic]\nWeek [X] of [Y]", layout: "title", image_url: templateImages.scriptureStudy, notes: "Set up the room for conversation, not lecture — circle or small clusters work best. Have extra Bibles available for anyone who didn't bring one. Offer a printed handout with the passage and questions. Play soft background music as people arrive. Start and end on time to build trust. Total session: 30-45 minutes." },
      { title: "Last Week's Recap", content: "• Key takeaway from last session\n• Any reflections or follow-ups from the group?", notes: "This builds continuity and shows that the study isn't isolated events. Ask: 'Who tried last week's challenge? How did it go?' Celebrate any wins — even small ones. If someone shares a struggle, affirm their honesty. This section builds community and accountability. Keep it to 3-5 minutes to leave room for today's passage." },
      { title: "Today's Passage", content: "[Book Chapter:Verses]\n\n\"[Key verse text]\"", notes: "Read the passage together — either one person reads aloud, or go verse-by-verse around the circle. For longer passages, assign sections beforehand. After reading, ask: 'What word or phrase stood out to you?' Don't explain yet — let the text speak first. If using multiple translations, compare key phrases. Allow 3-5 minutes for reading and initial reactions." },
      { title: "Context & Background", content: "• Who wrote it and when\n• Historical/cultural context\n• How it fits in the larger narrative", notes: "Keep this scholarly but accessible. Who was the author speaking to, and why? What was happening historically? How does this passage fit in the book's overall arc? Use a study Bible or commentary for preparation (recommend apps like Blue Letter Bible or BibleProject videos). Don't overload — 2-3 key context points are enough. This should feel like 'unlocking' the passage, not a lecture. Allow 3-4 minutes." },
      { title: "Discussion Questions", content: "1. [Question about meaning]\n2. [Question about personal application]\n3. [Question connecting to Greek life/community]", notes: "The best questions are open-ended and layered: start with 'What does this mean?' then move to 'What does this mean for us?' Prepare 3-5 questions but you may only get to 2-3 — that's okay. If the group is quiet, share your own answer first to model vulnerability. Avoid 'right answer' questions — the goal is reflection, not a quiz. The third question should always bridge to Greek life or chapter culture. Allow 10-15 minutes — this is the core of the study." },
      { title: "Personal Challenge", content: "This week's challenge:\n\n[Specific, actionable spiritual practice]\n\nPray • Reflect • Act", notes: "Make the challenge SMART: Specific, Measurable, Achievable, Relevant, Time-bound. Bad: 'Pray more.' Good: 'Pray for one chapter member by name every morning this week.' Encourage pairs or triads to check in mid-week on the challenge. Write the challenge on a card they can take home. Close in prayer — invite volunteers to pray or go around the circle with one-sentence prayers. Allow 3-5 minutes." },
    ],
  },
  {
    title: "Leadership Workshop",
    description: "Interactive workshop for developing servant leaders",
    is_template: true,
    template_category: "leadership",
    is_public: true,
    slides_json: [
      { title: "Servant Leadership Workshop", content: "Leading with Purpose, Serving with Heart", layout: "title", image_url: templateImages.leadershipWorkshop, notes: "This workshop works best with 8-25 participants. Arrange seating in a U-shape or clusters of 4-5 for small group activities. Prepare worksheets for the self-assessment activity. Have markers and flip chart paper for group exercises. Energy and vulnerability from the facilitator set the tone. Total workshop: 45-60 minutes." },
      { title: "What Is Servant Leadership?", content: "\"The greatest among you shall be your servant.\" — Matthew 23:11\n\n• Putting others first\n• Leading by example\n• Empowering those around you", notes: "Start with a question: 'Think of the best leader you've ever had. What made them great?' Take 3-4 answers. Most will describe servant leadership traits without knowing the term. Then introduce the concept: Robert Greenleaf coined it in 1970, but Jesus modeled it 2,000 years ago. The key insight: servant leaders ask 'How can I help you succeed?' not 'How can you help me succeed?' Reference John 13 — Jesus washing the disciples' feet. Allow 5-7 minutes." },
      { title: "The 5 Pillars", content: "1. Listening — Hear before you speak\n2. Empathy — Understand before you judge\n3. Stewardship — Care for what's entrusted\n4. Community — Build together\n5. Growth — Develop others", notes: "Walk through each pillar with a real Greek life example. Listening: 'When a younger member comes to you frustrated, do you fix or do you listen first?' Empathy: 'Before judging someone's commitment, do you know what they're going through?' Stewardship: 'The chapter's reputation, finances, and culture are entrusted to you.' Community: 'Are you building cliques or building bridges?' Growth: 'Name one person you're actively investing in.' Allow 7-10 minutes." },
      { title: "Activity: Self-Assessment", content: "Rate yourself 1-5 on each pillar:\n\n• Where are you strongest?\n• Where do you have room to grow?\n• What's one step you can take this week?", notes: "Hand out worksheets or have them use their phones/notebooks. Give 5 minutes of SILENT individual reflection — no talking. Then pair up: share your strongest pillar and your growth area with one partner (3 minutes each). Finally, ask 2-3 volunteers to share with the full group. Normalize growth areas: 'Every great leader has blind spots. The best leaders know theirs.' This is the most transformative part of the workshop — don't rush it. Allow 15 minutes total." },
      { title: "Leading in Your Chapter", content: "• Every member is a leader\n• Leadership isn't a title — it's action\n• Opportunities: committees, mentoring, events, prayer groups", notes: "Challenge the 'I'm not an officer so I'm not a leader' mindset. Share examples of non-officers who led powerfully: the member who organized study groups, the one who checked on struggling brothers/sisters, the one who showed up first and left last at service events. List specific upcoming leadership opportunities they can sign up for TODAY. If possible, have sign-up sheets or a QR code ready. Allow 5 minutes." },
      { title: "Commitment", content: "My leadership commitment this semester:\n\n\"I will _____________ because _____________.\"\n\nWrite it down. Share it. Live it.", layout: "title", image_url: templateImages.leadershipWorkshop, notes: "Have everyone write their commitment on an index card. Collect the cards — you'll return them at the end of the semester as a powerful accountability moment. Ask 3-5 volunteers to read theirs aloud. Close with a commissioning prayer: 'Lord, empower these leaders to serve as You served — with humility, courage, and love.' End with a group photo to mark the moment." },
    ],
  },
  {
    title: "Event Recap & Highlights",
    description: "Celebrate and document a chapter event with key moments",
    is_template: true,
    template_category: "chapter",
    is_public: true,
    slides_json: [
      { title: "[Event Name]", content: "Recap & Highlights\n[Date]", layout: "title", image_url: templateImages.eventRecap, notes: "Present this at the next chapter meeting while the event is still fresh (within 1-2 weeks). If you have event photos, create a slideshow to play in the background as people arrive. The purpose is threefold: celebrate what happened, learn from it, and document it for chapter history. Total: 8-12 minutes." },
      { title: "By the Numbers", content: "• Attendees: [X]\n• Volunteers: [X]\n• Funds raised: $[X]\n• Hours invested: [X]", notes: "Numbers tell the story of scale. Compare to previous years if possible: 'Attendance was up 40% from last year's event.' Include social media metrics if relevant: posts, shares, impressions. If you had a survey, share the satisfaction score. Be proud of the numbers but honest — if turnout was low, acknowledge it and discuss why. This sets up the learning slide later. Allow 2 minutes." },
      { title: "Key Moments", content: "• [Highlight 1: What happened and why it mattered]\n• [Highlight 2]\n• [Highlight 3]", notes: "Share 3-4 specific moments that defined the event. These should be stories, not bullet points. 'When Brother Davis gave his testimony, you could hear a pin drop.' 'The look on the children's faces when they opened their backpacks.' Use photos if available — project them on screen as you narrate. Quote attendee feedback: 'One guest told us this was the best community event they'd attended all year.' Allow 3-4 minutes." },
      { title: "What We Learned", content: "• What went well\n• What we'd improve next time\n• Unexpected wins", notes: "Be constructively honest. Start with wins: 'Registration was seamless thanks to the tech team.' Then improvements: 'We underestimated food needs — next time, order 20% more.' Frame improvements as opportunities, not failures. Include unexpected wins: 'We didn't plan for it, but three attendees asked about joining the chapter.' Document these insights in your chapter's event playbook for future officers. Allow 2-3 minutes." },
      { title: "Thank You", content: "Special thanks to:\n• [Organizers]\n• [Sponsors/Partners]\n• [Volunteers]\n• Every member who showed up and showed out!", notes: "NAME people. Generic thanks feel hollow. 'Thank you to Sister Williams for leading logistics, Brother Carter for managing the budget, and the 15 volunteers who arrived at 6 AM for setup.' If sponsors or community partners were involved, acknowledge them — and send a formal thank-you letter within the week. End with applause or a chapter cheer. Allow 2 minutes." },
    ],
  },
  {
    title: "Myth vs. Truth: Greek Life & Faith",
    description: "Address common misconceptions about Greek organizations and Christianity",
    is_template: true,
    template_category: "proof",
    is_public: true,
    slides_json: [
      { title: "Myth vs. Truth", content: "Greek Life & Faith\nSeparating Fact from Fiction", layout: "title", image_url: templateImages.mythVsTruth, notes: "This is a sensitive topic — set ground rules upfront. 'We're here to explore, not argue. Every question is welcome. We respect different perspectives.' Know your audience: this works for skeptical Christians, curious non-Greeks, and even members questioning their own involvement. Have source documents ready (founding constitutions, national websites). Total: 20-30 minutes with discussion." },
      { title: "Myth #1", content: "\"Greek organizations are anti-Christian.\"\n\n✅ Truth: Many D9 organizations were founded on Christian principles, with prayers, hymns, and scripture woven into their traditions.", notes: "This is the most common objection. Counter with specifics: Alpha Phi Alpha's first meeting included a prayer. Many organizations require members to affirm belief in a Supreme Being. Quote from founding documents if available. Acknowledge the objection's source: some churches teach this based on incomplete information. Don't attack those churches — invite them to examine the evidence. 'Anti-Christian' implies intentional opposition; the evidence shows the opposite. Allow 4-5 minutes with discussion." },
      { title: "Myth #2", content: "\"You can't be Greek and follow Christ.\"\n\n✅ Truth: Thousands of members live out their faith daily through service, mentorship, and spiritual leadership within their chapters.", notes: "This myth creates a false binary. The reality: being Greek can STRENGTHEN your faith by giving you a community of accountability, a platform for service, and leadership opportunities. Share 1-2 testimonies of members whose faith deepened through Greek life. Address the counterargument: 'What about members who don't follow Christ?' — The same is true of any church. Membership doesn't guarantee holiness; it provides opportunity. Allow 4-5 minutes." },
      { title: "Myth #3", content: "\"Greek rituals conflict with the Bible.\"\n\n✅ Truth: Rituals emphasize values like brotherhood, scholarship, and service — values that align with Biblical teaching.", notes: "Tread carefully here — respect organizational secrecy. Focus on publicly known elements: oaths of loyalty, commitments to scholarship, pledges to serve. Compare to other rituals: wedding vows, baptism, communion — all are rituals. Rituals aren't inherently anti-Christian; it depends on what they affirm. Reference the PROOF framework's 'R' category for deeper analysis. If someone presses on specific ritual details, redirect: 'I can't discuss private ceremonies, but I can point you to public constitutions.' Allow 4-5 minutes." },
      { title: "Myth #4", content: "\"Greek life is only about parties and socializing.\"\n\n✅ Truth: D9 organizations collectively contribute millions of service hours and scholarship dollars annually.", notes: "This myth is fueled by media and stereotypes. Counter with data: Alpha Kappa Alpha's community impact programs, Omega Psi Phi's mentorship initiatives, Delta Sigma Theta's political action. Share specific numbers: '$X in scholarships, Y hours of service, Z youth mentored.' Acknowledge: yes, there are social events — and there should be. Fellowship is biblical (Acts 2:42). The question isn't whether there are parties, but whether the organization's primary fruit is positive. Allow 4-5 minutes." },
      { title: "The Real Question", content: "It's not whether you CAN be Greek and Christian.\n\nIt's how you LIVE OUT your faith within your organization.\n\nBe the proof.", layout: "title", image_url: templateImages.mythVsTruth, notes: "This is your closing challenge — deliver it with conviction. The debate isn't theoretical; it's personal. 'YOU are the proof that Greek life and faith can coexist.' Challenge the audience: 'Are you living out your faith in your chapter? Are you the person who prays before events, who mentors with integrity, who serves without seeking recognition?' Close with a prayer that acknowledges the tension and asks for wisdom. Leave time for questions — some of the best conversations happen after the formal presentation." },
    ],
  },
];

const categoryIcons: Record<string, typeof Presentation> = {
  proof: Sparkles,
  devotional: BookOpen,
  chapter: Users,
  onboarding: GraduationCap,
  service: Heart,
  fundraising: Target,
  leadership: Shield,
  custom: Presentation,
};

const categoryColors: Record<string, string> = {
  proof: "text-amber-500",
  devotional: "text-purple-500",
  chapter: "text-blue-500",
  onboarding: "text-emerald-500",
  service: "text-rose-500",
  fundraising: "text-orange-500",
  leadership: "text-cyan-500",
  custom: "text-primary",
};

export function SlideLibrary() {
  const [, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<SlideDeck | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("custom");

  // Fetch user's slide decks
  const { data: decks = [], isLoading } = useQuery({
    queryKey: ["slide-decks", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slide_decks")
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as SlideDeck[];
    },
    enabled: !!user,
  });

  // Create deck mutation
  const createDeck = useMutation({
    mutationFn: async (deck: { title: string; description: string; template_category: string; slides_json: SlideData[] }) => {
      const { error } = await supabase.from("slide_decks").insert({
        user_id: user!.id,
        title: deck.title,
        description: deck.description,
        template_category: deck.template_category,
        slides_json: deck.slides_json as unknown as any,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slide-decks"] });
      toast({ title: "Deck created!" });
      setCreateOpen(false);
      setNewTitle("");
      setNewDescription("");
    },
  });

  // Duplicate from template and open in editor
  const duplicateTemplate = useMutation({
    mutationFn: async (template: typeof PROOF_TEMPLATES[0]) => {
      const { data, error } = await supabase.from("slide_decks").insert({
        user_id: user!.id,
        title: template.title,
        description: template.description,
        template_category: template.template_category,
        slides_json: template.slides_json as unknown as any,
      }).select("id").single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["slide-decks"] });
      toast({ title: "Template ready — opening editor..." });
      setSearchParams({ tab: "deck", deckId: data.id });
    },
  });

  // Delete deck
  const deleteDeck = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("slide_decks").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slide-decks"] });
      toast({ title: "Deck deleted" });
      setDeleteTarget(null);
    },
  });

  const handleCreateBlank = () => {
    createDeck.mutate({
      title: newTitle || "Untitled Deck",
      description: newDescription,
      template_category: newCategory,
      slides_json: [{ title: "Title Slide", content: "Your content here", layout: "title" }],
    });
  };

  const userDecks = decks.filter(d => d.user_id === user?.id && !d.is_template);

  return (
    <div className="space-y-8">
      {/* Templates Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">PROOF Templates</h3>
            <p className="text-sm text-muted-foreground">Pre-built slide decks ready to customize</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROOF_TEMPLATES.map((template, i) => {
            const Icon = categoryIcons[template.template_category || "custom"];
            const color = categoryColors[template.template_category || "custom"];
            return (
              <Card key={i} className="group hover:shadow-md transition-all border-border/30">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <Badge variant="secondary" className="text-[10px]">
                      {template.slides_json.length} slides
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{template.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{template.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full gap-1.5 text-xs"
                    onClick={() => duplicateTemplate.mutate(template)}
                    disabled={duplicateTemplate.isPending}
                  >
                    <Copy className="w-3.5 h-3.5" /> Use Template
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* My Decks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">My Slide Decks</h3>
            <p className="text-sm text-muted-foreground">Your saved presentations</p>
          </div>
          <Button onClick={() => setCreateOpen(true)} className="gap-2 rounded-xl" size="sm">
            <Plus className="w-4 h-4" /> New Deck
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : userDecks.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Layers className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-2">No decks yet</p>
            <p className="text-sm text-muted-foreground mb-4">Start from a template above or create a blank deck</p>
            <Button onClick={() => setCreateOpen(true)} className="rounded-xl gap-2" size="sm">
              <Plus className="w-4 h-4" /> Create Deck
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userDecks.map(deck => {
              const Icon = categoryIcons[deck.template_category || "custom"];
              const color = categoryColors[deck.template_category || "custom"];
              const slides = Array.isArray(deck.slides_json) ? deck.slides_json : [];
              return (
                <Card key={deck.id} className="group hover:shadow-md transition-all border-border/30">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${color}`} />
                      </div>
                      <Badge variant="outline" className="text-[10px]">
                        {slides.length} slides
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">{deck.title}</h4>
                      {deck.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{deck.description}</p>
                      )}
                      <p className="text-[10px] text-muted-foreground mt-1.5">
                        Updated {new Date(deck.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 gap-1 text-xs rounded-lg"
                        onClick={() => setSearchParams({ tab: "deck", deckId: deck.id })}
                      >
                        <Edit2 className="w-3 h-3" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive gap-1 text-xs"
                        onClick={() => setDeleteTarget(deck)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Slide Deck</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Title</label>
              <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="My Presentation" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea value={newDescription} onChange={e => setNewDescription(e.target.value)} placeholder="What is this deck about?" rows={2} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Category</label>
              <Select value={newCategory} onValueChange={setNewCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="proof">PROOF</SelectItem>
                  <SelectItem value="devotional">Devotional</SelectItem>
                  <SelectItem value="chapter">Chapter</SelectItem>
                  <SelectItem value="onboarding">Onboarding</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="fundraising">Fundraising</SelectItem>
                  <SelectItem value="leadership">Leadership</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateBlank} disabled={createDeck.isPending}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={open => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete deck?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deleteTarget?.title}". This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTarget && deleteDeck.mutate(deleteTarget.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
