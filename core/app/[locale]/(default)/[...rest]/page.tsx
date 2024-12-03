import { Page as MakeswiftPage } from '@makeswift/runtime/next';
import { notFound } from 'next/navigation';

import { defaultLocale, locales } from '~/i18n/routing';
import { client } from '~/lib/makeswift/client';
import { getSiteVersion } from '~/lib/makeswift/draft-mode';

interface CatchAllParams {
  locale: string;
  rest: string[];
}

export async function generateStaticParams() {
  const pages = await client.getPages().toArray();

  return pages
    .filter((page) => page.path !== '/')
    .flatMap((page) =>
      locales.map((locale) => ({
        rest: page.path.split('/').filter((segment) => segment !== ''),
        // Remove eslint disable once more locales are added
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        locale: locale === defaultLocale ? undefined : locale,
      })),
    );
}

export default async function CatchAllPage({ params }: { params: Promise<CatchAllParams> }) {
  const { rest, locale } = await params;
  if (!locales.includes(locale)) return notFound();

  const path = `/${rest.join('/')}`;
  const siteVersion = await getSiteVersion();

  console.log('@@@ CatchAllPage', { path, siteVersion, locale });

  const snapshot = await client.getPageSnapshot(path, {
    siteVersion,
    locale: locale === defaultLocale ? undefined : locale,
  });

  if (snapshot == null) return notFound();

  console.log('@@@ CatchAllPage', { snapshot });

  return <MakeswiftPage snapshot={snapshot} />;
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
