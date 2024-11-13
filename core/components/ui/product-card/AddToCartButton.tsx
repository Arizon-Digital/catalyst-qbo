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
        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg
          shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200
          hover:bg-primary hover:text-white z-10"
      >Add to cart</button>
     
      <DialogDemo open={addtocartpopup} setOpen={setAddtocart} data={addToCardData} itemVal={undefined}/>
    </>
)
}
 