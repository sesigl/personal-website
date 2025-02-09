import { expect } from "vitest";

export function assertNotNull<T>(value: T | null): asserts value is T {
  expect(value).not.toBeNull();
}
