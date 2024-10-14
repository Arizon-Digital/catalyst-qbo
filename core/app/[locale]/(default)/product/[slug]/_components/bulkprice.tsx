import { useTranslations } from 'next-intl';
import { FragmentOf, graphql } from '~/client/graphql';

export const Bulkprice = graphql(`
  fragment TechDataFragment on Product {
    sku
    condition
    availability
  }
`);

interface Props {
  product: FragmentOf<typeof Bulkprice>;
}

const Bulk: React.FC<Props> = ({ product }) => {
  const t = useTranslations('Product.Bulk');

  if (!product.sku && !product.condition && !product.availability) {
    return null; // Return null if no technical data is available
  }

  return (
    <div className="Bulk"> 
     
      <ul>
        Bulk
      </ul>
    </div>
  );
};

export default Bulk;
