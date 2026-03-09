import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Announces route changes to screen readers via aria-live region.
 */
export function RouteAnnouncer() {
  const location = useLocation();
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    // Derive page name from pathname
    const pageName = location.pathname === "/"
      ? "Home"
      : location.pathname
          .replace(/^\//, "")
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

    setAnnouncement(`Navigated to ${pageName}`);
  }, [location.pathname]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
}
