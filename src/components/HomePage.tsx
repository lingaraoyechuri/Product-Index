import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { HeroSection } from './HeroSection';
import { ProductGrid } from './ProductGrid';
import { ReviewsSection } from './ReviewsSection';

const PricingBanner = styled.section`
  margin-top: 6rem;
  margin-bottom: 4rem;
  padding: 3rem 2rem;
  background-color: #f7f7f7;
  border-radius: 12px;
  text-align: center;
  position: relative;
  z-index: 3;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;

  [data-theme="dark"] & {
    background-color: rgba(26, 26, 26, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  [data-theme="dracula"] & {
    background-color: #343746;
    border: 1px solid rgba(255, 121, 198, 0.3);
  }

  @media (max-width: 768px) {
    margin-top: 4rem;
    padding: 2rem 1.5rem;
  }
`;

const PricingTitle = styled.h2`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #000000;
  margin-bottom: 1rem;
  transition: color 0.3s ease;

  [data-theme="dark"] & {
    color: #ffffff;
  }

  [data-theme="dracula"] & {
    color: #f8f8f2;
  }
`;

const PricingDescription = styled.p`
  font-size: clamp(1rem, 2vw, 1.125rem);
  line-height: 1.7;
  color: #000000;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;

  [data-theme="dark"] & {
    color: rgba(255, 255, 255, 0.9);
  }

  [data-theme="dracula"] & {
    color: rgba(248, 248, 242, 0.9);
  }
`;

const PricingFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: clamp(0.9375rem, 1.5vw, 1rem);
  color: #000000;
  transition: color 0.3s ease;

  [data-theme="dark"] & {
    color: rgba(255, 255, 255, 0.8);
  }

  [data-theme="dracula"] & {
    color: rgba(248, 248, 242, 0.8);
  }
`;

const CheckIcon = styled.span`
  color: #50fa7b;
  font-size: 1.25rem;
  font-weight: bold;

  [data-theme="dark"] & {
    color: #50fa7b;
  }

  [data-theme="dracula"] & {
    color: #50fa7b;
  }
`;

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <HeroSection />
      <ProductGrid />
      <ReviewsSection />
      <PricingBanner>
        <PricingTitle>{t("pricing.title")}</PricingTitle>
        <PricingDescription>{t("pricing.description")}</PricingDescription>
        <PricingFeatures>
          <FeatureItem>
            <CheckIcon>✓</CheckIcon>
            <span>{t("pricing.feature1")}</span>
          </FeatureItem>
          <FeatureItem>
            <CheckIcon>✓</CheckIcon>
            <span>{t("pricing.feature2")}</span>
          </FeatureItem>
          <FeatureItem>
            <CheckIcon>✓</CheckIcon>
            <span>{t("pricing.feature3")}</span>
          </FeatureItem>
          <FeatureItem>
            <CheckIcon>✓</CheckIcon>
            <span>{t("pricing.feature4")}</span>
          </FeatureItem>
        </PricingFeatures>
      </PricingBanner>
    </>
  );
};

