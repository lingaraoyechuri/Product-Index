import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ProductCard } from "./ProductCard";
import { productRegistry } from "../config/productRegistry";

const PageContainer = styled.section`
  margin-top: 0;
`;

const PageTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  color: #000000;
  margin-bottom: 4rem;
  text-align: center;
  transition: color 0.3s ease;

  [data-theme="dark"] & {
    color: #ffffff;
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
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  /* Extra large screens - max 3 columns */
  @media (min-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ToolsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <PageContainer>
      <PageTitle>{t("toolsSection.title")}</PageTitle>
      <GridContainer>
        {productRegistry.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </GridContainer>
    </PageContainer>
  );
};
