import { useFormatter } from 'next-intl';
import { FragmentOf, graphql } from '~/client/graphql';
import { BcImage } from '~/components/bc-image';
import { ItemQuantity } from './item-quantity';
import { RemoveItem } from './remove-item';
import Brand from '../../(faceted)/brand/[slug]/page';

const PhysicalItemFragment = graphql(`
  fragment PhysicalItemFragment on CartPhysicalItem {
    name
    brand
    sku
    image {
      url: urlTemplate(lossy: true)
    }
    entityId
    quantity
    productEntityId
    variantEntityId
    extendedListPrice {
      currencyCode
      value
    }
    extendedSalePrice {
      currencyCode
      value
    }
    originalPrice {
      currencyCode
      value
    }
    listPrice {
      currencyCode
      value
    }
    selectedOptions {
      __typename
      entityId
      name
      ... on CartSelectedMultipleChoiceOption {
        value
        valueEntityId
      }
      ... on CartSelectedCheckboxOption {
        value
        valueEntityId
      }
      ... on CartSelectedNumberFieldOption {
        number
      }
      ... on CartSelectedMultiLineTextFieldOption {
        text
      }
      ... on CartSelectedTextFieldOption {
        text
      }
      ... on CartSelectedDateFieldOption {
        date {
          utc
        }
      }
    }
  }
`);

const DigitalItemFragment = graphql(`
  fragment DigitalItemFragment on CartDigitalItem {
    name
    brand
    sku
    image {
      url: urlTemplate(lossy: true)
    }
    entityId
    quantity
    productEntityId
    variantEntityId
    extendedListPrice {
      currencyCode
      value
    }
    extendedSalePrice {
      currencyCode
      value
    }
    originalPrice {
      currencyCode
      value
    }
    listPrice {
      currencyCode
      value
    }
    selectedOptions {
      __typename
      entityId
      name
      ... on CartSelectedMultipleChoiceOption {
        value
        valueEntityId
      }
      ... on CartSelectedCheckboxOption {
        value
        valueEntityId
      }
      ... on CartSelectedNumberFieldOption {
        number
      }
      ... on CartSelectedMultiLineTextFieldOption {
        text
      }
      ... on CartSelectedTextFieldOption {
        text
      }
      ... on CartSelectedDateFieldOption {
        date {
          utc
        }
      }
    }
  }
`);

export const CartItemFragment = graphql(
  `
    fragment CartItemFragment on CartLineItems {
      physicalItems {
        ...PhysicalItemFragment
      }
      digitalItems {
        ...DigitalItemFragment
      }
    }
  `,
  [PhysicalItemFragment, DigitalItemFragment],
);

type FragmentResult = FragmentOf<typeof CartItemFragment>;
type PhysicalItem = FragmentResult['physicalItems'][number];
type DigitalItem = FragmentResult['digitalItems'][number];

export type Product = PhysicalItem | DigitalItem;

interface Props {
  product: Product;
  currencyCode: string;
  deleteIcon: string;
}

export const CartItem = ({ currencyCode, product }: Props) => {
  const format = useFormatter();

  const deleteIcon =
    'https://cdn11.bigcommerce.com/s-ur7wjnshy8/images/stencil/320w/image-manager/delete.jpg';

  return (
    <>
      <tbody className="cart-item-desk border border-[#CFD8DC]">
        <tr className="relative">
          {/* Image */}
          <td className="product-td-img w-[80px]">
            {product.image?.url ? (
              <div className="product-img-div flex justify-center items-center">
                <BcImage
                  alt={product.name}
                  height={33}
                  src={product.image.url}
                  width={33}
                  className="product-img w-[33px] h-[33px]"
                />
              </div>
            ) : (
              <div className="h-full w-full bg-gray-200" />
            )}
          </td>

          {/* Product name and SKU */}
          <td className="">
            <p className="text-xl font-bold md:text-2xl" id="cartbrandname">
              {product.brand}
            </p>
            <p className="text-xl font-bold md:text-2xl" id="cartproductname">
              {product.name}
            </p>
          </td>

          {/* Original price */}
          <td className="price cart">
        
            <p className="text-lg font-bold">
              {format.number(product.originalPrice.value, {
                style: 'currency',
                currency: currencyCode,
              })}
            </p>
          </td>

          {/* Quantity and Remove Item button */}
          <td className="cart-qunRem">
            
            <div className="cart-qunRem-div">
              <ItemQuantity product={product} />
              {/* Remove Item */}
              <div className="deleteIcon-div hidden md:block">
                <RemoveItem currency={currencyCode} product={product} deleteIcon={deleteIcon} />
              </div>
            </div>
          </td>

          {/* Sale price */}
          <td className="price cart">
            
            <p className="text-lg font-bold">
              {format.number(product.extendedSalePrice.value, {
                style: 'currency',
                currency: currencyCode,
              })}
            </p>
          </td>
        </tr>
      </tbody>
      <li className="cart-item-tab border-b border-b-[#CFD8DC] px-[12px] pt-[12px]">
        <div className='flex gap-[20px] items-center min-h-[100px]'>
          <div className="product-td-img w-[80px] h-[80px] flex items-center justify-center">
            {product.image?.url ? (
                <BcImage
                  alt={product.name}
                  height={33}
                  src={product.image.url}
                  width={33}
                  className="w-[33px] h-[33px]"
                />
            ) : (
              <div className="h-full w-full bg-gray-200" />
            )}
          </div>
          <div className='flex-shrink-[100]'>
            <p className="text-xl font-bold md:text-2xl" id="cartbrandname">
              {product.brand}
            </p>
            <p className="text-xl font-bold md:text-2xl" id="cartproductname">
              {product.name}
            </p>
          </div>
        </div>
        <div className='cart-item-tab-val flex mb-[15px] ml-[100px] mt-[10px] gap-[40px] justify-start'>
          <div className='flex flex-col cart-item-tab-val-div1'>
            <p>Price : </p>
            <p className="text-lg font-bold">
              {format.number(product.originalPrice.value, {
                style: 'currency',
                currency: currencyCode,
              })}
            </p>
          </div>
          <div className="cart-qunRem flex flex-col cart-item-tab-val-div1">
            <p>Quantity : </p>
            <div className="cart-qunRem-div">
              <ItemQuantity product={product} />
              {/* Remove Item */}
              <div className="deleteIcon-div hidden md:block">
                <RemoveItem currency={currencyCode} product={product} deleteIcon={deleteIcon} />
              </div>
            </div>
          </div>
          <div className='flex flex-col cart-item-tab-val-div1'>
            <p>Total : </p>
            <p className="text-lg font-bold">
              {format.number(product.extendedSalePrice.value, {
                style: 'currency',
                currency: currencyCode,
              })}
            </p>
          </div>
        </div>
      </li>
    </>
  );
};
