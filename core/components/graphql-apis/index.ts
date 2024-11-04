'use server';

import { client } from "~/client";
import { graphql } from "~/client/graphql";
import { getSessionCustomerId } from "~/auth";


const GET_RECENTLY_VIEWED_PRODUCTS = graphql(`
    query recentlyViewedProducts($productIds: [Int!], $currencyCode: currencyCode!) {
        site {
            products(entityIds: $productIds) {
                edges {
                    node {
                        entityId
                        name
                        sku
                        path
                        pricesWithTax: prices(includeTax: true, currencyCode: $currencyCode) {
                            price { value currencyCode }
                        }
                        defaultImage {
                            url320wide: url(width: 320)
                            isDefault
                            altText
                        }
                    }
                }
            }
            currency(currencyCode: $currencyCode) {
                display {
                    symbol
                    symbolPlacement
                    decimalPlaces
                }
            }
        }
    }
`);

export const getRecentlyViewedProducts = async (productIds: any, currencyCode: any) => {
    const customerId = await getSessionCustomerId();
    const { data } = await client.fetch({
        document: GET_RECENTLY_VIEWED_PRODUCTS,
        variables: {productIds: productIds, currencyCode: currencyCode}
    });
    return data?.site.products;
}