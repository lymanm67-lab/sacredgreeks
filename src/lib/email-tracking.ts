// Email A/B Testing & Tracking Utilities

export type VariantType = 'control' | 'urgency_curiosity' | 'benefit_social';

export interface SubjectVariant {
  type: VariantType;
  subject: string;
  previewText?: string;
}

export interface EmailTemplate {
  templateKey: string;
  variants: SubjectVariant[];
}

/**
 * Get the tracking function URL based on environment
 */
export const getTrackingUrl = (): string => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  return `${supabaseUrl}/functions/v1/track-email`;
};

/**
 * Generate a 1x1 tracking pixel HTML for email opens
 * @param trackingToken - Unique token for the email send
 */
export const generateTrackingPixel = (trackingToken: string): string => {
  const baseUrl = getTrackingUrl();
  const pixelUrl = `${baseUrl}?t=${trackingToken}&a=open`;
  return `<img src="${pixelUrl}" width="1" height="1" style="display:block;width:1px;height:1px;border:0;" alt="" />`;
};

/**
 * Wrap a link with click tracking
 * @param originalUrl - The actual destination URL
 * @param trackingToken - Unique token for the email send
 * @param label - Optional label to identify the link
 */
export const generateTrackedLink = (
  originalUrl: string,
  trackingToken: string,
  label?: string
): string => {
  const baseUrl = getTrackingUrl();
  const params = new URLSearchParams({
    t: trackingToken,
    a: 'click',
    url: originalUrl,
  });
  
  if (label) {
    params.set('label', label);
  }
  
  return `${baseUrl}?${params.toString()}`;
};

/**
 * Select a random variant based on weights
 * @param variants - Array of variants with weights
 */
export const selectVariant = <T extends { weight: number }>(variants: T[]): T => {
  const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const variant of variants) {
    random -= variant.weight;
    if (random <= 0) {
      return variant;
    }
  }
  
  return variants[0]; // Fallback
};

/**
 * Pre-defined subject line templates for common email types
 */
export const emailSubjectTemplates: Record<string, EmailTemplate> = {
  welcome: {
    templateKey: 'welcome',
    variants: [
      {
        type: 'control',
        subject: 'Welcome to Sacred Greeks',
        previewText: 'Your faith journey in Greek life begins now',
      },
      {
        type: 'urgency_curiosity',
        subject: "🔥 You're In! Here's What Most Members Miss...",
        previewText: 'The one thing that separates thriving from surviving',
      },
      {
        type: 'benefit_social',
        subject: 'Join 1,000+ Greeks Growing in Faith Together',
        previewText: 'See how your brothers and sisters are thriving',
      },
    ],
  },
  devotional_reminder: {
    templateKey: 'devotional_reminder',
    variants: [
      {
        type: 'control',
        subject: "Today's Devotional is Ready",
        previewText: 'Start your day with Scripture',
      },
      {
        type: 'urgency_curiosity',
        subject: "⏰ Don't Break Your 7-Day Streak!",
        previewText: "Today's message might be exactly what you need",
      },
      {
        type: 'benefit_social',
        subject: '500 Members Already Read This Morning',
        previewText: 'Join your community in daily growth',
      },
    ],
  },
  streak_lost: {
    templateKey: 'streak_lost',
    variants: [
      {
        type: 'control',
        subject: 'We Missed You Yesterday',
        previewText: 'Your streak has been reset',
      },
      {
        type: 'urgency_curiosity',
        subject: '😢 Your Streak is Gone... But There\'s Good News',
        previewText: 'Here\'s how to come back stronger',
      },
      {
        type: 'benefit_social',
        subject: 'Your Chapter Brothers Are Waiting For You',
        previewText: 'They noticed you were gone',
      },
    ],
  },
  prayer_answered: {
    templateKey: 'prayer_answered',
    variants: [
      {
        type: 'control',
        subject: 'Someone Prayed For You',
        previewText: 'A brother/sister lifted you up today',
      },
      {
        type: 'urgency_curiosity',
        subject: '🙏 You Won\'t Believe Who Prayed For You',
        previewText: 'Open to see their message',
      },
      {
        type: 'benefit_social',
        subject: '12 People Have Prayed For Your Request',
        previewText: 'The community is with you',
      },
    ],
  },
  weekly_digest: {
    templateKey: 'weekly_digest',
    variants: [
      {
        type: 'control',
        subject: 'Your Weekly Faith Summary',
        previewText: 'See your progress this week',
      },
      {
        type: 'urgency_curiosity',
        subject: '📊 Your Stats Are In (You Might Be Surprised)',
        previewText: 'How did you stack up this week?',
      },
      {
        type: 'benefit_social',
        subject: "You're in the Top 20% of Active Members!",
        previewText: 'See how your dedication paid off',
      },
    ],
  },
  assessment_complete: {
    templateKey: 'assessment_complete',
    variants: [
      {
        type: 'control',
        subject: 'Your Assessment Results Are Ready',
        previewText: 'View your complete analysis',
      },
      {
        type: 'urgency_curiosity',
        subject: '🎯 Your Results Reveal Something Unexpected...',
        previewText: 'What your answers really mean',
      },
      {
        type: 'benefit_social',
        subject: 'Join 2,500+ Greeks Who Discovered Their Strengths',
        previewText: 'Your personalized growth path awaits',
      },
    ],
  },
  reengagement_7day: {
    templateKey: 'reengagement_7day',
    variants: [
      {
        type: 'control',
        subject: "We Haven't Seen You in a While",
        previewText: "Here's what you've missed",
      },
      {
        type: 'urgency_curiosity',
        subject: '🚨 Your Account May Be Deactivated Soon',
        previewText: 'Quick action needed to keep your progress',
      },
      {
        type: 'benefit_social',
        subject: 'Your Chapter Is 50% More Active - Are You?',
        previewText: "Don't fall behind your brothers/sisters",
      },
    ],
  },
  new_feature: {
    templateKey: 'new_feature',
    variants: [
      {
        type: 'control',
        subject: 'New Feature Available',
        previewText: 'Check out what we built for you',
      },
      {
        type: 'urgency_curiosity',
        subject: '🎁 Early Access: Be the First to Try This',
        previewText: 'Limited spots available',
      },
      {
        type: 'benefit_social',
        subject: 'Members Are Loving This New Feature',
        previewText: '4.9 stars from early testers',
      },
    ],
  },
};

/**
 * Generate complete email HTML with tracking
 */
export const wrapEmailWithTracking = (
  htmlContent: string,
  trackingToken: string
): string => {
  const trackingPixel = generateTrackingPixel(trackingToken);
  
  // Insert tracking pixel before closing body tag
  if (htmlContent.includes('</body>')) {
    return htmlContent.replace('</body>', `${trackingPixel}</body>`);
  }
  
  // If no body tag, append to end
  return htmlContent + trackingPixel;
};
