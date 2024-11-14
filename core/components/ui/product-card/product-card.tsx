import React from 'react';
import { BcImage } from '~/components/bc-image';
import { Link } from '~/components/link';
import { cn } from '~/lib/utils';
import { Compare } from './compare';
import QuickView from './Quickview';
import { getProductData } from '~/components/common-functions';
import { AddToCartButton } from './AddToCartButton';
 
interface Props {
  id: string;
  name: string;
  href: string;
  image: {
    altText: string;
    src: string;
  };
  price: string;
  subtitle?: string;
}
 
const ProductCard = async ({ id, name, href, image, price, subtitle }: Props) => {
  const product = await getProductData({ entityId: Number(id) });
 
  const addToCardData = {
    defaultImage: {
      url: image.src,
      altText: image.altText,
    },
    name,
    price,
    subtitle,
    cartCount: 1,
  };
 
  return (
    <div className="group relative flex flex-col overflow-visible">
      <div className="relative flex justify-center pb-3">
        <div className="relative flex-auto aspect-square">
          {image ? (
            <BcImage alt={image.altText} className="object-contain" fill src={image.src} />
          ) : (
            <div className="h-full w-full bg-gray-200" />
          )}
          <AddToCartButton addToCardData={addToCardData} productId={Number(id)} />
          <QuickView product={product} />
        </div>
      </div>
 
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold title">
          <Link href={href}>
            <span>{name}</span>
          </Link>
        </h3>
        {subtitle && <p className="text-base text-gray-500 brand">{subtitle}</p>}
        <span className='price'>{price}</span>
      </div>
    </div>
  );
};
 
export { ProductCard };