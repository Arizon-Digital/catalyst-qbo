import { useTranslations } from 'next-intl';
import { FragmentOf, graphql } from '~/client/graphql';

export const Deliveryinformation = graphql(`
  fragment TechDataFragment on Product {
    sku
    condition
    availability
  }
`);

interface Props {
  product: FragmentOf<typeof Deliveryinformation>;
}

const Bulk: React.FC<Props> = ({ product }) => {
  const t = useTranslations('Deliveryinformation');

  if (!product.sku && !product.condition && !product.availability) {
    return null; // Return null if no technical data is available
  }

  return (
    <div className="Deliveryinformation"> 
     
      <ul>
        Bulk
      </ul>
    </div>
  );
};

export default Deliveryinformation;
