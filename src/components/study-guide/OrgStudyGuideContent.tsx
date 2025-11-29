import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, Users, Lightbulb } from "lucide-react";
import { getCouncilContent } from "@/data/orgSpecificContent";

interface OrgStudyGuideContentProps {
  councilId: string;
  organizationName?: string;
  sessionId: number;
}

// Council-specific study applications for each session
const COUNCIL_STUDY_APPLICATIONS: Record<string, {
  sessions: Record<number, {
    application: string;
    discussionPrompt: string;
    actionStep: string;
  }>;
}> = {
  nphc: {
    sessions: {
      1: {
        application: "As Divine Nine members, we carry a legacy of service rooted in uplift. How does the P.R.O.O.F. framework strengthen your organization's founding principles of scholarship, service, and brotherhood/sisterhood?",
        discussionPrompt: "Share how your line experience shaped your understanding of commitment and how that relates to your commitment to Christ.",
        actionStep: "This week, identify one way your organization's mission aligns with biblical principles and share it with a line brother/sister."
      },
      2: {
        application: "NPHC organizations emphasize community uplift. How can your chapter's community service become an extension of Christ's ministry to 'the least of these'?",
        discussionPrompt: "Discuss how step shows and strolls can be opportunities for witness rather than just performance.",
        actionStep: "Plan a chapter service project that explicitly connects your organization's values with biblical compassion."
      },
      3: {
        application: "The concept of 'crossing' into Greek life parallels the Christian journey of transformation. How does your initiation story reflect themes of dying to self and rising to purpose?",
        discussionPrompt: "How can probate celebrations honor both your organization and your faith?",
        actionStep: "Write a personal testimony connecting your Greek journey with your spiritual journey to share with a younger member."
      },
      4: {
        application: "Divine Nine organizations have historically been spaces for leadership development. How does servant leadership in your chapter reflect Christ's model of leadership?",
        discussionPrompt: "Identify times when chapter politics conflicted with your faith. How did you respond?",
        actionStep: "Commit to leading one chapter initiative this month with Christ-centered servant leadership."
      },
      5: {
        application: "As you complete this study, consider how your organization can be a mission field. How will you integrate faith into your Greek experience going forward?",
        discussionPrompt: "What legacy do you want to leave in your chapter regarding faith integration?",
        actionStep: "Start a faith-based small group or Bible study within your chapter or with other Greeks."
      }
    }
  },
  npc: {
    sessions: {
      1: {
        application: "Panhellenic sororities emphasize character development and academic excellence. How does the P.R.O.O.F. framework enhance your sorority's values of scholarship, leadership, and service?",
        discussionPrompt: "Share how sisterhood in your sorority has paralleled your understanding of Christian community.",
        actionStep: "This week, have a conversation with a sister about how your shared values connect to faith."
      },
      2: {
        application: "Many NPC sororities have philanthropy at their core. How can your chapter's philanthropic efforts become genuine Kingdom work that points others to Christ?",
        discussionPrompt: "Discuss how recruitment can be an opportunity for authentic connection rather than superficial evaluation.",
        actionStep: "Propose a philanthropy event that includes a faith-based component or partnership with a local church."
      },
      3: {
        application: "Sisterhood rituals often focus on bonds and loyalty. How can these themes point toward the ultimate loyalty we have in Christ?",
        discussionPrompt: "How do you navigate situations where sorority expectations conflict with your faith convictions?",
        actionStep: "Plan a sisterhood event that incorporates faith discussion or devotional time."
      },
      4: {
        application: "Leadership in Panhellenic life often involves navigating social pressures. How does Christ's example inform your leadership during challenging chapter situations?",
        discussionPrompt: "Share a time when standing for your faith in a sorority setting was difficult. What did you learn?",
        actionStep: "Mentor a younger sister this week, intentionally incorporating faith encouragement."
      },
      5: {
        application: "Your Panhellenic community can be a mission field. How will you be salt and light in your sorority and the broader Greek community?",
        discussionPrompt: "What does godly sisterhood look like, and how can you model it in your chapter?",
        actionStep: "Connect with Christians in other Panhellenic sororities for cross-organizational fellowship."
      }
    }
  },
  nic: {
    sessions: {
      1: {
        application: "IFC fraternities emphasize brotherhood, scholarship, and leadership. How does the P.R.O.O.F. framework strengthen your fraternity's foundational values?",
        discussionPrompt: "Share how your pledge experience taught you about commitment and how that relates to following Christ.",
        actionStep: "This week, initiate a faith conversation with a brother you trust."
      },
      2: {
        application: "Fraternity life often involves social events. How can you honor God in social settings while still being present and influential among your brothers?",
        discussionPrompt: "Discuss how 'iron sharpens iron' applies to accountability in your chapter.",
        actionStep: "Identify a brother to be your accountability partner for faith and integrity."
      },
      3: {
        application: "Brotherhood rituals often focus on loyalty and secrecy. How do you reconcile these elements with your primary allegiance to Christ?",
        discussionPrompt: "How can initiation traditions be honored while maintaining your Christian witness?",
        actionStep: "Write out how your fraternity values align with biblical principles to share with questioning brothers."
      },
      4: {
        application: "Leadership in IFC fraternities requires navigating peer pressure and house culture. How does servant leadership challenge typical fraternity leadership models?",
        discussionPrompt: "Share a time when you had to choose between popularity and integrity. What happened?",
        actionStep: "Lead by example this week by declining to participate in something that compromises your faith."
      },
      5: {
        application: "Your fraternity can be a mission field. How will you integrate faith into your brotherhood and leave a lasting spiritual legacy?",
        discussionPrompt: "What would it look like if your chapter had a thriving faith community within it?",
        actionStep: "Start a weekly prayer time or Bible study for interested brothers in your chapter."
      }
    }
  },
  nalfo: {
    sessions: {
      1: {
        application: "NALFO organizations blend cultural heritage with Greek traditions. How does the P.R.O.O.F. framework help you honor both your cultura and your Creator?",
        discussionPrompt: "Share how your family's faith traditions influence your approach to Greek life.",
        actionStep: "This week, reflect on how your cultural background enriches your faith expression."
      },
      2: {
        application: "Latino/a Greek organizations often focus on community empowerment. How can your chapter's service be an expression of Christ's love for all people?",
        discussionPrompt: "Discuss how you can be a bridge between your Greek community and faith communities.",
        actionStep: "Plan a bilingual service event that honors both your heritage and your faith."
      },
      3: {
        application: "Cultural rituals and Greek rituals intersect in unique ways. How do you navigate these dual identities as a follower of Christ?",
        discussionPrompt: "How does your faith inform your understanding of familia within your organization?",
        actionStep: "Share your faith journey with a hermano/hermana who may be wrestling with similar questions."
      },
      4: {
        application: "Leadership in NALFO often means being a bridge between cultures. How does Christ's ministry to all nations inform your leadership approach?",
        discussionPrompt: "How can you use your position to advocate for faith integration in multicultural spaces?",
        actionStep: "Mentor someone in your organization about integrating faith, culture, and Greek life."
      },
      5: {
        application: "Your NALFO organization can reach communities that other Greek organizations cannot. How will you use this unique position for Kingdom impact?",
        discussionPrompt: "What legacy do you want to leave regarding faith integration in Latino/a Greek life?",
        actionStep: "Connect with Christians in other NALFO organizations for shared fellowship and mission."
      }
    }
  },
  napa: {
    sessions: {
      1: {
        application: "NAPA organizations emphasize academic excellence and cultural pride. How does the P.R.O.O.F. framework help you honor your heritage while following Christ?",
        discussionPrompt: "Share how concepts like honor and community from your cultural background connect with biblical values.",
        actionStep: "This week, reflect on how your AAPI identity enriches your faith expression."
      },
      2: {
        application: "AAPI Greek organizations often focus on scholarship and family honor. How can academic achievement become an offering to God rather than just personal success?",
        discussionPrompt: "Discuss how you balance family expectations, academic pressure, and faith priorities.",
        actionStep: "Use your academic gifts this week to serve or mentor someone in your chapter or community."
      },
      3: {
        application: "Cultural traditions and Greek traditions intersect in NAPA organizations. How do you honor both while maintaining your primary identity in Christ?",
        discussionPrompt: "How does your understanding of community differ from or align with Christian fellowship?",
        actionStep: "Have a conversation with a family member about how your Greek life connects to your faith."
      },
      4: {
        application: "Leadership in NAPA organizations often involves navigating generational and cultural expectations. How does Christ's counter-cultural leadership inform your approach?",
        discussionPrompt: "Share how you've navigated conflicts between cultural expectations and faith convictions.",
        actionStep: "Lead an initiative that brings together your cultural heritage, Greek values, and Christian faith."
      },
      5: {
        application: "Your NAPA organization can reach AAPI communities in unique ways. How will you use this platform for Kingdom purposes?",
        discussionPrompt: "What does faithful witness look like in AAPI Greek spaces?",
        actionStep: "Connect with Christians in other AAPI organizations for shared fellowship and encouragement."
      }
    }
  },
  nmgc: {
    sessions: {
      1: {
        application: "NMGC organizations celebrate diversity and inclusion. How does the P.R.O.O.F. framework help you see Greek life through the lens of God's diverse Kingdom?",
        discussionPrompt: "Share how your multicultural background shapes your understanding of Christian community.",
        actionStep: "This week, reflect on how your organization's diversity reflects the diversity of heaven."
      },
      2: {
        application: "Multicultural Greek organizations break barriers. How can this barrier-breaking mission align with Christ's barrier-breaking love?",
        discussionPrompt: "Discuss how inclusivity in your organization can be a testimony to God's heart for all people.",
        actionStep: "Plan an event that celebrates diversity while pointing to our unity in Christ."
      },
      3: {
        application: "Navigating multiple cultural and Greek traditions can be complex. How does your identity in Christ provide an anchor amid diverse influences?",
        discussionPrompt: "How do you honor various traditions while maintaining your primary allegiance to Christ?",
        actionStep: "Share your testimony of finding identity in Christ with someone navigating similar questions."
      },
      4: {
        application: "Leadership in multicultural spaces requires cultural intelligence and humility. How does Christ's servant leadership inform your approach?",
        discussionPrompt: "Share how you've grown in understanding different perspectives through your organization.",
        actionStep: "Use your leadership to create space for faith conversations that honor diverse backgrounds."
      },
      5: {
        application: "Your NMGC organization can model the diverse unity of God's Kingdom. How will you leverage this for lasting spiritual impact?",
        discussionPrompt: "What would it look like if your organization became known for both diversity and faith?",
        actionStep: "Connect with Christians from various backgrounds in Greek life for cross-cultural fellowship."
      }
    }
  },
  professional: {
    sessions: {
      1: {
        application: "Professional Greek organizations focus on career excellence. How does the P.R.O.O.F. framework help you integrate faith into your professional aspirations?",
        discussionPrompt: "Share how your faith influences your career goals and professional ethics.",
        actionStep: "This week, identify how your professional field can be used for Kingdom purposes."
      },
      2: {
        application: "Networking is central to professional Greek life. How can professional connections become opportunities for witness and ministry?",
        discussionPrompt: "Discuss how you maintain integrity in competitive professional environments.",
        actionStep: "This week, pray for and encourage someone in your professional network."
      },
      3: {
        application: "Professional success often comes with ethical challenges. How does your faith inform your professional decision-making?",
        discussionPrompt: "Share a time when professional expectations conflicted with your faith convictions.",
        actionStep: "Write out your faith-based professional ethics to guide future decisions."
      },
      4: {
        application: "Leadership in professional organizations involves mentoring the next generation. How can you incorporate faith into your mentoring relationships?",
        discussionPrompt: "How do you balance career ambition with Kingdom priorities?",
        actionStep: "Mentor someone this week, intentionally including faith encouragement."
      },
      5: {
        application: "Your professional platform can be a mission field. How will you use your career success for eternal impact?",
        discussionPrompt: "What legacy do you want to leave in your profession regarding faith and integrity?",
        actionStep: "Identify ways to use your professional influence for Kingdom purposes."
      }
    }
  },
  honor: {
    sessions: {
      1: {
        application: "Honor societies celebrate academic achievement. How does the P.R.O.O.F. framework help you see your intellect as a gift to steward for God's glory?",
        discussionPrompt: "Share how your academic success connects to your sense of calling and purpose.",
        actionStep: "This week, reflect on how your knowledge can serve others and honor God."
      },
      2: {
        application: "Academic excellence can lead to pride or service. How can you use your achievements to serve others rather than elevate yourself?",
        discussionPrompt: "Discuss the difference between biblical wisdom and mere intellectual knowledge.",
        actionStep: "Use your academic gifts to help someone struggling in your field this week."
      },
      3: {
        application: "Honor society membership recognizes achievement. How do you maintain humility while celebrating academic success?",
        discussionPrompt: "How does your faith keep you grounded amid academic accolades?",
        actionStep: "Write out how your academic pursuits connect to your God-given purpose."
      },
      4: {
        application: "Academic leadership involves mentoring others. How can you incorporate faith into your academic mentoring relationships?",
        discussionPrompt: "Share how you've used your academic platform to share your faith.",
        actionStep: "Mentor a student this week, including encouragement about integrating faith and learning."
      },
      5: {
        application: "Your intellectual gifts can impact the world. How will you use your knowledge for Kingdom purposes?",
        discussionPrompt: "What does it mean to 'love the Lord with all your mind' in your academic field?",
        actionStep: "Identify ways your expertise can address needs in your church or community."
      }
    }
  },
  other: {
    sessions: {
      1: {
        application: "Whatever Greek organization you belong to, the P.R.O.O.F. framework can help you integrate faith into your experience. How do your organization's values align with biblical principles?",
        discussionPrompt: "Share what drew you to your organization and how it connects to your faith journey.",
        actionStep: "This week, identify one organizational value that aligns with Scripture."
      },
      2: {
        application: "Every Greek organization has opportunities for service and community impact. How can you leverage these for Kingdom purposes?",
        discussionPrompt: "Discuss how you can be salt and light within your specific Greek context.",
        actionStep: "Plan one activity that integrates your faith with your organizational involvement."
      },
      3: {
        application: "Navigating rituals and traditions varies by organization. How do you maintain your Christian witness in your specific Greek context?",
        discussionPrompt: "How do you decide what to participate in and what to decline?",
        actionStep: "Develop a personal framework for evaluating activities through a faith lens."
      },
      4: {
        application: "Leadership looks different in every organization. How can you apply servant leadership principles in your specific context?",
        discussionPrompt: "Share how you've grown as both a Greek member and a Christian.",
        actionStep: "Take a leadership initiative this week that reflects Christ's character."
      },
      5: {
        application: "Your organization is your mission field. How will you integrate faith into your Greek experience going forward?",
        discussionPrompt: "What legacy do you want to leave regarding faith in your organization?",
        actionStep: "Connect with other Christians in Greek life for mutual encouragement and accountability."
      }
    }
  }
};

export function OrgStudyGuideContent({ councilId, organizationName, sessionId }: OrgStudyGuideContentProps) {
  const councilContent = getCouncilContent(councilId);
  const studyApplications = COUNCIL_STUDY_APPLICATIONS[councilId] || COUNCIL_STUDY_APPLICATIONS.other;
  const sessionContent = studyApplications.sessions[sessionId];
  
  if (!sessionContent) {
    return null;
  }

  return (
    <Card className="border-2 border-sacred/20 bg-gradient-to-br from-sacred/5 to-transparent mt-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5 text-sacred" />
            For You: {organizationName || councilContent.name}
          </CardTitle>
          <Badge variant="secondary" className="text-xs">Personalized</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Application */}
        <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
          <BookOpen className="w-5 h-5 text-sacred mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Your Application</p>
            <p className="text-sm text-muted-foreground">{sessionContent.application}</p>
          </div>
        </div>

        {/* Discussion Prompt */}
        <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
          <Users className="w-5 h-5 text-warm-coral mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Your Discussion</p>
            <p className="text-sm text-muted-foreground italic">{sessionContent.discussionPrompt}</p>
          </div>
        </div>

        {/* Action Step */}
        <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
          <Lightbulb className="w-5 h-5 text-warm-blue mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Your Action Step</p>
            <p className="text-sm text-muted-foreground">{sessionContent.actionStep}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
