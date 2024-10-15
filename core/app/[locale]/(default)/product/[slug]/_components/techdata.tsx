import React from 'react';
import { useTranslations } from 'next-intl';
import { FragmentOf, graphql } from '~/client/graphql';

export const TechDataFragment = graphql(`
  fragment TechDataFragment on Product {
    sku
    condition
    availability
    brand {
      name
    }
    weight
    custom_fields {
      name
      value {
        value
        unit
      }
    }
  }
`);

interface Props {
  product: FragmentOf<typeof TechDataFragment>;
}

const TechData: React.FC<Props> = ({ product }) => {
  const t = useTranslations('Product.TechData');
console.log('.....text.......',product.custom_fields);
  // Return null if no technical data is available
  if (!product.sku && !product.condition && !product.availability && !product.brand && !product.weight && !product.custom_fields?.length) {
    return null;
  }
  


  return (
    <div className="tech-data">
      <div className="product-info">
        <h2 className="page-heading">Product Information</h2>
        <hr className="product-info-hr" />

        <div className="product-details">
  {product.brand?.name && (
    <>
      <span className="product-details-item">
        <strong>BRANDS:</strong>
        <img
          src={`https://www.qualitybearingsonline.com/content/img/brands/product-details/${product.brand.name}.png`}
          alt={`${product.brand.name} Brand Logo`}
          className="product-details-logo"
        />
      </span>
    </>
  )}

  {product.sku && (
    <>
      <span className="product-details-item">
        <strong>SKU:</strong> {product.sku}
      </span>
    </>
  )}

  {product.condition && (
    <>
      <span className="product-details-item">
        <strong>{t('condition')}:</strong> {product.condition}
      </span>
    </>
  )}

  {product.availability && (
    <>
      <span className="product-details-item">
        <strong>AVAILABILITY:</strong> {product.availability}
      </span>
    </>
  )}
</div>
</div>

      <div className="product-reviews-header">
        <h2 className="page-heading">Technical Data</h2>
        <hr className="product-info-hr" />
        <br />
      </div>

      
      
    
    </div>
  );
};

export default TechData;
