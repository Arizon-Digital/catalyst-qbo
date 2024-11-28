'use client';

import { useEffect, useId, useState } from 'react';

import { useCompareDrawerContext } from '../compare-drawer';
import { Checkbox } from '../form/checkbox';
import { Label } from '../form/label';

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
  const checkboxId = useId();

  const [checkedState, setCheckedState] = useState(false);
  const { products, setProducts } = useCompareDrawerContext();

  useEffect(() => {
    setCheckedState(products.some(({ id: productId }) => productId === id));
  }, [products, id]);

  const handleOnCheckedChange = (isChecked: boolean) => {
    setCheckedState(isChecked);

    if (isChecked) {
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
        products.filter(({ id: productId }) => {
          return productId !== id;
        }),
      );
    }
  };

  return (
    <div className="p-0 compare-div-parent transition-all duration-300
          bg-[#ca9618] hover:bg-[#fff] 
          text-[#ffffff] hover:text-[#ca9618]
           flex items-center justify-center gap-2 
          text-[13px] font-[700] text-sm
          border border-[#ca9618]
          shadow-sm z-10 w-full rounded-[4px] py-[3px]">
      <Checkbox
        checked={checkedState}
        className="!h-[17px] !w-[17px] compare-btn-checkbox"
        id={checkboxId}
        onCheckedChange={handleOnCheckedChange}
      />
      <Label className="compare-label-text font-[700] text-[15]" htmlFor={checkboxId}>
        Compare
      </Label>
    </div>
  );
};
