import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { CartItem } from 'app/[locale]/(default)/cart/_components/cart-item'; 

// Popover component accepting dynamic cartItems and currencyCod

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



