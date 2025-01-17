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
        installationId: 'c80a9b9e-28af-4200-b897-01d5e488c1b2',
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
      })(document, 'script', 'https://eu1-config.doofinder.com/2.x/c80a9b9e-28af-4200-b897-01d5e488c1b2.js');
    }
  }, [currency, setCurrency]);

  return <div></div>;
};

export default DoofinderScriptLoader;
