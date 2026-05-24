import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function formatPythonValue(value: unknown): string {
  if (value === null || value === undefined) return "None";
  if (typeof value === "string") return `"${value}"`;
  if (Array.isArray(value)) {
    if (value.length > 0 && Array.isArray(value[0])) {
      return `[${value.map((v) => formatPythonValue(v)).join(", ")}]`;
    }
    if (value.length > 0 && typeof value[0] === "object" && value[0] !== null && !Array.isArray(value[0])) {
      return `[${value.map((v) => formatPythonValue(v)).join(", ")}]`;
    }
    return `[${value.map((v) => formatPythonValue(v)).join(", ")}]`;
  }
  if (typeof value === "object" && value !== null) {
    const entries = Object.entries(value as Record<string, unknown>);
    return `{${entries.map(([k, v]) => `"${k}": ${formatPythonValue(v)}`).join(", ")}}`;
  }
  if (typeof value === "boolean") return value ? "True" : "False";
  return String(value);
}

export function formatPythonTuple(items: unknown[]): string {
  if (items.length === 1) return `(${formatPythonValue(items[0])},)`;
  return `(${items.map((i) => formatPythonValue(i)).join(", ")})`;
}
