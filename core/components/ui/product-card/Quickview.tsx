// QuickView.tsx
'use client';
 
import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ChevronUp, ChevronDown } from 'lucide-react';
import { Details } from '~/app/[locale]/(default)/product/[slug]/_components/details';
import { Gallery } from '~/app/[locale]/(default)/product/[slug]/_components/gallery';
import { Warranty } from '~/app/[locale]/(default)/product/[slug]/_components/warranty';
import { Description } from '~/app/[locale]/(default)/product/[slug]/_components/description';
 
interface Image {
  altText: string;
  src: string;
}
 
type Price =
  | string
  | {
      type: 'sale';
      currentValue: string;
      previousValue: string;
    }
  | {
      type: 'range';
      minValue: string;
      maxValue: string;
    };
 
interface QuickViewProps {
  product: any;
}
 
const QuickView = ({
  product
}: QuickViewProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
 
  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };
 
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
 
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute left-[10%] top-[40%] hover:opacity-100  transition-all duration-300
          bg-orange-500 hover:bg-white h-[40px] 
          text-white hover:text-orange-500
          w-[80%] flex items-center justify-center gap-2 py-2.5 px-4
          font-semibold text-sm
          border border-orange-500
          shadow-sm z-10"
      ><svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white group-hover:text-orange-500"
    >
      <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0a4.5 4.5 0 1 1-.01-8.99A4.5 4.5 0 0 1 14 10.5c0 2.49-2.01 4.5-4.5 4.5z"/>
    </svg>
        Quick View
      </button>
 
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[90vh] w-[90vw] max-w-4xl translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-lg bg-white shadow-lg">
            <div className="p-8">
              <Dialog.Close className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full z-50">
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Dialog.Close>
 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="mb-12 mt-4 lg:grid lg:grid-cols-2 lg:gap-8 a1">
                <Gallery product={product} />
                <Details product={product} />
               
              </div>
              <div className="lg:col-span-2"  id='tabsection1'>
                <Description product={product} />
                <Warranty product={product} />
              </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
 
export default QuickView;
 