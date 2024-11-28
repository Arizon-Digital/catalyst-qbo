'use client';

import { useState, useEffect } from "react";
import { Select } from '~/components/ui/form';
import { useRouter } from '~/i18n/routing';
import { getCurrencyListData, getCurrencyCodeFn, setCurrencyCodeFn } from "~/components/header/_actions/getCurrencyList";
import { useCommonContext } from '~/components/common-context/common-provider';
import { updateCartCurrency } from "~/components/graphql-apis";

interface Currency {
  code: string;
  entityId: number;
  name: string;
}

export const GetCurrencyList = () => {
  const [currency, setCurrency] = useState([]);
  const [currencyCode, setCurrencyCode] = useState('');
  const [showExclTax, setShowExclTax] = useState(false);
  const router = useRouter();
  const getCommonContext: any = useCommonContext();

  useEffect(() => {
    const getCurrencyData = async () => {
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
          label: code,
        }),
      );
      setCurrency(currencyOptions);
      let currencyCookieData: string = (await getCurrencyCodeFn()) || 'CAD';
      setCurrencyCodeFn(currencyCookieData);
      setCurrencyCode(currencyCookieData);
      getCommonContext.setCurrencyCodeFn(currencyCookieData);
      setShowExclTax(currencyCookieData === 'GBP');
    };
    getCurrencyData();
  }, []);

  const onCurrencyChange = async (currencyCode: string) => {
    await updateCartCurrency(currencyCode);
    setCurrencyCodeFn(currencyCode);
    setCurrencyCode(currencyCode);
    getCommonContext.setCurrencyCodeFn(currencyCode);
    setShowExclTax(currencyCode === 'GBP');
    router.refresh();
  };
  
  return (
    <div className="bg-red-900">
      {currencyCode && <span className="currency">Select Currency:</span>}
      <Select
        
        name={`currency-selection`}
        id={`currency-selection`}
        options={currency}
        value={currencyCode}
        placeholder='Select Currency'
        onValueChange={(value: string) => onCurrencyChange(value)}

      />
     
    </div>
  );
};



