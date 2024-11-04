import React from 'react';
import { BcImage } from '~/components/bc-image';
import { Link } from '~/components/link';
import { cn } from '~/lib/utils';
import { Compare } from './compare';
import QuickView from './Quickview';
import { getProductData } from '~/components/common-functions';

interface Image {
  altText: string;
  src: string;
}

type Price =
  | string
  | {
      type: 'sale';
      currentValue: string;
      previousValue: string;
    }
  | {
      type: 'range';
      minValue: string;
      maxValue: string;
    };

interface Product {
  id: string;
  name: string;
  href: string;
  image?: Image;
  price?: Price;
  subtitle?: string;
  badge?: string;
}

interface Props extends Product {
  addToCart?: React.ReactNode;
  className?: string;
  imagePriority?: boolean;
  imageSize?: 'square' | 'tall' | 'wide';
  showCompare?: boolean;
}

const ProductCard = async ({
  addToCart,
  className,
  image,
  imagePriority = false,
  imageSize,
  href,
  price,
  id,
  showCompare = true,
  subtitle,
  name,
  ...props
}: Props) => {

  const product = await getProductData({
    entityId: Number(id)
  });

  return(
    <div className={cn('group relative flex flex-col overflow-visible', className)} {...props}>
      <div className="relative flex justify-center pb-3">
        <div
          className={cn('relative flex-auto', {
            'aspect-square': imageSize === 'square',
            'aspect-[4/5]': imageSize === 'tall',
            'aspect-[7/5]': imageSize === 'wide',
          })}
        >

          {image ? (
            <BcImage
              alt={image.altText}
              className="object-contain"
              fill
              priority={imagePriority}
              sizes="(max-width: 768px) 50vw, (max-width: 1536px) 25vw, 500px"
              src={image.src}
            />
          ) : (
            <div className="h-full w-full bg-gray-200" />
          )}

          <QuickView product={product} />
        </div>
      </div>

      <div className={cn('flex flex-1 flex-col gap-1', Boolean(addToCart) && 'justify-end')}>
        <h3 className="text-xl font-bold lg:text-2xll">
          <Link
            className="focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-primary/20 focus-visible:ring-0"
            href={href}
          >
            <span aria-hidden="true" className="absolute inset-0 bottom-20" />
            {name}
          </Link>
        </h3>
        {subtitle ? <p className="text-base text-grayy-500">{subtitle}</p> : null}
        <div className="flex flex-wrap items-end justify-between pt">
          {Boolean(price) &&
            (typeof price === 'object' ? (
              <p className="flex flex-col gap-1">
                {price.type === 'range' && (
                  <span>
                    {price.minValue} - {price.maxValue}
                  </span>
                )}
                {price.type === 'sale' && (
                  <>
                    <span>
                      Was: <span className="line-through">{price.previousValue}</span>
                    </span>
                    <span>Now: {price.currentValue}</span>
                  </>
                )}
              </p>
            ) : (
              <span>{price}</span>
            ))}
          {showCompare && <Compare id={id} image={image} name={name} />}
        </div>
      </div>
    </div>
  );
}

ProductCard.displayName = 'ProductCard';

export { ProductCard };
