'use client';
 
import { Badge, ShoppingCart } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { z } from 'zod';
 
import Minicart from '../ui/header/minicart';
 
import { useCart } from './cart-provider';

const CartQuantityResponseSchema = z.object({
  count: z.number(),
  cartItems: z.any()
});
 
interface CartIconProps {
  count?: number;
  cartObj?: any;
}
 
export const CartIcon = ({ count: serverCount }: CartIconProps) => {
  const { count, setCount } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState('');
  const locale = useLocale();
  useEffect(() => {
    async function fetchCartQuantity() {
      const response = await fetch(`/api/cart-quantity/?locale=${locale}`);
      const parsedData = CartQuantityResponseSchema.parse(await response.json());
      setCartItems(parsedData?.cartItems);
      setCount(parsedData.count);
      setCartId(parsedData?.cartId);
    }

    if (serverCount !== undefined) {
      setCount(serverCount);
    } else {
      // When a page is rendered statically via the 'force-static' route config option, cookies().get() always returns undefined,
      // which ultimately means that the `serverCount` here will always be undefined on initial render, even if there actually is
      // a populated cart. Thus, we perform a client-side check in this case.
      void fetchCartQuantity();
    }
  }, [serverCount, locale, setCount]);
 
  if (!count) {
    return <ShoppingCart aria-label="cart" />;
  }
 
  return (
    <>
      <span className="sr-only">Cart Items</span>
      <ShoppingCart aria-hidden="true" />
      <Badge>{count}</Badge>
    </>
  );
};
 
