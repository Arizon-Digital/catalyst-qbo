import { getTranslations } from 'next-intl/server';

import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';
import { bypassReCaptcha } from '~/lib/bypass-recaptcha';

import { ResetPasswordForm } from './_components/reset-password-form';
import { ResetPasswordFormFragment } from './_components/reset-password-form/fragment';

const ResetPageQuery = graphql(
  `
    query ResetPageQuery {
      site {
        settings {
          reCaptcha {
            ...ResetPasswordFormFragment
          }
        }
      }
    }
  `,
  [ResetPasswordFormFragment],
);

export async function generateMetadata() {
  const t = await getTranslations('Reset');

  return {
    title: t('title'),
  };
}

export default async function Reset() {
  const t = await getTranslations('Reset');

  const { data } = await client.fetch({
    document: ResetPageQuery,
    fetchOptions: { next: { revalidate } },
  });

  return (
    <div className="mx-auto my-6 max-w-4xl pageheading">
      <h2 className="mb-8 text-4xl font-black lg:text-5xl">{t('heading')}</h2>
      <ResetPasswordForm reCaptchaSettings={bypassReCaptcha(data.site.settings?.reCaptcha)} />
    </div>
  );
}

export const runtime = 'edge';
