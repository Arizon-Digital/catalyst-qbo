'use client';

import { useState, useEffect } from "react";
import { Select } from '~/components/ui/form';
import { useRouter } from '~/i18n/routing';
import { getCurrencyListData, getCurrencyCodeFn, setCurrencyCodeFn } from "~/components/header/_actions/getCurrencyList";
import { useCommonContext } from '~/components/common-context/common-provider';

interface Currency {
  code: string;
  entityId: number;
  name: string;
}

export const GetCurrencyList = () => {
  const [currency, setCurrency] = useState([]);
  const [currencyCode, setCurrencyCode] = useState('');
  const router = useRouter();
  const getCommonContext:any = useCommonContext();
  useEffect(() => {
    const getCurrencyData = async () => {
      let currencyCookieData: string = await getCurrencyCodeFn() || '';
      if(!currencyCookieData) {
        setCurrencyCodeFn('CAD');
        setCurrencyCode('CAD');
        getCommonContext.setCurrencyCodeFn('CAD');
      } else {
        setCurrencyCodeFn(currencyCookieData);
        setCurrencyCode(currencyCookieData);
        getCommonContext.setCurrencyCodeFn(currencyCookieData);
      }
      let currencyData: any = await getCurrencyListData();
      let currencyOptions: any = currencyData?.map(
        ({
          code,
          name
        }: {
          code: string;
          name: string;
        }) => ({
          value: code,
          label: name,
        }),
      )
      setCurrency(currencyOptions);
    }
    getCurrencyData();
  }, [currencyCode]);
  
  const onCurrencyChange = (currencyCode: string) => {
    setCurrencyCodeFn(currencyCode);
    setCurrencyCode(currencyCode);
    getCommonContext.setCurrencyCodeFn(currencyCode);
    router.refresh();
  };
  

  return (
    <Select
        name={`currency-selection`}
        id={`currency-selection`}
        options={currency}
        value={currencyCode}
        placeholder='Select Currency'
        onValueChange={(value: string) => onCurrencyChange(value)}
      />
  );
};

