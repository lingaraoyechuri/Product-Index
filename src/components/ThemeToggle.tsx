import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  
  [data-theme='dark'] & {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  [data-theme='dracula'] & {
    background-color: rgba(255, 121, 198, 0.1);
    border-color: rgba(255, 121, 198, 0.2);
  }
`;

const ThemeButton = styled.button<{ $isActive: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: ${props => props.$isActive ? 'rgba(0, 0, 0, 0.1)' : 'transparent'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${props => props.$isActive ? '#000000' : 'rgba(0, 0, 0, 0.5)'};
  
  [data-theme='dark'] & {
    background: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
    color: ${props => props.$isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'};
  }
  
  [data-theme='dracula'] & {
    background: ${props => props.$isActive ? 'rgba(255, 121, 198, 0.2)' : 'transparent'};
    color: ${props => props.$isActive ? '#FF79C6' : 'rgba(255, 121, 198, 0.5)'};
  }
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    
    [data-theme='dark'] & {
      background: rgba(255, 255, 255, 0.15);
    }
    
    [data-theme='dracula'] & {
      background: rgba(255, 121, 198, 0.2);
    }
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const DraculaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <ToggleContainer>
      <ThemeButton
        $isActive={theme === 'dark'}
        onClick={() => setTheme('dark')}
        aria-label={t('theme.dark')}
        title={t('theme.dark')}
      >
        <MoonIcon />
      </ThemeButton>
      <ThemeButton
        $isActive={theme === 'light'}
        onClick={() => setTheme('light')}
        aria-label={t('theme.light')}
        title={t('theme.light')}
      >
        <SunIcon />
      </ThemeButton>
      <ThemeButton
        $isActive={theme === 'dracula'}
        onClick={() => setTheme('dracula')}
        aria-label={t('theme.dracula')}
        title={t('theme.dracula')}
      >
        <DraculaIcon />
      </ThemeButton>
    </ToggleContainer>
  );
};

