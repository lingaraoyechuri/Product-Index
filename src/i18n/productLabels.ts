import type { Product } from "../config/productRegistry";

const CATEGORY_KEYS: Record<Product["category"], string> = {
  Productivity: "productivity",
  DevTool: "devTool",
  Privacy: "privacy",
  "Chrome Extension": "chromeExtension",
};

const STATUS_KEYS: Record<Product["status"], string> = {
  Live: "live",
  Beta: "beta",
  Concept: "concept",
};

export function categoryI18nKey(category: Product["category"]): string {
  return `categories.${CATEGORY_KEYS[category]}`;
}

export function statusI18nKey(status: Product["status"]): string {
  return `status.${STATUS_KEYS[status]}`;
}
