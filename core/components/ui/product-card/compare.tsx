
'use client';

import { useEffect, useState } from 'react';
import { useCompareDrawerContext } from '../compare-drawer';
import { ArrowLeftRight } from 'lucide-react';

interface Image {
  altText?: string;
  src?: string;
}

interface Props {
  id: string;
  image?: Image;
  name: string;
}

export const Compare = ({ id, image, name }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const { products, setProducts } = useCompareDrawerContext();
  
  useEffect(() => {
    setIsActive(products.some(({ id: productId }) => productId === id));
  }, [products, id]);
  
  const handleClick = () => {
    const newState = !isActive;
    setIsActive(newState);
    
    if (newState) {
      setProducts([
        ...products,
        {
          id,
          image: image?.src ? { src: image.src, altText: image.altText ?? name } : undefined,
          name,
        },
      ]);
    } else {
      setProducts(
        products.filter(({ id: productId }) => productId !== id)
      );
    }
  };
  
  return (
    <button
      onClick={handleClick}
      className={`p-[2px] transition-all duration-300
        ${isActive ? 'bg-[#ca9618] text-white' : 'bg-white text-[#ca9618]'}
        hover:bg-[#ca9618] hover:text-white
        flex items-center justify-center
        border border-[#ca9618]
        shadow-sm rounded-[4px] w-8 h-8`}
    >
      <ArrowLeftRight className="h-[17px] w-[17px]" />
    </button>
  );
};