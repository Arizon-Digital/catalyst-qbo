// components/ProductsPerPageSelector.tsx
'use client';

import React, { useState, useEffect } from 'react';

const ProductsPerPageSelector = () => {
  const [currentLimit, setCurrentLimit] = useState(20);
  const limitOptions = [20, 40, 60];

  const handleLimitChange = (newLimit: number) => {
    setCurrentLimit(newLimit);
    
    // Get the product grid
    const productGrid = document.querySelector('.product-grid');
    const products = productGrid?.querySelectorAll('.product-card');
    
    if (products) {
      // Hide all products first
      products.forEach((product, index) => {
        const productElement = product as HTMLElement;
        if (index < newLimit) {
          productElement.style.display = '';
        } else {
          productElement.style.display = 'none';
        }
      });
    }
  };

  // Initial setup
  useEffect(() => {
    handleLimitChange(currentLimit);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Show:</span>
      <div className="flex gap-2">
        {limitOptions.map((limit) => (
          <button
            key={limit}
            onClick={() => handleLimitChange(limit)}
            className={`px-3 py-1.5 rounded text-sm ${
              currentLimit === limit
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            } transition-colors duration-200`}
          >
            {limit}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductsPerPageSelector;