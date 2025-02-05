'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';

import { Tag } from '~/components/ui/tag';
import { usePathname, useRouter } from '~/i18n/routing';

import type { Facet, PageType, PublicParamKeys } from '../types';

export interface Props {
  facets: Facet[];
  pageType: PageType;
}

interface FacetProps<Key extends string> {
  key: Key;
  display_name: string;
  value: string;
}

const mapFacetsToRefinements = ({ facets, pageType }: Props) =>
  facets
    .map<Array<FacetProps<string>>>((facet) => {
      switch (facet.__typename) {
        case 'BrandSearchFilter':
          if (pageType === 'brand') {
            return [];
          }

          return facet.brands
            .filter((brand) => brand.isSelected)
            .map<FacetProps<PublicParamKeys>>(({ name, entityId }) => ({
              key: 'brand',
              display_name: name,
              value: String(entityId),
            }));

        case 'CategorySearchFilter':
          if (pageType === 'category') {
            return [];
          }

          return facet.categories
            .filter((category) => category.isSelected)
            .map<FacetProps<PublicParamKeys>>(({ name, entityId }) => ({
              key: 'categoryIn',
              display_name: name,
              value: String(entityId),
            }));

        case 'RatingSearchFilter':
          return facet.ratings
            .filter((rating) => rating.isSelected)
            .map<FacetProps<PublicParamKeys>>(({ value }) => ({
              key: 'minRating',
              display_name: `Rating ${value} & up`,
              value,
            }));

        case 'ProductAttributeSearchFilter':
          return facet.attributes
            .filter(({ isSelected }) => isSelected)
            .map<FacetProps<string>>(({ value }) => {
              return {
                key: `attr_${facet.filterName}`,
                display_name: value,
                value,
              };
            });

        case 'OtherSearchFilter': {
          const { freeShipping, isFeatured, isInStock } = facet;

          const shipping: FacetProps<PublicParamKeys> | undefined = freeShipping?.isSelected
            ? {
                key: 'shipping',
                display_name: 'Free Shipping',
                value: 'free_shipping',
              }
            : undefined;

          const stock: FacetProps<PublicParamKeys> | undefined = isInStock?.isSelected
            ? {
                key: 'stock',
                display_name: 'In Stock',
                value: 'in_stock',
              }
            : undefined;

          const featured: FacetProps<PublicParamKeys> | undefined = isFeatured?.isSelected
            ? {
                key: 'isFeatured',
                display_name: 'Is Featured',
                value: 'on',
              }
            : undefined;

          return [shipping, stock, featured].filter(
            (props): props is FacetProps<PublicParamKeys> => props !== undefined,
          );
        }

        default:
          return [];
      }
    })
    .flat();

export const RefineBy = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const refinements = mapFacetsToRefinements(props);
  const t = useTranslations('FacetedGroup.FacetedSearch.RefineBy');

  const removeRefinement = (refinement: FacetProps<string>) => {
    const filteredParams = Array.from(searchParams.entries()).filter(
      ([key, value]) => refinement.key !== key || refinement.value !== value,
    );

    const params = new URLSearchParams(filteredParams);

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const clearAllRefinements = () => {
    startTransition(() => {
      router.push(pathname);
    });
  };

  if (!refinements.length) {
    return null;
  }

  return (
    <div data-pending={isPending ? '' : undefined} >
      <div className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-[15px] font-[700]">{t('refineBy')}</h3>
        {/* TODO: Make subtle variant */}
        <button className="text-[15px] text-primary" onClick={clearAllRefinements}>
          {t('clearAllRefinements')}
        </button>
      </div>
      <ul className="mb-4 flex flex-row flex-wrap gap-2 py-2">
        {refinements.map((refinement) => (
          <li key={`${refinement.key}-${refinement.value}`}>
            <Tag content={refinement.display_name} onRemove={() => removeRefinement(refinement)} />
          </li>
        ))}
      </ul>
    </div>
  );
};
