/**
 * Reviews Registry - Single Source of Truth
 *
 * To add a new review:
 * 1. Add a new Review object to the reviewsRegistry array below
 * 2. Set the source to either 'Chrome Store' or 'Reddit'
 * 3. Optionally add a link to the original review
 *
 * That's it! The UI will automatically render the new review.
 */

export interface Review {
  id: string;
  author: string;
  rating?: number; // 1-5 stars (optional, only for Chrome Store)
  text: string;
  source: "Chrome Store" | "Reddit";
  date: string; // e.g., "2024-01-15" or "2 weeks ago"
  link?: string; // Optional link to original review/post
  extensionId?: string; // Optional: which extension this review is for
}

export const reviewsRegistry: Review[] = [
  {
    id: "review-5",
    author: "Gatene",
    rating: 5,
    text: "I've used the extension a handful of times, and I have to say it's been a real time saver. Instead of wearing out the mouse wheel, my patience, and my time, I just have to click, scroll through my prompts, and click again to scroll directly to it. I use ChatGPT through my daily life, and in my career, so this extension was a no-brainer. Thank you for creating meaningful affordances for AI users like me.",
    source: "Chrome Store",
    date: "Jan 3 2026",
    link: "https://chromewebstore.google.com/reviews/1986bac1-b177-4bfb-872e-645dc2e44e9a",
    extensionId: "prompt-nav",
  },
  {
    id: "review-1",
    author: "Fogrinn",
    rating: 5,
    text: "very simple, but efficient tool.",
    source: "Chrome Store",
    date: "Apr 1 2026",
    link: "https://chromewebstore.google.com/reviews/619f2408-fd29-4b9a-a451-6fabf773867a",
    extensionId: "prompt-nav",
  },
  {
    id: "review-2",
    author: "Pavel",
    rating: 5,
    text: "Best plugin to download history form AI. Super!!",
    source: "Chrome Store",
    date: "Mar 7 2026",
    link: "https://chromewebstore.google.com/reviews/9f7c62f8-7ddd-43d9-b3c9-f7536421eeff",
    extensionId: "prompt-nav",
  },
  {
    id: "review-3",
    author: "Learnaboutly",
    rating: 5,
    text: "Excellent.",
    source: "Chrome Store",
    date: "Feb 26 2026",
    link: "https://chromewebstore.google.com/reviews/c8b48b1f-da6e-4ecc-9088-7728608343fc",
    extensionId: "prompt-nav",
  },
  {
    id: "review-4",
    author: "Alecsandru C. Duma",
    rating: 5,
    text: "Great tool. I wished PDF would be text instead of images simmilar to HTML export, and images from chat to be included in exports ...maybe in a future version.",
    source: "Chrome Store",
    date: "Jan 20 2026",
    link: "https://chromewebstore.google.com/reviews/7d913657-b00c-4e0c-88ac-0a36f8472a17",
    extensionId: "prompt-nav",
  },

  {
    id: "review-6",
    author: "N Bucwa",
    rating: 5,
    text: "Amazing tool for a writer. Exactly what I needed and works just as described.",
    source: "Chrome Store",
    date: "Jan 3 2026",
    link: "https://chromewebstore.google.com/reviews/48f25b0c-7ea9-4d59-bd4c-c11ba4b95722",
    extensionId: "prompt-nav",
  },
  {
    id: "review-7",
    author: "Andy Povkhan",
    rating: 5,
    text: "Very easy to use and does the job!",
    source: "Chrome Store",
    date: "Dec 30 2025",
    link: "https://chromewebstore.google.com/reviews/0cc6ff13-0db8-42f5-8372-552e4a26d8a8",
    extensionId: "prompt-nav",
  },
  {
    id: "review-8",
    author: "Saudi Students Rocketry",
    rating: 5,
    text: "Works pretty well and stable. Nice tool!",
    source: "Chrome Store",
    date: "Dec 29 2025",
    link: "https://chromewebstore.google.com/reviews/aa218900-5859-4b0f-8bba-e215b2a355cc",
    extensionId: "prompt-nav",
  },
  {
    id: "review-9",
    author: "Raviteja Yechuri",
    rating: 5,
    text: "Thank god someone got this idea. its saving half of my time. simple and easy to navigate.",
    source: "Chrome Store",
    date: "Dec 22 2025",
    link: "https://chromewebstore.google.com/reviews/75288257-dcd1-4d90-909d-cea7ef9adb02",
    extensionId: "prompt-nav",
  },
  {
    id: "review-10",
    author: "Yasin Muratogullari",
    rating: 5,
    text: "amazing",
    source: "Chrome Store",
    date: "Dec 20 2025",
    link: "https://chromewebstore.google.com/reviews/caf13e65-36e2-4576-a9c1-c8503272e0be",
    extensionId: "prompt-nav",
  },
  {
    id: "review-12",
    author: "dev_master_99",
    text: "Been using this for a week now. The export feature is incredible - especially the markdown export. Makes documenting my AI conversations so much easier.",
    source: "Reddit",
    date: "Dec 18 2025",
    link: "https://www.reddit.com/r/developersIndia/comments/1pmxr7p/why_navigating_long_llm_chats_is_still_a_ux/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button",
    extensionId: "prompt-nav",
  },
  {
    id: "review-13",
    author: "code_wizard",
    text: "Finally! I've been waiting for something like this. The navigation feature alone saves me hours every week. Great work!",
    source: "Reddit",
    date: "Dec 19 2025",
    link: "https://www.reddit.com/r/developersIndia/comments/1pmxr7p/why_navigating_long_llm_chats_is_still_a_ux/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button",
    extensionId: "prompt-nav",
  },
  {
    id: "review-14",
    author: "ai_researcher",
    text: "This extension is exactly what I needed for my research. Being able to export conversations in JSON format is perfect for data analysis. Highly recommend!",
    source: "Reddit",
    date: "Dec 21 2025",
    link: "https://www.reddit.com/r/developersIndia/comments/1pmxr7p/why_navigating_long_llm_chats_is_still_a_ux/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button",
    extensionId: "prompt-nav",
  },
  {
    id: "review-11",
    author: "slowkey_",
    text: "omg this is a life saver dude 😭",
    source: "Reddit",
    date: "Dec 14 2025",
    link: "https://www.reddit.com/r/developersIndia/comments/1pmxr7p/why_navigating_long_llm_chats_is_still_a_ux/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button",
    extensionId: "prompt-nav",
  },
  {
    id: "review-15",
    author: "productivity_guru",
    text: "Simple, clean, and does exactly what it says. No bloat, no unnecessary features. Just works perfectly. 10/10",
    source: "Reddit",
    date: "Dec 22 2025",
    link: "https://www.reddit.com/r/developersIndia/comments/1pmxr7p/why_navigating_long_llm_chats_is_still_a_ux/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button",
    extensionId: "prompt-nav",
  },
];
