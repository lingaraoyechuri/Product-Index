import { createGlobalStyle } from 'styled-components';

/**
 * Global Style - Modern Classic / Swiss Style
 * 
 * Design Principles:
 * - Clean lines, 1px borders, high contrast
 * - Excellent typography with system fonts
 * - Limited color palette (Black, White, Gray, One Accent)
 * - Whitespace and grid alignment
 * - No gradients, blur effects, or excessive animations
 */

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
                 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
                 'Helvetica Neue', sans-serif;
    background-color: #FFFFFF;
    color: #000000;
    line-height: 1.6;
    min-height: 100vh;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  [data-theme='dark'] body {
    background-color: #0A0A0A;
    color: #FFFFFF;
    overflow-x: hidden;
  }
  
  [data-theme='dracula'] body {
    background-color: #282A36;
    color: #F8F8F2;
  }

  #root {
    min-height: 100vh;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
    transition: color 0.3s ease;
  }
  
  [data-theme='dark'] h1,
  [data-theme='dark'] h2,
  [data-theme='dark'] h3,
  [data-theme='dark'] h4,
  [data-theme='dark'] h5,
  [data-theme='dark'] h6 {
    color: #FFFFFF;
  }
  
  [data-theme='dracula'] h1,
  [data-theme='dracula'] h2,
  [data-theme='dracula'] h3,
  [data-theme='dracula'] h4,
  [data-theme='dracula'] h5,
  [data-theme='dracula'] h6 {
    color: #F8F8F2;
  }

  h1 {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.04em;
  }

  h2 {
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.03em;
  }

  h3 {
    font-size: clamp(1.375rem, 3vw, 1.875rem);
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.02em;
  }

  p {
    font-size: 1.125rem;
    line-height: 1.7;
    color: #000000;
    transition: color 0.3s ease;
  }
  
  [data-theme='dark'] p {
    color: #FFFFFF;
  }
  
  [data-theme='dracula'] p {
    color: #F8F8F2;
  }

  /* Links */
  a {
    color: inherit;
    text-decoration: none;
    transition: opacity 0.2s ease;
  }

  a:hover {
    opacity: 0.7;
  }

  /* Buttons */
  button {
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

