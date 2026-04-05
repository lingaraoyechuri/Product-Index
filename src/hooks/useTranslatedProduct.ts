import { useTranslation } from "react-i18next";
import type { Product } from "../config/productRegistry";

export function useTranslatedProduct(product: Product | undefined) {
  const { t } = useTranslation();
  if (!product) {
    return { name: "", description: "", tagline: undefined as string | undefined };
  }
  const base = `products.${product.id}`;
  const tagline = t(`${base}.tagline`, {
    defaultValue: product.tagline ?? "",
  });
  return {
    name: t(`${base}.name`, { defaultValue: product.name }),
    description: t(`${base}.description`, { defaultValue: product.description }),
    tagline: tagline.trim() ? tagline : undefined,
  };
}
