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

const DialogDemo = ({ open, setOpen, data, itemVal, count, cartId, handleModalClose }: { open: boolean, setOpen: any, data: any, itemVal: any, count?: any, cartId?: any, handleModalClose?: any }) => {
  const [counterSec, setCounterSec] = useState(10);
  useEffect(() => {
    if(counterSec > 0) {
      setTimeout(() => {
        setCounterSec(counterSec - 1);
      }, 1000);
    } else {
      handleModalClose();
    }
  }, [counterSec]);
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

        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">
            {/* {data?.cartCount} 19 ITEMS  WERE ADDED TO YOUR CART. */}
            <span> {count} ITEMS  WERE ADDED TO YOUR CART.</span>
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">

          </Dialog.Description>
          <fieldset className="Fieldset">
            <BcImage
              width={320}
              height={320}
              className="imagerecents"
              src={data?.defaultImage?.url}
              alt={data?.defaultImage?.altText}
            />
            <label className="Label" htmlFor="name">
              <p>{data?.name} </p>
              <p>1 x {productPrice} </p>

              <p className="text-base text-grayy-500">{data?.subtitle}</p>
            </label>
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">

            </label>

          </fieldset>
          <div
            style={{ display: "flex", marginTop: 25, justifyContent: "flex-start" }}
          >

            <div className="mt-4 space-y-2">
              <CheckoutButtonPopUp cartId={cartId}  />
              <Link
                href="/cart"
                className="block w-full border border-gray-200 text-center py-2 rounded-md hover:bg-gray-100"
              >
                VIEW CART
              </Link>
              Auto close after {counterSec}s
            </div>
            <Dialog.Close asChild>
              <button className="Button green"></button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">

            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )

}
export default (DialogDemo);