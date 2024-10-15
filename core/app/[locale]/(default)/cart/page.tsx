import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';

import { getSessionCustomerId } from '~/auth';
import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { TAGS } from '~/client/tags';

import { CartItem, CartItemFragment } from './_components/cart-item';
import { CartViewed } from './_components/cart-viewed';
import { CheckoutButton } from './_components/checkout-button';
import { CheckoutSummary, CheckoutSummaryFragment } from './_components/checkout-summary';
import { EmptyCart } from './_components/empty-cart';
import { GeographyFragment } from './_components/shipping-estimator/fragment';

const CartPageQuery = graphql(
  `
    query CartPageQuery($cartId: String) {
      site {
        cart(entityId: $cartId) {
          entityId
          currencyCode
          lineItems {
            ...CartItemFragment
          }
        }
        checkout(entityId: $cartId) {
          ...CheckoutSummaryFragment
        }
      }
      geography {
        ...GeographyFragment
      }
    }
  `,
  [CartItemFragment, CheckoutSummaryFragment, GeographyFragment],
);

export async function generateMetadata() {
  const t = await getTranslations('Cart');

  return {
    title: t('title'),
  };
}

export default async function Cart() {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return <EmptyCart />;
  }

  const t = await getTranslations('Cart');

  const customerId = await getSessionCustomerId();

  const { data } = await client.fetch({
    document: CartPageQuery,
    variables: { cartId },
    customerId,
    fetchOptions: {
      cache: 'no-store',
      next: {
        tags: [TAGS.cart, TAGS.checkout],
      },
    },
  });

  const cart = data.site.cart;
  const checkout = data.site.checkout;
  const geography = data.geography;

  if (!cart) {
    return <EmptyCart />;
  }

  const lineItems = [...cart.lineItems.physicalItems, ...cart.lineItems.digitalItems];

  return (
    <div>
      <h1 className="pb-6 text-4xl font-black lg:pb-10 lg:text-5xl">Your Cart</h1>
      <div className="pb-12 md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <ul className="col-span-2">
          {lineItems.map((product) => (
            <CartItem currencyCode={cart.currencyCode} key={product.entityId} product={product} />
          ))}
          
        </ul>
      
       

        <div className="col-span-1 col-start-2 lg:col-start-3" id='buttoncart'>
          {checkout && <CheckoutSummary checkout={checkout} geography={geography} />} 
          <div className='buttoncheckout'>
      <CheckoutButton cartId={cartId} />
      <div className="cart-secure-checkout-icon"><img src="https://cdn2.bigcommerce.com/server4700/03842/product_images/uploaded_images/global-secure.png?t=1508252387&amp;_ga=2.7859762.1482315180.1508138351-1600153642.1496331199"></img>
		 <div className="cart-secure-checkout-text">qualitybearingsonline.com is secure and your personal details are protected <a href="https://profile.globalsign.com/SiteSeal/siteSeal/profile/profile.do?p1=062bf82c&amp;p2=7b6308ce4b44da63de16be9586a9b394f87701813c3256930f0589358d55e2c9d5e3f08de369419567305597572fdb60dd0be3d3c6e0eccfd9301fc27a7f548f1710&amp;p3=6e180727fc699782c939b6e2466b873c230c3863">Learn more.</a></div>
		  
		  </div>
      </div>
        </div>
        
      </div>
      <CartViewed checkout={checkout} currencyCode={cart.currencyCode} lineItems={lineItems} />
      <div data-content-region="cart_below_content"></div>
                                       <script type="text/javascript" src="https://api.feefo.com/api/javascript/quality-bearings-online" async></script> <div id="feefo-service-review-carousel-widgetId" className="feefo-review-carousel-widget-service"></div>
                </div>

  );
}

export const runtime = 'edge';
