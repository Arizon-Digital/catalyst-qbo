'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import { addCartLineItem } from '~/client/mutations/add-cart-line-item';
import { createCart } from '~/client/mutations/create-cart';
import { getCart } from '~/client/queries/get-cart';
import { TAGS } from '~/client/tags';

export const addToCart = async (data: FormData) => {
  const productEntityId = Number(data.get('product_id'));

  const cartId = cookies().get('cartId')?.value;
  let cart;
  let cartData: any = {};

  try {
    cart = await getCart(cartId);

    if (cart) {
      cart = await addCartLineItem(cart.entityId, {
        lineItems: [
          {
            productEntityId,
            quantity: 1,
          },
        ],
      });

      if (!cart?.entityId) {
        return { status: 'error', error: 'Failed to add product to cart.', items: cartData };
      }

      let cartDataValue: any = await getCart(cart?.entityId);
      if(cartDataValue?.lineItems?.physicalItems) {
        cartData = cartDataValue;
      }
      revalidateTag(TAGS.cart);

      return { status: 'success', data: cart, items: cartData };
    }

    cart = await createCart([{ productEntityId, quantity: 1 }]);

    if (!cart?.entityId) {
      return { status: 'error', error: 'Failed to add product to cart.', items: cartData };
    }

    let cartDataValue: any = await getCart(cart?.entityId);
    if(cartDataValue?.lineItems?.physicalItems) {
      cartData = cartDataValue;
    }

    cookies().set({
      name: 'cartId',
      value: cart.entityId,
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
    });

    revalidateTag(TAGS.cart);

    return { status: 'success', data: cart, items: cartData };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { status: 'error', error: error.message, items: cartData };
    }

    return { status: 'error', error: 'Something went wrong. Please try again.', items: cartData };
  }
};
