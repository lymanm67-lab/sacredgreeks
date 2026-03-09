import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkipToContent } from "@/components/ui/SkipToContent";

describe("Accessibility: SkipToContent", () => {
  it("renders a skip link targeting #main-content", () => {
    render(<SkipToContent />);
    const link = screen.getByText("Skip to main content");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "#main-content");
  });
});
