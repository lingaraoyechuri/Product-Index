/**
 * Product Registry - Single Source of Truth
 *
 * To add a new extension:
 * 1. Add a new Product object to the productRegistry array below
 * 2. Place the icon file in /public/assets/icons/ (e.g., my-extension.svg)
 * 3. Reference it in iconPath as "/assets/icons/my-extension.svg"
 *
 * That's it! The UI will automatically render the new product.
 */

export interface Product {
  id: string;
  name: string;
  tagline?: string; // 1 sentence pitch
  description: string; // 2-3 sentences
  iconPath?: string; // e.g., "/assets/icons/rocket.svg" - referencing public folder
  category: "Productivity" | "DevTool" | "Privacy" | "Chrome Extension";
  status: "Live" | "Beta" | "Concept";
  demoVideoUrl?: string; // YouTube URL for demo video
  links: {
    website?: string;
    chromeStore?: string;
    firefoxStore?: string;
    github?: string;
  };
}

export const productRegistry: Product[] = [
  {
    id: "prompt-nav",
    name: "ChatGPT, Gemini, Claude Chat Export & Navigator",
    description:
      "Download and export ChatGPT, Gemini, and Claude conversations in PDF, Markdown, JSON, HTML, or Text, plus smart prompt navigation.",
    iconPath: "/assets/icons/prompt-nav.png",
    category: "Chrome Extension",
    status: "Live",
    demoVideoUrl: "https://www.youtube.com/watch?v=hGsUEZAZ-Ik",
    links: {
      chromeStore:
        "https://chromewebstore.google.com/detail/chatgpt-gemini-claude-cha/bafgjepidmcdkhkfbgpgkjlahckceach",
      github: "https://github.com/product-studio/code-snippets",
    },
  },
  {
    id: "gpt-gif",
    name: "GPT Gifs",

    description:
      "this is fun chrome extension that shows selected gifs on chatgpt, gemini, claude search boxes",
    category: "Chrome Extension",
    status: "Concept",
    links: {
      chromeStore: "https://chrome.google.com/webstore",
      github: "https://github.com/product-studio/api-tester",
    },
  },
];
