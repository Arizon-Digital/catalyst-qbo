import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiPinterest,
  SiX,
  SiYoutube,
} from '@icons-pack/react-simple-icons';
import { JSX } from 'react';
 
import { LayoutQuery } from '~/app/[locale]/(default)/query';
import { getSessionCustomerAccessToken } from '~/auth';
import { client } from '~/client';
import { readFragment } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';
import { Footer as ComponentsFooter } from '~/components/ui/footer';
import { logoTransformer } from '~/data-transformers/logo-transformer';
 
import { FooterFragment } from './fragment';
import { AmazonIcon } from './payment-icons/amazon';
import { AmericanExpressIcon } from './payment-icons/american-express';
import { ApplePayIcon } from './payment-icons/apple-pay';
import { MastercardIcon } from './payment-icons/mastercard';
import { PayPalIcon } from './payment-icons/paypal';
import { VisaIcon } from './payment-icons/visa';
import { GetCurrency } from '../header';
const socialIcons: Record<string, { icon: JSX.Element }> = {
  Facebook: { icon: <SiFacebook title="Facebook" /> },
  Twitter: { icon: <SiX title="Twitter" /> },
  X: { icon: <SiX title="X" /> },
  Pinterest: { icon: <SiPinterest title="Pinterest" /> },
  Instagram: { icon: <SiInstagram title="Instagram" /> },
  LinkedIn: { icon: <SiLinkedin title="LinkedIn" /> },
  YouTube: { icon: <SiYoutube title="YouTube" /> },
};
 
export const Footer = async () => {
  const customerAccessToken = await getSessionCustomerAccessToken();
 
  const { data: response } = await client.fetch({
    document: LayoutQuery,
    fetchOptions: customerAccessToken ? { cache: 'no-store' } : { next: { revalidate } },
  });
 
  const data = readFragment(FooterFragment, response).site;
 
  const sections = [
    {
      title: 'Navigate',
      links: removeEdgesAndNodes(data.content.pages).map((page) => ({
        label: page.name,
        href: page.__typename === 'ExternalLinkPage' ? page.link : page.path,
      })),
    },
  ];
 
 
  return (
    <>
    <ComponentsFooter
      contactInformation={data.settings?.contact ?? undefined}
      copyright={
        data.settings
          ? `© ${new Date().getFullYear()} ${data.settings.storeName} – All rights reserved.`
          : undefined
      }
      logo={data.settings ? logoTransformer(data.settings) : undefined}
      paymentIcons={[
       
        <AmericanExpressIcon key="americanExpress" />,
        <MastercardIcon key="mastercard" />,
        <PayPalIcon key="paypal" />,
        <VisaIcon key="visa" />,
        <ApplePayIcon key="apple" />,
       
       
       
      ]}
      sections={sections}
      socialMediaLinks={data.settings?.socialMediaLinks
        .filter((socialMediaLink) => Boolean(socialIcons[socialMediaLink.name]))
        .map((socialMediaLink) => ({
          href: socialMediaLink.url,
          icon: socialIcons[socialMediaLink.name]?.icon,
        }))}
    />
   
 
    </>
 
 
  );
};
 
