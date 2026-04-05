export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  primaryHover: string;
  accent: string;
  shadow: string;
}

export const themes: Record<'dark' | 'light' | 'dracula', ThemeColors> = {
  dark: {
    background: '#0A0A0A',
    surface: '#1A1A1A',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(255, 255, 255, 0.1)',
    primary: '#2383E2',
    primaryHover: '#1a6bc7',
    accent: '#2383E2',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
  light: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#000000',
    textSecondary: 'rgba(0, 0, 0, 0.7)',
    border: 'rgba(0, 0, 0, 0.06)',
    primary: '#2383E2',
    primaryHover: '#1a6bc7',
    accent: '#2383E2',
    shadow: 'rgba(0, 0, 0, 0.08)',
  },
  dracula: {
    background: '#282A36',
    surface: '#343746',
    text: '#F8F8F2',
    textSecondary: 'rgba(248, 248, 242, 0.7)',
    border: 'rgba(255, 121, 198, 0.3)',
    primary: '#FF79C6',
    primaryHover: '#FF6BB5',
    accent: '#50FA7B',
    shadow: 'rgba(0, 0, 0, 0.4)',
  },
};

