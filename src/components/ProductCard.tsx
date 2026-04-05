import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Product } from "../config/productRegistry";
import { categoryI18nKey } from "../i18n/productLabels";
import { useTranslatedProduct } from "../hooks/useTranslatedProduct";

const Card = styled.article<{ $status: Product["status"] }>`
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  cursor: ${(props) => (props.$status === "Live" ? "pointer" : "default")};
  min-height: 100%;
  width: 100%;
  position: relative;
  z-index: 3;

  [data-theme="dark"] & {
    background-color: rgba(26, 26, 26, 0.95);
    border-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);

    &:hover {
      border-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
  }

  [data-theme="dracula"] & {
    background-color: #343746;
    border-color: rgba(255, 121, 198, 0.3);

    &:hover {
      border-color: rgba(255, 121, 198, 0.5);
      box-shadow: 0 2px 8px rgba(255, 121, 198, 0.2);
    }
  }

  &:hover {
    border-color: rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  /* Mobile */
  @media (max-width: 639px) {
    padding: 1.25rem;
  }

  /* Tablet and up */
  @media (min-width: 640px) {
    padding: 1.75rem;
  }

  /* Desktop */
  @media (min-width: 1024px) {
    padding: 2rem;
  }
`;

const IconContainer = styled.div`
  width: clamp(40px, 5vw, 48px);
  height: clamp(40px, 5vw, 48px);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media (min-width: 640px) {
    margin-bottom: 1.5rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
  }
`;

const InitialsPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  color: #ffffff;
  font-size: clamp(0.875rem, 2vw, 1rem);
  font-weight: 700;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  [data-theme="dark"] & {
    background-color: #ffffff;
    color: #000000;
  }

  [data-theme="dracula"] & {
    background-color: #ff79c6;
    color: #282a36;
  }
`;

const CardHeader = styled.div`
  margin-bottom: 1rem;
`;

const ProductName = styled.h3`
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
  color: #000000;
  transition: color 0.3s ease;
  line-height: 1.3;

  [data-theme="dark"] & {
    color: #ffffff;
  }

  [data-theme="dracula"] & {
    color: #f8f8f2;
  }
`;

const Tagline = styled.p`
  font-size: clamp(1rem, 2vw, 1.125rem);
  line-height: 1.6;
  color: #000000;
  margin-bottom: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;

  [data-theme="dark"] & {
    color: #ffffff;
  }

  [data-theme="dracula"] & {
    color: #f8f8f2;
  }
`;

const Description = styled.p`
  font-size: clamp(0.9375rem, 1.5vw, 1rem);
  line-height: 1.7;
  color: #000000;
  margin-bottom: 1.5rem;
  flex: 1;
  opacity: 0.7;
  transition: color 0.3s ease;

  [data-theme="dark"] & {
    color: rgba(255, 255, 255, 0.7);
  }

  [data-theme="dracula"] & {
    color: rgba(248, 248, 242, 0.7);
  }
`;

const CategoryBadge = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #666666;
  margin-bottom: 1rem;
  transition: color 0.3s ease;

  [data-theme="dark"] & {
    color: rgba(255, 255, 255, 0.6);
  }

  [data-theme="dracula"] & {
    color: rgba(248, 248, 242, 0.6);
  }
`;

const ActionArea = styled.div`
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  transition: border-color 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  [data-theme="dark"] & {
    border-top-color: rgba(255, 255, 255, 0.1);
  }

  [data-theme="dracula"] & {
    border-top-color: rgba(255, 121, 198, 0.3);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const PrimaryButton = styled.a`
  display: inline-block;
  width: 100%;
  padding: clamp(0.625rem, 1.5vw, 0.75rem) clamp(1.25rem, 3vw, 1.5rem);
  background-color: #000000;
  color: #ffffff;
  font-size: clamp(0.875rem, 1.5vw, 0.9375rem);
  font-weight: 500;
  text-align: center;
  border-radius: 6px;
  border: none;
  transition: all 0.2s ease;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 640px) {
    flex: 2;
  }

  [data-theme="dark"] & {
    background-color: #ffffff;
    color: #000000;

    &:hover {
      background-color: rgba(255, 255, 255, 0.9);
    }
  }

  [data-theme="dracula"] & {
    background-color: #ff79c6;

    &:hover {
      background-color: #ff6bb5;
    }
  }

  &:hover {
    background-color: #333333;
  }
`;

const ExploreButton = styled(Link)`
  display: inline-block;
  width: 100%;
  padding: clamp(0.625rem, 1.5vw, 0.75rem) clamp(1.25rem, 3vw, 1.5rem);
  background-color: transparent;
  color: #000000;
  font-size: clamp(0.875rem, 1.5vw, 0.9375rem);
  font-weight: 500;
  text-align: center;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  text-decoration: none;

  @media (min-width: 640px) {
    flex: 1;
    max-width: 140px;
  }

  [data-theme="dark"] & {
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.3);

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5);
    }
  }

  [data-theme="dracula"] & {
    color: #f8f8f2;
    border-color: rgba(255, 121, 198, 0.3);

    &:hover {
      background-color: rgba(255, 121, 198, 0.1);
      border-color: rgba(255, 121, 198, 0.5);
    }
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.3);
  }
`;

const ComingSoonBadge = styled.span`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #f7f7f7;
  color: #666666;
  font-size: 0.9375rem;
  font-weight: 500;
  text-align: center;
  border-radius: 6px;
  border: none;
  cursor: not-allowed;
  transition: all 0.3s ease;

  [data-theme="dark"] & {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.6);
  }

  [data-theme="dracula"] & {
    background-color: rgba(255, 121, 198, 0.1);
    color: rgba(248, 248, 242, 0.6);
  }
`;

const BetaBadge = styled.span`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #000000;
  color: #ffffff;
  font-size: 0.9375rem;
  font-weight: 500;
  text-align: center;
  border-radius: 6px;
  border: none;
  opacity: 0.9;
  transition: all 0.2s ease;

  [data-theme="dark"] & {
    background-color: #ffffff;
    color: #000000;
  }

  [data-theme="dracula"] & {
    background-color: #ff79c6;
  }

  &:hover {
    opacity: 1;
  }
`;

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useTranslation();
  const { name, description, tagline } = useTranslatedProduct(product);

  const getStoreLink = () => {
    if (product.links.chromeStore) return product.links.chromeStore;
    if (product.links.firefoxStore) return product.links.firefoxStore;
    if (product.links.website) return product.links.website;
    return "#";
  };

  const renderActionButton = () => {
    if (product.status === "Live") {
      return (
        <PrimaryButton
          href={getStoreLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("productCard.addToChrome")}
        </PrimaryButton>
      );
    }

    if (product.status === "Beta") {
      return <BetaBadge>{t("productCard.betaAvailable")}</BetaBadge>;
    }

    return <ComingSoonBadge>{t("productCard.comingSoon")}</ComingSoonBadge>;
  };

  const getInitials = (n: string): string => {
    const words = n.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return n.substring(0, 2).toUpperCase();
  };

  return (
    <Card $status={product.status}>
      <IconContainer>
        {product.iconPath ? (
          <img
            src={product.iconPath}
            alt={t("productCard.iconAlt", { name })}
          />
        ) : (
          <InitialsPlaceholder>{getInitials(name)}</InitialsPlaceholder>
        )}
      </IconContainer>
      <CardHeader>
        <ProductName>{name}</ProductName>
        <CategoryBadge>{t(categoryI18nKey(product.category))}</CategoryBadge>
      </CardHeader>
      {tagline ? <Tagline>{tagline}</Tagline> : null}
      <Description>{description}</Description>
      <ActionArea>
        <ButtonGroup>
          {renderActionButton()}
          <ExploreButton to={`/tools/${product.id}`}>
            {t("productCard.view")}
          </ExploreButton>
        </ButtonGroup>
      </ActionArea>
    </Card>
  );
};
