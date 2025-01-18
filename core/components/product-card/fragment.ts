import { PricingFragment } from '~/client/fragments/pricing';
import { graphql } from '~/client/graphql';

import { AddToCartFragment } from './add-to-cart/fragment';

export const ProductCardFragment = graphql(
  `
    fragment ProductCardFragment on Product {
      entityId
      name
      description
      defaultImage {
        altText
        url: urlTemplate(lossy: true)
      }
      path
      brand {
        name
        path
      }
      reviewSummary {
        numberOfReviews
        averageRating
      }
      ...AddToCartFragment
      ...PricingFragment
    }
  `,
  [AddToCartFragment, PricingFragment],
);
