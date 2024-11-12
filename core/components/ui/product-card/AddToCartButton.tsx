'use client'
 
import React, { useState } from 'react';
import DialogDemo from '../header/addtocartpopup';
export const AddToCartButton=({addToCardData}:any)=>{
    const [addtocartpopup, setAddtocart] = useState(false)
   
return(
    <>
    <button style={{top:"25px"}}
        onClick={() => setAddtocart(true)}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg
          shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200
          hover:bg-primary hover:text-white z-10"
      >Add to cart</button>
     
      <DialogDemo open={addtocartpopup} setOpen={setAddtocart} data={addToCardData} itemVal={undefined}/>
    </>
)
}
 