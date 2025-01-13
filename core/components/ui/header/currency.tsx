"use client";

import { useState, useEffect } from "react";
import { Select } from '~/components/ui/form';
import { getCurrencyListData, getCurrencyCodeFn, setCurrencyCodeFn } from "~/components/header/_actions/getCurrencyList";
import { useCommonContext } from '~/components/common-context/common-provider';
import { updateCartCurrency } from "~/components/graphql-apis";

export const GetCurrencyList = () => {
  const [currency, setCurrency] = useState([]);
  const [currencyCode, setCurrencyCode] = useState('');
  const [showExclTax, setShowExclTax] = useState(false);
  const getCommonContext: any = useCommonContext();

  useEffect(() => {
    const getCurrencyData = async () => {
      let currencyData: any = await getCurrencyListData();
      let currencyOptions: any = currencyData?.map(
        ({code, name}: {code: string; name: string;}) => ({
          value: code,
          label: code,
        }),
      );
      setCurrency(currencyOptions);
      let currencyCookieData: string = (await getCurrencyCodeFn()) || 'CAD';
      setCurrencyCodeFn(currencyCookieData);
      setCurrencyCode(currencyCookieData);
      /*getCommonContext.setCurrencyCodeFn(currencyCookieData);
      setShowExclTax(currencyCookieData === 'GBP');*/
    };
    getCurrencyData();
  }, []);

  const onCurrencyChange = async (currencyCode: string) => {
    await setCurrencyCodeFn(currencyCode);
    await updateCartCurrency(currencyCode);
    setCurrencyCode(currencyCode);
    getCommonContext.setCurrencyCodeFn(currencyCode);
    setShowExclTax(currencyCode === 'GBP');
    location.reload();
  };
//hover:!text-[#ca9618]
  return (
    <div className="flex items-center gap-1 currency-items hover:!cursor-pointer">
      {currencyCode && (
        <span className="text-[15px] font-medium currencyfont">Select Currency:</span>
      )}
      <Select
        className="w-28  bg-transparent text-white border-none focus:ring-0"
        name="currency-selection"
        id="currency-selection"
        options={currency}
        value={currencyCode}
        placeholder="Select Currency"
        onValueChange={(value: string) => onCurrencyChange(value)}
      />
    </div>
  );
};