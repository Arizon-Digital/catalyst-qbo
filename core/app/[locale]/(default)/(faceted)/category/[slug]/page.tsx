
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Breadcrumbs } from '~/components/breadcrumbs';
import { ProductCard } from '~/components/product-card';
import { Pagination } from '~/components/ui/pagination';
import { LocaleType } from '~/i18n/routing';
import { BcImage } from '~/components/bc-image';
import ProductCountFilter from './ProductCountFilter';

import { FacetedSearch } from '../../_components/faceted-search';
import { MobileSideNav } from '../../_components/mobile-side-nav';
import { SortBy } from '../../_components/sort-by';
import { fetchFacetedSearch } from '../../fetch-faceted-search';

import { CategoryViewed } from './_components/category-viewed';
import { SubCategories } from './_components/sub-categories';
import { getCategoryPageData } from './page-data';
import { ProductGridSwitcher } from './ProductGridSwitcher';

interface Props {
  params: {
    slug: string;
    locale: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoryId = Number(slug);

  const data = await getCategoryPageData({
    categoryId,
  });

  const category = data.category;

  if (!category) {
    return {};
  }

  const { pageTitle, metaDescription, metaKeywords } = category.seo;

  return {
    title: pageTitle || category.name,
    description: metaDescription,
    keywords: metaKeywords ? metaKeywords.split(',') : null,
  };
}

export default async function Category(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { locale, slug } = params;

  setRequestLocale(locale);
  const t = await getTranslations('Category');

  const categoryId = Number(slug);

  // Get limit from searchParams or default to 50
  const limit = typeof searchParams.limit === 'string' ? parseInt(searchParams.limit) : 50;

  const [{ category, categoryTree }, search] = await Promise.all([
    getCategoryPageData({ categoryId }),
    fetchFacetedSearch({
      ...searchParams,
      category: categoryId,
      limit,
    }),
  ]);

  if (!category) {
    return notFound();
  }

  const productsCollection = search.products;
  const products = productsCollection.items;
  const { hasNextPage, hasPreviousPage, endCursor, startCursor } = productsCollection.pageInfo;

  return (
    <div className="group">
      <Breadcrumbs category={category} />
      {category.defaultImage && (
        <div className='w-full'>
          <BcImage
            className='!w-full'
            alt={category.defaultImage.altText}
            height={250}
            src={category.defaultImage.url}
            width={1230}
          />
        </div>
      )}

      <div className="lg:justify- sortbutton plp-filter-parent mt-2 gap-[20px] md:mb-8 lg:flex lg:flex-row lg:items-center">
        <div className="font-oswald flex w-[20%] items-center justify-center rounded-[8px] border-[7px] border-[#CA9619] bg-[#CA9619] pb-[12px] pl-[18px] pr-[18px] pt-[12px] text-[18px] font-normal text-white no-underline">
          <a
            href="/wecan'find"
            className="categorybtn mb-4 text-[18px] font-black transition-colors duration-200 hover:text-blue-600 lg:mb-0"
            id="categorybtn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Can't Find What You Are Looking For?
          </a>
        </div>

        <div className="plp-filters w-[80%]">
          <div className="form-field pdp">
            <input
              className="form-input w-full"
              type="text"
              name="q"
              placeholder="Filter products by name or part number..."
              data-search-in-category=""
            />
          </div>
          <div className="flex items-start justify-between">
            <div className="sort order flex items-center justify-between rounded-[4px] border border-[#dcdcdc]">
              <SortBy />
            </div>
            <div className="product-list-modification flex gap-4">
              <div className="flex items-center justify-between rounded-[4px] border border-[#dcdcdc] px-[10px] py-2">
                <ProductGridSwitcher />
              </div>
              <ProductCountFilter />
            </div>
          </div>
        </div>

        <div className="show-filters-div flex flex-col gap-3 whitespace-nowrap md:flex-row">
          <MobileSideNav>
            <FacetedSearch
              facets={search.facets.items}
              headingId="mobile-filter-heading"
              pageType="category"
            >
              <SubCategories categoryTree={categoryTree} />
            </FacetedSearch>
          </MobileSideNav>
          <div className="flex w-max flex-col items-start gap-4 md:flex-row md:items-center md:justify-end md:gap-6">
            <div className="order-3 py-4 text-base font-semibold md:order-2 md:py-0">
              {t('sortBy', { items: productsCollection.collectionInfo?.totalItems ?? 0 })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8">
        <FacetedSearch
          className="mb-8 hidden h-max lg:block"
          facets={search.facets.items}
          headingId="desktop-filter-heading"
          pageType="category"
        >
          <SubCategories categoryTree={categoryTree} />
        </FacetedSearch>

        <section
          aria-labelledby="product-heading"
          className="col-span-4 group-has-[[data-pending]]:animate-pulse lg:col-span-3"
        >
          <h2 className="sr-only" id="product-heading">
            {t('products')}
          </h2>

          <div className="product-grid grid grid-cols-4 gap-6 sm:gap-8">
            {products.map((product, index) => (
              <ProductCard
                imagePriority={index <= 3}
                imageSize="wide"
                key={product.entityId}
                product={product}
              />
            ))}
          </div>

          <Pagination
            endCursor={endCursor ?? undefined}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            startCursor={startCursor ?? undefined}
          />
        </section>
      </div>

      <CategoryViewed category={category} categoryId={categoryId} products={products} />
    </div>
  );
}

export const runtime = 'edge';
