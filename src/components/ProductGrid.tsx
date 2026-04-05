import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ProductCard } from "./ProductCard";
import { productRegistry } from "../config/productRegistry";

const SectionContainer = styled.section`
  margin-top: 0;
  position: relative;
  z-index: 3;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #000000;
  margin-bottom: 4rem;
  transition: color 0.3s ease;
  position: relative;
  z-index: 3;

  [data-theme="dark"] & {
    color: #ffffff;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }

  [data-theme="dracula"] & {
    color: #f8f8f2;
  }

  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  /* Small tablets and up */
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  /* Tablets and small desktops */
  @media (min-width: 768px) {
    gap: 2rem;
  }

  /* Large desktops - auto-fit for flexibility */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* Extra large screens - max 3 columns */
  @media (min-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ProductGrid: React.FC = () => {
  const { t } = useTranslation();
  return (
    <SectionContainer>
      <SectionTitle>{t("toolsSection.title")}</SectionTitle>
      <GridContainer>
        {productRegistry.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </GridContainer>
    </SectionContainer>
  );
};
