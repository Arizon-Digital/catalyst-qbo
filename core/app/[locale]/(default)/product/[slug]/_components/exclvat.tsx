
'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { getCurrencyCodeFn } from '~/components/header/_actions/getCurrencyList';
import { type FragmentOf } from '~/client/graphql';
import { DetailsFragment } from './fragment'; 
import { PricingFragment } from '~/client/fragments/pricing';

interface Props {
  product: FragmentOf<typeof DetailsFragment>;
}

const ProductPriceDisplay = ({ product }: Props) => {
  const t = useTranslations('Product.Details');
  const format = useFormatter();
  const [showExclTax, setShowExclTax] = useState(false);

  useEffect(() => {
    const checkCurrency = async () => {
      const currency = await getCurrencyCodeFn() || 'CAD';
      setShowExclTax(currency === 'GBP');
    };
    checkCurrency();
  }, []);

  if (!product?.prices) return null;

  const showPriceRange =
    product.prices?.priceRange?.min.value !== product.prices?.priceRange?.max.value;

  return (
    <div className="my-6 text-2xl font-bold lg:text-3xl">
      {showPriceRange ? (
        <span className="productView-price price--main">
          {format.number(product.prices.priceRange.min.value, {
            style: 'currency',
            currency: product.prices.price.currencyCode,
          })}{' '}
          -{' '}
          {format.number(product.prices.priceRange.max.value, {
            style: 'currency',
            currency: product.prices.price.currencyCode,
          })}
        </span>
      ) : (
        <>
          {product.prices.retailPrice?.value !== undefined && (
            <span>
              {t('Prices.msrp')}:{' '}
              <span className="line-through">
                {format.number(product.prices.retailPrice.value, {
                  style: 'currency',
                  currency: product.prices.price.currencyCode,
                })}
              </span>
              <br />
            </span>
          )}
          {product.prices.salePrice?.value !== undefined &&
            product.prices.basePrice?.value !== undefined ? (
            <>
              <span>
                {t('Prices.was')}:{' '}
                <span className="line-through">
                  {format.number(product.prices.basePrice.value, {
                    style: 'currency',
                    currency: product.prices.price.currencyCode,
                  })}
                </span>
              </span>
              <br />
              <span className="productView-price price--main">
                {t('Prices.now')}:{' '}
                {format.number(product.prices.price.value, {
                  style: 'currency',
                  currency: product.prices.price.currencyCode,
                })}
              </span>
            </>
          ) : (
            product.prices.price.value && (
              <span className="productView-price price--main">
                {format.number(product.prices.price.value, {
                  style: 'currency',
                  currency: product.prices.price.currencyCode,
                })}
              </span>
            )
          )}
        </>
      )}

      {showExclTax && (
        <div className="text-sm font-normal mt-1">
          <span>excl. VAT</span>
          <div>
            <span>incl. VAT</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPriceDisplay;