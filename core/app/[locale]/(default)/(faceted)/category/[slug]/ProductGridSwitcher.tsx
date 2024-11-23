
'use client';  

import React, { useState } from 'react';

export const ProductGridSwitcher = () => {
  const [columns, setColumns] = useState(3);
  const gridOptions = [1, 2, 3,4, 5, 6];

  const handleColumnChange = (option: number) => {
    setColumns(option);
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
     
      productGrid.classList.remove(
        'grid-cols-1',
        'grid-cols-2',
        'grid-cols-3',
        'grid-cols-4',
        'grid-cols-5',
        'grid-cols-6',
        'sm:grid-cols-2',
        'sm:grid-cols-3'
      );
      
      
      if (option === 1) {
        productGrid.classList.add('grid-cols-1');
      } else {
        productGrid.classList.add(`grid-cols-${option}`);
      }
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm font-medium mr-2">View:</span>
      {gridOptions.map((option) => (
        <button
          key={option}
          onClick={() => handleColumnChange(option)}
          className={`px-3 py-1.5 rounded text-sm ${
            columns === option
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          } transition-colors duration-200`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ProductGridSwitcher;