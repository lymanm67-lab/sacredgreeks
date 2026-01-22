import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '@/lib/constants';

interface LastVisitData {
  timestamp: number;
  page: string;
  stats?: {
    streak?: number;
    lastDevotional?: string;
  };
}

export function useWelcomeBack() {
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [lastVisit, setLastVisit] = useState<LastVisitData | null>(null);
  const [daysSinceVisit, setDaysSinceVisit] = useState(0);

  useEffect(() => {
    const storedVisit = localStorage.getItem(STORAGE_KEYS.LAST_VISIT);
    
    if (storedVisit) {
      try {
        const visitData: LastVisitData = JSON.parse(storedVisit);
        setLastVisit(visitData);
        
        const now = Date.now();
        const daysDiff = Math.floor((now - visitData.timestamp) / (1000 * 60 * 60 * 24));
        setDaysSinceVisit(daysDiff);
        
        // Consider returning if visited within last 30 days
        if (daysDiff > 0 && daysDiff <= 30) {
          setIsReturningUser(true);
        }
      } catch (e) {
        console.error('Error parsing last visit data:', e);
      }
    }

    // Update last visit on current page load
    const updateVisit = () => {
      const newVisit: LastVisitData = {
        timestamp: Date.now(),
        page: window.location.pathname,
      };
      localStorage.setItem(STORAGE_KEYS.LAST_VISIT, JSON.stringify(newVisit));
    };

    // Delay to avoid updating on every navigation
    const timeout = setTimeout(updateVisit, 5000);
    return () => clearTimeout(timeout);
  }, []);

  const getWelcomeMessage = (userName?: string) => {
    const name = userName?.split(' ')[0] || 'Friend';
    
    if (daysSinceVisit === 0) {
      return `Good to see you again today, ${name}!`;
    } else if (daysSinceVisit === 1) {
      return `Welcome back, ${name}! It's been a day.`;
    } else if (daysSinceVisit <= 7) {
      return `Welcome back, ${name}! It's been ${daysSinceVisit} days.`;
    } else if (daysSinceVisit <= 14) {
      return `Hey ${name}! We missed you this past week.`;
    } else {
      return `Welcome back, ${name}! Great to see you again.`;
    }
  };

  const getMotivationalMessage = () => {
    if (daysSinceVisit === 1) {
      return "Keep up the momentum! Your consistency is building.";
    } else if (daysSinceVisit <= 3) {
      return "Ready to continue your journey? Pick up where you left off.";
    } else if (daysSinceVisit <= 7) {
      return "Your faith journey continues. Let's get back on track.";
    } else {
      return "Every moment is a chance to grow. Let's restart together.";
    }
  };

  return {
    isReturningUser,
    lastVisit,
    daysSinceVisit,
    getWelcomeMessage,
    getMotivationalMessage,
  };
}
