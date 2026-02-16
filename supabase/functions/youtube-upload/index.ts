import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const YOUTUBE_CLIENT_ID = Deno.env.get("YOUTUBE_CLIENT_ID") || "";
const YOUTUBE_CLIENT_SECRET = Deno.env.get("YOUTUBE_CLIENT_SECRET") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

function getSupabaseAdmin() {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
}

function getUserSupabase(authHeader: string) {
  return createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY") || "", {
    global: { headers: { Authorization: authHeader } },
  });
}

async function getUserId(req: Request): Promise<string> {
  const authHeader = req.headers.get("Authorization") || "";
  const supabase = getUserSupabase(authHeader);
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error("Unauthorized");
  return user.id;
}

// Refresh access token using refresh_token
async function refreshAccessToken(refreshToken: string): Promise<{ access_token: string; expires_in: number }> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: YOUTUBE_CLIENT_ID,
      client_secret: YOUTUBE_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error("Token refresh failed:", err);
    throw new Error("Failed to refresh YouTube token. Please reconnect your YouTube account.");
  }
  return res.json();
}

// Get valid access token (refreshing if expired)
async function getValidToken(userId: string): Promise<string> {
  const admin = getSupabaseAdmin();
  const { data: conn, error } = await admin
    .from("youtube_connections")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !conn) throw new Error("YouTube account not connected. Please connect your YouTube channel first.");

  const expiresAt = new Date(conn.token_expires_at);
  if (expiresAt > new Date(Date.now() + 60000)) {
    return conn.access_token;
  }

  // Token expired or about to expire, refresh
  const refreshed = await refreshAccessToken(conn.refresh_token);
  const newExpiry = new Date(Date.now() + refreshed.expires_in * 1000).toISOString();

  await admin.from("youtube_connections").update({
    access_token: refreshed.access_token,
    token_expires_at: newExpiry,
  }).eq("user_id", userId);

  return refreshed.access_token;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { action } = body;

    // ===== GET AUTH URL =====
    if (action === "get_auth_url") {
      const userId = await getUserId(req);
      const redirectUri = body.redirectUri;
      if (!YOUTUBE_CLIENT_ID) throw new Error("YouTube API is not configured");

      const params = new URLSearchParams({
        client_id: YOUTUBE_CLIENT_ID,
        redirect_uri: redirectUri,
        response_type: "code",
        scope: "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly",
        access_type: "offline",
        prompt: "consent",
        state: userId,
      });

      return new Response(
        JSON.stringify({ authUrl: `https://accounts.google.com/o/oauth2/v2/auth?${params}` }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ===== EXCHANGE CODE =====
    if (action === "exchange_code") {
      const userId = await getUserId(req);
      const { code, redirectUri } = body;

      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: YOUTUBE_CLIENT_ID,
          client_secret: YOUTUBE_CLIENT_SECRET,
          code,
          grant_type: "authorization_code",
          redirect_uri: redirectUri,
        }),
      });

      if (!tokenRes.ok) {
        const err = await tokenRes.text();
        console.error("Token exchange failed:", err);
        throw new Error("Failed to connect YouTube account");
      }

      const tokens = await tokenRes.json();

      // Get channel info
      const channelRes = await fetch(
        "https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true",
        { headers: { Authorization: `Bearer ${tokens.access_token}` } }
      );
      const channelData = await channelRes.json();
      const channel = channelData.items?.[0];

      const admin = getSupabaseAdmin();
      await admin.from("youtube_connections").upsert({
        user_id: userId,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        token_expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
        channel_id: channel?.id || null,
        channel_title: channel?.snippet?.title || null,
      }, { onConflict: "user_id" });

      return new Response(
        JSON.stringify({
          success: true,
          channelTitle: channel?.snippet?.title || "Connected",
          channelId: channel?.id,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ===== CHECK CONNECTION =====
    if (action === "check_connection") {
      const userId = await getUserId(req);
      const admin = getSupabaseAdmin();
      const { data: conn } = await admin
        .from("youtube_connections")
        .select("channel_id, channel_title")
        .eq("user_id", userId)
        .single();

      return new Response(
        JSON.stringify({ connected: !!conn, channelTitle: conn?.channel_title, channelId: conn?.channel_id }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ===== DISCONNECT =====
    if (action === "disconnect") {
      const userId = await getUserId(req);
      const admin = getSupabaseAdmin();
      await admin.from("youtube_connections").delete().eq("user_id", userId);
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ===== GET PLAYLISTS =====
    if (action === "get_playlists") {
      const userId = await getUserId(req);
      const accessToken = await getValidToken(userId);

      const res = await fetch(
        "https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&maxResults=50",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await res.json();

      const playlists = (data.items || []).map((p: any) => ({
        id: p.id,
        title: p.snippet?.title,
      }));

      // Check if "Sacred Greeks" exists, if not, we'll let the frontend know or handle it
      return new Response(
        JSON.stringify({ playlists }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ===== ENSURE SACRED GREEKS PLAYLIST =====
    if (action === "ensure_sacred_greeks_playlist") {
      const userId = await getUserId(req);
      const accessToken = await getValidToken(userId);

      // Search for existing
      const listRes = await fetch(
        "https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&maxResults=50",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const listData = await listRes.json();
      const existing = (listData.items || []).find((p: any) => 
        p.snippet?.title?.toLowerCase() === "sacred greeks"
      );

      if (existing) {
        return new Response(
          JSON.stringify({ success: true, playlistId: existing.id, title: existing.snippet.title }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Create new
      const createRes = await fetch(
        "https://www.googleapis.com/youtube/v3/playlists?part=snippet,status",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            snippet: {
              title: "Sacred Greeks",
              description: "Official videos from the Sacred Greeks platform.",
            },
            status: { privacyStatus: "public" },
          }),
        }
      );

      if (!createRes.ok) {
        const err = await createRes.text();
        throw new Error(`Failed to create playlist: ${err}`);
      }

      const newData = await createRes.json();
      return new Response(
        JSON.stringify({ success: true, playlistId: newData.id, title: newData.snippet.title }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ===== GET CATEGORIES =====
    if (action === "get_categories") {
      const userId = await getUserId(req);
      const accessToken = await getValidToken(userId);

      const res = await fetch(
        "https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await res.json();

      const categories = (data.items || [])
        .filter((c: any) => c.snippet?.assignable)
        .map((c: any) => ({ id: c.id, title: c.snippet?.title }));

      return new Response(
        JSON.stringify({ categories }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ===== UPLOAD VIDEO =====
    if (action === "upload") {
      const userId = await getUserId(req);
      const accessToken = await getValidToken(userId);
      const {
        videoUrl,
        title,
        description,
        tags,
        categoryId,
        privacyStatus,
        publishAt,
        playlistId,
        thumbnailUrl,
        videoRequestId,
      } = body;

      if (!videoUrl || !title) throw new Error("Video URL and title are required");

      const admin = getSupabaseAdmin();

      // Create upload record
      const { data: uploadRecord, error: insertError } = await admin
        .from("youtube_uploads")
        .insert({
          user_id: userId,
          video_request_id: videoRequestId || null,
          title,
          description: description || "",
          tags: tags || [],
          category_id: categoryId || "22",
          privacy_status: privacyStatus || "private",
          publish_at: publishAt || null,
          playlist_id: playlistId || null,
          thumbnail_url: thumbnailUrl || null,
          upload_status: "uploading",
        })
        .select()
        .single();

      if (insertError) throw insertError;

      try {
        // Download the video
        const videoRes = await fetch(videoUrl);
        if (!videoRes.ok) throw new Error("Failed to download video from URL");
        const videoBlob = await videoRes.blob();

        // Build metadata
        const metadata: any = {
          snippet: {
            title,
            description: description || "",
            tags: tags || [],
            categoryId: categoryId || "22",
          },
          status: {
            privacyStatus: publishAt ? "private" : (privacyStatus || "private"),
            selfDeclaredMadeForKids: false,
          },
        };

        if (publishAt) {
          metadata.status.publishAt = publishAt;
          metadata.status.privacyStatus = "private";
        }

        // Resumable upload - Step 1: Initiate
        const initiateRes = await fetch(
          "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json; charset=UTF-8",
              "X-Upload-Content-Length": String(videoBlob.size),
              "X-Upload-Content-Type": videoBlob.type || "video/mp4",
            },
            body: JSON.stringify(metadata),
          }
        );

        if (!initiateRes.ok) {
          const errText = await initiateRes.text();
          console.error("YouTube initiate upload failed:", initiateRes.status, errText);
          throw new Error(`YouTube upload initiation failed: ${errText}`);
        }

        const uploadUrl = initiateRes.headers.get("Location");
        if (!uploadUrl) throw new Error("No upload URL returned from YouTube");

        // Step 2: Upload video content
        const uploadRes = await fetch(uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": videoBlob.type || "video/mp4",
            "Content-Length": String(videoBlob.size),
          },
          body: videoBlob,
        });

        if (!uploadRes.ok) {
          const errText = await uploadRes.text();
          console.error("YouTube upload failed:", uploadRes.status, errText);
          throw new Error(`YouTube upload failed: ${errText}`);
        }

        const uploadResult = await uploadRes.json();
        const youtubeVideoId = uploadResult.id;

        // Upload thumbnail if provided
        if (thumbnailUrl && youtubeVideoId) {
          try {
            const thumbRes = await fetch(thumbnailUrl);
            const thumbBlob = await thumbRes.blob();
            await fetch(
              `https://www.googleapis.com/upload/youtube/v3/thumbnails/set?videoId=${youtubeVideoId}&uploadType=media`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": thumbBlob.type || "image/jpeg",
                },
                body: thumbBlob,
              }
            );
          } catch (thumbErr) {
            console.error("Thumbnail upload failed (non-fatal):", thumbErr);
          }
        }

        // Add to playlist if specified
        if (playlistId && youtubeVideoId) {
          try {
            await fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                snippet: {
                  playlistId,
                  resourceId: { kind: "youtube#video", videoId: youtubeVideoId },
                },
              }),
            });
          } catch (plErr) {
            console.error("Playlist add failed (non-fatal):", plErr);
          }
        }

        // Update upload record
        await admin.from("youtube_uploads").update({
          youtube_video_id: youtubeVideoId,
          upload_status: "completed",
        }).eq("id", uploadRecord.id);

        return new Response(
          JSON.stringify({
            success: true,
            youtubeVideoId,
            youtubeUrl: `https://www.youtube.com/watch?v=${youtubeVideoId}`,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } catch (uploadErr) {
        await admin.from("youtube_uploads").update({
          upload_status: "failed",
          error_message: uploadErr instanceof Error ? uploadErr.message : "Upload failed",
        }).eq("id", uploadRecord.id);
        throw uploadErr;
      }
    }

    throw new Error(`Unknown action: ${action}`);
  } catch (error) {
    console.error("youtube-upload error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
