import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

interface Manifest {
  version: string;
  minAppVersion: string;
}

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

describe("release metadata", () => {
  it("targets the latest public Obsidian release as the minimum app version", () => {
    const manifest = readJson<Manifest>("manifest.json");
    const versions = readJson<Record<string, string>>("versions.json");

    expect(manifest.minAppVersion).toBe("1.12.7");
    expect(versions[manifest.version]).toBe(manifest.minAppVersion);
  });
});
