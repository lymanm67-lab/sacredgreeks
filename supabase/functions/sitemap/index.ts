import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BASE_URL = "https://sacredgreekslife.com";

// Static high-priority routes
const STATIC_ROUTES = [
  { path: "/", priority: 1.0, changefreq: "daily" },
  { path: "/blog", priority: 0.9, changefreq: "daily" },
  { path: "/land", priority: 0.9, changefreq: "weekly" },
  { path: "/snapshot", priority: 0.9, changefreq: "weekly" },
  { path: "/proof-framework", priority: 0.8, changefreq: "monthly" },
  { path: "/should-i-leave-my-fraternity", priority: 0.8, changefreq: "monthly" },
  { path: "/is-greek-life-a-sin", priority: 0.8, changefreq: "monthly" },
  { path: "/christian-fraternity-guide", priority: 0.8, changefreq: "monthly" },
  { path: "/divine-nine-spiritual-concerns", priority: 0.8, changefreq: "monthly" },
  { path: "/greek-financial-leadership", priority: 0.7, changefreq: "monthly" },
  { path: "/greek-leadership", priority: 0.7, changefreq: "monthly" },
  { path: "/faith-and-greek-life", priority: 0.7, changefreq: "monthly" },
  { path: "/business-directory", priority: 0.7, changefreq: "weekly" },
  { path: "/partner", priority: 0.7, changefreq: "monthly" },
  { path: "/events", priority: 0.6, changefreq: "weekly" },
  { path: "/healing-stories", priority: 0.6, changefreq: "weekly" },
];

serve(async () => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch all published blog posts
    const { data: posts } = await supabase
      .from("content_drafts")
      .select("slug, published_at, updated_at")
      .eq("status", "published")
      .eq("content_type", "blog_post")
      .order("published_at", { ascending: false });

    const today = new Date().toISOString().split("T")[0];

    // Build static URLs
    const staticUrls = STATIC_ROUTES.map(
      (r) => `  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    );

    // Build blog post URLs
    const blogUrls = (posts || []).map((post) => {
      const lastmod = (post.updated_at || post.published_at || today).split("T")[0];
      return `  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.join("\n")}
${blogUrls.join("\n")}
</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e) {
    console.error("sitemap error:", e);
    return new Response("Error generating sitemap", { status: 500 });
  }
});
