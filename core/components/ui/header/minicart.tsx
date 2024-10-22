// 'use client';
// import React from "react";
// import * as Dialog from "@radix-ui/react-dialog";
// import { CartItem } from 'app/[locale]/(default)/cart/_components/cart-item'; // Import your CartItem component
// import { useFormatter } from 'next-intl'; // Use the formatter for currency

// const products = [
//   // Array of product data you'd normally retrieve from the API
//   {
//     name: 'Product 1',
//     brand: 'Brand 1',
//     sku: 'SKU123',
//     image: {
//       url: 'https://via.placeholder.com/144'
//     },
//     entityId: 1,
//     quantity: 2,
//     productEntityId: 1,
//     variantEntityId: 1,
//     extendedSalePrice: { value: 100, currencyCode: 'USD' },
//     originalPrice: { value: 120, currencyCode: 'USD' }
//   },
//   {
//     name: 'Product 2',
//     brand: 'Brand 2',
//     sku: 'SKU124',
//     image: {
//       url: 'https://via.placeholder.com/144'
//     },
//     entityId: 2,
//     quantity: 1,
//     productEntityId: 2,
//     variantEntityId: 2,
//     extendedSalePrice: { value: 50, currencyCode: 'USD' },
//     originalPrice: { value: 60, currencyCode: 'USD' }
//   },
// ];

// const Minicart = () => {
//   const format = useFormatter();

//   return (
//     <Dialog.Root>
//       <Dialog.Trigger asChild>
//         <button className="absolute bg-primary text-white rounded hover:bg-primary-dark flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//           style={{
//             width: '100%', // Full width of the parent
//             height: '40px', // Adjust height
//             fontSize: '14px', // Same font size for consistency
//             top: '90px', // Position below Add to Cart button
//             left: '50%', // Center horizontally
//             transform: 'translate(-50%, -50%)', // Center the button
//           }}
//         >
//           Quickview
//         </button>
//       </Dialog.Trigger>
//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
//         <Dialog.Content 
//           className="fixed bg-white rounded-md p-6 z-50"
//           style={{
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: '90%',
//             maxWidth: '500px',
//           }}
//         >
//           <Dialog.Title className="text-lg font-bold">Your Cart</Dialog.Title>
//           <Dialog.Description className="mt-4 text-sm">
//             Here are the items in your cart:
//           </Dialog.Description>

//           {/* Cart Items Section */}
//           <ul className="cart-items">
//             {products.map((product, index) => (
//               <CartItem 
//                 key={index}
//                 product={product}
//                 currencyCode={product.extendedSalePrice.currencyCode} 
//                 deleteIcon="https://cdn11.bigcommerce.com/s-ur7wjnshy8/images/stencil/320w/image-manager/delete.jpg" 
//               />
//             ))}
//           </ul>

//           <div style={{ display: "flex", marginTop: '20px', justifyContent: "flex-end" }}>
//             <Dialog.Close asChild>
//               <button className="Button bg-green-500 text-white px-4 py-2 rounded">Close</button>
//             </Dialog.Close>
//           </div>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// };

// export default Minicart;


import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { CartItem } from 'app/[locale]/(default)/cart/_components/cart-item'; // Import your CartItem component

// Popover component accepting dynamic cartItems and currencyCode
const Minicart = ({ CartItems, currencyCode }) => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <button
        className="tab"
        style={{
          
        }}
        aria-label="Quickview"
      >
         Cart
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        className="fixed bg-white rounded-md p-6 z-50"
        style={{
          top: '120px',
          right: '-190px',
          transform: 'translate(-50%, -50%)',
          width: '290px',
          maxWidth: '1500px',
        }}
        sideOffset={5}
      >
        <h3 className="text-lg font-bold">MiniCart</h3>
        <div className="mt-4">
          {Array.isArray(CartItems) && CartItems.length > 0 ? ( // Check if cartItems is an array
            <ul>
              {CartItems.map((item) => (
                <CartItem key={item.entityId} product={item} currencyCode={currencyCode} />
              ))}
            </ul>
          ) : (
            <p className="text-sm">Your cart is empty.</p>
          )}
        </div>
        <div style={{ display: "flex", marginTop: '20px', justifyContent: "flex-end" }}>
          <Popover.Close asChild>
            <button className="Button bg-green-500 text-white px-4 py-2 rounded" aria-label="Close">
              Close
            </button>
          </Popover.Close>
        </div>
        <Popover.Arrow className="PopoverArrow" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default Minicart;



