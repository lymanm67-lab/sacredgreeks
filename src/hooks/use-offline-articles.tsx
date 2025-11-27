import { useState, useEffect, useCallback } from 'react';
import { useOffline } from './use-offline';

export interface OfflineArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  content: string; // Full readable content for offline
  cachedAt: string;
}

const STORAGE_KEY = 'sacred-greeks-offline-articles';

// Pre-defined offline content for featured articles
const ARTICLE_CONTENT: Record<string, string> = {
  'repentance-repair-renewal': `
# Repentance, Repair & Renewal Checklist

A spiritual guide for members and leaders of Black Greek-letter organizations seeking to align their commitment to service with their devotion to Christ.

## Introduction

This checklist is designed to help you examine your heart, repair relationships, and renew your commitment to living a Christ-centered life within your Greek-letter organization.

## Part 1: Repentance - Examining Your Heart

### Personal Reflection Questions:
- Have I placed my organization above my relationship with Christ?
- Have I participated in activities that contradict my faith values?
- Have I been silent when I should have spoken up for what's right?
- Have I allowed peer pressure to compromise my integrity?

### Action Steps:
1. Set aside dedicated time for prayer and self-examination
2. Confess any areas where you've fallen short
3. Ask God for forgiveness and the strength to change
4. Write down specific behaviors you need to address

## Part 2: Repair - Restoring Relationships

### With God:
- Recommit to daily prayer and Bible study
- Join or start a faith-based accountability group
- Attend worship services regularly

### With Others:
- Apologize to anyone you may have wronged
- Seek reconciliation with chapter members you've had conflicts with
- Make amends where possible

### With Your Organization:
- Advocate for ethical practices
- Support positive traditions while questioning harmful ones
- Be a voice for change from within

## Part 3: Renewal - Moving Forward

### Daily Practices:
- Start each day with prayer
- Apply the P.R.O.O.F. framework to decisions
- Seek accountability from trusted brothers/sisters

### Chapter Involvement:
- Lead Bible studies or prayer groups
- Mentor new members in faith integration
- Promote service projects that honor Christ

### Long-term Commitments:
- Develop a personal mission statement
- Set spiritual goals alongside organizational goals
- Create a support network of like-minded members

## The P.R.O.O.F. Framework

**P - Purpose**: Does this align with God's purpose for my life?
**R - Reverence**: Does this honor God?
**O - Obedience**: Does this follow God's commands?
**O - Others**: Does this benefit others?
**F - Faith**: Does this strengthen my faith?

## Closing Prayer

Lord, help me to walk in integrity within my organization. Give me the courage to stand for what's right, the wisdom to navigate challenges, and the love to serve others well. May my membership bring glory to Your name. Amen.
`,

  'integrity-under-pressure': `
# Integrity Under Pressure Playbook

A practical ethics guide for hot moments on campus and in life using the P.R.O.O.F. framework.

## Introduction

As a Christian in Greek life, you will face moments that test your integrity. This playbook provides practical strategies for maintaining your values when pressure is high.

## Understanding "Hot Moments"

Hot moments are situations where:
- You're pressured to compromise your values
- Quick decisions are required
- Peer influence is strong
- Consequences seem immediate

## The P.R.O.O.F. Decision Framework

Before acting in any challenging situation, run through P.R.O.O.F.:

### P - Purpose
Ask yourself: "Does this align with my God-given purpose?"
- What am I ultimately trying to achieve?
- Will this bring me closer to or further from my goals?
- Is this consistent with who I want to become?

### R - Reverence
Ask yourself: "Does this honor God?"
- Would I be comfortable if Jesus were standing next to me?
- Does this reflect my identity as a child of God?
- Am I treating others with the dignity they deserve?

### O - Obedience
Ask yourself: "Does this follow God's commands?"
- What does Scripture say about this situation?
- Am I rationalizing disobedience?
- What would a wise mentor advise?

### O - Others
Ask yourself: "How does this affect others?"
- Could someone be harmed by this action?
- Am I considering the wellbeing of everyone involved?
- What example am I setting?

### F - Faith
Ask yourself: "Does this strengthen or weaken my faith?"
- Will I feel guilty afterward?
- Does this require me to hide or deceive?
- Can I do this with a clear conscience?

## Common Scenarios & Responses

### Scenario 1: Party Pressure
**Situation**: You're at a chapter event where excessive drinking is happening.

**P.R.O.O.F. Application**:
- Purpose: Getting drunk doesn't serve my goals
- Reverence: My body is a temple
- Obedience: Scripture warns against drunkenness
- Others: I could influence others negatively
- Faith: This would compromise my witness

**Response Options**:
- "I'm good with water tonight"
- Offer to be the designated driver
- Leave early if pressure continues
- Suggest alternative activities

### Scenario 2: Hazing Situations
**Situation**: New member activities cross ethical lines.

**P.R.O.O.F. Application**:
- Purpose: Building brotherhood doesn't require degradation
- Reverence: Every person has inherent dignity
- Obedience: "Love your neighbor as yourself"
- Others: This causes real harm
- Faith: I cannot participate in cruelty

**Response Options**:
- Speak up against harmful practices
- Report to appropriate authorities
- Propose alternative bonding activities
- Support affected members

### Scenario 3: Academic Dishonesty
**Situation**: Brothers/sisters want to share test answers.

**P.R.O.O.F. Application**:
- Purpose: Education requires genuine learning
- Reverence: Cheating dishonors God
- Obedience: "Do not steal" includes intellectual theft
- Others: Unfair to honest students
- Faith: Integrity matters more than grades

**Response Options**:
- Offer to form a study group instead
- Decline without judging others
- Report if necessary
- Focus on legitimate help

## Building Your Support System

1. **Accountability Partner**: Find a like-minded member
2. **Mentor**: Connect with an older member who shares your values
3. **Faith Community**: Stay connected to your church/campus ministry
4. **Prayer Life**: Bring challenges to God daily

## Quick Reference Card

When facing pressure, remember:
1. PAUSE - Take a breath before responding
2. PRAY - Quick silent prayer for wisdom
3. P.R.O.O.F. - Run through the framework
4. PROCEED - Act with confidence in your decision
5. PROCESS - Reflect and learn afterward

## Closing Thoughts

Integrity isn't about being perfect—it's about being consistent. Every time you choose right over easy, you strengthen your character and witness. Your example matters more than you know.

"Whatever you do, work at it with all your heart, as working for the Lord, not for human masters." - Colossians 3:23
`
};

export function useOfflineArticles() {
  const { isOffline } = useOffline();
  const [cachedArticles, setCachedArticles] = useState<OfflineArticle[]>([]);

  // Load cached articles on mount
  useEffect(() => {
    loadCachedArticles();
  }, []);

  const loadCachedArticles = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCachedArticles(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading cached articles:', error);
    }
  }, []);

  const cacheArticle = useCallback((article: Omit<OfflineArticle, 'cachedAt'>) => {
    try {
      const newArticle: OfflineArticle = {
        ...article,
        cachedAt: new Date().toISOString(),
      };

      setCachedArticles(prev => {
        const filtered = prev.filter(a => a.id !== article.id);
        const updated = [...filtered, newArticle];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });

      return true;
    } catch (error) {
      console.error('Error caching article:', error);
      return false;
    }
  }, []);

  const getCachedArticle = useCallback((id: string): OfflineArticle | null => {
    return cachedArticles.find(a => a.id === id) || null;
  }, [cachedArticles]);

  const isArticleCached = useCallback((id: string): boolean => {
    return cachedArticles.some(a => a.id === id);
  }, [cachedArticles]);

  const removeArticle = useCallback((id: string) => {
    setCachedArticles(prev => {
      const updated = prev.filter(a => a.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearCache = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setCachedArticles([]);
  }, []);

  const getOfflineContent = useCallback((articleId: string): string | null => {
    return ARTICLE_CONTENT[articleId] || null;
  }, []);

  return {
    isOffline,
    cachedArticles,
    cacheArticle,
    getCachedArticle,
    isArticleCached,
    removeArticle,
    clearCache,
    getOfflineContent,
  };
}
