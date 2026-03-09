import { describe, it, expect, vi, beforeEach } from "vitest";
import { reportError } from "@/lib/errorReporting";

describe("errorReporting", () => {
  beforeEach(() => {
    vi.stubEnv("PROD", false);
  });

  it("logs errors to console in dev mode", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    reportError(new Error("test error"));
    expect(spy).toHaveBeenCalledWith("[ErrorReporter]", expect.any(Error));
    spy.mockRestore();
  });

  it("handles string error messages", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    reportError("string error");
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
