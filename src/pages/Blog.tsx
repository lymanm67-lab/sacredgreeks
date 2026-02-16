import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, ArrowRight } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  meta_description: string | null;
  seo_title: string | null;
  keywords: string[] | null;
  published_at: string;
  content_type: string;
};

export default function Blog() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_drafts")
        .select("id, title, slug, excerpt, meta_description, seo_title, keywords, published_at, content_type")
        .eq("status", "published")
        .eq("content_type", "blog_post")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  return (
    <>
      <SEOHead
        title="Blog | Sacred Greeks Life - Faith & Greek Life Articles"
        description="Faith-centered articles for Christians in Greek life. Biblical perspectives, spiritual growth guides, and community insights."
        keywords="Sacred Greeks blog, Christian Greek life articles, faith fraternity blog"
        structuredDataType="WebPage"
      />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-3">Sacred Greeks Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Faith-centered articles for Christians navigating Greek life. Biblical perspectives, practical guides, and spiritual growth resources.
            </p>
          </header>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : !posts?.length ? (
            <p className="text-center text-muted-foreground py-16">
              No articles published yet. Check back soon!
            </p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.published_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      {post.excerpt && (
                        <CardDescription className="text-base">{post.excerpt}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 flex-wrap">
                          {post.keywords?.slice(0, 3).map((kw) => (
                            <Badge key={kw} variant="secondary" className="text-xs">
                              {kw}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-primary flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                          Read more <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
