'use client';
import React, { useState, useTransition } from 'react';
import DialogDemo from '../header/addtocartpopup';
import { addToCart } from '~/components/product-card/add-to-cart/form/_actions/add-to-cart';
import { Button } from '~/components/ui/button';
import { useCommonContext } from '~/components/common-context/common-provider';

interface AddToCartButtonProps {
  addToCardData: any;
  product: any;
}
export const AddToCartButton = ({ addToCardData, product }: AddToCartButtonProps) => {
  const [addtocartpopup, setAddtocart] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(1);
  const [cartId, setCartId] = useState('');
  const cartContext = useCommonContext();

  const handleModalClose = () => {
    setAddtocart(false);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      try {
        const result = await addToCart(formData);
        if (result?.items?.lineItems?.totalQuantity) {
          setCount(result?.items?.lineItems?.totalQuantity);
          setCartId(result?.data?.entityId || '');
        }
        cartContext.setCartIdFn(result?.data?.entityId);
        setAddtocart(true);
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <input name="product_id" type="hidden" value={product?.entityId} />
        <Button
          loading={isPending}
          loadingText="processing"
          type="submit"
          className="flex w-full plp-addtocart-btn items-center justify-center gap-2 rounded-[4px] !border !border-[#ca9618] bg-[#ca9618] p-0 text-[13px] font-[700] text-[#ffffff] shadow-sm transition-all duration-300 hover:bg-[#fff] hover:text-[#ca9618]"
        >
          <div className="flex items-center justify-center gap-[5px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="pl-[3px]"
            >
              <path d="M17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm0-3l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1v2h2l3.6 7.59L3.62 17H19v-2H7z" />
            </svg>
            <span>ADD TO CART</span>
          </div>
        </Button>
      </form>
      {addtocartpopup && (
        <DialogDemo
          open={addtocartpopup}
          setOpen={setAddtocart}
          handleModalClose={handleModalClose}
          data={addToCardData}
          itemVal={undefined}
          count={count}
          cartId={cartId}
        />
      )}
    </>
  );
};
