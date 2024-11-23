'use client';

import { useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import { Button } from '~/components/ui/button';
import { redirectToCheckout } from "~/app/[locale]/(default)/cart/_actions/redirect-to-checkout";
import { useCommonContext } from '~/components/common-context/common-provider';

const InternalButton = () => {
  const t = useTranslations('Cart');
  const { pending } = useFormStatus();

  return (
    <Button className="block w-full bg-primary text-white text-center py-2 rounded-md hover:bg-primary/90" loading={pending} loadingText={t('loading')}>
      CHECKOUT
    </Button>
  );
};

export const CheckoutButtonPopUp = ({ cartId }: { cartId: string }) => {
  const cartContext = useCommonContext();
  if(!cartId) {
    cartId = cartContext.getCartId;
  }
  return (
    <form action={redirectToCheckout}>
      <input name="cartId" type="hidden" value={cartId} />
      <InternalButton />
    </form>
  );
};