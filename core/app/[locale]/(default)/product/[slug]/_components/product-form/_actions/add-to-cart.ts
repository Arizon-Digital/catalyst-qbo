'use server';

import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import { FragmentOf, graphql } from '~/client/graphql';
import {
  addCartLineItem,
  assertAddCartLineItemErrors,
} from '~/client/mutations/add-cart-line-item';
import { assertCreateCartErrors, createCart } from '~/client/mutations/create-cart';
import { getCart } from '~/client/queries/get-cart';
import { TAGS } from '~/client/tags';

import { ProductFormFragment } from '../fragment';
import { ProductFormData } from '../use-product-form';

type CartSelectedOptionsInput = ReturnType<typeof graphql.scalar<'CartSelectedOptionsInput'>>;

export async function handleAddToCart(
  data: ProductFormData,
  product: FragmentOf<typeof ProductFormFragment>,
) {
  const productEntityId = Number(data.product_id);
  const quantity = Number(data.quantity);

  const cookieStore = await cookies();
  const cartId = cookieStore.get('cartId')?.value;

  let cart;
  let cartData: any = {};

  const selectedOptions = removeEdgesAndNodes(
    product.productOptions,
  ).reduce<CartSelectedOptionsInput>((accum, option) => {
    const optionValueEntityId = data[`attribute_${option.entityId}`];

    let multipleChoicesOptionInput;
    let checkboxOptionInput;
    let numberFieldOptionInput;
    let textFieldOptionInput;
    let multiLineTextFieldOptionInput;
    let dateFieldOptionInput;

    // Skip empty strings since option is empty
    if (optionValueEntityId === '') return accum;

    switch (option.__typename) {
      case 'MultipleChoiceOption':
        multipleChoicesOptionInput = {
          optionEntityId: option.entityId,
          optionValueEntityId: Number(optionValueEntityId),
        };

        if (accum.multipleChoices) {
          return {
            ...accum,
            multipleChoices: [...accum.multipleChoices, multipleChoicesOptionInput],
          };
        }

        return { ...accum, multipleChoices: [multipleChoicesOptionInput] };

      case 'CheckboxOption':
        checkboxOptionInput = {
          optionEntityId: option.entityId,
          optionValueEntityId:
            Number(optionValueEntityId) !== 0
              ? option.checkedOptionValueEntityId
              : option.uncheckedOptionValueEntityId,
        };

        if (accum.checkboxes) {
          return { ...accum, checkboxes: [...accum.checkboxes, checkboxOptionInput] };
        }

        return { ...accum, checkboxes: [checkboxOptionInput] };

      case 'NumberFieldOption':
        numberFieldOptionInput = {
          optionEntityId: option.entityId,
          number: Number(optionValueEntityId),
        };

        if (accum.numberFields) {
          return { ...accum, numberFields: [...accum.numberFields, numberFieldOptionInput] };
        }

        return { ...accum, numberFields: [numberFieldOptionInput] };

      case 'TextFieldOption':
        textFieldOptionInput = {
          optionEntityId: option.entityId,
          text: String(optionValueEntityId),
        };

        if (accum.textFields) {
          return {
            ...accum,
            textFields: [...accum.textFields, textFieldOptionInput],
          };
        }

        return { ...accum, textFields: [textFieldOptionInput] };

      case 'MultiLineTextFieldOption':
        multiLineTextFieldOptionInput = {
          optionEntityId: option.entityId,
          text: String(optionValueEntityId),
        };

        if (accum.multiLineTextFields) {
          return {
            ...accum,
            multiLineTextFields: [...accum.multiLineTextFields, multiLineTextFieldOptionInput],
          };
        }

        return { ...accum, multiLineTextFields: [multiLineTextFieldOptionInput] };

      case 'DateFieldOption':
        dateFieldOptionInput = {
          optionEntityId: option.entityId,
          date: new Date(String(optionValueEntityId)).toISOString(),
        };

        if (accum.dateFields) {
          return {
            ...accum,
            dateFields: [...accum.dateFields, dateFieldOptionInput],
          };
        }

        return { ...accum, dateFields: [dateFieldOptionInput] };
    }

    return accum;
  }, {});

  try {
    cart = await getCart(cartId);
    
    if (cart) {
      const addCartLineItemResponse = await addCartLineItem(cart.entityId, {

        lineItems: [
          {
            productEntityId,
            selectedOptions,
            quantity,
          },
        ],
      });
      assertAddCartLineItemErrors(addCartLineItemResponse);

      cart = addCartLineItemResponse.data.cart.addCartLineItems?.cart;
      if (!cart?.entityId) {
        return { status: 'error', error: 'Failed to add product to cart.', items: cartData};
      }
      let cartDataValue: any = await getCart(cart?.entityId);
      if(cartDataValue?.lineItems?.physicalItems) {
        cartData = cartDataValue;
      }

      revalidateTag(TAGS.cart);

      return { status: 'success', data: cart, items: cartData };
    }

    // Create cart
    const createCartResponse = await createCart([
      {
        productEntityId,
        selectedOptions,
        quantity,
      },
    ]);
    assertCreateCartErrors(createCartResponse);

    cart = createCartResponse.data.cart.createCart?.cart;
    if (!cart?.entityId) {
      return { status: 'error', error: 'Failed to add product to cart.', items: cartData };
    }
    let cartDataValue: any = await getCart(cart?.entityId);
    if(cartDataValue?.lineItems?.physicalItems) {
      cartData = cartDataValue;
    }

    cookieStore.set({
      name: 'cartId',
      value: cart.entityId,
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
    });

    revalidateTag(TAGS.cart);

    return { status: 'success', data: cart , items: cartData };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { status: 'error', error: error.message , items: cartData  };
    }

    return { status: 'error', error: 'Something went wrong. Please try again.', items: cartData };
  }
}
