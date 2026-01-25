/**
 * P.R.O.O.F. Framework Data
 * Centralized configuration for the biblical framework addressing Greek life criticisms
 * Includes conscience principles, belief scriptures, and shareable responses
 */

import { 
  Target, 
  Sparkles, 
  Scale, 
  Eye, 
  Building,
  type LucideIcon 
} from 'lucide-react';

export interface ProofItem {
  letter: string;
  title: string;
  description: string;
  color: string;
  gradientColor: string;
  icon: LucideIcon;
  criticism: string;
  criticismExample: string;
  response: string;
  scripture: string;
  scriptureText: string;
  supportingScripture: string;
  supportingText: string;
  examples: {
    myth: string;
    truth: string;
    additionalScripture: string;
  }[];
}

/**
 * Core P.R.O.O.F. Framework Data
 * Each item addresses a specific criticism with biblical responses
 */
export const PROOF_FRAMEWORK_DATA: ProofItem[] = [
  {
    letter: "P",
    title: "Pledge Process",
    description: "How does the intake and pledging process align with biblical values?",
    color: "bg-blue-500",
    gradientColor: "from-blue-500 to-blue-600",
    icon: Target,
    criticism: "Hazing Concerns",
    criticismExample: '"Greeks brutalize new members through hazing rituals that are dangerous and sinful."',
    response: "Biblical mentorship involves testing character, not abusing it. We reject hazing while embracing accountability and growth through godly community.",
    scripture: "Hebrews 10:24-25",
    scriptureText: "And let us consider how to stir up one another to love and good works, not neglecting to meet together...",
    supportingScripture: "Romans 14:5",
    supportingText: "Each one should be fully convinced in his own mind.",
    examples: [
      {
        myth: "Pledging always involves hazing and abuse",
        truth: "True discipleship involves mentorship, not abuse. Jesus tested His disciples through teaching and experience, never through degradation.",
        additionalScripture: "Proverbs 27:17"
      },
      {
        myth: "You must endure suffering to prove loyalty",
        truth: "Loyalty is proven through commitment and character over time, not through inflicted pain. Christ calls us to serve one another in love.",
        additionalScripture: "Galatians 5:13"
      }
    ]
  },
  {
    letter: "R",
    title: "Rituals",
    description: "What rituals are involved and do they honor God?",
    color: "bg-purple-500",
    gradientColor: "from-purple-500 to-purple-600",
    icon: Sparkles,
    criticism: "Demonic Portals",
    criticismExample: '"Greek rituals open demonic portals and invite evil spirits through occult practices."',
    response: "Not all ceremonies are worship. Many rituals focus on history, values, and commitment—like weddings or graduations. We discern based on content, not assumption.",
    scripture: "1 Thessalonians 5:21",
    scriptureText: "Test everything; hold fast what is good.",
    supportingScripture: "Romans 14:14",
    supportingText: "Nothing is unclean in itself, but it is unclean for anyone who thinks it unclean.",
    examples: [
      {
        myth: "All Greek rituals are demonic or occult",
        truth: "Many rituals simply commemorate history and values. Even the early church had ceremonies. We must examine content, not just form.",
        additionalScripture: "1 Corinthians 11:23-26"
      },
      {
        myth: "Candles and robes indicate pagan worship",
        truth: "Candles symbolize light and knowledge in many contexts. Churches use candles, robes, and ceremonies without issue. Context determines meaning.",
        additionalScripture: "Matthew 5:14-16"
      }
    ]
  },
  {
    letter: "O",
    title: "Oaths",
    description: "What oaths and vows are required of members?",
    color: "bg-orange-500",
    gradientColor: "from-orange-500 to-orange-600",
    icon: Scale,
    criticism: "Greek Deity Allegiance",
    criticismExample: '"Using Greek letters means you\'re worshiping Zeus, Apollo, and other pagan gods."',
    response: "Using Greek letters doesn't mean worshiping Greek gods. Paul used Greek language and culture to spread the Gospel without endorsing paganism.",
    scripture: "Acts 17:22-28",
    scriptureText: "For as I passed along and observed the objects of your worship, I found also an altar with this inscription: 'To the unknown god.'...",
    supportingScripture: "1 Corinthians 8:7",
    supportingText: "Not all possess this knowledge. Some, through former association with idols, eat food as really offered to an idol, and their conscience, being weak, is defiled.",
    examples: [
      {
        myth: "Greek letters represent worship of Greek gods",
        truth: "Greek letters are simply an alphabet. Using them is no different from using Roman numerals or Latin phrases. Paul wrote in Greek!",
        additionalScripture: "1 Corinthians 9:22"
      },
      {
        myth: "Oaths violate Jesus' teaching against swearing",
        truth: "Jesus warned against flippant oaths and lying. Solemn commitments made in integrity are different—even God made covenant oaths.",
        additionalScripture: "Hebrews 6:13-17"
      }
    ]
  },
  {
    letter: "O",
    title: "Obscurity",
    description: "What is kept secret and does it conflict with walking in the light?",
    color: "bg-green-500",
    gradientColor: "from-green-500 to-green-600",
    icon: Eye,
    criticism: "Secret Societies",
    criticismExample: '"Greeks are secret societies that hide evil practices from the public. If it\'s good, why hide it?"',
    response: "Privacy is not secrecy. Jesus had inner-circle moments with Peter, James, and John. Private ceremonies can simply mean membership-only experiences.",
    scripture: "Mark 5:37",
    scriptureText: "And he allowed no one to follow him except Peter and James and John the brother of James.",
    supportingScripture: "Romans 14:23",
    supportingText: "Whatever does not proceed from faith is sin.",
    examples: [
      {
        myth: "Secret rituals mean there's something evil to hide",
        truth: "Even Jesus taught some things privately to His disciples. Privacy can protect sacred moments, not hide wickedness.",
        additionalScripture: "Matthew 13:10-11"
      },
      {
        myth: "Christians should have no secrets",
        truth: "The Bible distinguishes between evil done in darkness and wisdom about when and how to share. Not everything private is sinful.",
        additionalScripture: "Proverbs 11:13"
      }
    ]
  },
  {
    letter: "F",
    title: "Founders",
    description: "What is the foundation and history of the organization?",
    color: "bg-red-500",
    gradientColor: "from-red-500 to-red-600",
    icon: Building,
    criticism: "Masonic Connections",
    criticismExample: '"Greek organizations were founded by Freemasons, so they\'re all connected to the Illuminati."',
    response: "An organization's origin doesn't determine its current purpose. Many institutions with complex histories serve godly purposes today. We are new creations in Christ.",
    scripture: "2 Corinthians 5:17",
    scriptureText: "Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come.",
    supportingScripture: "Romans 14:5",
    supportingText: "One person esteems one day as better than another, while another esteems all days alike. Each one should be fully convinced in his own mind.",
    examples: [
      {
        myth: "Founders' beliefs forever define the organization",
        truth: "Many universities, hospitals, and even denominations have evolved beyond their founders' original beliefs. Transformation is biblical.",
        additionalScripture: "Romans 12:2"
      },
      {
        myth: "Any Masonic connection makes the organization evil",
        truth: "Many influential Christians throughout history had Masonic ties. We judge fruit, not ancestry. What does the organization do NOW?",
        additionalScripture: "Matthew 7:16-20"
      }
    ]
  }
];

/**
 * Faith & Belief Scriptures
 * Key scriptures demonstrating that faith is the channel of spiritual effect
 */
export const BELIEF_SCRIPTURES = {
  jesusLimitedByUnbelief: [
    {
      reference: "Mark 6:5-6",
      text: "He could do no mighty work there, except that he laid his hands on a few sick people and healed them. And he marveled because of their unbelief.",
      principle: "Unbelief does not eliminate God's power—it limits its manifestation. Power was present, but access was blocked."
    },
    {
      reference: "Matthew 13:58",
      text: "And he did not do many mighty works there, because of their unbelief.",
      principle: "Jesus' authority was not the issue. Their receptivity through faith was."
    }
  ],
  faithAsChannel: [
    {
      reference: "Hebrews 11:6",
      text: "And without faith it is impossible to please him, for whoever would draw near to God must believe that he exists and that he rewards those who seek him.",
      principle: "Faith is the operating system of the kingdom. No faith means no access."
    },
    {
      reference: "Matthew 9:29",
      text: "According to your faith be it done to you.",
      principle: "Jesus tied outcomes to belief—not His ability, but their faith."
    }
  ],
  beliefAndAuthority: [
    {
      reference: "Romans 14:23",
      text: "For whatever does not proceed from faith is sin.",
      principle: "Acting against belief creates spiritual harm. Acting without belief creates no spiritual effect. Faith gives actions meaning."
    },
    {
      reference: "Colossians 2:20-23",
      text: "Why, as if you were still alive in the world, do you submit to regulations... according to human precepts and teachings?",
      principle: "Rules and spiritual threats lose control when they are not believed and are not rooted in Christ."
    }
  ],
  fearRequiresBelief: [
    {
      reference: "Job 3:25",
      text: "For the thing that I fear comes upon me, and what I dread befalls me.",
      principle: "Fear operates like faith in reverse—it still requires belief. If you do not believe something has authority, it cannot govern you spiritually."
    }
  ]
};

/**
 * Conscience Principle Scriptures
 * Scriptures addressing personal conviction and conscience
 */
export const CONSCIENCE_SCRIPTURES = [
  {
    reference: "Romans 14:14",
    text: "I know and am persuaded in the Lord Jesus that nothing is unclean in itself, but it is unclean for anyone who thinks it unclean.",
    principle: "An action is not inherently sinful in every case, but if a person believes it is wrong and does it anyway, it becomes sin for them."
  },
  {
    reference: "Romans 14:23",
    text: "But whoever has doubts is condemned if he eats, because the eating is not from faith. For whatever does not proceed from faith is sin.",
    principle: "Acting against your conscience is sinful, even if the action itself is permissible for others."
  },
  {
    reference: "Romans 14:5",
    text: "One person esteems one day as better than another, while another esteems all days alike. Each one should be fully convinced in his own mind.",
    principle: "God allows believers to hold different convictions on secondary matters, as long as they are settled in faith."
  },
  {
    reference: "1 Corinthians 8:7",
    text: "However, not all possess this knowledge. But some, through former association with idols, eat food as really offered to an idol, and their conscience, being weak, is defiled.",
    principle: "Something permissible for one believer may be spiritually harmful to another based on their conscience."
  }
];

/**
 * Helper to generate shareable text for a PROOF item
 */
export function generateShareableText(item: ProofItem): string {
  return `P.R.O.O.F. Framework - ${item.letter}: ${item.title}

Common Criticism: ${item.criticism}
${item.criticismExample}

Biblical Response:
${item.response}

📖 ${item.scripture}
"${item.scriptureText}"

🙏 Conscience Principle (${item.supportingScripture}):
"${item.supportingText}"

Learn more at Sacred Greeks`;
}
