import { serializeTime } from "./timer";
import { describe, it, expect } from "vitest";

const start = 1723692156081;

describe("serializeTime", () => {
  it("case1", () => {
    const fromDate = new Date(start);
    const toDate = new Date(start + 3600000 + 60000 * 2 + 3 * 1000 + 456);
    const serialized = serializeTime(fromDate, toDate);
    expect(serialized).toBe("01:02:03:45");
  });
});
