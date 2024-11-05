
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
import { useState } from 'react';

interface Props {
    data: FragmentOf<typeof ProductItemFragment>;
}



const DialogDemo = ({ open, setOpen, data,itemVal }: { open: boolean, setOpen: any, data: any ,itemVal:any}) => {
    console.log('************',itemVal);

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Portal>
      
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">
                    19 ITEMS  WERE ADDED TO YOUR CART.
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
                  href="/checkout"
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
export default DialogDemo;