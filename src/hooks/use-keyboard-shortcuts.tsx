import { useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
  action: () => void;
  description: string;
  global?: boolean;
}

const defaultShortcuts: ShortcutConfig[] = [
  {
    key: 'k',
    ctrl: true,
    description: 'Open search',
    action: () => {},
    global: true,
  },
  {
    key: 'd',
    alt: true,
    description: 'Go to Dashboard',
    action: () => {},
    global: true,
  },
  {
    key: 'h',
    alt: true,
    description: 'Go to Home',
    action: () => {},
    global: true,
  },
  {
    key: 'p',
    alt: true,
    description: 'Go to Prayer Journal',
    action: () => {},
    global: true,
  },
  {
    key: 'b',
    alt: true,
    description: 'Go to Bible Study',
    action: () => {},
    global: true,
  },
  {
    key: '/',
    description: 'Show keyboard shortcuts',
    action: () => {},
    global: true,
  },
];

export function useKeyboardShortcuts(customShortcuts: ShortcutConfig[] = []) {
  const navigate = useNavigate();
  const shortcutsRef = useRef<ShortcutConfig[]>([]);

  // Build shortcuts with navigation
  useEffect(() => {
    shortcutsRef.current = [
      {
        key: 'd',
        alt: true,
        description: 'Go to Dashboard',
        action: () => navigate('/dashboard'),
        global: true,
      },
      {
        key: 'h',
        alt: true,
        description: 'Go to Home',
        action: () => navigate('/'),
        global: true,
      },
      {
        key: 'p',
        alt: true,
        description: 'Go to Prayer Journal',
        action: () => navigate('/prayer-journal'),
        global: true,
      },
      {
        key: 'b',
        alt: true,
        description: 'Go to Bible Study',
        action: () => navigate('/bible-study'),
        global: true,
      },
      {
        key: '/',
        description: 'Show keyboard shortcuts',
        action: () => showShortcutsHelp(),
        global: true,
      },
      ...customShortcuts,
    ];
  }, [navigate, customShortcuts]);

  const showShortcutsHelp = useCallback(() => {
    const shortcuts = shortcutsRef.current;
    const message = shortcuts
      .map(s => {
        const keys = [];
        if (s.ctrl) keys.push('Ctrl');
        if (s.alt) keys.push('Alt');
        if (s.shift) keys.push('Shift');
        if (s.meta) keys.push('⌘');
        keys.push(s.key.toUpperCase());
        return `${keys.join('+')} - ${s.description}`;
      })
      .join('\n');

    toast.info('Keyboard Shortcuts', {
      description: (
        <div className="mt-2 space-y-1 text-xs font-mono">
          {shortcuts.map((s, i) => {
            const keys = [];
            if (s.ctrl) keys.push('Ctrl');
            if (s.alt) keys.push('Alt');
            if (s.shift) keys.push('Shift');
            if (s.meta) keys.push('⌘');
            keys.push(s.key.toUpperCase());
            return (
              <div key={i} className="flex justify-between gap-4">
                <span className="text-muted-foreground">{s.description}</span>
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">
                  {keys.join('+')}
                </kbd>
              </div>
            );
          })}
        </div>
      ),
      duration: 5000,
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip if user is typing in an input
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      const shortcuts = shortcutsRef.current;

      for (const shortcut of shortcuts) {
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = shortcut.ctrl ? event.ctrlKey : !event.ctrlKey;
        const altMatch = shortcut.alt ? event.altKey : !event.altKey;
        const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const metaMatch = shortcut.meta ? event.metaKey : !event.metaKey;

        if (keyMatch && ctrlMatch && altMatch && shiftMatch && metaMatch) {
          event.preventDefault();
          shortcut.action();
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    shortcuts: shortcutsRef.current,
    showShortcutsHelp,
  };
}

// Export available shortcuts for documentation
export const availableShortcuts = defaultShortcuts;