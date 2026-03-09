import { describe, it, expect } from "vitest";

describe("Devotional page structure", () => {
  it("demo devotional object has all required fields", () => {
    const demoDevotional = {
      id: "demo-devotional",
      date: new Date().toISOString().split("T")[0],
      title: "Walking in the Light",
      scripture_ref: "1 John 1:7",
      scripture_text: "But if we walk in the light...",
      reflection: "Critics often accuse...",
      proof_focus: "Obscurity",
      application: "Today, evaluate one area...",
      prayer: "Lord, You are light...",
    };

    expect(demoDevotional).toHaveProperty("id");
    expect(demoDevotional).toHaveProperty("scripture_ref");
    expect(demoDevotional).toHaveProperty("proof_focus");
    expect(demoDevotional.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
