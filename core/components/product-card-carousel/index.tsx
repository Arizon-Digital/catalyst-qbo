import { ResultOf } from '~/client/graphql';
import { Carousel } from '~/components/ui/carousel';

import { ProductCard } from '../product-card';

import { ProductCardCarouselFragment } from './fragment';

type Product = ResultOf<typeof ProductCardCarouselFragment>;

export const ProductCardCarousel = ({
  title,
  products,
  showCart,
  showCompare,
  page,
}: {
  title: string;
  products: Product[];
  showCart?: boolean;
  showCompare?: boolean;
  page?: string;
}) => {
  if (products.length === 0) {
    return null;
  }

  const items = products.map((product) => (
    <ProductCard
      imageSize="tall"
      key={product.entityId}
      product={product}
      showCart={showCart}
      showCompare={showCompare}
      page={page}
    />
  ));

  return <Carousel className="mb-14" products={items} title={title} />;
};
