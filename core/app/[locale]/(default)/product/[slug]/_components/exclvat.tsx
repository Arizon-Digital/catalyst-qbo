'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useCommonContext } from '~/components/common-context/common-provider';
import { getProductPrices } from '~/components/graphql-apis';

interface Props {
  product: any;
  page: string;
}

const ProductPriceDisplay = ({ product, page }: Props) => {
  const t = useTranslations('Product.Details');
  const format = useFormatter();
  const [priceData, setPriceData] = useState({});
  const [currency, setCurrency] = useState('');
  const [showExclTax, setShowExclTax] = useState(false);
  const getCommonContext: any = useCommonContext();

  useEffect(() => {
    const fetchProductPrice = async ({ entityId, optionValueIds, currencyCode }: { entityId: any, optionValueIds: any, currencyCode: any }) => {
      setCurrency(currencyCode);
      const product: any = await getProductPrices({ entityId, optionValueIds, currencyCode });
      setPriceData(product);
      if (currencyCode == 'GBP') {
        setShowExclTax(true);
      } else {
        setShowExclTax(false);
      }
    }
    if (page == 'bag') {
      setPriceData(product);
      if (getCommonContext.getCurrencyCode == 'GBP') {
        setShowExclTax(true);
      } else {
        setShowExclTax(false);
      }
    } else {
      fetchProductPrice({ entityId: product?.entityId, optionValueIds: [], currencyCode: getCommonContext.getCurrencyCode });
    }
  }, [setCurrency, setShowExclTax]);

  if (!priceData?.prices) return null;

  const { prices, excludeTax }: { prices: any, excludeTax: any } = priceData;
  const displayPrices = showExclTax && currency === 'GBP' ? excludeTax : prices;

  const showPriceRange =
    displayPrices?.priceRange?.min.value !== displayPrices?.priceRange?.max.value;

  const renderPrice = (priceValue: number, currencyCode: string) => {
    return format.number(priceValue, {
      style: 'currency',
      currency: currencyCode,
    })?.replace('CA$', 'C$');
  };

  if (currency === 'GBP') {
    return (
      <>
        <p className='pricevat'>
          <span className='prvat'>
            {renderPrice(prices?.price?.value, prices?.price?.currencyCode)}
          </span>
          <span className='vat'> Inc. VAT</span>
        </p>
        <p className='pricevats'>
          <span className='prvat'>
            {renderPrice(
              excludeTax?.price?.value || (prices.price.value / 1.2),
              excludeTax?.price?.currencyCode || currency
            )}
          </span>
          <span className='vat'>Excl. VAT</span>
        </p>
      </>
    );
  }

  return (
    <>
      {showPriceRange ? (
        <>
          {renderPrice(displayPrices?.priceRange.min.value, displayPrices?.price.currencyCode)}
          {' - '}
          {renderPrice(displayPrices?.priceRange.max.value, displayPrices?.price.currencyCode)}
        </>
      ) : (
        <>
          {displayPrices?.retailPrice?.value !== undefined && (
            <>
              {t('Prices.msrp')}: {' '}
              {renderPrice(displayPrices?.retailPrice.value, displayPrices?.price.currencyCode)}
            </>
          )}
          {displayPrices?.salePrice?.value !== undefined &&
            displayPrices?.basePrice?.value !== undefined ? (
            <>
              {t('Prices.was')}: {' '}
              {renderPrice(displayPrices?.basePrice.value, displayPrices?.price.currencyCode)}
              {' '}
              {t('Prices.now')}: {' '}
              {renderPrice(displayPrices?.price.value, displayPrices?.price.currencyCode)}
            </>
          ) : (
            displayPrices?.price.value && (
              <>
                {renderPrice(displayPrices?.price.value, displayPrices?.price.currencyCode)}
              </>
            )
          )}
        </>
      )}
    </>
  );
};

export default ProductPriceDisplay;