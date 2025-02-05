'use client';

import { FragmentOf } from 'gql.tada';
import { AlertCircle, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { toast } from 'react-hot-toast';

import { AddToCartButton } from '~/components/add-to-cart-button';
import { useCart } from '~/components/header/cart-provider';
import { Link } from '~/components/link';

import { AddToCartFragment } from '../fragment';

import { addToCart } from './_actions/add-to-cart';
import { useCommonContext } from '~/components/common-context/common-provider';

interface Props {
  data: FragmentOf<typeof AddToCartFragment>;
}

export const Form = ({ data: product }: Props) => {
  const t = useTranslations('Components.ProductCard.AddToCart');
  const cart = useCart();
  const [isPending, startTransition] = useTransition();
  const cartContext = useCommonContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const quantity = Number(formData.get('quantity'));

    // Optimistic update
    cart.increment(quantity);

    startTransition(async () => {
      const result = await addToCart(formData);

      if (result.error) {
        cart.decrement(quantity);

        toast.error(t('error'), {
          icon: <AlertCircle className="text-error-secondary" />,
        });
      }
      cartContext.setCartIdFn(result?.data?.entityId);
      toast.success(
        () => (
          <div className="flex items-center gap-3">
            <span>
              {t.rich('success', {
                cartItems: quantity,
                cartLink: (chunks) => (
                  <Link
                    className="font-semibold text-primary"
                    href="/cart"
                    prefetch="viewport"
                    prefetchKind="full"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </span>
          </div>
        ),
        { icon: <Check className="text-success-secondary" /> },
      );
    });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input name="product_id" type="hidden" value={product.entityId} />
      <input name="quantity" type="hidden" value={1} />
      <AddToCartButton className="mt-2" data={product} loading={isPending} />
    </form>
  );
};
