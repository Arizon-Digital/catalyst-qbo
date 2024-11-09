
"use client";

import React, { useState, useEffect } from 'react';
import { ProductCard } from '~/components/product-card';
// import { fetchFacetedSearch } from '../fetch-faceted-search';
import { storeProductLimitInCookies } from '../_actions/store-prod-data-limit';
interface ProductLimitSelectorProps {
  initialProducts: any[];
  categoryId: number;
  searchParams: Record<string, string | string[] | undefined>;
}

// export function ProductLimitSelector({ initialProducts, categoryId, searchParams }: ProductLimitSelectorProps) {
//   const [productLimit, setProductLimit] = useState(50);
//   const [products, setProducts] = useState(initialProducts);

  const handleLimitChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(event.target.value);    
    storeProductLimitInCookies(newLimit)
    setProductLimit(newLimit);

    
  //   const search = await fetchFacetedSearch({ ...searchParams, category: categoryId, limit: newLimit });
  //   setProducts(search.products.items);
  // };

  return (
    <div>
      {productLimit}
      <select onChange={handleLimitChange} value={productLimit}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>

      
    </div>
  );
}
