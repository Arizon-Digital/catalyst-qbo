'use client';
import * as Dialog from "@radix-ui/react-dialog";
import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { FragmentOf } from 'gql.tada';
import { AlertCircle, Check, Heart, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FormProvider, useFormContext } from 'react-hook-form';
import { toast } from 'react-hot-toast';
 
 
import { ProductItemFragment } from '~/client/fragments/product-item';
import { AddToCartButton } from '~/components/add-to-cart-button';
import { Link } from '~/components/link';
import { Button } from '~/components/ui/button';
import { bodl } from '~/lib/bodl';
 
import { BcImage } from '~/components/bc-image';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useLocale } from 'next-intl';
import { Cart } from "~/components/header/cart";
 
interface Props {
    data: FragmentOf<typeof ProductItemFragment>;
    count?: number;
}
const CartQuantityResponseSchema = z.object({
    count: z.number(),
  });
 
    // const CartIcon = ({ count }: Props) => {
   
 
   
    // }
const DialogDemo = ({ open, setOpen, data,itemVal, count }: { open: boolean, setOpen: any, data: any ,itemVal:any, count?:any}) => {
    const [fetchedCount, setFetchedCount] = useState<number | null>();
    const computedCount = count ?? fetchedCount;
    const locale = useLocale();
 
    useEffect(() => {
      async function fetchCartQuantity() {
        const response = await fetch(`/api/cart-quantity/?locale=${locale}`);
        const parsedData = CartQuantityResponseSchema.parse(await response.json());
 
        setFetchedCount(parsedData.count);
      }
 
      // When a page is rendered statically via the 'force-static' route config option, cookies().get() always returns undefined,
      // which ultimately means that the `count` prop here will always be undefined on initial render, even if there actually is
      // a populated cart. Thus, we perform a client-side check in this case.
      if (count === undefined) {
        void fetchCartQuantity();
      }
    }, [count, locale]);
 
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Portal>
     
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">
                   {/* {data?.cartCount} 19 ITEMS  WERE ADDED TO YOUR CART. */}
                    <span> {computedCount} ITEMS  WERE ADDED TO YOUR CART.</span>
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
                            <p>{data?.price} </p>
                         
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
                <Link
                  href="https://store-ur7wjnshy8-1646467.checkout.catalyst-sandbox.store/checkout"
                  className="block w-full bg-primary text-white text-center py-2 rounded-md hover:bg-primary/90"
                >
                  PROCEED TO CHECKOUT
                </Link>
                <Link
                  href="/cart"
                  className="block w-full border border-gray-200 text-center py-2 rounded-md hover:bg-gray-100"
                >
                  VIEW CART
                </Link>
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