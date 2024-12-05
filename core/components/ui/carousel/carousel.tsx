import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ReactNode, useCallback, useEffect, useId, useMemo, useState } from 'react';

import { cn } from '~/lib/utils';

type CarouselApi = UseEmblaCarouselType[1];

interface Props {
  className?: string;
  pageSize?: 2 | 3 | 4 | 5;
  products: ReactNode[];
  title: string;
}

const Carousel = ({ className, title, pageSize = 5, products, ...props }: Props) => {
  const id = useId();
  const titleId = useId();
  const itemsPerGroup = pageSize;

  const [carouselRef, api] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: pageSize,
    draggable: true,
    containScroll: 'trimSnaps',
    skipSnaps: false
  });

  const t = useTranslations('Components.Carousel');

  const groupedProducts = useMemo(() => {
    const groups: ReactNode[][] = [];
    
    for (let i = 0; i < products.length; i += pageSize) {
      groups.push(products.slice(i, i + pageSize));
    }
    
    return groups;
  }, [products, pageSize]);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedSnapIndex, setSelectedSnapIndex] = useState(0);
  const [slidesInView, setSlidesInView] = useState<number[]>([0]);

  const onSelect = useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) {
      return;
    }

    setSelectedSnapIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);
    api.on('slidesInView', () => {
      setSlidesInView(api.slidesInView());
    });

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api, onSelect]);

  return (
    <div
      aria-labelledby={titleId}
      aria-roledescription="carousel"
      className={cn('relative pdp-products', className)}
      onKeyDownCapture={handleKeyDown}
      role="region"
      {...props}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black lg:text-4xl" id={titleId}>
          {title}
        </h2>
        <span className="no-wrap flex">
          <button
            aria-label={t('previousProducts')}
            className={cn(
              'inline-flex h-12 w-12 items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:text-gray-400',
              api?.scrollSnapList().length === 1 && 'hidden',
            )}
            disabled={!canScrollPrev}
            onClick={scrollPrev}
          >
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Previous slide</span>
          </button>

          <button
            aria-label={t('nextProducts')}
            className={cn(
              'inline-flex h-12 w-12 items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:text-gray-400',
              api?.scrollSnapList().length === 1 && 'hidden',
            )}
            disabled={!canScrollNext}
            onClick={scrollNext}
          >
            <ArrowRight className="h-6 w-6" />
            <span className="sr-only">Next slide</span>
          </button>
        </span>
      </div>

      <div className="-mx-2 overflow-hidden px-2" ref={carouselRef}>
        <div className="-mx-4 mb-16 mt-8 flex lg:mt-10">
          {groupedProducts.map((group, index) => (
            <div
              key={index}
              aria-label={`${index + 1} of ${groupedProducts.length}`}
              aria-roledescription="slide"
              className={cn(
                'grid min-w-0 shrink-0 grow-0 basis-full gap-6 px-4 lg:gap-8',
                'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
                !slidesInView.includes(index) && 'invisible',
              )}
              id={`${id}-slide-${index + 1}`}
              role="group"
            >
              {group.map((product, productIndex) => (
                <div key={productIndex} className="w-full">
                  {product}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div
        aria-label={t('slides')}
        className={cn(
          'no-wrap absolute bottom-1 flex w-full items-center justify-center gap-2',
          api?.scrollSnapList().length === 1 && 'hidden',
        )}
        role="tablist"
      >
        {groupedProducts.map((_, index) => (
          <button
            key={index}
            aria-controls={`${id}-slide-${index + 1}`}
            aria-label={t('goto', { n: index + 1 })}
            aria-selected={selectedSnapIndex === index}
            className={cn(
              "h-7 w-7 p-0.5 after:block after:h-0.5 after:w-full after:bg-gray-400 after:content-[''] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20",
              selectedSnapIndex === index && 'after:bg-black',
            )}
            onClick={() => api?.scrollTo(index)}
            role="tab"
          />
        ))}
      </div>
    </div>
  );
};

export { Carousel };