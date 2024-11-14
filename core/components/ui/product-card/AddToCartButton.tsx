'use client'
import React, { useState } from 'react';
import DialogDemo from '../header/addtocartpopup';
import { addCountToCookiesCart } from '~/app/[locale]/(default)/compare/_actions/add-to-cart';
interface AddToCartButtonProps {
    addToCardData: any;
    productId: number;
  }
export const AddToCartButton=({addToCardData,productId}:AddToCartButtonProps)=>{
    const [addtocartpopup, setAddtocart] = useState(false)
    async function addCountToCart(productId: number) {
       
        try {
            addCountToCookiesCart(productId)
            setAddtocart(true)
          console.log('Added to cart successfully');
        } catch (error) {
          console.error('Unexpected error:', error);
        }
      }
     
return(
    <>
    <button style={{top:"25px"}}
        onClick={() => addCountToCart(productId)}
    className="absolute bottom-0 left-0 right-0 group-hover:opacity-100 opacity-0 transition-all duration-300
                bg-orange-500 hover:bg-white
                text-white hover:text-orange-500
                w-full flex items-center justify-center gap-2 py-2.5 px-4
                font-semibold text-sm
                border border-orange-500
                shadow-sm z-10"
  ><svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="currentColor"
  className="text-white group-hover:text-orange-500"
>
  <path d="M17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm0-3l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1v2h2l3.6 7.59L3.62 17H19v-2H7z"/>
</svg>Add to cart</button>
 
  <DialogDemo open={addtocartpopup} setOpen={setAddtocart} data={addToCardData} itemVal={undefined}/>
</>
)
}
 