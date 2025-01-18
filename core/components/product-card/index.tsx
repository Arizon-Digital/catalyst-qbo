import { useFormatter } from 'next-intl';

import { ResultOf } from '~/client/graphql';
import { ProductCard as ComponentProductCard } from '~/components/ui/product-card';
import { pricesTransformer } from '~/data-transformers/prices-transformer';

import { AddToCart } from './add-to-cart';
import { ProductCardFragment } from './fragment';

interface Props {
  product: ResultOf<typeof ProductCardFragment>;
  imageSize?: 'tall' | 'wide' | 'square';
  imagePriority?: boolean;
  showCompare?: boolean;
  showCart?: boolean;
  page?: string;
}

export const ProductCard = ({
  product,
  imageSize = 'square',
  imagePriority = false,
  showCart = true,
  showCompare = true,
  page,
}: Props) => {
  const format = useFormatter();

  const { name, entityId, defaultImage, brand, path, prices } = product;

  const price = pricesTransformer(prices, format);

  return (
    <ComponentProductCard
      addToCart={showCart && <AddToCart data={product} />}
      product={product}
      href={path}
      id={entityId.toString()}
      image={defaultImage ? { src: defaultImage.url, altText: defaultImage.altText } : undefined}
      imagePriority={imagePriority}
      imageSize={imageSize}
      name={name}
      price={price}
      showCompare={showCompare}
      subtitle={brand?.name}
      page={page}
    />
  );
};
