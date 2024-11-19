

'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { getCurrencyCodeFn } from '~/components/header/_actions/getCurrencyList';
import { type FragmentOf } from '~/client/graphql';
import { DetailsFragment } from './fragment';
import { PricingFragment } from '~/client/fragments/pricing';

interface Props {
  product: FragmentOf<typeof DetailsFragment | typeof PricingFragment>;
}

const ProductPriceDisplay = ({ product }: Props) => {
  const t = useTranslations('Product.Details');
  const format = useFormatter();
  const [currency, setCurrency] = useState('CAD');
  const [showExclTax, setShowExclTax] = useState(false);

  useEffect(() => {
    const checkCurrency = async () => {
      const currencyCode = (await getCurrencyCodeFn()) || 'CAD';
      setCurrency(currencyCode);
      setShowExclTax(currencyCode === 'GBP');
    };
    checkCurrency();
  }, []);

  if (!product?.prices) return null;

  const { prices, excludeTax } = product;
  const displayPrices = showExclTax && currency === 'GBP' ? excludeTax : prices;

  const showPriceRange =
    displayPrices?.priceRange?.min.value !== displayPrices?.priceRange?.max.value;

  const renderPrice = (priceValue: number, currencyCode: string) => {
    return format.number(priceValue, {
      style: 'currency',
      currency: currencyCode,
    });
  };

  return (
    <>
      {showPriceRange ? (
        <>
          {renderPrice(displayPrices.priceRange.min.value, displayPrices.price.currencyCode)}
          {' - '}
          {renderPrice(displayPrices.priceRange.max.value, displayPrices.price.currencyCode)}
        </>
      ) : (
        <>
          {displayPrices.retailPrice?.value !== undefined && (
            <>
              {t('Prices.msrp')}: {' '}
              {renderPrice(displayPrices.retailPrice.value, displayPrices.price.currencyCode)}
            </>
          )}
          {displayPrices.salePrice?.value !== undefined &&
          displayPrices.basePrice?.value !== undefined ? (
            <>
              {t('Prices.was')}: {' '}
              {renderPrice(displayPrices.basePrice.value, displayPrices.price.currencyCode)}
              {' '}
              {t('Prices.now')}: {' '}
              {renderPrice(displayPrices.price.value, displayPrices.price.currencyCode)}
            </>
          ) : (
            displayPrices.price.value && (
              <>
                {renderPrice(displayPrices.price.value, displayPrices.price.currencyCode)}
              </>
            )
          )}
        </>
      )}
      {currency === 'GBP' && (
        <>
          <p>Inc. VAT:</p>
          <p>
            {renderPrice(prices.price.value, prices.price.currencyCode)}
          </p>
          <p>Excl. VAT:</p>
          <p>
            {renderPrice(
              excludeTax?.price?.value || (prices.price.value / 1.2), // Fallback calculation if excludeTax is not provided
              excludeTax?.price?.currencyCode || currency
            )}
          </p>
        </>
      )}
    </>
  );
};

export default ProductPriceDisplay;