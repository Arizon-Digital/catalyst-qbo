import { useTranslations } from 'next-intl';
import { FragmentOf, graphql } from '~/client/graphql';
import TabComponent from '../_components/tab';

export const DescriptionFragment = graphql(`
  fragment DescriptionFragment on Product {
    description
  }
`);

interface Props {
  product: FragmentOf<typeof DescriptionFragment>;
}

export const Description = ({ product }: Props) => {
  const t = useTranslations('Product.Description');

  if (!product.description) {
    return null; // Return null if no description
  }

  return (
    <>
      <h2 className="mb-4 text-xl font-bold md:text-2xl">{t('heading')}</h2>
      {/* Pass product description to the TabComponent */}
      <TabComponent productDescription={product.description} />
    </>
  );
};
