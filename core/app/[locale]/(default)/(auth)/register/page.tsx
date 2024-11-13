import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Breadcrumbs as ComponentsBreadcrumbs } from '~/components/ui/breadcrumbs';

import { bypassReCaptcha } from '~/lib/bypass-recaptcha';

import { RegisterCustomerForm } from './_components/register-customer-form';
import { getRegisterCustomerQuery } from './page-data';

const FALLBACK_COUNTRY = {
  entityId: 226,
  name: 'United States',
  code: 'US',
};

export async function generateMetadata() {
  const t = await getTranslations('Register');

  return {
    title: t('title'),
  };
}

export default async function Register() {
  const t = await getTranslations('Register');
  const breadcrumbs: any = [
    {
      label: 'CREATE ACCOUNT',
      href: '#',
    },
  ];

  const registerCustomerData = await getRegisterCustomerQuery({
    address: { sortBy: 'SORT_ORDER' },
    customer: { sortBy: 'SORT_ORDER' },
  });

  if (!registerCustomerData) {
    notFound();
  }

  const {
    addressFields,
    customerFields,
    countries,
    defaultCountry = FALLBACK_COUNTRY.name,
    reCaptchaSettings,
  } = registerCustomerData;

  const {
    code = FALLBACK_COUNTRY.code,
    entityId = FALLBACK_COUNTRY.entityId,
    statesOrProvinces,
  } = countries.find(({ name }) => name === defaultCountry) || {};

  return (
    <div className="mx-auto mb-10 mt-8 text-base lg:w-2/3 pageheading"id='width'>
      <ComponentsBreadcrumbs
          className="login-div login-breadcrumb mx-auto mt-[6rem] w-[80%] px-[1px]"
          breadcrumbs={breadcrumbs}
        />
      <h1 className="my-6 text-4xl font-black lg:my-8 lg:text-5xl heading">{t('heading')}</h1>
      <RegisterCustomerForm
        addressFields={addressFields}
        countries={countries}
        customerFields={customerFields}
        defaultCountry={{ entityId, code, states: statesOrProvinces ?? [] }}
        reCaptchaSettings={bypassReCaptcha(reCaptchaSettings)}
      />
    </div>
  );
}
