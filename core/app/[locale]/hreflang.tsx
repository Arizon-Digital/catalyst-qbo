"use client"

import { usePathname } from '~/i18n/routing';

export default function HrefLang() {
  const pathname = usePathname();
  if (typeof window !== "undefined") {
    let currentUrl = pathname;
    let linkDefault = document.createElement('link');
      linkDefault.hreflang = 'x-default';
      linkDefault.rel = 'alternate';
      linkDefault.href = 'https://www.qualitybearingsonline.ca'+currentUrl;
      linkDefault.id = 'default_hreflang';
      let scriptDefault = document.getElementById('default_hreflang');
      if (scriptDefault) {
        document.head.removeChild(scriptDefault);
      }
    document.head.appendChild(linkDefault);

    let linkCaDefault = document.createElement('link');
      linkCaDefault.hreflang = 'en-CA';
      linkCaDefault.rel = 'alternate';
      linkCaDefault.href = 'https://www.qualitybearingsonline.ca'+currentUrl;
      linkCaDefault.id = 'ca_hreflang';
      let scriptCA = document.getElementById('ca_hreflang');
      if (scriptCA) {
        document.head.removeChild(scriptCA);
      }
    document.head.appendChild(linkCaDefault);

    let linkGBDefault = document.createElement('link');
      linkGBDefault.hreflang = 'en-GB';
      linkGBDefault.rel = 'alternate';
      linkGBDefault.href = 'https://www.qualitybearingsonline.com'+currentUrl?.replace('.ca', '.com')?.replace('.php', '');
      linkGBDefault.id = 'gb_hreflang';
      let scriptUS = document.getElementById('gb_hreflang');
      if (scriptUS) {
        document.head.removeChild(scriptUS);
      }
    document.head.appendChild(linkGBDefault);
  }

  return (
    <></>
  )
}