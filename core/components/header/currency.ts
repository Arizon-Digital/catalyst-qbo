import { graphql } from '~/client/graphql';

export const Currenciesquires = graphql(`
  query getSiteCurrencies {
  site {
    currencies {
      edges {
        node {
          code
          entityId
          name
        }
      }
    }
  }
}
`);

