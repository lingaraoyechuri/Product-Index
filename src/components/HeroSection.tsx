import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const HeroContainer = styled.section`
  margin-bottom: 6rem;
  text-align: center;
  position: relative;
  z-index: 3;
  
  @media (max-width: 768px) {
    margin-bottom: 4rem;
  }
`;

const HeroTitle = styled.h1`
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.04em;
  color: #000000;
  margin-bottom: 2rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  transition: color 0.3s ease;
  position: relative;
  z-index: 3;
  
  [data-theme='dark'] & {
    color: #FFFFFF;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
  
  [data-theme='dracula'] & {
    color: #F8F8F2;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.375rem;
  line-height: 1.7;
  color: #000000;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
  transition: color 0.3s ease;
  position: relative;
  z-index: 3;
  
  [data-theme='dark'] & {
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }
  
  [data-theme='dracula'] & {
    color: rgba(248, 248, 242, 0.8);
  }
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <HeroContainer>
      <HeroTitle>{t("hero.title")}</HeroTitle>
      <HeroSubtitle>{t("hero.subtitle")}</HeroSubtitle>
    </HeroContainer>
  );
};

