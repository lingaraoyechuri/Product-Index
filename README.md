# Product Studio Landing Page

A static, high-performance landing page for a "Product Studio" showcasing a portfolio of browser extensions.

## Tech Stack

- React 18
- TypeScript
- Styled Components
- Vite
- Yarn

## Design Philosophy

**Modern Classic / Swiss Style**
- Clean lines, 1px borders, high contrast
- Excellent typography with system fonts (Inter)
- Limited color palette (Black, White, Gray)
- Whitespace and grid alignment
- No gradients, blur effects, or excessive animations

## Getting Started

### Installation

```bash
yarn install
```

### Development

```bash
yarn dev
```

### Build

```bash
yarn build
```

### Preview Production Build

```bash
yarn preview
```

## Adding a New Product

To add a new extension to the landing page:

1. **Add the product to the registry**: Edit `src/config/productRegistry.ts` and add a new `Product` object to the `productRegistry` array.

2. **Add the icon**: Place your icon file in `/public/assets/icons/` (e.g., `my-extension.svg`).

3. **Reference the icon**: In the product object, set `iconPath` to `/assets/icons/my-extension.svg`.

That's it! The UI will automatically render the new product. No need to touch any component files.

## Project Structure

```
src/
├── config/
│   └── productRegistry.ts    # Single source of truth for products
├── components/
│   ├── MainLayout.tsx        # Header, Footer, Container
│   ├── HeroSection.tsx       # Hero section
│   ├── ProductGrid.tsx       # Grid layout
│   └── ProductCard.tsx       # Individual product card
├── styles/
│   └── GlobalStyle.ts        # Global styles
├── App.tsx                   # Main app component
└── index.tsx                 # Entry point
```

## Asset Management

All static assets (icons, images) should be placed in the `/public/assets/` folder:

- Icons: `/public/assets/icons/`
- Images: `/public/assets/images/`

Reference them in code using paths starting with `/assets/` (e.g., `/assets/icons/rocket.svg`).

