import { getSessionCustomerAccessToken } from '~/auth';

import { client } from '..';
import { graphql, VariablesOf } from '../graphql';
import { getCurrencyCodeFn } from "~/components/header/_actions/getCurrencyList";

const CreateCartMutation = graphql(`
  mutation CreateCartMutation($createCartInput: CreateCartInput!) {
    cart {
      createCart(input: $createCartInput) {
        cart {
          entityId
        }
      }
    }
  }
`);

type Variables = VariablesOf<typeof CreateCartMutation>;
type CreateCartInput = Variables['createCartInput'];
type LineItems = CreateCartInput['lineItems'];

export const createCart = async (cartItems: LineItems) => {
  const customerAccessToken = await getSessionCustomerAccessToken();
  let currencyCode: string = await getCurrencyCodeFn() || 'CAD';

  const response = await client.fetch({
    document: CreateCartMutation,
    variables: {
      createCartInput: {
        lineItems: cartItems,
        currencyCode: currencyCode
      },
    },
    customerAccessToken,
    fetchOptions: { cache: 'no-store' },
  });

  return response.data.cart.createCart?.cart;
};
