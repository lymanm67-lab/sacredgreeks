import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userName, assessmentType, scenario, theme = 'classic', shareToken } = await req.json();

    console.log('Generating OG image for:', { userName, assessmentType, theme });

    if (!userName || !assessmentType || !scenario) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create prompt based on theme
    const themePrompts: Record<string, string> = {
      classic: `Create a professional certificate image with a traditional design. Include:
- Purple border (RGB: 139, 92, 246) with ornate decorative corners
- White background with elegant serif typography
- Center the text "Certificate of Completion" at top in large purple text
- Below that: "${userName}" in bold black text
- Smaller text: "has completed the Sacred Greeks Decision Guide"
- Assessment type: "${assessmentType}"
- Scenario: "${scenario}"
- Use decorative flourishes and a formal, prestigious look
- Aspect ratio: 1200x630px (Open Graph standard)`,
      
      modern: `Create a bold, modern certificate image with minimalist design. Include:
- Deep slate blue background (RGB: 15, 23, 42) with bright indigo accent stripe at top (RGB: 99, 102, 241)
- White content area with clean sans-serif typography
- "CERTIFICATE" in large bold uppercase white letters at top
- "${userName}" in large indigo text (RGB: 99, 102, 241)
- "has successfully completed"
- "Sacred Greeks Decision Guide" in bold
- "${assessmentType} - ${scenario}"
- Geometric shapes and modern, professional aesthetic
- Aspect ratio: 1200x630px (Open Graph standard)`,
      
      elegant: `Create a sophisticated, elegant certificate image with refined design. Include:
- Cream background (RGB: 250, 248, 246) with ornate gold borders (RGB: 194, 163, 104)
- Decorative gold corner ornaments and flourishes
- "Certificate of Completion" in italic purple serif font (RGB: 139, 92, 246) 
- "${userName}" in elegant italic serif font with gold underline
- "has honorably completed the"
- "Sacred Greeks Decision Guide" in bold
- "${assessmentType} - ${scenario}" in smaller italic text
- Timeless, classic elegance with gold accents
- Aspect ratio: 1200x630px (Open Graph standard)`
    };

    const prompt = themePrompts[theme] || themePrompts.classic;

    // Generate image using Lovable AI
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Calling Lovable AI image generation...');
    
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        modalities: ['image', 'text']
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI generation error:', aiResponse.status, errorText);
      throw new Error(`Failed to generate image: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const imageUrl = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      console.error('No image in AI response:', JSON.stringify(aiData));
      throw new Error('No image generated');
    }

    // Extract base64 data
    const base64Data = imageUrl.split(',')[1];
    if (!base64Data) {
      throw new Error('Invalid image data format');
    }

    // Convert base64 to Uint8Array
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Upload to Supabase Storage
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const fileName = `${shareToken}-${theme}.png`;
    const filePath = `${fileName}`;

    console.log('Uploading to storage:', filePath);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('certificate-og-images')
      .upload(filePath, bytes, {
        contentType: 'image/png',
        upsert: true
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw uploadError;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('certificate-og-images')
      .getPublicUrl(filePath);

    console.log('Image uploaded successfully:', publicUrl);

    return new Response(
      JSON.stringify({ 
        success: true, 
        imageUrl: publicUrl 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating certificate OG image:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});