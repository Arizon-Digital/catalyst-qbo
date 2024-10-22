'use client'; // Ensure this component is treated as a client component
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

const Quickview = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="absolute bg-primary text-white rounded hover:bg-primary-dark flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          width: '100%', // Full width of the parent
          height: '40px', // Adjust height
          fontSize: '14px', // Same font size for consistency
          top: '90px', // Position below Add to Cart button
          left: '50%', // Center horizontally
          transform: 'translate(-50%, -50%)', // Center the button
        }}
      >
        Quickview
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
      <Dialog.Content 
        className="fixed bg-white rounded-md p-6 z-50"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '500px',
        }}
      >
        <Dialog.Title className="text-lg font-bold">Product Quick View</Dialog.Title>
        <Dialog.Description className="mt-4 text-sm">
          Here are the details about the product you selected.
        </Dialog.Description>
        <div style={{ display: "flex", marginTop: '20px', justifyContent: "flex-end" }}>
          <Dialog.Close asChild>
            <button className="Button bg-green-500 text-white px-4 py-2 rounded">Close</button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Quickview;






