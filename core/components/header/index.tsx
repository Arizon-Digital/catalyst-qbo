import { User } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { ReactNode, Suspense } from 'react';

import { LayoutQuery } from '~/app/[locale]/(default)/query';
import { getSessionCustomerId } from '~/auth';
import { client } from '~/client';
import { readFragment } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';
import { logoTransformer } from '~/data-transformers/logo-transformer';
import { localeLanguageRegionMap } from '~/i18n/routing';

import { Link } from '../link';
import { Button } from '../ui/button';
import { Header as ComponentsHeader } from '../ui/header';

import { logout } from './_actions/logout';
import { HeaderFragment } from './fragment';
import { QuickSearch } from './quick-search';

interface Props {
  cart: ReactNode;
}

export const Header = async ({ cart }: Props) => {
  const locale = await getLocale();
  const t = await getTranslations('Components.Header');
  const customerId = await getSessionCustomerId();

  const { data: response } = await client.fetch({
    document: LayoutQuery,
    fetchOptions: customerId ? { cache: 'no-store' } : { next: { revalidate } },
  });

  const data = readFragment(HeaderFragment, response).site;
  const categoryTree = data.categoryTree.slice(0, 6);

  const links = categoryTree.map(({ name, path, children }) => ({
    label: name,
    href: path,
    groups: children.map((firstChild) => ({
      label: firstChild.name,
      href: firstChild.path,
      links: firstChild.children.map((secondChild) => ({
        label: secondChild.name,
        href: secondChild.path,
      })),
    })),
  }));

  return (
    <ComponentsHeader
      account={
        <div className="flex items-center">
          <div className="user-icon">
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="6" r="4" stroke="#000000" stroke-width="1"></circle>
              <path
                d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8"
                stroke="#000000"
                stroke-width="1"
                fill="none"
              ></path>
              <line
                x1="4"
                y1="20"
                x2="20"
                y2="20"
                stroke="#000000"
                stroke-width="1"
                stroke-linecap="round"
              ></line>
            </svg>
          </div>

          {customerId ? (
            <div className="flex flex-col ml-4">
              <Link
                href="/account"
                className="text-black hover:text-primary transition-colors py-1"
              >
                {t('Account.myAccount')}
              </Link>
              <form action={logout}>
                <Button
                  variant="ghost"
                  className="text-black hover:text-primary p-0 h-auto"
                  type="submit"
                  formAction={logout}
                >
                  {t('Account.logout')}
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex sign/registration ml-4">
              <Link 
                aria-label="Login" 
                className="flex items-center p-3 text-black hover:text-primary transition-colors" 
                href="/login"
              >
                Sign In
              </Link>
              <Link 
                aria-label="Registration" 
                className="p-3 text-black hover:text-primary transition-colors" 
                href="/register/"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      }
      activeLocale={locale}
      cart={
        <div role="status">
          <Suspense fallback={<div className="h-6 w-6" />}>{cart}</Suspense>
        </div>
      }
      links={links}
      locales={localeLanguageRegionMap}
      logo={data.settings ? logoTransformer(data.settings) : undefined}
      search={<QuickSearch logo={data.settings ? logoTransformer(data.settings) : ''} />}
    />
  );
};