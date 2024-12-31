
'use client';

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FragmentOf } from 'gql.tada';
import { useFormatter, useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';

import { Button } from '~/components/ui/button';
import { ProductItemFragment } from '~/client/fragments/product-item';
import { Link } from '~/components/link';
import { BcImage } from '~/components/bc-image';
import { CheckoutButtonPopUp } from "./checkout-button";
import { pricesTransformer } from "~/data-transformers/prices-transformer";

interface Props {
  data: FragmentOf<typeof ProductItemFragment>;
  count?: number;
  cartId?: any;
}

const DialogDemo = ({ 
  open, 
  setOpen, 
  data, 
  itemVal, 
  count, 
  cartId, 
  handleModalClose 
}: { 
  open: boolean, 
  setOpen: any, 
  data: any, 
  itemVal: any, 
  count?: any, 
  cartId?: any, 
  handleModalClose?: any 
}) => {
  const [counterSec, setCounterSec] = useState(10);

  useEffect(() => {
    if(counterSec > 0) {
      setTimeout(() => {
        setCounterSec(counterSec - 1);
      }, 1000);
    } else {
      handleModalClose();
    }
  }, [counterSec, handleModalClose]);

  let productPrice: any;
  if(data?.price) {
    productPrice = data?.price;
  } else {
    const format = useFormatter();
    productPrice = pricesTransformer(data?.prices, format);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" style={{ pointerEvents: 'none' }} />
        <Dialog.Content 
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[90vw] max-w-md"
          style={{ pointerEvents: 'auto' }}
        >
          <Dialog.Title className="DialogTitle">
            <span>{count} ITEMS WERE ADDED TO YOUR CART</span>
          </Dialog.Title>

          <fieldset className="Fieldset">
            <BcImage
              width={320}
              height={320}
              className="imagerecents"
              src={data?.defaultImage?.url}
              alt={data?.defaultImage?.altText}
            />
            <label className="Label" htmlFor="name">
              <p>{data?.name}</p>
              <p>1 x {productPrice}</p>
              <p>SKU: {data?.SKU}</p>
              <p className="text-base text-gray-500">{data?.subtitle}</p>
            </label>
          </fieldset>

          <div style={{ textAlign: "center", marginTop: "25px" }}>
            <div className="mt-4 space-y-2">
              <CheckoutButtonPopUp cartId={cartId} style={{ display: "flex" }} />
              <Link
                href="/cart"
                className="block w-full border border-gray-200 text-center py-2 rounded-md hover:bg-gray-100"
                style={{ display: "inline-block" }}
              >
                VIEW CART
              </Link>
              <p>Auto close after {counterSec}s</p>
            </div>
          </div>

          <Dialog.Close className="absolute top-4 right-4 p-2">
            <span className="sr-only">Close</span>
            <svg 
              width="15" 
              height="15" 
              viewBox="0 0 15 15" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <line x1="1" y1="1" x2="14" y2="14" />
              <line x1="1" y1="14" x2="14" y2="1" />
            </svg>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default DialogDemo;