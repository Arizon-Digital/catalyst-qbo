'use client';

import { PropsWithChildren } from 'react';

import { CompareDrawerProvider } from '~/components/ui/compare-drawer';

import { AccountStatusProvider } from './[locale]/(default)/account/(tabs)/_components/account-status-provider';
import { CommonProvider } from '~/components/common-context/common-provider';

export function Providers({ children }: PropsWithChildren) {
  return (
    <CommonProvider>
      <AccountStatusProvider>
        <CompareDrawerProvider>{children}</CompareDrawerProvider>
      </AccountStatusProvider>
    </CommonProvider>
  );
}
