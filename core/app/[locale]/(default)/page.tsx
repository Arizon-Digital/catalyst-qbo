import { Page as MakeswiftPage } from '@makeswift/runtime/next';
import { notFound } from 'next/navigation';

import { defaultLocale, locales } from '~/i18n/routing';
import { client } from '~/lib/makeswift/client';
import { getSiteVersion } from '~/lib/makeswift/draft-mode';
import '~/lib/makeswift/components';

export default async function Home({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) return notFound();

  const siteVersion = await getSiteVersion();

  console.log('@@@ Home page', { siteVersion, locale });

  const snapshot = await client.getPageSnapshot('/', {
    siteVersion,
    locale: locale === defaultLocale ? undefined : locale,
  });

  if (snapshot == null) return notFound();

  console.log('@@@ Home page', { snapshot });

  return <MakeswiftPage snapshot={snapshot} />;
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
