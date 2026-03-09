/**
 * Lightweight production error reporting service.
 * Captures errors and sends them to a backend function for monitoring.
 * Replace the endpoint with Sentry, LogRocket, or any external service as needed.
 */

interface ErrorReport {
  message: string;
  stack?: string;
  componentStack?: string;
  url: string;
  timestamp: string;
  userAgent: string;
  sessionId?: string;
}

const ERROR_BUFFER: ErrorReport[] = [];
const MAX_BUFFER = 20;
const FLUSH_INTERVAL = 30_000; // 30 seconds
let flushTimer: ReturnType<typeof setInterval> | null = null;

function getSessionId(): string {
  let id = sessionStorage.getItem('error_session_id');
  if (!id) {
    id = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
    sessionStorage.setItem('error_session_id', id);
  }
  return id;
}

function createReport(
  error: Error | string,
  componentStack?: string
): ErrorReport {
  const err = typeof error === 'string' ? new Error(error) : error;
  return {
    message: err.message,
    stack: err.stack?.slice(0, 2000), // Truncate large stacks
    componentStack: componentStack?.slice(0, 1000),
    url: window.location.href,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    sessionId: getSessionId(),
  };
}

async function flushErrors() {
  if (ERROR_BUFFER.length === 0) return;

  const batch = ERROR_BUFFER.splice(0, ERROR_BUFFER.length);

  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !anonKey) return;

    await fetch(`${supabaseUrl}/functions/v1/log-client-errors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ errors: batch }),
    }).catch(() => {
      // Silently fail – don't cause more errors from error reporting
    });
  } catch {
    // Swallow
  }
}

export function reportError(error: Error | string, componentStack?: string) {
  if (!import.meta.env.PROD) {
    console.error('[ErrorReporter]', error);
    return;
  }

  const report = createReport(error, componentStack);
  ERROR_BUFFER.push(report);

  if (ERROR_BUFFER.length >= MAX_BUFFER) {
    flushErrors();
  }
}

export function initErrorReporting() {
  if (!import.meta.env.PROD) return;

  // Capture unhandled errors
  window.addEventListener('error', (event) => {
    reportError(event.error || event.message);
  });

  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    reportError(reason instanceof Error ? reason : String(reason));
  });

  // Periodic flush
  flushTimer = setInterval(flushErrors, FLUSH_INTERVAL);

  // Flush on page unload
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushErrors();
    }
  });
}

export function stopErrorReporting() {
  if (flushTimer) {
    clearInterval(flushTimer);
    flushTimer = null;
  }
  flushErrors();
}
