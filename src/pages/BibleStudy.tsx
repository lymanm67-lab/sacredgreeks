import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, Search, Book, BookOpen, Calendar, ArrowLeft, ExternalLink, Loader2, Sparkles, Bookmark, BookmarkCheck, FlaskConical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ExternalContentModal } from '@/components/ui/ExternalContentModal';
import { useExternalLinks } from '@/hooks/use-external-links';
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh';
import { PullToRefreshIndicator } from '@/components/ui/PullToRefreshIndicator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useSavedBibleSearches } from '@/hooks/use-saved-bible-searches';
import { SavedSearchesList } from '@/components/bible-study/SavedSearchesList';
import { useAutoCompleteChallenge } from '@/hooks/use-auto-complete-challenge';
import { VoiceInputButton } from '@/components/VoiceInputButton';
import { ListenButton } from '@/components/ListenButton';
import { PremiumGate } from '@/components/PremiumGate';
import { useDemoMode } from '@/contexts/DemoModeContext';

// Demo data for Bible Study
const DEMO_DAILY_VERSE = {
  reference: 'Philippians 4:13',
  text: 'I can do all things through Christ which strengtheneth me.',
  translation_name: 'King James Version'
};

const DEMO_SAVED_SEARCHES = [
  {
    id: 'demo-1',
    search_query: 'love one another',
    search_type: 'ai',
    results_json: [
      { reference: 'John 13:34', text: 'A new commandment I give unto you, That ye love one another; as I have loved you, that ye also love one another.' },
      { reference: '1 John 4:7', text: 'Beloved, let us love one another: for love is of God; and every one that loveth is born of God, and knoweth God.' }
    ],
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'demo-2',
    search_query: 'Romans 8:28',
    search_type: 'reference',
    results_json: [
      { reference: 'Romans 8:28', text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.', translation: 'King James Version' }
    ],
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'demo-3',
    search_query: 'strength',
    search_type: 'phrase',
    results_json: [
      { ref: 'Isaiah 41:10', text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.' },
      { ref: 'Philippians 4:13', text: 'I can do all things through Christ which strengtheneth me.' }
    ],
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const readingPlans = [
  {
    title: "30-Day Faith Foundation",
    description: "Build a strong foundation in Christian faith and Greek life integration",
    duration: "30 days",
    verses: [
      "Romans 12:1-2", "Philippians 2:1-11", "1 Corinthians 13:1-13", "Galatians 5:22-26",
      "Ephesians 4:1-6", "Colossians 3:12-17", "James 1:22-27", "1 Peter 2:9-12"
    ]
  },
  {
    title: "Leadership in Greek Life",
    description: "Biblical principles for servant leadership in your chapter",
    duration: "14 days",
    verses: [
      "Mark 10:42-45", "John 13:1-17", "1 Timothy 3:1-7", "Titus 1:5-9",
      "1 Peter 5:1-4", "Proverbs 11:14", "Proverbs 16:18-19"
    ]
  },
  {
    title: "P.R.O.O.F. Deep Dive",
    description: "Explore the P.R.O.O.F. framework through Scripture",
    duration: "21 days",
    verses: [
      "Matthew 5-7", "Romans 8:1-17", "Galatians 5:16-26", "Ephesians 4:17-32",
      "Philippians 4:4-9", "Colossians 3:1-17", "1 John 1:5-10"
    ]
  }
];

// Topic content organized by category
const topicContent = {
  'greek-life': [
    // Biblical Brotherhood & Sisterhood
    { ref: 'Proverbs 27:17', text: 'Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.', theme: 'Biblical Brotherhood & Sisterhood' },
    { ref: 'Ecclesiastes 4:9-10', text: 'Two are better than one; because they have a good reward for their labour. For if they fall, the one will lift up his fellow.', theme: 'Biblical Brotherhood & Sisterhood' },
    { ref: 'Romans 12:10', text: 'Be kindly affectioned one to another with brotherly love; in honour preferring one another.', theme: 'Biblical Brotherhood & Sisterhood' },
    { ref: '1 Peter 3:8', text: 'Finally, be ye all of one mind, having compassion one of another, love as brethren, be pitiful, be courteous.', theme: 'Biblical Brotherhood & Sisterhood' },
    { ref: 'John 15:12-13', text: 'This is my commandment, That ye love one another, as I have loved you. Greater love hath no man than this, that a man lay down his life for his friends.', theme: 'Biblical Brotherhood & Sisterhood' },
    
    // Classical Symbols in American Institutions
    { ref: 'Acts 17:22-23', text: 'Then Paul stood in the midst of Mars\' hill, and said, Ye men of Athens, I perceive that in all things ye are too superstitious. For as I passed by, and beheld your devotions, I found an altar with this inscription, TO THE UNKNOWN GOD.', theme: 'Classical Symbols in American Institutions' },
    { ref: 'Romans 1:20', text: 'For the invisible things of him from the creation of the world are clearly seen, being understood by the things that are made, even his eternal power and Godhead.', theme: 'Classical Symbols in American Institutions' },
    { ref: '1 Corinthians 10:31', text: 'Whether therefore ye eat, or drink, or whatsoever ye do, do all to the glory of God.', theme: 'Classical Symbols in American Institutions' },
    { ref: 'Colossians 1:16', text: 'For by him were all things created, that are in heaven, and that are in earth, visible and invisible, whether they be thrones, or dominions, or principalities, or powers: all things were created by him, and for him.', theme: 'Classical Symbols in American Institutions' },
    
    // Rituals & Symbols Controversy
    { ref: '1 Corinthians 10:23', text: 'All things are lawful for me, but all things are not expedient: all things are lawful for me, but all things edify not.', theme: 'Rituals & Symbols Controversy' },
    { ref: 'Romans 14:5-6', text: 'One man esteemeth one day above another: another esteemeth every day alike. Let every man be fully persuaded in his own mind.', theme: 'Rituals & Symbols Controversy' },
    { ref: '1 Corinthians 8:4-6', text: 'We know that an idol is nothing in the world, and that there is none other God but one. For though there be that are called gods, whether in heaven or in earth... But to us there is but one God, the Father.', theme: 'Rituals & Symbols Controversy' },
    { ref: 'Colossians 2:16-17', text: 'Let no man therefore judge you in meat, or in drink, or in respect of an holyday, or of the new moon, or of the sabbath days: Which are a shadow of things to come; but the body is of Christ.', theme: 'Rituals & Symbols Controversy' },
    { ref: 'Romans 14:22-23', text: 'Hast thou faith? have it to thyself before God. Happy is he that condemneth not himself in that thing which he alloweth.', theme: 'Rituals & Symbols Controversy' },
    
    // Responding to Greek Life Objections
    { ref: '1 Peter 3:15', text: 'But sanctify the Lord God in your hearts: and be ready always to give an answer to every man that asketh you a reason of the hope that is in you with meekness and fear.', theme: 'Responding to Greek Life Objections' },
    { ref: 'Colossians 4:5-6', text: 'Walk in wisdom toward them that are without, redeeming the time. Let your speech be alway with grace, seasoned with salt, that ye may know how ye ought to answer every man.', theme: 'Responding to Greek Life Objections' },
    { ref: '2 Timothy 2:24-25', text: 'And the servant of the Lord must not strive; but be gentle unto all men, apt to teach, patient, In meekness instructing those that oppose themselves.', theme: 'Responding to Greek Life Objections' },
    { ref: 'Proverbs 15:1', text: 'A soft answer turneth away wrath: but grievous words stir up anger.', theme: 'Responding to Greek Life Objections' },
    { ref: 'Titus 3:2', text: 'To speak evil of no man, to be no brawlers, but gentle, shewing all meekness unto all men.', theme: 'Responding to Greek Life Objections' },
    
    // General Greek Life
    { ref: 'Galatians 6:2', text: 'Bear ye one another\'s burdens, and so fulfil the law of Christ.', theme: 'Service to Others' },
    { ref: 'Hebrews 10:24-25', text: 'And let us consider one another to provoke unto love and to good works: Not forsaking the assembling of ourselves together.', theme: 'Fellowship' },
    { ref: '1 Thessalonians 5:11', text: 'Wherefore comfort yourselves together, and edify one another, even as also ye do.', theme: 'Encouragement' },
    { ref: 'Colossians 3:23', text: 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men.', theme: 'Excellence' },
    { ref: 'Philippians 2:3-4', text: 'Let nothing be done through strife or vainglory; but in lowliness of mind let each esteem other better than themselves. Look not every man on his own things, but every man also on the things of others.', theme: 'Humility in Leadership' }
  ],
  'discernment': [
    { ref: 'James 1:5', text: 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.', theme: 'Seeking Wisdom' },
    { ref: 'Proverbs 3:5-6', text: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.', theme: 'Trusting God\'s Direction' },
    { ref: '1 John 4:1', text: 'Beloved, believe not every spirit, but try the spirits whether they are of God.', theme: 'Testing Truth' },
    { ref: 'Philippians 1:9-10', text: 'And this I pray, that your love may abound yet more and more in knowledge and in all judgment; That ye may approve things that are excellent.', theme: 'Growing in Discernment' },
    { ref: 'Hebrews 5:14', text: 'But strong meat belongeth to them that are of full age, even those who by reason of use have their senses exercised to discern both good and evil.', theme: 'Spiritual Maturity' },
    { ref: 'Proverbs 14:12', text: 'There is a way which seemeth right unto a man, but the end thereof are the ways of death.', theme: 'Avoiding Deception' },
    { ref: 'Romans 12:2', text: 'And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.', theme: 'Renewed Mind' },
    { ref: 'Colossians 2:8', text: 'Beware lest any man spoil you through philosophy and vain deceit, after the tradition of men, after the rudiments of the world, and not after Christ.', theme: 'Guarding Against False Teaching' }
  ],
  'foundation': [
    { ref: 'Matthew 7:24-25', text: 'Therefore whosoever heareth these sayings of mine, and doeth them, I will liken him unto a wise man, which built his house upon a rock: And the rain descended, and the floods came, and the winds blew, and beat upon that house; and it fell not: for it was founded upon a rock.', theme: 'Building on Christ' },
    { ref: '1 Corinthians 3:11', text: 'For other foundation can no man lay than that is laid, which is Jesus Christ.', theme: 'Christ as Foundation' },
    { ref: 'Psalm 11:3', text: 'If the foundations be destroyed, what can the righteous do?', theme: 'Importance of Foundation' },
    { ref: 'Isaiah 28:16', text: 'Therefore thus saith the Lord God, Behold, I lay in Zion for a foundation a stone, a tried stone, a precious corner stone, a sure foundation: he that believeth shall not make haste.', theme: 'The Cornerstone' },
    { ref: 'Ephesians 2:19-20', text: 'Now therefore ye are no more strangers and foreigners, but fellowcitizens with the saints, and of the household of God; And are built upon the foundation of the apostles and prophets, Jesus Christ himself being the chief corner stone.', theme: 'Built on Truth' },
    { ref: '2 Timothy 2:19', text: 'Nevertheless the foundation of God standeth sure, having this seal, The Lord knoweth them that are his.', theme: 'God\'s Firm Foundation' },
    { ref: 'Hebrews 6:1', text: 'Therefore leaving the principles of the doctrine of Christ, let us go on unto perfection.', theme: 'Growing from the Foundation' },
    { ref: 'Colossians 2:6-7', text: 'As ye have therefore received Christ Jesus the Lord, so walk ye in him: Rooted and built up in him, and stablished in the faith.', theme: 'Rooted in Christ' }
  ],
  'purpose': [
    { ref: 'Jeremiah 29:11', text: 'For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.', theme: 'God\'s Plan for You' },
    { ref: 'Ephesians 2:10', text: 'For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them.', theme: 'Created for Good Works' },
    { ref: 'Romans 8:28', text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.', theme: 'Called According to Purpose' },
    { ref: 'Proverbs 19:21', text: 'There are many devices in a man\'s heart; nevertheless the counsel of the Lord, that shall stand.', theme: 'God\'s Purpose Prevails' },
    { ref: 'Psalm 138:8', text: 'The Lord will perfect that which concerneth me: thy mercy, O Lord, endureth for ever.', theme: 'God Completes His Work' },
    { ref: 'Philippians 2:13', text: 'For it is God which worketh in you both to will and to do of his good pleasure.', theme: 'God Works in You' },
    { ref: 'Isaiah 46:10', text: 'Declaring the end from the beginning, and from ancient times the things that are not yet done, saying, My counsel shall stand, and I will do all my pleasure.', theme: 'God\'s Sovereign Plan' },
    { ref: '1 Peter 2:9', text: 'But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light.', theme: 'Chosen for a Purpose' }
  ]
};

type TopicKey = 'all' | 'greek-life' | 'discernment' | 'foundation' | 'purpose';

const BibleStudy = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { openExternalLink } = useExternalLinks();
  const { completeChallenge } = useAutoCompleteChallenge();
  const { isDemoMode } = useDemoMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [dailyVerse, setDailyVerse] = useState<any>(null);
  const [loadingVerse, setLoadingVerse] = useState(true);
  const [searchMode, setSearchMode] = useState<'reference' | 'phrase' | 'ai'>('reference');
  const [phraseResults, setPhraseResults] = useState<any[]>([]);
  const [aiResults, setAiResults] = useState<any[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<TopicKey>('all');
  const { savedSearches, loading: savedLoading, saveSearch, deleteSearch, isSearchSaved } = useSavedBibleSearches();

  // Get topic content based on selection
  const getTopicVerses = () => {
    if (selectedTopic === 'all') {
      return [
        ...topicContent['greek-life'],
        ...topicContent['discernment'],
        ...topicContent['foundation'],
        ...topicContent['purpose']
      ];
    }
    return topicContent[selectedTopic] || [];
  };

  // Use demo data when demo mode is enabled
  const displayVerse = isDemoMode ? DEMO_DAILY_VERSE : dailyVerse;
  const displaySavedSearches = isDemoMode ? DEMO_SAVED_SEARCHES : (savedSearches.length > 0 ? savedSearches : DEMO_SAVED_SEARCHES);
  const isShowingDemoSearches = isDemoMode || savedSearches.length === 0;

  // Pull to refresh
  const handleRefresh = async () => {
    await fetchDailyVerse();
    toast({
      title: 'Bible Study refreshed',
      description: 'Daily verse updated',
    });
  };

  const { isPulling, isRefreshing, pullDistance, canRefresh } = usePullToRefresh({
    onRefresh: handleRefresh
  });

  // Fetch daily verse on component mount
  useEffect(() => {
    fetchDailyVerse();
  }, []);

  const fetchDailyVerse = async () => {
    setLoadingVerse(true);
    try {
      // Use a curated list of popular verses
      const popularVerses = [
        'john 3:16', 'romans 8:28', 'philippians 4:13', 'psalm 23:1-6',
        'proverbs 3:5-6', 'jeremiah 29:11', 'matthew 6:33', 'isaiah 41:10',
        'romans 12:2', 'joshua 1:9', '2 timothy 1:7', 'psalm 46:1'
      ];
      
      // Get a verse based on the day of year for consistency
      const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
      const verseIndex = dayOfYear % popularVerses.length;
      const selectedVerse = popularVerses[verseIndex];
      
      const response = await fetch(`https://bible-api.com/${selectedVerse}?translation=kjv`);
      if (response.ok) {
        const data = await response.json();
        setDailyVerse(data);
      }
    } catch (error) {
      console.error('Error fetching daily verse:', error);
      toast({
        title: 'Error loading daily verse',
        description: 'Please try again later',
        variant: 'destructive'
      });
    } finally {
      setLoadingVerse(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    
    if (searchMode === 'ai') {
      // AI-powered search
      try {
        const { data, error } = await supabase.functions.invoke('bible-verse-ai-search', {
          body: { query: searchQuery }
        });

        if (error) {
          console.error('AI search error:', error);
          toast({
            title: 'AI search failed',
            description: 'Please try again or use reference/keyword search',
            variant: 'destructive'
          });
          setAiResults([]);
        } else if (data?.verses && data.verses.length > 0) {
          setAiResults(data.verses);
          setSearchResults(null);
          setPhraseResults([]);
          
          // Auto-complete Bible study challenge
          await completeChallenge('bible_study');
        } else {
          toast({
            title: 'No verses found',
            description: 'Try rephrasing your search or use reference/keyword search',
            variant: 'destructive'
          });
          setAiResults([]);
        }
      } catch (error) {
        console.error('AI search error:', error);
        toast({
          title: 'AI search failed',
          description: 'Please try again later',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    } else if (searchMode === 'reference') {
      try {
        // Bible API format: book chapter:verse or book chapter
        const response = await fetch(`https://bible-api.com/${encodeURIComponent(searchQuery)}?translation=kjv`);
        
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
          setPhraseResults([]);
          
          // Auto-complete Bible study challenge
          await completeChallenge('bible_study');
        } else {
          toast({
            title: 'Verse not found',
            description: 'Try searching for a verse like "John 3:16" or "Psalm 23"',
            variant: 'destructive'
          });
          setSearchResults(null);
        }
      } catch (error) {
        toast({
          title: 'Search failed',
          description: 'Please check your connection and try again',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    } else {
      // Phrase search mode - search for keywords in curated verses
      try {
        const keyword = searchQuery.toLowerCase();
        const verseDatabase = [
          { ref: 'John 3:16', text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', keywords: ['love', 'salvation', 'eternal life', 'believe', 'faith'] },
          { ref: 'Romans 8:28', text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.', keywords: ['purpose', 'good', 'faith', 'trust', 'plan'] },
          { ref: 'Philippians 4:13', text: 'I can do all things through Christ which strengtheneth me.', keywords: ['strength', 'power', 'overcome', 'ability', 'faith'] },
          { ref: 'Psalm 23:1', text: 'The Lord is my shepherd; I shall not want.', keywords: ['shepherd', 'provision', 'care', 'trust', 'comfort'] },
          { ref: 'Proverbs 3:5-6', text: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.', keywords: ['trust', 'guidance', 'direction', 'wisdom', 'faith'] },
          { ref: 'Jeremiah 29:11', text: 'For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.', keywords: ['hope', 'future', 'plans', 'peace', 'purpose'] },
          { ref: 'Matthew 6:33', text: 'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.', keywords: ['priority', 'kingdom', 'seek', 'provision', 'faith'] },
          { ref: 'Isaiah 41:10', text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.', keywords: ['fear', 'courage', 'strength', 'help', 'support'] },
          { ref: 'Romans 12:2', text: 'And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.', keywords: ['transformation', 'renew', 'mind', 'change', 'growth'] },
          { ref: 'Joshua 1:9', text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the Lord thy God is with thee whithersoever thou goest.', keywords: ['courage', 'strength', 'fear', 'brave', 'confidence'] },
          { ref: '2 Timothy 1:7', text: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.', keywords: ['fear', 'power', 'love', 'mind', 'courage'] },
          { ref: 'Psalm 46:1', text: 'God is our refuge and strength, a very present help in trouble.', keywords: ['help', 'trouble', 'refuge', 'strength', 'support'] },
          { ref: 'Matthew 11:28', text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.', keywords: ['rest', 'burden', 'tired', 'peace', 'comfort'] },
          { ref: 'Ephesians 2:8-9', text: 'For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.', keywords: ['grace', 'salvation', 'faith', 'saved', 'gift'] },
          { ref: '1 Corinthians 13:4-7', text: 'Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up, Doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil; Rejoiceth not in iniquity, but rejoiceth in the truth; Beareth all things, believeth all things, hopeth all things, endureth all things.', keywords: ['love', 'patient', 'kind', 'relationships', 'charity'] },
          { ref: 'James 1:2-3', text: 'My brethren, count it all joy when ye fall into divers temptations; Knowing this, that the trying of your faith worketh patience.', keywords: ['trials', 'joy', 'patience', 'faith', 'perseverance'] },
          { ref: 'Hebrews 11:1', text: 'Now faith is the substance of things hoped for, the evidence of things not seen.', keywords: ['faith', 'hope', 'belief', 'trust', 'confidence'] },
          { ref: 'Galatians 5:22-23', text: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, Meekness, temperance: against such there is no law.', keywords: ['fruit', 'spirit', 'character', 'virtues', 'growth'] },
          { ref: 'Psalm 119:105', text: 'Thy word is a lamp unto my feet, and a light unto my path.', keywords: ['guidance', 'word', 'direction', 'wisdom', 'light'] },
          { ref: 'Romans 5:8', text: 'But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.', keywords: ['love', 'sacrifice', 'salvation', 'grace', 'mercy'] }
        ];

        const matches = verseDatabase.filter(verse => 
          verse.keywords.some(kw => kw.includes(keyword)) || 
          verse.text.toLowerCase().includes(keyword)
        );

        if (matches.length > 0) {
          setPhraseResults(matches);
          setSearchResults(null);
          
          // Auto-complete Bible study challenge
          await completeChallenge('bible_study');
        } else {
          toast({
            title: 'No verses found',
            description: 'Try different keywords like "love", "strength", "faith", or "peace"',
            variant: 'destructive'
          });
          setPhraseResults([]);
        }
      } catch (error) {
        toast({
          title: 'Search failed',
          description: 'Please try again',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveSearch = async () => {
    if (!searchQuery.trim()) return;
    
    let results: any[] = [];
    if (searchMode === 'ai') {
      results = aiResults;
    } else if (searchMode === 'phrase') {
      results = phraseResults;
    } else if (searchResults) {
      results = [{
        reference: searchResults.reference,
        text: searchResults.text,
        translation: searchResults.translation_name
      }];
    }

    if (results.length > 0) {
      await saveSearch(searchQuery, searchMode, results);
    }
  };

  const handleLoadSearch = (search: any) => {
    setSearchQuery(search.search_query);
    setSearchMode(search.search_type);
    
    if (search.search_type === 'ai') {
      setAiResults(search.results_json);
      setPhraseResults([]);
      setSearchResults(null);
    } else if (search.search_type === 'phrase') {
      setPhraseResults(search.results_json);
      setAiResults([]);
      setSearchResults(null);
    } else {
      setSearchResults(search.results_json[0]);
      setAiResults([]);
      setPhraseResults([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <PullToRefreshIndicator 
        isPulling={isPulling}
        isRefreshing={isRefreshing}
        pullDistance={pullDistance}
        canRefresh={canRefresh}
      />
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <Heart className="w-5 h-5 text-sacred" />
              <span className="font-semibold bg-gradient-to-r from-sacred to-warm-blue bg-clip-text text-transparent">
                Back to Dashboard
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="text-center space-y-2 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sacred/10 mb-4">
              <Book className="w-8 h-8 text-sacred" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sacred to-warm-blue bg-clip-text text-transparent">
              Bible Study
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Search Scripture, explore daily verses, and follow guided reading plans
            </p>
          </div>

          {/* Daily Verse Section */}
          <Card className="border-sacred/20 bg-gradient-to-br from-sacred/5 to-warm-blue/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sacred" />
                <CardTitle>Verse of the Day</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {loadingVerse ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-sacred" />
                </div>
              ) : displayVerse ? (
                <div className="space-y-4">
                  <blockquote className="text-lg italic border-l-4 border-sacred pl-4 py-2">
                    "{displayVerse.text}"
                  </blockquote>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-sacred/10 text-sacred border-sacred/20">
                        {displayVerse.reference}
                      </Badge>
                      {isDemoMode && (
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                          <FlaskConical className="w-3 h-3 mr-1" />
                          Demo
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <ListenButton
                        text={`${displayVerse.reference}. ${displayVerse.text}`}
                        itemId={`bible-daily-verse`}
                        title="Daily Verse"
                        showLabel={false}
                        size="sm"
                        variant="ghost"
                      />
                      {!isDemoMode && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={fetchDailyVerse}
                          className="gap-2"
                        >
                          <Sparkles className="w-4 h-4" />
                          Get Another Verse
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Unable to load daily verse. Please try again.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="topics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-[600px] mx-auto">
              <TabsTrigger value="topics" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Topics
              </TabsTrigger>
              <TabsTrigger value="search" className="gap-2">
                <Search className="w-4 h-4" />
                Search
              </TabsTrigger>
              <TabsTrigger value="saved" className="gap-2">
                <Bookmark className="w-4 h-4" />
                Saved
              </TabsTrigger>
              <TabsTrigger value="plans" className="gap-2">
                <Calendar className="w-4 h-4" />
                Plans
              </TabsTrigger>
            </TabsList>

            {/* Topics Tab */}
            <TabsContent value="topics" className="space-y-6">
              {/* Topic Filter */}
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { key: 'all' as TopicKey, label: 'All' },
                  { key: 'greek-life' as TopicKey, label: 'Greek Life' },
                  { key: 'discernment' as TopicKey, label: 'Discernment' },
                  { key: 'foundation' as TopicKey, label: 'Foundation' },
                  { key: 'purpose' as TopicKey, label: 'Purpose' }
                ].map((topic) => (
                  <Button
                    key={topic.key}
                    variant={selectedTopic === topic.key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTopic(topic.key)}
                    className={selectedTopic === topic.key ? 'bg-sacred hover:bg-sacred/90' : ''}
                  >
                    {topic.label}
                  </Button>
                ))}
              </div>

              {/* Topic Content */}
              <div className="grid gap-4 md:grid-cols-2">
                {getTopicVerses().map((verse, idx) => (
                  <Card key={`${verse.ref}-${idx}`} className="hover:shadow-md transition-shadow border-sacred/20">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <Badge className="bg-sacred/10 text-sacred border-sacred/20">
                          {verse.ref}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {verse.theme}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed italic">
                        "{verse.text}"
                      </p>
                      <div className="mt-3 flex justify-end">
                        <ListenButton
                          text={`${verse.ref}. ${verse.text}`}
                          itemId={`topic-${verse.ref}`}
                          title={verse.ref}
                          showLabel={false}
                          size="sm"
                          variant="ghost"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Scripture Search Tab */}
            <TabsContent value="search" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-sacred" />
                    Search Scripture
                  </CardTitle>
                  <CardDescription>
                    Choose your search method below
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Search Mode Selection */}
                  <RadioGroup value={searchMode} onValueChange={(value: 'reference' | 'phrase' | 'ai') => {
                    setSearchMode(value);
                    setSearchResults(null);
                    setPhraseResults([]);
                    setAiResults([]);
                  }} className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="reference" id="reference" />
                      <Label htmlFor="reference" className="font-medium cursor-pointer">
                        Scripture Reference
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="phrase" id="phrase" />
                      <Label htmlFor="phrase" className="font-medium cursor-pointer">
                        Keyword/Phrase
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ai" id="ai" />
                      <Label htmlFor="ai" className="font-medium cursor-pointer flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        AI Assistant
                      </Label>
                    </div>
                  </RadioGroup>

                  <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="flex-1 flex gap-2">
                      <Input
                        placeholder={
                          searchMode === 'ai' 
                            ? "e.g., breaking one law is like breaking all laws" 
                            : searchMode === 'reference' 
                              ? "e.g., John 3:16 or Romans 8" 
                              : "e.g., love, strength, faith, courage"
                        }
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1"
                      />
                      <VoiceInputButton
                        onTranscript={setSearchQuery}
                        existingText={searchQuery}
                        appendMode={false}
                      />
                    </div>
                    <Button type="submit" disabled={loading} className="bg-sacred hover:bg-sacred/90">
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Search
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Reference Search Results */}
                  {searchResults && searchMode === 'reference' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <Badge className="bg-sacred/10 text-sacred border-sacred/20 text-sm">
                          {searchResults.reference}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <ListenButton
                            text={`${searchResults.reference}. ${searchResults.text || searchResults.verses?.map((v: any) => v.text).join(' ')}`}
                            itemId={`ref-search-result`}
                            title={searchResults.reference}
                            showLabel={true}
                            size="sm"
                            variant="outline"
                          />
                          <span className="text-xs text-muted-foreground">
                            {searchResults.translation_name}
                          </span>
                        </div>
                      </div>
                      <ScrollArea className="h-[400px] rounded-lg border p-4 bg-muted/30">
                        <div className="space-y-4">
                          {searchResults.verses ? (
                            searchResults.verses.map((verse: any, idx: number) => (
                              <p key={idx} className="text-base leading-relaxed">
                                <span className="font-semibold text-sacred mr-2">
                                  {verse.verse}.
                                </span>
                                {verse.text}
                              </p>
                            ))
                          ) : (
                            <p className="text-base leading-relaxed">{searchResults.text}</p>
                          )}
                        </div>
                      </ScrollArea>
                    </div>
                  )}

                  {/* AI Search Results */}
                  {aiResults.length > 0 && searchMode === 'ai' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-sacred/10 text-sacred border-sacred/20 text-sm flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {aiResults.length} AI suggestion{aiResults.length !== 1 ? 's' : ''}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleSaveSearch}
                          disabled={isSearchSaved(searchQuery, searchMode)}
                          className="gap-2"
                        >
                          {isSearchSaved(searchQuery, searchMode) ? (
                            <><BookmarkCheck className="w-4 h-4" /> Saved</>
                          ) : (
                            <><Bookmark className="w-4 h-4" /> Save Search</>
                          )}
                        </Button>
                      </div>
                      <ScrollArea className="h-[500px] space-y-3">
                        {aiResults.map((verse, idx) => (
                            <Card key={idx} className="mb-3 hover:shadow-md transition-shadow border-sacred/20">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <Badge className="w-fit bg-sacred/10 text-sacred border-sacred/20">
                                  {verse.reference}
                                </Badge>
                                <ListenButton
                                  text={`${verse.reference}. ${verse.text}`}
                                  itemId={`ai-verse-${idx}`}
                                  title={verse.reference}
                                  showLabel={false}
                                  size="sm"
                                  variant="ghost"
                                />
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm leading-relaxed mb-2">{verse.text}</p>
                              {verse.keywords && verse.keywords.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-3">
                                  {verse.keywords.map((keyword: string, kidx: number) => (
                                    <Badge key={kidx} variant="secondary" className="text-xs">
                                      {keyword}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </ScrollArea>
                    </div>
                  )}

                  {/* Phrase Search Results */}
                  {phraseResults.length > 0 && searchMode === 'phrase' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-sacred/10 text-sacred border-sacred/20 text-sm">
                          {phraseResults.length} verse{phraseResults.length !== 1 ? 's' : ''} found
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleSaveSearch}
                          disabled={isSearchSaved(searchQuery, searchMode)}
                          className="gap-2"
                        >
                          {isSearchSaved(searchQuery, searchMode) ? (
                            <><BookmarkCheck className="w-4 h-4" /> Saved</>
                          ) : (
                            <><Bookmark className="w-4 h-4" /> Save Search</>
                          )}
                        </Button>
                      </div>
                      <ScrollArea className="h-[500px] space-y-3">
                        {phraseResults.map((verse, idx) => (
                          <Card key={idx} className="mb-3 hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <Badge className="w-fit bg-sacred/10 text-sacred border-sacred/20">
                                  {verse.ref}
                                </Badge>
                                <ListenButton
                                  text={`${verse.ref}. ${verse.text}`}
                                  itemId={`phrase-verse-${idx}`}
                                  title={verse.ref}
                                  showLabel={false}
                                  size="sm"
                                  variant="ghost"
                                />
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm leading-relaxed">{verse.text}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </ScrollArea>
                    </div>
                  )}

                  {!searchResults && !loading && phraseResults.length === 0 && aiResults.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Book className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="mb-2">
                        {searchMode === 'ai'
                          ? 'Describe a verse or concept, even if you don\'t remember the exact wording'
                          : searchMode === 'reference' 
                            ? 'Enter a verse reference to search Scripture' 
                            : 'Enter keywords to find relevant verses'}
                      </p>
                      <p className="text-sm">
                        {searchMode === 'ai'
                          ? 'Examples: "breaking one law is like breaking all", "faith without works", "love your enemies"'
                          : searchMode === 'reference'
                            ? 'Examples: "John 3:16", "Psalm 23", "Romans 8:28"'
                            : 'Examples: "love", "strength", "faith", "courage", "peace"'}
                      </p>
                    </div>
                  )}

                  {/* Quick Access Links */}
                  <div className="pt-4 border-t">
                    <p className="text-sm font-semibold mb-3">External Bible Resources:</p>
                    <div className="grid sm:grid-cols-3 gap-2">
                      <ExternalContentModal
                        url="https://www.biblegateway.com/"
                        title="Bible Gateway"
                        description="Search and read the Bible in multiple translations"
                        trigger={
                          <Button variant="outline" size="sm" className="w-full">
                            <ExternalLink className="w-3 h-3 mr-2" />
                            Bible Gateway
                          </Button>
                        }
                      />
                      <ExternalContentModal
                        url="https://www.bible.com/"
                        title="YouVersion Bible"
                        description="Read the Bible and access reading plans"
                        trigger={
                          <Button variant="outline" size="sm" className="w-full">
                            <ExternalLink className="w-3 h-3 mr-2" />
                            YouVersion
                          </Button>
                        }
                      />
                      <ExternalContentModal
                        url="https://www.blueletterbible.org/"
                        title="Blue Letter Bible"
                        description="Study the Bible with original language tools"
                        trigger={
                          <Button variant="outline" size="sm" className="w-full">
                            <ExternalLink className="w-3 h-3 mr-2" />
                            Blue Letter Bible
                          </Button>
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Saved Searches Tab */}
            <TabsContent value="saved" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="flex items-center gap-2">
                        <Bookmark className="w-5 h-5 text-sacred" />
                        Saved Searches
                      </CardTitle>
                      {isShowingDemoSearches && (
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                          <FlaskConical className="w-3 h-3 mr-1" />
                          Demo
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription>
                    {isShowingDemoSearches 
                      ? 'Sample saved searches - save your own searches to build your collection'
                      : 'Quick access to your previously saved Bible searches'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {savedLoading && !isDemoMode ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-sacred" />
                    </div>
                  ) : (
                    <SavedSearchesList
                      searches={displaySavedSearches}
                      onDelete={isShowingDemoSearches ? () => {} : deleteSearch}
                      onLoadSearch={handleLoadSearch}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reading Plans Tab */}
            <TabsContent value="plans" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {readingPlans.map((plan, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-sacred" />
                        <Badge variant="outline" className="text-xs">
                          {plan.duration}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{plan.title}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold mb-2">Key Passages:</p>
                        <div className="flex flex-wrap gap-1">
                          {plan.verses.slice(0, 4).map((verse, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {verse}
                            </Badge>
                          ))}
                          {plan.verses.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{plan.verses.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button className="w-full bg-sacred hover:bg-sacred/90" size="sm">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Start Reading Plan
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Coming Soon Banner */}
              <Card className="bg-gradient-to-r from-sacred/10 to-warm-blue/10 border-sacred/20">
                <CardContent className="py-6">
                  <div className="text-center space-y-2">
                    <Sparkles className="w-8 h-8 mx-auto text-sacred" />
                    <h3 className="font-semibold text-lg">More Plans Coming Soon</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      We're working on adding more reading plans tailored specifically for Greek life challenges and spiritual growth
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
        </Tabs>
        </div>
      </main>
    </div>
  );
};

export default BibleStudy;
