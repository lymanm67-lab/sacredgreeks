import { useState, useCallback, useEffect, useRef } from 'react';

export interface DemoSessionEvent {
  id: string;
  type: 'navigation' | 'click' | 'feature_use' | 'tour_step' | 'interaction';
  timestamp: number;
  data: {
    route?: string;
    element?: string;
    feature?: string;
    stepId?: string;
    stepTitle?: string;
    action?: string;
    details?: string;
  };
}

export interface DemoSession {
  id: string;
  startedAt: number;
  endedAt?: number;
  duration?: number;
  events: DemoSessionEvent[];
  persona?: string;
  template?: string;
  scenario?: string;
}

const SESSIONS_STORAGE_KEY = 'sacred-greeks-demo-sessions';
const CURRENT_SESSION_KEY = 'sacred-greeks-current-session';
const MAX_SESSIONS = 10;

export function useDemoSessionRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentSession, setCurrentSession] = useState<DemoSession | null>(null);
  const [sessions, setSessions] = useState<DemoSession[]>(() => {
    try {
      const stored = localStorage.getItem(SESSIONS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  
  const sessionRef = useRef<DemoSession | null>(null);

  // Sync ref with state
  useEffect(() => {
    sessionRef.current = currentSession;
  }, [currentSession]);

  // Save sessions to localStorage
  useEffect(() => {
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  // Generate unique ID
  const generateId = () => Math.random().toString(36).substring(2, 15);

  // Start recording
  const startRecording = useCallback((metadata?: { persona?: string; template?: string; scenario?: string }) => {
    const newSession: DemoSession = {
      id: generateId(),
      startedAt: Date.now(),
      events: [],
      ...metadata,
    };
    
    setCurrentSession(newSession);
    setIsRecording(true);
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(newSession));
    
    // Record initial navigation event
    recordEvent({
      type: 'navigation',
      data: { route: window.location.pathname, action: 'session_start' },
    });
  }, []);

  // Stop recording
  const stopRecording = useCallback(() => {
    if (!sessionRef.current) return null;

    const completedSession: DemoSession = {
      ...sessionRef.current,
      endedAt: Date.now(),
      duration: Date.now() - sessionRef.current.startedAt,
    };

    // Add to sessions list (keep only MAX_SESSIONS)
    setSessions(prev => {
      const updated = [completedSession, ...prev].slice(0, MAX_SESSIONS);
      return updated;
    });

    setCurrentSession(null);
    setIsRecording(false);
    localStorage.removeItem(CURRENT_SESSION_KEY);

    return completedSession;
  }, []);

  // Record an event
  const recordEvent = useCallback((event: Omit<DemoSessionEvent, 'id' | 'timestamp'>) => {
    if (!sessionRef.current) return;

    const newEvent: DemoSessionEvent = {
      id: generateId(),
      timestamp: Date.now(),
      ...event,
    };

    setCurrentSession(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        events: [...prev.events, newEvent],
      };
      localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Record navigation
  const recordNavigation = useCallback((route: string) => {
    recordEvent({
      type: 'navigation',
      data: { route },
    });
  }, [recordEvent]);

  // Record feature use
  const recordFeatureUse = useCallback((feature: string, details?: string) => {
    recordEvent({
      type: 'feature_use',
      data: { feature, details },
    });
  }, [recordEvent]);

  // Record tour step
  const recordTourStep = useCallback((stepId: string, stepTitle: string, route: string) => {
    recordEvent({
      type: 'tour_step',
      data: { stepId, stepTitle, route },
    });
  }, [recordEvent]);

  // Record interaction
  const recordInteraction = useCallback((element: string, action: string, details?: string) => {
    recordEvent({
      type: 'interaction',
      data: { element, action, details },
    });
  }, [recordEvent]);

  // Delete a session
  const deleteSession = useCallback((sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
  }, []);

  // Clear all sessions
  const clearAllSessions = useCallback(() => {
    setSessions([]);
    localStorage.removeItem(SESSIONS_STORAGE_KEY);
  }, []);

  // Export session as JSON
  const exportSession = useCallback((session: DemoSession) => {
    const dataStr = JSON.stringify(session, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `demo-session-${session.id}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  // Get session statistics
  const getSessionStats = useCallback((session: DemoSession) => {
    const eventsByType = session.events.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const uniqueRoutes = new Set(
      session.events
        .filter(e => e.type === 'navigation')
        .map(e => e.data.route)
    ).size;

    const tourStepsCompleted = session.events.filter(e => e.type === 'tour_step').length;

    return {
      totalEvents: session.events.length,
      eventsByType,
      uniqueRoutes,
      tourStepsCompleted,
      duration: session.duration || (Date.now() - session.startedAt),
    };
  }, []);

  // Resume session if one was in progress
  useEffect(() => {
    const storedSession = localStorage.getItem(CURRENT_SESSION_KEY);
    if (storedSession) {
      try {
        const session = JSON.parse(storedSession);
        setCurrentSession(session);
        setIsRecording(true);
      } catch {
        localStorage.removeItem(CURRENT_SESSION_KEY);
      }
    }
  }, []);

  return {
    isRecording,
    currentSession,
    sessions,
    startRecording,
    stopRecording,
    recordEvent,
    recordNavigation,
    recordFeatureUse,
    recordTourStep,
    recordInteraction,
    deleteSession,
    clearAllSessions,
    exportSession,
    getSessionStats,
  };
}
