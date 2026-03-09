import { cn } from "@/lib/utils";

/**
 * Skip-to-content link for keyboard/screen reader users.
 * Visually hidden until focused via Tab key.
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className={cn(
        "fixed top-0 left-0 z-[100] px-4 py-2 text-sm font-medium",
        "bg-primary text-primary-foreground rounded-br-md",
        "transform -translate-y-full focus:translate-y-0",
        "transition-transform duration-200 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      )}
    >
      Skip to main content
    </a>
  );
}
