'use server';
 
import { cache } from 'react';
 
import { getProduct } from '~/app/[locale]/(default)/product/[slug]/page-data';
 
  export const getProductData = cache(async (variables: any) => {
    return await getProduct(variables);
  });
 