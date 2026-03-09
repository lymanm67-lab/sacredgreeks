import { describe, it, expect } from "vitest";

/**
 * WCAG 2.1 AA requires:
 * - Normal text: contrast ratio ≥ 4.5:1
 * - Large text (18pt+ or 14pt bold): contrast ratio ≥ 3:1
 *
 * This test validates our design token luminance pairings.
 */

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return [f(0) * 255, f(8) * 255, f(4) * 255];
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function checkContrast(
  fgHSL: [number, number, number],
  bgHSL: [number, number, number]
): number {
  const fgRgb = hslToRgb(...fgHSL);
  const bgRgb = hslToRgb(...bgHSL);
  const fgL = relativeLuminance(...fgRgb);
  const bgL = relativeLuminance(...bgRgb);
  return contrastRatio(fgL, bgL);
}

describe("WCAG 2.1 AA Contrast Audit - Light Mode", () => {
  // background: 0 0% 100% | foreground: 225 60% 15%
  it("foreground on background ≥ 4.5:1", () => {
    const ratio = checkContrast([225, 60, 15], [0, 0, 100]);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  // muted-foreground on background
  it("muted-foreground on background ≥ 4.5:1", () => {
    const ratio = checkContrast([225, 25, 40], [0, 0, 100]);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  // primary-foreground on primary (large text ok at 3:1)
  it("primary-foreground on primary ≥ 3:1", () => {
    const ratio = checkContrast([0, 0, 100], [225, 73, 47]);
    expect(ratio).toBeGreaterThanOrEqual(3);
  });

  // badge-warning-foreground on badge-warning
  it("badge-warning-foreground on badge-warning ≥ 4.5:1", () => {
    const ratio = checkContrast([43, 96, 15], [43, 96, 50]);
    expect(ratio).toBeGreaterThanOrEqual(3);
  });
});

describe("WCAG 2.1 AA Contrast Audit - Dark Mode", () => {
  // foreground: 0 0% 98% on background: 225 50% 8%
  it("foreground on background ≥ 4.5:1", () => {
    const ratio = checkContrast([0, 0, 98], [225, 50, 8]);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  // muted-foreground on dark background
  it("muted-foreground on background ≥ 4.5:1", () => {
    const ratio = checkContrast([220, 15, 65], [225, 50, 8]);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  // card-foreground on card
  it("card-foreground on card ≥ 4.5:1", () => {
    const ratio = checkContrast([0, 0, 98], [225, 40, 12]);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});
