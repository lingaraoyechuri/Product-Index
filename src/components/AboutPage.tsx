import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const AboutContainer = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  padding: 3rem 0;

  @media (max-width: 768px) {
    margin-bottom: 3rem;
    padding: 2rem 0;
  }
`;

const AboutTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.04em;
  color: #000000;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
  
  [data-theme='dark'] & {
    color: #FFFFFF;
  }
  
  [data-theme='dracula'] & {
    color: #F8F8F2;
  }
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  line-height: 1.6;
  color: #666666;
  max-width: 600px;
  margin: 0 auto;
  transition: color 0.3s ease;
  
  [data-theme='dark'] & {
    color: rgba(255, 255, 255, 0.7);
  }
  
  [data-theme='dracula'] & {
    color: rgba(248, 248, 242, 0.7);
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }
`;

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  padding: 2.5rem;
  transition: all 0.3s ease;
  position: relative;
  z-index: 3;

  [data-theme='dark'] & {
    background-color: rgba(26, 26, 26, 0.95);
    border-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  [data-theme='dracula'] & {
    background-color: #343746;
    border-color: rgba(255, 121, 198, 0.3);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.12);

    [data-theme='dark'] & {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
      border-color: rgba(255, 255, 255, 0.2);
    }

    [data-theme='dracula'] & {
      box-shadow: 0 8px 24px rgba(255, 121, 198, 0.2);
      border-color: rgba(255, 121, 198, 0.5);
    }
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const FullWidthCard = styled(Card)`
  grid-column: 1 / -1;
`;

const DeveloperCard = styled(FullWidthCard)`
  text-align: center;
  padding: 3rem 2.5rem;

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.5rem, 3vw, 1.875rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #000000;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
  
  [data-theme='dark'] & {
    color: #FFFFFF;
  }
  
  [data-theme='dracula'] & {
    color: #F8F8F2;
  }
`;

const Paragraph = styled.p`
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  line-height: 1.8;
  color: #000000;
  opacity: 0.85;
  transition: color 0.3s ease;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
  
  [data-theme='dark'] & {
    color: rgba(255, 255, 255, 0.85);
  }
  
  [data-theme='dracula'] & {
    color: rgba(248, 248, 242, 0.85);
  }
`;

const DeveloperName = styled.h2`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #000000;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
  
  [data-theme='dark'] & {
    color: #FFFFFF;
  }
  
  [data-theme='dracula'] & {
    color: #F8F8F2;
  }
`;

const DeveloperTitle = styled.p`
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  color: #666666;
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;
  
  [data-theme='dark'] & {
    color: rgba(255, 255, 255, 0.7);
  }
  
  [data-theme='dracula'] & {
    color: rgba(248, 248, 242, 0.7);
  }
`;

const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background-color: #000000;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin-top: 1rem;

  [data-theme='dark'] & {
    background-color: #ffffff;
    color: #000000;

    &:hover {
      background-color: rgba(255, 255, 255, 0.9);
    }
  }

  [data-theme='dracula'] & {
    background-color: #ff79c6;
    color: #282a36;

    &:hover {
      background-color: #ff6bb5;
    }
  }

  &:hover {
    background-color: #333333;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <AboutContainer>
      <HeroSection>
        <AboutTitle>{t('about.pageTitle')}</AboutTitle>
        <HeroSubtitle>{t('about.subtitle')}</HeroSubtitle>
      </HeroSection>

      <ContentGrid>
        <DeveloperCard>
          <DeveloperName>Lingarao Y</DeveloperName>
          <DeveloperTitle>{t('about.developerTitle')}</DeveloperTitle>
          <Paragraph>{t('about.bio')}</Paragraph>
          <ContactButton 
            href="https://www.linkedin.com/in/lingarao-y-9a91aa115/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {t('about.connectLinkedIn')}
          </ContactButton>
        </DeveloperCard>

        <FullWidthCard>
          <SectionTitle>{t('about.studioTitle')}</SectionTitle>
          <Paragraph>{t('about.studioP1')}</Paragraph>
          <Paragraph>{t('about.studioP2')}</Paragraph>
        </FullWidthCard>
      </ContentGrid>
    </AboutContainer>
  );
};

