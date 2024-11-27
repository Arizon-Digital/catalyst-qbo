"use client";

import React, { useEffect, useState } from "react";
import { getCurrencyCodeFn } from "~/components/header/_actions/getCurrencyList";

const DoofinderScriptLoader = () => {
  const [currency, setCurrency] = useState('CAD');
  useEffect(() => {
    const getCurrencyCode = async() => {
      let currencyCode: any = await getCurrencyCodeFn();
      if(currencyCode != currency) {
        setCurrency(currencyCode);
      }
    }
    getCurrencyCode();
    if (typeof window !== "undefined") {
      let dfLayerOptions = {
        installationId: 'deb2e804-088e-437c-bbd4-113be9570a26',
        zone: 'eu1',
        currency: currency
      };

      // Dynamically inject the script
      (function (l, a, y, e, r, s) {
        r = l.createElement(a);
        r.async = 1;
        r.src = y;
        r.onload = function () {
          let checkDoofinder = setInterval(() => {
            if (window.doofinderLoader) {
              window.doofinderLoader.load(dfLayerOptions);
              clearInterval(checkDoofinder);
            }
          }, 100);
        };
        s = l.getElementsByTagName(a)[0];
        s.parentNode.insertBefore(r, s);
      })(document, 'script', 'https://cdn.doofinder.com/livelayer/1/js/loader.min.js');
    }
  }, [currency, setCurrency]);

  return <div>{/* You can add any additional UI here if needed */}</div>;
};

export default DoofinderScriptLoader;
