import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BASE_URL = "https://sacredgreeks.lovable.app";
const FEED_TITLE = "Sacred Greeks Life Blog";
const FEED_DESC = "Faith-centered content for Christians in Greek life — Biblical wisdom for fraternity and sorority members in the Divine Nine and beyond.";
const PODCAST_RSS = "https://sacredgreeks.jellypod.com/rss";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

serve(async () => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: posts } = await supabase
      .from("content_drafts")
      .select("title, slug, excerpt, meta_description, keywords, published_at, content")
      .eq("status", "published")
      .eq("content_type", "blog_post")
      .order("published_at", { ascending: false })
      .limit(50);

    const now = new Date().toUTCString();

    const items = (posts || []).map((post) => {
      const pubDate = post.published_at
        ? new Date(post.published_at).toUTCString()
        : now;
      const description = post.excerpt || post.meta_description || "";
      const categories = (post.keywords || [])
        .map((k: string) => `      <category>${escapeXml(k)}</category>`)
        .join("\n");

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(description)}</description>
${categories}
    </item>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${BASE_URL}/blog</link>
    <description>${escapeXml(FEED_DESC)}</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <atom:link href="${PODCAST_RSS}" rel="related" title="Sacred Greeks Podcast" type="application/rss+xml"/>
${items.join("\n")}
  </channel>
</rss>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=1800",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e) {
    console.error("rss error:", e);
    return new Response("Error generating RSS feed", { status: 500 });
  }
});
