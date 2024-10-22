import { useFormatter } from 'next-intl';
import { FragmentOf, graphql } from '~/client/graphql';
import { BcImage } from '~/components/bc-image';
import { ItemQuantity } from './item-quantity';
import { RemoveItem } from './remove-item';

 
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
 
  const deleteIcon = "https://cdn11.bigcommerce.com/s-ur7wjnshy8/images/stencil/320w/image-manager/delete.jpg";
 
  return (
    <li>
      <div className="border-t border-t-gray-200 py-4">
        <table className="table-auto w-full">
        <thead className="table-head">
            <tr>
              <th className="w-24 md:w-[144px] text-left">ITEMS</th>
              <th className="text-left"></th>
              <th className="text-left">UNIT PRICE</th>
              <th className="text-left">QUANTITY</th>
              <th className="text-left"></th>
              <th className="text-left">TOTAL</th>
             
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* Image */}
              <td className="w-24 flex-none md:w-[144px]">
                {product.image?.url ? (
                  <BcImage alt={product.name} height={144} src={product.image.url} width={144} />
                ) : (
                  <div className="h-full w-full bg-gray-200" />
                )}
              </td>
 
              {/* Product name and SKU */}
              <td className="flex flex-1 flex-col gap-2">
                <p className="text-xl font-bold md:text-2xl" id="cartproductname">{product.name}</p>
                <p className="text-xl font-bold md:text-2xl" id="cartproductname">{product.sku}</p>
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
              <td className="flex flex-col gap-2 md:items-end">
                <ItemQuantity product={product} />
              </td>
              {/* Remove Item */}
              <td>
                <div className="hidden md:block">
                  <RemoveItem currency={currencyCode} product={product} deleteIcon={deleteIcon} />
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
        </table>
      </div>
    </li>
  );
};