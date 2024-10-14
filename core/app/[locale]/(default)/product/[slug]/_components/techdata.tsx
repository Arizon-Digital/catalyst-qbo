import { useTranslations } from 'next-intl';
import { FragmentOf, graphql } from '~/client/graphql';

export const TechDataFragment = graphql(`
  fragment TechDataFragment on Product {
    sku
    condition
    availability
  }
`);

interface Props {
  product: FragmentOf<typeof TechDataFragment>;
}

const TechData: React.FC<Props> = ({ product }) => {
  const t = useTranslations('Product.TechData');

  if (!product.sku && !product.condition && !product.availability) {
    return null; // Return null if no technical data is available
  }

  return (
    <div className="tech-data"> 
     
      <ul>
        techdata
      </ul>
    </div>
  );
};

export default TechData;
