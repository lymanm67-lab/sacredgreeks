import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalContentModal } from '@/components/ui/ExternalContentModal';
import { Heart, BookOpen, AlertTriangle, Wrench, Star, Church, ArrowLeft, Search, Bookmark, BookmarkCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useArticleBookmarks } from '@/hooks/use-article-bookmarks';
import { cn } from '@/lib/utils';

interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  readTime?: string;
}

const articles: Article[] = [
  // Foundation & Core Questions
  {
    id: '1',
    title: 'Are BGLOs Sinful? A Biblical Response for Christians',
    description: 'Dr. Montgomery\'s foundational article addressing the core question many Christians have about Black Greek Letter Organizations.',
    url: 'https://gamma.app/docs/Are-BGLOs-Sinful-A-Biblical-Response-For-Christians--qj85c0up8fdigh5',
    category: 'foundation',
    readTime: '10 min'
  },
  {
    id: '2',
    title: 'Is Being Christian & Greek Incompatible? Time to Set the Record Straight',
    description: 'Addresses compatibility between Christian faith and Greek life membership.',
    url: 'https://gamma.app/docs/Is-Being-Christian-Greek-Incompatible-Time-to-Set-the-Record-Stra-t4agxb757qkugvr',
    category: 'foundation'
  },
  // Addressing Concerns & Controversies
  {
    id: '3',
    title: 'Should Christians Denounce BGLOs? Truth, Trauma, and Theology',
    description: 'Explores whether Christians should denounce BGLOs.',
    url: 'https://gamma.app/docs/Should-Christians-Denounce-BGLOs-Truth-Trauma-and-Theology-un3ueaqjhbjf8y2',
    category: 'concerns',
    readTime: '8 min'
  },
  {
    id: '4',
    title: 'Why Some Call Black Greek Letter Organizations Demonic',
    description: 'Examines claims that BGLOs are demonic.',
    url: 'https://gamma.app/docs/Why-Some-Call-Black-Greek-Letter-Organizations-Demonic-4exmqlq3k79oepv',
    category: 'concerns',
    readTime: '12 min'
  },
  {
    id: '5',
    title: 'Should Christians Take Oaths For Membership Into Greek Letter Organizations?',
    description: 'Biblical perspective on oath-taking.',
    url: 'https://gamma.app/docs/Should-Christians-Take-Oaths-For-Membership-Into-Greek-Letter-Org-y630omdzx2sp7z3',
    category: 'concerns'
  },
  {
    id: '6',
    title: 'Symbolism in BGLO Rituals: Harmless or Spiritual Danger?',
    description: 'Examines symbolism in BGLO rituals.',
    url: 'https://gamma.app/docs/Symbolism-in-BGLO-Rituals-Harmless-or-Spiritual-Danger-nftyg892145844a',
    category: 'concerns'
  },
  // Practical Guides & Resources
  {
    id: '7',
    title: 'Christian Greek Life Study Guide',
    description: 'Comprehensive study guide.',
    url: 'https://gamma.app/docs/Christian-Greek-Life-Study-Guide-ihr8fq0g089n32t',
    category: 'practical'
  },
  {
    id: '8',
    title: 'Christian Greek Life Power Guide',
    description: 'Practical tools and insights.',
    url: 'https://gamma.app/docs/Christian-Greek-Life-Power-Guide-6026roc21m7i8gc',
    category: 'practical'
  },
  {
    id: '9',
    title: 'How to Handle Tensions Within Your Greek Letter Organization',
    description: 'Navigate conflicts and tensions within your chapter while maintaining your Christian witness and values.',
    url: 'https://gamma.app/docs/How-to-Handle-Tensions-Within-Your-Greek-Letter-Organization-hoaqqjovrxsxpve',
    category: 'practical'
  },
  {
    id: '10',
    title: 'How Not to Lose Your Christian Identity After Intake',
    description: 'Maintain your Christian identity and values while fully embracing your new Greek life experience.',
    url: 'https://gamma.app/docs/How-Not-to-Lose-Your-Christian-Identity-After-Intake-6lwq13dmgrs5ney',
    category: 'practical'
  },
  {
    id: '11',
    title: 'CROSS Guide for Greek Life',
    description: 'A comprehensive framework for navigating Greek life with Christian principles and biblical wisdom.',
    url: 'https://gamma.app/docs/CROSS-Guide-for-Greek-Life-ug6sn2qq95613dg',
    category: 'practical'
  },
  {
    id: '12',
    title: 'When Leaving Makes Sense: A Christian\'s Guide to Exiting a Greek Organization',
    description: 'Comprehensive framework for evaluation and decision-making when considering leaving a BGLO.',
    url: 'https://gamma.app/docs/When-Leaving-Makes-Sense-A-Christians-Guide-to-Exiting-a-Greek-Organization',
    category: 'practical'
  },
  // Living It Out
  {
    id: '13',
    title: 'Your Chapter, God\'s Canvas: Living Out Your Faith Authentically',
    description: 'How to live out faith within Greek organizations.',
    url: 'https://gamma.app/docs/Your-Chapter-Gods-Canvas-Living-Out-Your-Faith-Authentically-sgrjn53235fsej2',
    category: 'living'
  },
  {
    id: '14',
    title: 'Why I Did Not Renounce My Fraternity As A Christian',
    description: 'Dr. Montgomery\'s personal perspective.',
    url: 'https://gamma.app/docs/Why-I-Did-Not-Renounce-My-Fraternity-As-A-Christian-ft5vd5wc4gdfmuv',
    category: 'living'
  },
  {
    id: '15',
    title: 'How to Be PILLAR within Your Greek Letter Organization',
    description: 'Discover how to be a strong Christian pillar of support and leadership within your Greek organization.',
    url: 'https://gamma.app/docs/How-to-Be-PILLAR-within-Your-Greek-Letter-Organization-ctdbb60tc09ez0e',
    category: 'living'
  },
  // For Pastors & Church Leaders
  {
    id: '16',
    title: 'Practical Frameworks & Checklists',
    description: 'Guidance on how to sensitively and effectively address common questions and concerns.',
    url: 'https://gamma.app/docs/Practical-Frameworks-Checklists-kvq0rliv8297moo',
    category: 'pastors'
  },
  {
    id: '17',
    title: 'Inclusive Environment Toolkit',
    description: 'Strategies for fostering a welcoming and supportive church atmosphere for all members.',
    url: 'https://gamma.app/docs/Inclusive-Environment-Toolkit-czjmm4li1c9jp0f',
    category: 'pastors'
  },
];

const categories = [
  {
    id: 'foundation',
    title: 'Foundation & Core Questions',
    icon: BookOpen,
    description: 'Explore the foundational biblical perspectives on Black Greek Letter Organizations and tackle the most common questions Christians have about Greek life.',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'concerns',
    title: 'Addressing Concerns & Controversies',
    icon: AlertTriangle,
    description: 'Delve into the challenging topics and controversies surrounding BGLOs, offering thoughtful, biblically-grounded responses to critical issues.',
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 'practical',
    title: 'Practical Guides & Resources',
    icon: Wrench,
    description: 'Equip yourself with practical tools and in-depth resources designed to help you integrate your faith authentically within your Greek experience.',
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'living',
    title: 'Living It Out',
    icon: Star,
    description: 'Discover inspiring insights and personal journeys that demonstrate how to live a Christ-centered life as a member of a Divine Nine organization.',
    gradient: 'from-purple-500 to-violet-600'
  },
  {
    id: 'pastors',
    title: 'For Pastors & Church Leaders',
    icon: Church,
    description: 'Biblical Guidance for Shepherding Divine Nine Members with Wisdom and Grace.',
    gradient: 'from-rose-500 to-pink-600'
  }
];

export default function ArticleLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const { isBookmarked, toggleBookmark, loading: bookmarksLoading } = useArticleBookmarks();

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    const matchesBookmark = !showBookmarksOnly || isBookmarked(article.id);
    return matchesSearch && matchesCategory && matchesBookmark;
  });

  const getArticlesByCategory = (categoryId: string) => {
    return filteredArticles.filter(article => article.category === categoryId);
  };

  const bookmarkedCount = articles.filter(article => isBookmarked(article.id)).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Dashboard</span>
            </Link>
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
              <Heart className="w-5 h-5 text-sacred group-hover:scale-110 transition-transform" />
              <span className="font-semibold bg-gradient-to-r from-sacred to-warm-blue bg-clip-text text-transparent">
                Sacred Greeks
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sacred to-warm-blue bg-clip-text text-transparent">
              Article Library
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Biblical Wisdom for Your Greek Life Journey
            </p>
            <p className="text-muted-foreground max-w-4xl mx-auto">
              Dive deeper into in-depth biblical perspectives on Greek life. Our articles provide profound insights 
              and actionable wisdom for navigating your Divine Nine journey with Christ-centered purpose.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Button
              variant={!selectedCategory && !showBookmarksOnly ? "default" : "outline"}
              onClick={() => {
                setSelectedCategory(null);
                setShowBookmarksOnly(false);
              }}
              className="rounded-full"
            >
              All Articles ({articles.length})
            </Button>
            <Button
              variant={showBookmarksOnly ? "default" : "outline"}
              onClick={() => {
                setShowBookmarksOnly(!showBookmarksOnly);
                setSelectedCategory(null);
              }}
              className="rounded-full"
              disabled={bookmarksLoading}
            >
              <BookmarkCheck className="w-4 h-4 mr-2" />
              Bookmarked ({bookmarkedCount})
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setShowBookmarksOnly(false);
                }}
                className="rounded-full"
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.title.split(' ')[0]}
              </Button>
            ))}
          </div>

          {/* Categories & Articles */}
          <div className="space-y-16">
            {categories.map((category, index) => {
              const categoryArticles = getArticlesByCategory(category.id);
              if (categoryArticles.length === 0 && (selectedCategory === category.id || searchQuery)) return null;

              return (
                <div
                  key={category.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${(index + 3) * 0.1}s` }}
                >
                  {/* Category Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}>
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold">{category.title}</h2>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-lg ml-16">{category.description}</p>
                  </div>

                  {/* Articles Grid */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {categoryArticles.map((article) => {
                      const bookmarked = isBookmarked(article.id);
                      
                      return (
                        <div key={article.id} className="relative">
                          {/* Bookmark Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(article);
                            }}
                            className={cn(
                              "absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200",
                              "hover:scale-110 hover:shadow-lg",
                              bookmarked 
                                ? "bg-primary text-primary-foreground shadow-md" 
                                : "bg-background/80 backdrop-blur-sm text-muted-foreground hover:bg-primary/10"
                            )}
                            aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
                          >
                            {bookmarked ? (
                              <BookmarkCheck className="w-5 h-5" />
                            ) : (
                              <Bookmark className="w-5 h-5" />
                            )}
                          </button>

                          <ExternalContentModal
                            url={article.url}
                            title={article.title}
                            description={article.description}
                            trigger={
                              <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50 h-full">
                                <CardHeader>
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors pr-10">
                                      {article.title}
                                    </CardTitle>
                                    {article.readTime && (
                                      <Badge variant="secondary" className="flex-shrink-0">
                                        {article.readTime}
                                      </Badge>
                                    )}
                                  </div>
                                  <CardDescription className="line-clamp-3">
                                    {article.description}
                                  </CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                                    <span>Read Article</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                  </div>
                                </CardContent>
                              </Card>
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-16 space-y-4">
              {showBookmarksOnly && bookmarkedCount === 0 ? (
                <>
                  <BookmarkCheck className="w-16 h-16 mx-auto text-muted-foreground/50" />
                  <p className="text-xl text-muted-foreground">No bookmarked articles yet</p>
                  <p className="text-muted-foreground">
                    Start bookmarking articles to quickly access your favorites
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setShowBookmarksOnly(false)}
                    className="mt-4"
                  >
                    Browse Articles
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-xl text-muted-foreground">No articles found matching your search.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                      setShowBookmarksOnly(false);
                    }}
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
