import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useExternalLinks } from "@/hooks/use-external-links";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PDFViewer } from "@/components/ui/PDFViewer";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useResourceHistory } from "@/hooks/use-resource-history";
import { useResourceRecommendations } from "@/hooks/use-resource-recommendations";
import { SuggestResourceDialog } from "@/components/resources/SuggestResourceDialog";
import { MediaInquiryForm } from "@/components/resources/MediaInquiryForm";
import { formatDistanceToNow } from "date-fns";
import { 
  BookOpen, 
  Heart, 
  FileText, 
  MessageSquare, 
  Lock, 
  ExternalLink,
  Home,
  Sparkles,
  CheckCircle,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Minimize2,
  Clock,
  Trash2,
  Lightbulb,
  User,
  Mic,
  Mail
} from "lucide-react";

interface ResourceItem {
  title: string;
  description: string;
  url: string;
  icon: any;
  requiresAuth?: boolean;
  badge?: string;
  category: "about" | "book" | "articles" | "testimonials";
  downloadUrl?: string;
  tags?: string[];
}

const resources: ResourceItem[] = [
  // About/Mission Section
  {
    title: "Our Mission",
    description: "Learn about the Sacred Greeks movement and the P.R.O.O.F. framework",
    url: "/about",
    icon: Heart,
    requiresAuth: false,
    category: "about",
    tags: ["About"],
  },
  {
    title: "P.R.O.O.F. Framework",
    description: "Understanding the biblical framework for navigating Greek life",
    url: "/guide",
    icon: Sparkles,
    requiresAuth: true,
    category: "about",
    tags: ["Framework", "About"],
  },
  {
    title: "Dr. Lyman Montgomery Media Kit",
    description: "Speaker bio, credentials, booking information, and media resources for Dr. Lyman Montgomery",
    url: "https://gamma.app/embed/biu8ffusrj97br1",
    icon: User,
    requiresAuth: false,
    badge: "Featured",
    category: "about",
    tags: ["About", "Media"],
  },
  {
    title: "Media Kit for Editors, Event Planners, and Partners",
    description: "Comprehensive media resources, press materials, and partnership information for Sacred Greeks",
    url: "https://gamma.app/embed/bfldg6hc0ymwkly",
    icon: FileText,
    requiresAuth: false,
    category: "about",
    tags: ["About", "Media"],
  },
  {
    title: "Podcast Appearances",
    description: "Listen to Dr. Lyman Montgomery's podcast interviews discussing faith, leadership, and Greek life",
    url: "/podcast-appearances",
    icon: Mic,
    requiresAuth: false,
    badge: "Media",
    category: "about",
    tags: ["Media", "Podcast", "Interviews"],
  },
  {
    title: "Unmasking Hope Documentary",
    description: "Watch the powerful documentary exploring faith, identity, and redemption in Greek life",
    url: "https://www.unmaskinghopethemovie.com/",
    icon: FileText,
    requiresAuth: false,
    badge: "Featured",
    category: "about",
    tags: ["Media", "Documentary", "Film"],
  },
  
  // Book Info Section
  {
    title: "Sacred, Not Sinful",
    description: "Discover the book that started it all - biblical guidance for Greek life",
    url: "https://a.co/d/bf5ipKE",
    icon: BookOpen,
    requiresAuth: false,
    badge: "Featured",
    category: "book",
    tags: ["Book"],
  },
  {
    title: "Book Chapters",
    description: "Explore chapter summaries and key teachings",
    url: "/study",
    icon: FileText,
    requiresAuth: true,
    badge: "Members",
    category: "book",
    tags: ["Book", "Study"],
  },
  
  // Resources/Articles Section
  {
    title: "Articles & Blog",
    description: "Read the latest insights on faith and Greek life",
    url: "/articles",
    icon: FileText,
    requiresAuth: false,
    category: "articles",
    tags: ["Articles"],
  },
  {
    title: "The Focused Driven Life",
    description: "A guide to living with purpose, intention, and spiritual focus in your daily life and Greek organization",
    url: "https://gamma.app/embed/zunnl42jvtz0e8a",
    icon: Sparkles,
    requiresAuth: false,
    category: "articles",
    tags: ["Devotionals", "Leadership"],
  },
  {
    title: "Repentance, Repair & Renewal Checklist",
    description: "A spiritual guide for aligning Greek life with devotion to Christ",
    url: "https://gamma.app/embed/12fobc2w0gro04i",
    icon: CheckCircle,
    requiresAuth: false,
    category: "articles",
    downloadUrl: "/resources/repentance-repair-renewal-checklist.pdf",
    tags: ["Devotionals", "Framework"],
  },
  {
    title: "Integrity Under Pressure Playbook",
    description: "A practical ethics guide for hot moments on campus and in life using the P.R.O.O.F. framework",
    url: "https://gamma.app/embed/752n7nfkgl1wn7w",
    icon: BookOpen,
    requiresAuth: false,
    category: "articles",
    downloadUrl: "/resources/integrity-under-pressure-2.pdf",
    tags: ["Leadership", "Framework"],
  },
  {
    title: "Christian Greek Life Study Guide",
    description: "Comprehensive study guide for integrating Christian faith with Greek life participation",
    url: "https://gamma.app/embed/ihr8fq0g089n32t",
    icon: BookOpen,
    requiresAuth: false,
    badge: "Featured",
    category: "articles",
    tags: ["Study", "Framework"],
  },
  {
    title: "Sacred Comfort: Praying for Greeks in Tough Times",
    description: "How to pray for and walk with fraternity and sorority members during difficult seasons",
    url: "https://gamma.app/embed/ccgepyu7je8fpav",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Service", "Devotionals"],
  },
  {
    title: "Servant Leadership in Greek Life",
    description: "How to run your chapter and service projects like Jesus with biblical principles",
    url: "https://gamma.app/embed/roah3o2oby0g55s",
    icon: Sparkles,
    requiresAuth: false,
    category: "articles",
    tags: ["Leadership", "Service"],
  },
  {
    title: "Sacred Service: Planning Community Projects",
    description: "A guide for planning and executing meaningful community service projects with your chapter",
    url: "https://gamma.app/embed/28f7a9bc5w5jghb",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Service", "Leadership"],
  },
  {
    title: "Robert's Rules of Order in Chapter Meetings",
    description: "A practical guide to running effective and organized chapter meetings using parliamentary procedure",
    url: "https://gamma.app/embed/viytfotsasvx46d",
    icon: FileText,
    requiresAuth: false,
    category: "articles",
    tags: ["Leadership", "Framework"],
  },
  {
    title: "Sacred Conversations: Leading Greeks to Christ",
    description: "Using the Roman Road to share the Gospel with fraternity and sorority members",
    url: "https://gamma.app/embed/ekkmlx5d1615hlv",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Evangelism", "Service"],
  },
  {
    title: "Cultural Reflection Devotional for the Holidays",
    description: "Sacred Greeks devotional for reflecting on culture and faith during the holiday season",
    url: "https://gamma.app/embed/uudch3osmv3ss77",
    icon: Sparkles,
    requiresAuth: false,
    category: "articles",
    tags: ["Devotionals"],
  },
  {
    title: "7-Days to Unshakeable Focus",
    description: "A week-long devotional guide to develop spiritual focus and mental clarity",
    url: "https://gamma.app/embed/3pebfj1ub3rqkue",
    icon: CheckCircle,
    requiresAuth: false,
    category: "articles",
    tags: ["Devotionals"],
  },
  {
    title: "5 Steps to Retain & Engage Your Staff",
    description: "Best practices for retaining chapter staff and staying audit ready with strong leadership",
    url: "https://gamma.app/embed/e7ydcjtrr2ujq0b",
    icon: FileText,
    requiresAuth: false,
    category: "articles",
    tags: ["Leadership"],
  },
  {
    title: "Defending Your Faith and Fraternity",
    description: "How to respond when church leaders challenge your Greek life participation",
    url: "https://gamma.app/embed/um32h0hd55s8c6v",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Apologetics"],
  },
  {
    title: "Are BGLOs Sinful? A Biblical Response",
    description: "A biblical perspective addressing common concerns about Black Greek Letter Organizations",
    url: "https://gamma.app/embed/qj85c0up8fdigh5",
    icon: BookOpen,
    requiresAuth: false,
    category: "articles",
    tags: ["Apologetics"],
  },
  {
    title: "Should Christians Denounce BGLOs?",
    description: "Exploring truth, trauma, and theology in the discussion about Black Greek Letter Organizations",
    url: "https://gamma.app/embed/un3ueaqjhbjf8y2",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Apologetics"],
  },
  {
    title: "Greek Life, Social Justice, And Faith",
    description: "How BGLOs can be Kingdom tools for advancing social justice and faith",
    url: "https://gamma.app/embed/97rakhcw3n90dt0",
    icon: Sparkles,
    requiresAuth: false,
    category: "articles",
    tags: ["Service", "Social Justice"],
  },
  {
    title: "Why I Did Not Renounce My BGLO",
    description: "A personal testimony and pastoral guidance on remaining in Black Greek Letter Organizations as a Christian",
    url: "https://gamma.app/embed/ft5vd5wc4gdfmuv",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Testimonials", "Apologetics"],
  },
  {
    title: "How Not to Lose Your Christian Identity After Intake",
    description: "Practical guidance for maintaining your faith and Christian identity throughout the intake process",
    url: "https://gamma.app/embed/6lwq13dmgrs5ney",
    icon: CheckCircle,
    requiresAuth: false,
    category: "articles",
    tags: ["New Members", "Framework"],
  },
  {
    title: "When Leaving Makes Sense",
    description: "A Christian's guide to exiting a Greek organization gracefully without destroying relationships",
    url: "https://gamma.app/embed/cyi9l2rq808g6r6",
    icon: FileText,
    requiresAuth: false,
    category: "articles",
    tags: ["Transition", "Framework"],
  },
  {
    title: "How to Leave Without Burning Bridges Checklist",
    description: "Practical checklist for leaving your Greek organization while preserving brotherhood and sisterhood bonds",
    url: "https://gamma.app/embed/p2gg3fi0f1bw4tr",
    icon: CheckCircle,
    requiresAuth: false,
    category: "articles",
    tags: ["Transition", "Framework"],
  },
  {
    title: "Symbolism in BGLO Rituals: Harmless or Spiritual Danger?",
    description: "A guide for Christians and church leaders examining symbolism in Black Greek rituals",
    url: "https://gamma.app/embed/nftyg892145844a",
    icon: BookOpen,
    requiresAuth: false,
    category: "articles",
    tags: ["Apologetics"],
  },
  {
    title: "Should Members Take Oaths For BGLOs?",
    description: "Christian guidance on taking oaths for Black Greek Letter Organizations",
    url: "https://gamma.app/embed/y630omdzx2sp7z3",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Apologetics", "Framework"],
  },
  {
    title: "Dr. Lyman A. Montgomery Signature Greek Life Series",
    description: "Comprehensive teaching series on integrating Christian faith with Greek life participation",
    url: "https://gamma.app/embed/hfn73itjrx2l4wx",
    icon: BookOpen,
    requiresAuth: false,
    badge: "Featured",
    category: "articles",
    tags: ["Study", "Framework"],
  },
  {
    title: "Practical Frameworks & Checklists",
    description: "Essential frameworks and checklists for navigating Greek life as a Christian",
    url: "https://gamma.app/embed/kvq0rliv8297moo",
    icon: CheckCircle,
    requiresAuth: false,
    category: "articles",
    tags: ["Framework"],
  },
  {
    title: "CROSS Guide for Greek Life",
    description: "Comprehensive guide using the CROSS framework for Christian Greek life participation",
    url: "https://gamma.app/embed/ug6sn2qq95613dg",
    icon: Sparkles,
    requiresAuth: false,
    category: "articles",
    tags: ["Framework", "Study"],
  },
  {
    title: "How to Be P.I.L.L.A.R. within Your Greek Organization",
    description: "Framework for being a pillar of faith and leadership within your Greek letter organization",
    url: "https://gamma.app/embed/ctdbb60tc09ez0e",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Leadership", "Framework"],
  },
  {
    title: "How to Handle Tensions Within Your Greek Organization",
    description: "Practical guidance for navigating and resolving conflicts within your Greek letter organization",
    url: "https://gamma.app/embed/hoaqqjovrxsxpve",
    icon: FileText,
    requiresAuth: false,
    category: "articles",
    tags: ["Conflict Resolution", "Leadership"],
  },
  {
    title: "Christian BGLO Redemption Guide",
    description: "A simple guide to repentance, repair, and renewal for Christians in Black Greek Letter Organizations",
    url: "https://gamma.app/embed/6bfy5y35wg4bezt",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Devotionals", "Framework"],
  },
  {
    title: "Inclusive Environment Toolkit",
    description: "Tools and strategies for creating inclusive and welcoming environments within Greek organizations",
    url: "https://gamma.app/embed/czjmm4li1c9jp0f",
    icon: Sparkles,
    requiresAuth: false,
    category: "articles",
    tags: ["Leadership", "Service"],
  },
  {
    title: "Redeemed Greeks",
    description: "A vision for redemption and renewal within Greek letter organizations through Christ",
    url: "https://gamma.app/embed/l28kd2r827ynm99",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Devotionals", "Vision"],
  },
  {
    title: "Why Some Call BGLOs Demonic",
    description: "Understanding and addressing concerns about spiritual warfare claims regarding Black Greek Letter Organizations",
    url: "https://gamma.app/embed/4exmqlq3k79oepv",
    icon: BookOpen,
    requiresAuth: false,
    category: "articles",
    tags: ["Apologetics"],
  },
  {
    title: "Is Being Christian & Greek 'Incompatible'?",
    description: "Setting the record straight on the compatibility of Christian faith and Greek life participation",
    url: "https://gamma.app/embed/t4agxb757qkugvr",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Apologetics"],
  },
  {
    title: "Your Chapter, God's Canvas",
    description: "Living out your faith authentically within your Greek letter organization",
    url: "https://gamma.app/embed/sgrjn53235fsej2",
    icon: Sparkles,
    requiresAuth: false,
    category: "articles",
    tags: ["Leadership", "Vision"],
  },
  {
    title: "Redeem Your Letters",
    description: "A powerful message about redeeming your Greek letters and bringing glory to God through your organization",
    url: "https://gamma.app/embed/trkhw9krqh3l4cs",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Vision", "Devotionals"],
  },
  {
    title: "Christian Greek Life Power Guide",
    description: "Comprehensive power guide for navigating Greek life as a committed Christian",
    url: "https://gamma.app/embed/6026roc21m7i8gc",
    icon: BookOpen,
    requiresAuth: false,
    badge: "Featured",
    category: "articles",
    tags: ["Framework", "Study"],
  },
  {
    title: "Integrity Under Pressure Playbook",
    description: "A practical ethics guide for hot moments on campus and in life using the P.R.O.O.F. framework",
    url: "https://gamma.app/embed/752n7nfkgl1wn7w",
    icon: BookOpen,
    requiresAuth: false,
    category: "articles",
    downloadUrl: "/resources/integrity-under-pressure-2.pdf",
    tags: ["Leadership", "Framework"],
  },
  {
    title: "Christian Greek Life Study Guide",
    description: "Comprehensive study guide for integrating Christian faith with Greek life participation",
    url: "https://gamma.app/embed/ihr8fq0g089n32t",
    icon: BookOpen,
    requiresAuth: false,
    badge: "Featured",
    category: "articles",
    tags: ["Study", "Framework"],
  },
  {
    title: "Sacred Comfort: Praying for Greeks in Tough Times",
    description: "How to pray for and walk with fraternity and sorority members during difficult seasons",
    url: "https://gamma.app/embed/ccgepyu7je8fpav",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Service", "Devotionals"],
  },
  {
    title: "Servant Leadership in Greek Life",
    description: "How to run your chapter and service projects like Jesus with biblical principles",
    url: "https://gamma.app/embed/roah3o2oby0g55s",
    icon: Sparkles,
    requiresAuth: false,
    category: "articles",
    tags: ["Leadership", "Service"],
  },
  {
    title: "Sacred Service: Planning Community Projects",
    description: "A guide for planning and executing meaningful community service projects with your chapter",
    url: "https://gamma.app/embed/28f7a9bc5w5jghb",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Service", "Leadership"],
  },
  {
    title: "Robert's Rules of Order in Chapter Meetings",
    description: "A practical guide to running effective and organized chapter meetings using parliamentary procedure",
    url: "https://gamma.app/embed/viytfotsasvx46d",
    icon: FileText,
    requiresAuth: false,
    category: "articles",
    tags: ["Leadership", "Framework"],
  },
  {
    title: "Sacred Conversations: Leading Greeks to Christ",
    description: "Using the Roman Road to share the Gospel with fraternity and sorority members",
    url: "https://gamma.app/embed/ekkmlx5d1615hlv",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Evangelism", "Service"],
  },
  {
    title: "Cultural Reflection Devotional for the Holidays",
    description: "Sacred Greeks devotional for reflecting on culture and faith during the holiday season",
    url: "https://gamma.app/embed/uudch3osmv3ss77",
    icon: Sparkles,
    requiresAuth: false,
    category: "articles",
    tags: ["Devotionals"],
  },
  {
    title: "7-Days to Unshakeable Focus",
    description: "A week-long devotional guide to develop spiritual focus and mental clarity",
    url: "https://gamma.app/embed/3pebfj1ub3rqkue",
    icon: CheckCircle,
    requiresAuth: false,
    category: "articles",
    tags: ["Devotionals"],
  },
  {
    title: "5 Steps to Retain & Engage Your Staff",
    description: "Best practices for retaining chapter staff and staying audit ready with strong leadership",
    url: "https://gamma.app/embed/e7ydcjtrr2ujq0b",
    icon: FileText,
    requiresAuth: false,
    category: "articles",
    tags: ["Leadership"],
  },
  {
    title: "Defending Your Faith and Fraternity",
    description: "How to respond when church leaders challenge your Greek life participation",
    url: "https://gamma.app/embed/um32h0hd55s8c6v",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Apologetics"],
  },
  {
    title: "Are BGLOs Sinful? A Biblical Response",
    description: "A biblical perspective addressing common concerns about Black Greek Letter Organizations",
    url: "https://gamma.app/embed/qj85c0up8fdigh5",
    icon: BookOpen,
    requiresAuth: false,
    category: "articles",
    tags: ["Apologetics"],
  },
  {
    title: "Should Christians Denounce BGLOs?",
    description: "Exploring truth, trauma, and theology in the discussion about Black Greek Letter Organizations",
    url: "https://gamma.app/embed/un3ueaqjhbjf8y2",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Apologetics"],
  },
  {
    title: "Greek Life, Social Justice, And Faith",
    description: "How BGLOs can be Kingdom tools for advancing social justice and faith",
    url: "https://gamma.app/embed/97rakhcw3n90dt0",
    icon: Sparkles,
    requiresAuth: false,
    category: "articles",
    tags: ["Service", "Social Justice"],
  },
  {
    title: "Why I Did Not Renounce My BGLO",
    description: "A personal testimony and pastoral guidance on remaining in Black Greek Letter Organizations as a Christian",
    url: "https://gamma.app/embed/ft5vd5wc4gdfmuv",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Testimonials", "Apologetics"],
  },
  {
    title: "How Not to Lose Your Christian Identity After Intake",
    description: "Practical guidance for maintaining your faith and Christian identity throughout the intake process",
    url: "https://gamma.app/embed/6lwq13dmgrs5ney",
    icon: CheckCircle,
    requiresAuth: false,
    category: "articles",
    tags: ["New Members", "Framework"],
  },
  {
    title: "When Leaving Makes Sense",
    description: "A Christian's guide to exiting a Greek organization gracefully without destroying relationships",
    url: "https://gamma.app/embed/cyi9l2rq808g6r6",
    icon: FileText,
    requiresAuth: false,
    category: "articles",
    tags: ["Transition", "Framework"],
  },
  {
    title: "How to Leave Without Burning Bridges Checklist",
    description: "Practical checklist for leaving your Greek organization while preserving brotherhood and sisterhood bonds",
    url: "https://gamma.app/embed/p2gg3fi0f1bw4tr",
    icon: CheckCircle,
    requiresAuth: false,
    category: "articles",
    tags: ["Transition", "Framework"],
  },
  {
    title: "Symbolism in BGLO Rituals: Harmless or Spiritual Danger?",
    description: "A guide for Christians and church leaders examining symbolism in Black Greek rituals",
    url: "https://gamma.app/embed/nftyg892145844a",
    icon: BookOpen,
    requiresAuth: false,
    category: "articles",
    tags: ["Apologetics"],
  },
  {
    title: "Should Members Take Oaths For BGLOs?",
    description: "Christian guidance on taking oaths for Black Greek Letter Organizations",
    url: "https://gamma.app/embed/y630omdzx2sp7z3",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Apologetics", "Framework"],
  },
  {
    title: "Dr. Lyman A. Montgomery Signature Greek Life Series",
    description: "Comprehensive teaching series on integrating Christian faith with Greek life participation",
    url: "https://gamma.app/embed/hfn73itjrx2l4wx",
    icon: BookOpen,
    requiresAuth: false,
    badge: "Featured",
    category: "articles",
    tags: ["Study", "Framework"],
  },
  {
    title: "Practical Frameworks & Checklists",
    description: "Essential frameworks and checklists for navigating Greek life as a Christian",
    url: "https://gamma.app/embed/kvq0rliv8297moo",
    icon: CheckCircle,
    requiresAuth: false,
    category: "articles",
    tags: ["Framework"],
  },
  {
    title: "CROSS Guide for Greek Life",
    description: "Comprehensive guide using the CROSS framework for Christian Greek life participation",
    url: "https://gamma.app/embed/ug6sn2qq95613dg",
    icon: Sparkles,
    requiresAuth: false,
    category: "articles",
    tags: ["Framework", "Study"],
  },
  {
    title: "How to Be P.I.L.L.A.R. within Your Greek Organization",
    description: "Framework for being a pillar of faith and leadership within your Greek letter organization",
    url: "https://gamma.app/embed/ctdbb60tc09ez0e",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Leadership", "Framework"],
  },
  {
    title: "How to Handle Tensions Within Your Greek Organization",
    description: "Practical guidance for navigating and resolving conflicts within your Greek letter organization",
    url: "https://gamma.app/embed/hoaqqjovrxsxpve",
    icon: FileText,
    requiresAuth: false,
    category: "articles",
    tags: ["Conflict Resolution", "Leadership"],
  },
  {
    title: "Christian BGLO Redemption Guide",
    description: "A simple guide to repentance, repair, and renewal for Christians in Black Greek Letter Organizations",
    url: "https://gamma.app/embed/6bfy5y35wg4bezt",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Devotionals", "Framework"],
  },
  {
    title: "Inclusive Environment Toolkit",
    description: "Tools and strategies for creating inclusive and welcoming environments within Greek organizations",
    url: "https://gamma.app/embed/czjmm4li1c9jp0f",
    icon: Sparkles,
    requiresAuth: false,
    category: "articles",
    tags: ["Leadership", "Service"],
  },
  {
    title: "Redeemed Greeks",
    description: "A vision for redemption and renewal within Greek letter organizations through Christ",
    url: "https://gamma.app/embed/l28kd2r827ynm99",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Devotionals", "Vision"],
  },
  {
    title: "Why Some Call BGLOs Demonic",
    description: "Understanding and addressing concerns about spiritual warfare claims regarding Black Greek Letter Organizations",
    url: "https://gamma.app/embed/4exmqlq3k79oepv",
    icon: BookOpen,
    requiresAuth: false,
    category: "articles",
    tags: ["Apologetics"],
  },
  {
    title: "Is Being Christian & Greek 'Incompatible'?",
    description: "Setting the record straight on the compatibility of Christian faith and Greek life participation",
    url: "https://gamma.app/embed/t4agxb757qkugvr",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Apologetics"],
  },
  {
    title: "Your Chapter, God's Canvas",
    description: "Living out your faith authentically within your Greek letter organization",
    url: "https://gamma.app/embed/sgrjn53235fsej2",
    icon: Sparkles,
    requiresAuth: false,
    category: "articles",
    tags: ["Leadership", "Vision"],
  },
  {
    title: "Redeem Your Letters",
    description: "A powerful message about redeeming your Greek letters and bringing glory to God through your organization",
    url: "https://gamma.app/embed/trkhw9krqh3l4cs",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
    tags: ["Vision", "Devotionals"],
  },
  {
    title: "Christian Greek Life Power Guide",
    description: "Comprehensive power guide for navigating Greek life as a committed Christian",
    url: "https://gamma.app/embed/6026roc21m7i8gc",
    icon: BookOpen,
    requiresAuth: false,
    badge: "Featured",
    category: "articles",
    tags: ["Framework", "Study"],
  },
  {
    title: "FAQs",
    description: "Common questions about faith and Greek organizations",
    url: "/faq",
    icon: MessageSquare,
    requiresAuth: false,
    category: "articles",
    tags: ["FAQ"],
  },
  
  // Testimonials Section
  {
    title: "Success Stories",
    description: "Read how others are integrating faith and Greek life",
    url: "/did-you-know",
    icon: MessageSquare,
    requiresAuth: false,
    category: "testimonials",
    tags: ["Testimonials"],
  },
  {
    title: "P.R.O.O.F. Framework",
    description: "Understanding the biblical framework for navigating Greek life",
    url: "/guide",
    icon: Sparkles,
    requiresAuth: true,
    category: "about",
  },
  
  // Book Info Section
  {
    title: "Sacred, Not Sinful",
    description: "Discover the book that started it all - biblical guidance for Greek life",
    url: "https://a.co/d/bf5ipKE",
    icon: BookOpen,
    requiresAuth: false,
    badge: "Featured",
    category: "book",
  },
  {
    title: "Book Chapters",
    description: "Explore chapter summaries and key teachings",
    url: "/study",
    icon: FileText,
    requiresAuth: true,
    badge: "Members",
    category: "book",
  },
  
  // Resources/Articles Section
  {
    title: "Articles & Blog",
    description: "Read the latest insights on faith and Greek life",
    url: "/articles",
    icon: FileText,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Repentance, Repair & Renewal Checklist",
    description: "A spiritual guide for aligning Greek life with devotion to Christ",
    url: "https://gamma.app/embed/12fobc2w0gro04i",
    icon: CheckCircle,
    requiresAuth: false,
    category: "articles",
    downloadUrl: "/resources/repentance-repair-renewal-checklist.pdf",
  },
  {
    title: "Integrity Under Pressure Playbook",
    description: "A practical ethics guide for hot moments on campus and in life using the P.R.O.O.F. framework",
    url: "https://gamma.app/embed/752n7nfkgl1wn7w",
    icon: BookOpen,
    requiresAuth: false,
    category: "articles",
    downloadUrl: "/resources/integrity-under-pressure-2.pdf",
  },
  {
    title: "Christian Greek Life Study Guide",
    description: "Comprehensive study guide for integrating Christian faith with Greek life participation",
    url: "https://gamma.app/embed/ihr8fq0g089n32t",
    icon: BookOpen,
    requiresAuth: false,
    badge: "Featured",
    category: "articles",
  },
  {
    title: "Sacred Comfort: Praying for Greeks in Tough Times",
    description: "How to pray for and walk with fraternity and sorority members during difficult seasons",
    url: "https://gamma.app/embed/ccgepyu7je8fpav",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Servant Leadership in Greek Life",
    description: "How to run your chapter and service projects like Jesus with biblical principles",
    url: "https://gamma.app/embed/roah3o2oby0g55s",
    icon: Sparkles,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Sacred Service: Planning Community Projects",
    description: "A guide for planning and executing meaningful community service projects with your chapter",
    url: "https://gamma.app/embed/28f7a9bc5w5jghb",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Robert's Rules of Order in Chapter Meetings",
    description: "A practical guide to running effective and organized chapter meetings using parliamentary procedure",
    url: "https://gamma.app/embed/viytfotsasvx46d",
    icon: FileText,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Sacred Conversations: Leading Greeks to Christ",
    description: "Using the Roman Road to share the Gospel with fraternity and sorority members",
    url: "https://gamma.app/embed/ekkmlx5d1615hlv",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Cultural Reflection Devotional for the Holidays",
    description: "Sacred Greeks devotional for reflecting on culture and faith during the holiday season",
    url: "https://gamma.app/embed/uudch3osmv3ss77",
    icon: Sparkles,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "7-Days to Unshakeable Focus",
    description: "A week-long devotional guide to develop spiritual focus and mental clarity",
    url: "https://gamma.app/embed/3pebfj1ub3rqkue",
    icon: CheckCircle,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "5 Steps to Retain & Engage Your Staff",
    description: "Best practices for retaining chapter staff and staying audit ready with strong leadership",
    url: "https://gamma.app/embed/e7ydcjtrr2ujq0b",
    icon: FileText,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Defending Your Faith and Fraternity",
    description: "How to respond when church leaders challenge your Greek life participation",
    url: "https://gamma.app/embed/um32h0hd55s8c6v",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Are BGLOs Sinful? A Biblical Response",
    description: "A biblical perspective addressing common concerns about Black Greek Letter Organizations",
    url: "https://gamma.app/embed/qj85c0up8fdigh5",
    icon: BookOpen,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Should Christians Denounce BGLOs?",
    description: "Exploring truth, trauma, and theology in the discussion about Black Greek Letter Organizations",
    url: "https://gamma.app/embed/un3ueaqjhbjf8y2",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Greek Life, Social Justice, And Faith",
    description: "How BGLOs can be Kingdom tools for advancing social justice and faith",
    url: "https://gamma.app/embed/97rakhcw3n90dt0",
    icon: Sparkles,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Why I Did Not Renounce My BGLO",
    description: "A personal testimony and pastoral guidance on remaining in Black Greek Letter Organizations as a Christian",
    url: "https://gamma.app/embed/ft5vd5wc4gdfmuv",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "How Not to Lose Your Christian Identity After Intake",
    description: "Practical guidance for maintaining your faith and Christian identity throughout the intake process",
    url: "https://gamma.app/embed/6lwq13dmgrs5ney",
    icon: CheckCircle,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "When Leaving Makes Sense",
    description: "A Christian's guide to exiting a Greek organization gracefully without destroying relationships",
    url: "https://gamma.app/embed/cyi9l2rq808g6r6",
    icon: FileText,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "How to Leave Without Burning Bridges Checklist",
    description: "Practical checklist for leaving your Greek organization while preserving brotherhood and sisterhood bonds",
    url: "https://gamma.app/embed/p2gg3fi0f1bw4tr",
    icon: CheckCircle,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Symbolism in BGLO Rituals: Harmless or Spiritual Danger?",
    description: "A guide for Christians and church leaders examining symbolism in Black Greek rituals",
    url: "https://gamma.app/embed/nftyg892145844a",
    icon: BookOpen,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Should Members Take Oaths For BGLOs?",
    description: "Christian guidance on taking oaths for Black Greek Letter Organizations",
    url: "https://gamma.app/embed/y630omdzx2sp7z3",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Dr. Lyman A. Montgomery Signature Greek Life Series",
    description: "Comprehensive teaching series on integrating Christian faith with Greek life participation",
    url: "https://gamma.app/embed/hfn73itjrx2l4wx",
    icon: BookOpen,
    requiresAuth: false,
    badge: "Featured",
    category: "articles",
  },
  {
    title: "Practical Frameworks & Checklists",
    description: "Essential frameworks and checklists for navigating Greek life as a Christian",
    url: "https://gamma.app/embed/kvq0rliv8297moo",
    icon: CheckCircle,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "CROSS Guide for Greek Life",
    description: "Comprehensive guide using the CROSS framework for Christian Greek life participation",
    url: "https://gamma.app/embed/ug6sn2qq95613dg",
    icon: Sparkles,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "How to Be P.I.L.L.A.R. within Your Greek Organization",
    description: "Framework for being a pillar of faith and leadership within your Greek letter organization",
    url: "https://gamma.app/embed/ctdbb60tc09ez0e",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "How to Handle Tensions Within Your Greek Organization",
    description: "Practical guidance for navigating and resolving conflicts within your Greek letter organization",
    url: "https://gamma.app/embed/hoaqqjovrxsxpve",
    icon: FileText,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Christian BGLO Redemption Guide",
    description: "A simple guide to repentance, repair, and renewal for Christians in Black Greek Letter Organizations",
    url: "https://gamma.app/embed/6bfy5y35wg4bezt",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Inclusive Environment Toolkit",
    description: "Tools and strategies for creating inclusive and welcoming environments within Greek organizations",
    url: "https://gamma.app/embed/czjmm4li1c9jp0f",
    icon: Sparkles,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Redeemed Greeks",
    description: "A vision for redemption and renewal within Greek letter organizations through Christ",
    url: "https://gamma.app/embed/l28kd2r827ynm99",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Why Some Call BGLOs Demonic",
    description: "Understanding and addressing concerns about spiritual warfare claims regarding Black Greek Letter Organizations",
    url: "https://gamma.app/embed/4exmqlq3k79oepv",
    icon: BookOpen,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Is Being Christian & Greek 'Incompatible'?",
    description: "Setting the record straight on the compatibility of Christian faith and Greek life participation",
    url: "https://gamma.app/embed/t4agxb757qkugvr",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Your Chapter, God's Canvas",
    description: "Living out your faith authentically within your Greek letter organization",
    url: "https://gamma.app/embed/sgrjn53235fsej2",
    icon: Sparkles,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Redeem Your Letters",
    description: "A powerful message about redeeming your Greek letters and bringing glory to God through your organization",
    url: "https://gamma.app/embed/trkhw9krqh3l4cs",
    icon: Heart,
    requiresAuth: false,
    category: "articles",
  },
  {
    title: "Christian Greek Life Power Guide",
    description: "Comprehensive power guide for navigating Greek life as a committed Christian",
    url: "https://gamma.app/docs/Christian-Greek-Life-Power-Guide-6026roc21m7i8gc",
    icon: BookOpen,
    requiresAuth: false,
    badge: "Featured",
    category: "articles",
  },
  {
    title: "FAQs",
    description: "Common questions about faith and Greek organizations",
    url: "/faq",
    icon: MessageSquare,
    requiresAuth: false,
    category: "articles",
  },
  
  // Testimonials Section
  {
    title: "Success Stories",
    description: "Read how others are integrating faith and Greek life",
    url: "/did-you-know",
    icon: MessageSquare,
    requiresAuth: false,
    category: "testimonials",
  },
];

const Resources = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { openExternalLink } = useExternalLinks();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfTitle, setPdfTitle] = useState<string>("");
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [embedTitle, setEmbedTitle] = useState<string>("");
  const [currentResource, setCurrentResource] = useState<ResourceItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [resourceType, setResourceType] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const { history, addToHistory, clearHistory } = useResourceHistory();
  const { recommendations, isLoading: loadingRecommendations, fetchRecommendations, clearRecommendations } = useResourceRecommendations();
  const itemsPerPage = 18;

  // Available topic tags
  const availableTags = [
    "Leadership",
    "Apologetics",
    "Devotionals",
    "Service",
    "Conflict Resolution",
    "Framework",
    "New Members",
    "Study",
    "Evangelism",
    "Transition",
    "Social Justice",
    "Vision",
    "Testimonials",
  ];

  const handleResourceClick = (resource: ResourceItem) => {
    if (resource.requiresAuth && !user) {
      // Redirect to auth page
      navigate("/auth");
      return;
    }
    
    // Add to viewing history
    addToHistory({
      title: resource.title,
      url: resource.url,
      category: resource.category,
    });
    
    // Check if it's a PDF file
    if (resource.url.endsWith('.pdf')) {
      setPdfUrl(resource.url);
      setPdfTitle(resource.title);
      return;
    }
    
    // Check if it's a Gamma.app embed
    if (resource.url.includes('gamma.app/embed/')) {
      setCurrentResource(resource);
      setEmbedUrl(resource.url);
      setEmbedTitle(resource.title);
      // Fetch AI recommendations
      fetchRecommendations(resource, resources);
      return;
    }
    
    // Check if internal or external link
    if (resource.url.startsWith('http')) {
      // Open all other external links in new tab
      openExternalLink(resource.url);
    } else {
      // Navigate to internal route using React Router
      navigate(resource.url);
    }
  };

  const handleCloseEmbed = () => {
    setEmbedUrl(null);
    setCurrentResource(null);
    clearRecommendations();
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await dialogRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleDownload = (e: React.MouseEvent, downloadUrl: string, title: string) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const ResourceCard = ({ resource }: { resource: ResourceItem }) => {
    const Icon = resource.icon;
    const isLocked = resource.requiresAuth && !user;

    return (
      <Card 
        className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 ${
          isLocked ? "opacity-75" : "hover:border-sacred/50"
        }`}
        onClick={() => handleResourceClick(resource)}
      >
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sacred to-warm-blue flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex gap-2">
              {resource.badge && (
                <Badge className="bg-sacred/10 text-sacred border-sacred/20">
                  {resource.badge}
                </Badge>
              )}
              {isLocked && (
                <Badge variant="outline" className="gap-1">
                  <Lock className="w-3 h-3" />
                  Members
                </Badge>
              )}
            </div>
          </div>
          <CardTitle className="text-lg group-hover:text-sacred transition-colors">
            {resource.title}
          </CardTitle>
        </CardHeader>
      <CardContent>
        <CardDescription className="text-sm leading-relaxed">
          {resource.description}
        </CardDescription>
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {resource.tags.map(tag => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs bg-sacred/5 text-sacred border-sacred/20"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sacred text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            {isLocked ? (
              <>
                <Lock className="w-4 h-4" />
                <span>Sign in to view</span>
              </>
            ) : (
              <>
                <span>View content</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </div>
          {resource.downloadUrl && !isLocked && (
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => handleDownload(e, resource.downloadUrl!, resource.title)}
            >
              <Download className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
      </Card>
    );
  };

  const filterByCategory = (category: string) => {
    return resources.filter(r => r.category === category);
  };

  // Filter and search logic
  const getFilteredResources = (category: string) => {
    let filtered = category === "all" ? resources : filterByCategory(category);
    
    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply resource type filter
    if (resourceType !== "all") {
      filtered = filtered.filter(r => {
        if (resourceType === "pdf") return r.url.endsWith('.pdf') || r.downloadUrl;
        if (resourceType === "presentation") return r.url.includes('gamma.app');
        if (resourceType === "page") return !r.url.startsWith('http');
        return true;
      });
    }
    
    // Apply tag filters
    if (selectedTags.length > 0) {
      filtered = filtered.filter(r => 
        r.tags && selectedTags.some(tag => r.tags!.includes(tag))
      );
    }
    
    return filtered;
  };

  // Pagination logic
  const getPaginatedResources = (filteredResources: ResourceItem[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredResources.slice(startIndex, endIndex);
  };

  const getTotalPages = (filteredResources: ResourceItem[]) => {
    return Math.ceil(filteredResources.length / itemsPerPage);
  };

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleTypeChange = (value: string) => {
    setResourceType(value);
    setCurrentPage(1);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setResourceType("all");
    setSelectedTags([]);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to={user ? "/dashboard" : "/"} 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sacred" />
              <h1 className="text-lg font-semibold text-foreground">Resources Hub</h1>
            </div>
            {!user && (
              <Link to="/auth">
                <Button size="sm" className="bg-sacred hover:bg-sacred/90">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Recently Viewed Section */}
        {history.length > 0 && (
          <Card className="mb-8 animate-fade-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-sacred" />
                  <CardTitle>Recently Viewed</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearHistory}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear History
                </Button>
              </div>
              <CardDescription>Your recently accessed resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {history.slice(0, 6).map((item, index) => {
                  const resource = resources.find(r => r.url === item.url);
                  if (!resource) return null;
                  const Icon = resource.icon;
                  
                  return (
                    <Card
                      key={index}
                      className="cursor-pointer hover:shadow-md transition-all hover:-translate-y-1"
                      onClick={() => handleResourceClick(resource)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 rounded-lg bg-sacred/10 flex items-center justify-center flex-shrink-0">
                                <Icon className="w-4 h-4 text-sacred" />
                              </div>
                              <h4 className="font-semibold text-sm truncate flex-1">{item.title}</h4>
                            </div>
                            <Badge variant="secondary" className="text-xs mb-2">
                              {item.category}
                            </Badge>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(item.viewedAt), { addSuffix: true })}
                            </p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Hero Section */}
        <div className="text-center mb-8 animate-fade-in">
          <Badge className="bg-sacred/10 text-sacred border-sacred/20 mb-4">
            Your Complete Resource Library
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-sacred to-warm-blue bg-clip-text text-transparent">
            Sacred Greeks Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Explore articles, teachings, testimonials, and insights on integrating faith and Greek life
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <MediaInquiryForm />
            <SuggestResourceDialog />
          </div>

          {/* Search and Filter Bar */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search resources by title or description..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
              <Select value={resourceType} onValueChange={handleTypeChange}>
                <SelectTrigger className="w-[200px] bg-background">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="presentation">Presentations</SelectItem>
                  <SelectItem value="pdf">PDFs</SelectItem>
                  <SelectItem value="page">Internal Pages</SelectItem>
                </SelectContent>
              </Select>
              {(searchQuery || resourceType !== "all" || selectedTags.length > 0) && (
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
            
            {/* Topic Tags */}
            <div className="flex flex-wrap gap-2 justify-center">
              {availableTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    selectedTags.includes(tag) 
                      ? "bg-sacred text-white hover:bg-sacred/90" 
                      : "hover:bg-sacred/10 hover:text-sacred hover:border-sacred"
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Tabbed Navigation */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="book">Book</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="testimonials">Stories</TabsTrigger>
          </TabsList>

          {/* All Resources */}
          <TabsContent value="all" className="space-y-8">
            {(() => {
              const filteredResources = getFilteredResources("all");
              const paginatedResources = getPaginatedResources(filteredResources);
              const totalPages = getTotalPages(filteredResources);
              const featuredResources = filteredResources.filter(r => r.badge === "Featured");

              return (
                <>
                  {/* Featured Resources */}
                  {featuredResources.length > 0 && currentPage === 1 && !searchQuery && resourceType === "all" && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-sacred" />
                        Featured Resources
                      </h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredResources.map((resource) => (
                          <ResourceCard key={resource.title} resource={resource} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* All Resources */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">
                        {searchQuery || resourceType !== "all" ? "Search Results" : "All Resources"}
                        <span className="text-sm text-muted-foreground ml-2">
                          ({filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'})
                        </span>
                      </h3>
                    </div>
                    
                    {paginatedResources.length > 0 ? (
                      <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {paginatedResources.map((resource) => (
                            <ResourceCard key={resource.title} resource={resource} />
                          ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                          <div className="flex items-center justify-center gap-4 mt-8">
                            <Button
                              variant="outline"
                              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                              disabled={currentPage === 1}
                            >
                              <ChevronLeft className="w-4 h-4 mr-2" />
                              Previous
                            </Button>
                            <span className="text-sm font-medium">
                              Page {currentPage} of {totalPages}
                            </span>
                            <Button
                              variant="outline"
                              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                              disabled={currentPage === totalPages}
                            >
                              Next
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">No resources found matching your criteria.</p>
                      </div>
                    )}
                  </div>
                </>
              );
            })()}
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            {(() => {
              const filteredResources = getFilteredResources("about");
              const paginatedResources = getPaginatedResources(filteredResources);
              const totalPages = getTotalPages(filteredResources);

              return (
                <>
                  {paginatedResources.length > 0 ? (
                    <>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedResources.map((resource) => (
                          <ResourceCard key={resource.title} resource={resource} />
                        ))}
                      </div>
                      {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-8">
                          <Button
                            variant="outline"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Previous
                          </Button>
                          <span className="text-sm font-medium">
                            Page {currentPage} of {totalPages}
                          </span>
                          <Button
                            variant="outline"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                          >
                            Next
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No resources found.</p>
                    </div>
                  )}
                </>
              );
            })()}
          </TabsContent>

          {/* Book Tab */}
          <TabsContent value="book">
            {(() => {
              const filteredResources = getFilteredResources("book");
              const paginatedResources = getPaginatedResources(filteredResources);
              const totalPages = getTotalPages(filteredResources);

              return (
                <>
                  {paginatedResources.length > 0 ? (
                    <>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedResources.map((resource) => (
                          <ResourceCard key={resource.title} resource={resource} />
                        ))}
                      </div>
                      {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-8">
                          <Button
                            variant="outline"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Previous
                          </Button>
                          <span className="text-sm font-medium">
                            Page {currentPage} of {totalPages}
                          </span>
                          <Button
                            variant="outline"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                          >
                            Next
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No resources found.</p>
                    </div>
                  )}
                </>
              );
            })()}
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles">
            {(() => {
              const filteredResources = getFilteredResources("articles");
              const paginatedResources = getPaginatedResources(filteredResources);
              const totalPages = getTotalPages(filteredResources);

              return (
                <>
                  {paginatedResources.length > 0 ? (
                    <>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedResources.map((resource) => (
                          <ResourceCard key={resource.title} resource={resource} />
                        ))}
                      </div>
                      {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-8">
                          <Button
                            variant="outline"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Previous
                          </Button>
                          <span className="text-sm font-medium">
                            Page {currentPage} of {totalPages}
                          </span>
                          <Button
                            variant="outline"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                          >
                            Next
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No resources found.</p>
                    </div>
                  )}
                </>
              );
            })()}
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            {(() => {
              const filteredResources = getFilteredResources("testimonials");
              const paginatedResources = getPaginatedResources(filteredResources);
              const totalPages = getTotalPages(filteredResources);

              return (
                <>
                  {paginatedResources.length > 0 ? (
                    <>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedResources.map((resource) => (
                          <ResourceCard key={resource.title} resource={resource} />
                        ))}
                      </div>
                      {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-8">
                          <Button
                            variant="outline"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Previous
                          </Button>
                          <span className="text-sm font-medium">
                            Page {currentPage} of {totalPages}
                          </span>
                          <Button
                            variant="outline"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                          >
                            Next
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No resources found.</p>
                    </div>
                  )}
                </>
              );
            })()}
          </TabsContent>
        </Tabs>

        {/* Member CTA */}
        {!user && (
          <Card className="mt-12 bg-gradient-to-br from-sacred/5 to-warm-blue/5 border-sacred/20">
            <CardContent className="p-8 text-center">
              <Lock className="w-12 h-12 text-sacred mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Unlock All Resources</h3>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Create a free account to access premium content, book chapters, and member-exclusive resources
              </p>
              <Link to="/auth">
                <Button size="lg" className="bg-sacred hover:bg-sacred/90">
                  Sign Up Free
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>

      {/* PDF Viewer Modal */}
      <PDFViewer
        isOpen={!!pdfUrl}
        onClose={() => setPdfUrl(null)}
        pdfUrl={pdfUrl || ""}
        title={pdfTitle}
      />

      {/* Gamma Embed Viewer Modal */}
      <Dialog open={!!embedUrl} onOpenChange={handleCloseEmbed}>
        <DialogContent ref={dialogRef} className="p-0 max-w-[98vw] h-[95vh] flex flex-col">
          <DialogHeader className="p-4 border-b bg-card flex-shrink-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold">{embedTitle}</DialogTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFullscreen}
                  title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4 mr-2" />
                  ) : (
                    <Maximize2 className="h-4 w-4 mr-2" />
                  )}
                  {isFullscreen ? 'Exit' : 'Fullscreen'}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(embedUrl?.replace('/embed/', '/docs/'), '_blank')}
                  className="h-8 w-8"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseEmbed}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex flex-1 overflow-hidden">
            {/* Main content area */}
            <div className="flex-1 bg-muted/20">
              {embedUrl && (
                <iframe
                  src={embedUrl}
                  className="w-full h-full border-0"
                  title={embedTitle}
                  allow="fullscreen"
                  allowFullScreen
                />
              )}
            </div>

            {/* AI Recommendations Sidebar */}
            {!isFullscreen && (
              <div className="w-80 border-l bg-card overflow-y-auto flex-shrink-0">
                <div className="p-4 border-b bg-muted/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Lightbulb className="w-5 h-5 text-sacred" />
                    <h3 className="font-semibold">Related Resources</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">AI-powered recommendations</p>
                </div>
                
                <div className="p-4 space-y-3">
                  {loadingRecommendations ? (
                    <>
                      {[1, 2, 3].map((i) => (
                        <Card key={i} className="p-3">
                          <Skeleton className="h-4 w-3/4 mb-2" />
                          <Skeleton className="h-3 w-full mb-1" />
                          <Skeleton className="h-3 w-2/3" />
                        </Card>
                      ))}
                    </>
                  ) : recommendations.length > 0 ? (
                    <>
                      {recommendations.map((rec, index) => {
                        const Icon = rec.icon;
                        return (
                          <Card
                            key={index}
                            className="p-3 cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5 hover:border-sacred/50"
                            onClick={() => {
                              handleCloseEmbed();
                              setTimeout(() => handleResourceClick(rec), 100);
                            }}
                          >
                            <div className="flex items-start gap-2 mb-2">
                              <div className="w-8 h-8 rounded-lg bg-sacred/10 flex items-center justify-center flex-shrink-0">
                                <Icon className="w-4 h-4 text-sacred" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold leading-tight mb-1">{rec.title}</h4>
                                <Badge variant="secondary" className="text-xs">
                                  {rec.category}
                                </Badge>
                              </div>
                            </div>
                            {rec.reason && (
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {rec.reason}
                              </p>
                            )}
                          </Card>
                        );
                      })}
                    </>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No recommendations available</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resources;
