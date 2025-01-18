// import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
// import { getFormatter, getTranslations } from 'next-intl/server';
// import { Suspense } from 'react';

// import { ExistingResultType } from '~/client/util';
// import { Link } from '~/components/link';
// import { Button } from '~/components/ui/button';

// import { getCustomerOrders } from '../page-data';

// import { assembleProductData, ProductSnippet, ProductSnippetSkeleton } from './product-snippet';

// export type Orders = ExistingResultType<typeof getCustomerOrders>['orders'];

// interface OrdersListProps {
//   customerOrders: Orders;
//   ordersCount?: number;
// }

// enum VisibleListItemsPerDevice {
//   xs = 1,
//   md = 3,
//   lg = 4,
//   xl = 5,
// }

// const TruncatedCard = ({ itemsQuantity }: { itemsQuantity: number }) => {
//   const smItems = itemsQuantity - VisibleListItemsPerDevice.xs;
//   const mdItems = itemsQuantity - VisibleListItemsPerDevice.md;
//   const lgItems = itemsQuantity - VisibleListItemsPerDevice.lg;
//   const xlItems = itemsQuantity - VisibleListItemsPerDevice.xl;

//   return (
//     <>
//       {smItems > 0 && (
//         <div className="list-item w-36 md:!hidden">
//           <div className="flex h-36 w-full items-center justify-center bg-gray-200 font-semibold text-gray-500">
//             +{smItems}
//           </div>
//         </div>
//       )}
//       {mdItems > 0 && (
//         <div className="hidden w-36 md:list-item lg:hidden">
//           <div className="flex h-36 w-full items-center justify-center bg-gray-200 font-semibold text-gray-500">
//             +{mdItems}
//           </div>
//         </div>
//       )}
//       {lgItems > 0 && (
//         <div className="hidden w-36 lg:list-item xl:hidden">
//           <div className="flex h-36 w-full items-center justify-center bg-gray-200 font-semibold text-gray-500">
//             +{lgItems}
//           </div>
//         </div>
//       )}
//       {xlItems > 0 && (
//         <div className="hidden w-36 xl:list-item">
//           <div className="flex h-36 w-full items-center justify-center bg-gray-200 font-semibold text-gray-500">
//             +{xlItems}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// interface ManageOrderButtonsProps {
//   className: string;
//   orderId: number;
//   orderTrackingUrl?: string;
//   orderStatus: string | null;
// }

// const ManageOrderButtons = async ({
//   className,
//   orderId,
//   orderStatus,
//   orderTrackingUrl,
// }: ManageOrderButtonsProps) => {
//   const t = await getTranslations('Account.Orders');

//   return (
//     <div className={className}>
//       <Button aria-label={t('viewDetails')} asChild className="w-full md:w-fit" variant="secondary">
//         <Link href={`/account/order/${orderId}`}>{t('viewDetails')}</Link>
//       </Button>
//       {Boolean(orderTrackingUrl) && (
//         <Button
//           aria-label={t('trackOrder')}
//           asChild
//           className="w-full md:w-fit"
//           variant="secondary"
//         >
//           <Link href={{ pathname: orderTrackingUrl }}>{t('trackOrder')}</Link>
//         </Button>
//       )}
//       {Boolean(orderStatus) && orderStatus === 'SHIPPED' && (
//         <Button
//           aria-label={t('returnOrder')}
//           asChild
//           className="w-full md:w-fit"
//           variant="secondary"
//         >
//           <Link href={{ pathname: '' }}>{t('returnOrder')}</Link>
//         </Button>
//       )}
//     </div>
//   );
// };
// const OrderDetails = async ({
//   orderId,
//   orderDate,
//   orderPrice,
//   orderStatus,
// }: {
//   orderId: number;
//   orderDate: string;
//   orderPrice: {
//     value: number;
//     currencyCode: string;
//   };
//   orderStatus: string;
// }) => {
//   const t = await getTranslations('Account.Orders');
//   const format = await getFormatter();

//   return (
//     <div className="inline-flex flex-col gap-2 text-base md:flex-row md:gap-12">
//       <Link href={`/account/order/${orderId}`}>
//         <p className="flex justify-between md:flex-col">
//           <span>{t('orderNumber')}</span>
//           <span className="font-semibold">{orderId}</span>
//         </p>
//       </Link>
//       <p className="flex justify-between md:flex-col">
//         <span>{t('placedDate')}</span>
//         <span className="font-semibold">
//           {format.dateTime(new Date(orderDate), {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//           })}
//         </span>
//       </p>
//       <p className="flex justify-between md:flex-col">
//         <span>{t('totalPrice')}</span>
//         <span className="font-semibold">
//           {format.number(orderPrice.value, {
//             style: 'currency',
//             currency: orderPrice.currencyCode,
//           })}
//         </span>
//       </p>
//       <p className="align-center flex h-fit justify-center gap-2.5 rounded-3xl bg-secondary/10 px-4 py-1.5 font-semibold text-primary">
//         {orderStatus}
//       </p>
//     </div>
//   );
// };

// export const OrdersList = ({ customerOrders }: OrdersListProps) => {
//   return (
//     <ul className="flex w-full flex-col">
//       {customerOrders.map(({ entityId, orderedAt, status, totalIncTax, consignments }) => {
//         const shippingConsignments = consignments.shipping
//           ? consignments.shipping.map(({ lineItems, shipments }) => ({
//               lineItems: removeEdgesAndNodes(lineItems),
//               shipments: removeEdgesAndNodes(shipments),
//             }))
//           : undefined;
//         // NOTE: tracking url will be supported later
//         const trackingUrl = shippingConsignments
//           ? shippingConsignments
//               .flatMap(({ shipments }) =>
//                 shipments.map((shipment) => {
//                   if (
//                     shipment.tracking?.__typename === 'OrderShipmentNumberAndUrlTracking' ||
//                     shipment.tracking?.__typename === 'OrderShipmentUrlOnlyTracking'
//                   ) {
//                     return shipment.tracking.url;
//                   }

//                   return null;
//                 }),
//               )
//               .find((url) => url !== null)
//           : undefined;

//         return (
//           <li
//             className="inline-flex border-collapse flex-col gap-y-6 border-t border-gray-200 py-6 last:border-b"
//             key={entityId}
//           >
//             <OrderDetails
//               orderDate={orderedAt.utc}
//               orderId={entityId}
//               orderPrice={totalIncTax}
//               orderStatus={status.label}
//             />
//             <div className="flex gap-4">
//               <ul className="inline-flex gap-4 [&>*:nth-child(n+2)]:hidden md:[&>*:nth-child(n+2)]:list-item md:[&>*:nth-child(n+4)]:hidden lg:[&>*:nth-child(n+4)]:list-item lg:[&>*:nth-child(n+5)]:hidden xl:[&>*:nth-child(n+5)]:list-item lg:[&>*:nth-child(n+7)]:hidden">
//                 {(shippingConsignments ?? []).map(({ lineItems }) => {
//                   return lineItems.slice(0, VisibleListItemsPerDevice.xl).map((shippedProduct) => {
//                     return (
//                       <li className="w-36" key={shippedProduct.entityId}>
//                         <Suspense fallback={<ProductSnippetSkeleton />}>
//                           <ProductSnippet
//                             imagePriority={true}
//                             imageSize="square"
//                             product={assembleProductData({ ...shippedProduct, productOptions: [] })}
//                           />
//                         </Suspense>
//                       </li>
//                     );
//                   });
//                 })}
//               </ul>
//               <TruncatedCard
//                 itemsQuantity={(shippingConsignments ?? []).reduce(
//                   (orderItems, shipment) => orderItems + shipment.lineItems.length,
//                   0,
//                 )}
//               />
//               <ManageOrderButtons
//                 className="hidden lg:ms-auto lg:inline-flex lg:flex-col lg:gap-2"
//                 orderId={entityId}
//                 orderStatus={status.value}
//                 orderTrackingUrl={trackingUrl}
//               />
//             </div>
//             <ManageOrderButtons
//               className="inline-flex flex-col gap-2 md:flex-row lg:hidden"
//               orderId={entityId}
//               orderStatus={status.value}
//               orderTrackingUrl={trackingUrl}
//             />
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { getFormatter, getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { ExistingResultType } from '~/client/util';
import { Link } from '~/components/link';

import { getCustomerOrders } from '../page-data';
import { assembleProductData, ProductSnippet, ProductSnippetSkeleton } from './product-snippet';

export type Orders = ExistingResultType<typeof getCustomerOrders>['orders'];

interface OrdersListProps {
  customerOrders: Orders;
  ordersCount?: number;
}

enum VisibleListItemsPerDevice {
  xs = 1,
  md = 3,
  lg = 4,
  xl = 5,
}

const TruncatedCard = ({ itemsQuantity }: { itemsQuantity: number }) => {
  const smItems = itemsQuantity - VisibleListItemsPerDevice.xs;
  const mdItems = itemsQuantity - VisibleListItemsPerDevice.md;
  const lgItems = itemsQuantity - VisibleListItemsPerDevice.lg;
  const xlItems = itemsQuantity - VisibleListItemsPerDevice.xl;

  const TruncatedItem = ({ count }: { count: number }) => (
    <div className="flex h-36 w-full items-center justify-center rounded-lg bg-gray-100 font-semibold text-gray-600 transition-colors hover:bg-gray-200">
      +{count} more
    </div>
  );

  return (
    <>
      {smItems > 0 && (
        <div className="list-item w-36 md:!hidden">
          <TruncatedItem count={smItems} />
        </div>
      )}
      {mdItems > 0 && (
        <div className="hidden w-36 md:list-item lg:hidden">
          <TruncatedItem count={mdItems} />
        </div>
      )}
      {lgItems > 0 && (
        <div className="hidden w-36 lg:list-item xl:hidden">
          <TruncatedItem count={lgItems} />
        </div>
      )}
      {xlItems > 0 && (
        <div className="hidden w-36 xl:list-item">
          <TruncatedItem count={xlItems} />
        </div>
      )}
    </>
  );
};

interface ManageOrderButtonsProps {
  className: string;
  orderId: number;
  orderTrackingUrl?: string;
  orderStatus: string | null;
}

const ManageOrderButtons = async ({
  className,
  orderId,
  orderStatus,
  orderTrackingUrl,
}: ManageOrderButtonsProps) => {
  const t = await getTranslations('Account.Orders');

  const buttonClasses = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 ease-in-out";

  return (
    <div className={`${className} flex flex-col gap-2`}>
      <Link 
        href={`/account/order/${orderId}`}
        className={buttonClasses}
        aria-label={t('viewDetails')}
      >
        {t('viewDetails')}
      </Link>
      {Boolean(orderTrackingUrl) && (
        <Link
          href={{ pathname: orderTrackingUrl }}
          className={buttonClasses}
          aria-label={t('trackOrder')}
        >
          {t('trackOrder')}
        </Link>
      )}
      {Boolean(orderStatus) && orderStatus === 'SHIPPED' && (
        <Link
          href={{ pathname: '' }}
          className={buttonClasses}
          aria-label={t('returnOrder')}
        >
          {t('returnOrder')}
        </Link>
      )}
    </div>
  );
};

const OrderDetails = async ({
  orderId,
  orderDate,
  orderPrice,
  orderStatus,
}: {
  orderId: number;
  orderDate: string;
  orderPrice: {
    value: number;
    currencyCode: string;
  };
  orderStatus: string;
}) => {
  const t = await getTranslations('Account.Orders');
  const format = await getFormatter();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Link 
          href={`/account/order/${orderId}`}
          className="transition-colors hover:text-primary"
        >
          <p className="space-y-1">
            <span className="text-sm text-gray-600">{t('orderNumber')}</span>
            <span className="block font-semibold">{orderId}</span>
          </p>
        </Link>
        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          {orderStatus}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <p className="space-y-1">
          <span className="text-sm text-gray-600">{t('placedDate')}</span>
          <span className="block font-semibold">
            {format.dateTime(new Date(orderDate), {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </p>
        <p className="space-y-1">
          <span className="text-sm text-gray-600">{t('totalPrice')}</span>
          <span className="block font-semibold">
            {format.number(orderPrice.value, {
              style: 'currency',
              currency: orderPrice.currencyCode,
            })}
          </span>
        </p>
      </div>
    </div>
  );
};

export const OrdersList = ({ customerOrders }: OrdersListProps) => {
  return (
    <ul className="space-y-4">
      {customerOrders.map(({ entityId, orderedAt, status, totalIncTax, consignments }) => {
        const shippingConsignments = consignments.shipping
          ? consignments.shipping.map(({ lineItems, shipments }) => ({
              lineItems: removeEdgesAndNodes(lineItems),
              shipments: removeEdgesAndNodes(shipments),
            }))
          : undefined;

        const trackingUrl = shippingConsignments
          ? shippingConsignments
              .flatMap(({ shipments }) =>
                shipments.map((shipment) => {
                  if (
                    shipment.tracking?.__typename === 'OrderShipmentNumberAndUrlTracking' ||
                    shipment.tracking?.__typename === 'OrderShipmentUrlOnlyTracking'
                  ) {
                    return shipment.tracking.url;
                  }
                  return null;
                }),
              )
              .find((url) => url !== null)
          : undefined;

        return (
          <li key={entityId} className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 ease-in-out hover:shadow-lg">
            <div className="flex flex-col gap-4 p-6 md:flex-row md:items-start md:gap-8">
              {/* Left side - Order Details */}
              <div className="w-full md:w-1/3">
                <OrderDetails
                  orderDate={orderedAt.utc}
                  orderId={entityId}
                  orderPrice={totalIncTax}
                  orderStatus={status.label}
                />
                <ManageOrderButtons
                  className="mt-4"
                  orderId={entityId}
                  orderStatus={status.value}
                  orderTrackingUrl={trackingUrl}
                />
              </div>

              {/* Right side - Product Images */}
              <div className="flex flex-1 gap-4">
                <ul className="inline-flex gap-4 overflow-x-auto [&>*:nth-child(n+2)]:hidden md:[&>*:nth-child(n+2)]:list-item md:[&>*:nth-child(n+4)]:hidden lg:[&>*:nth-child(n+4)]:list-item lg:[&>*:nth-child(n+5)]:hidden xl:[&>*:nth-child(n+5)]:list-item lg:[&>*:nth-child(n+7)]:hidden">
                  {(shippingConsignments ?? []).map(({ lineItems }) => {
                    return lineItems.slice(0, VisibleListItemsPerDevice.xl).map((shippedProduct) => (
                      <li className="w-36 shrink-0 overflow-hidden rounded-md transition-transform duration-200 ease-in-out hover:scale-105" key={shippedProduct.entityId}>
                        <Suspense fallback={<ProductSnippetSkeleton />}>
                          <ProductSnippet
                            imagePriority={true}
                            imageSize="square"
                            product={assembleProductData({ ...shippedProduct, productOptions: [] })}
                          />
                        </Suspense>
                      </li>
                    ));
                  })}
                </ul>
                <TruncatedCard
                  itemsQuantity={(shippingConsignments ?? []).reduce(
                    (orderItems, shipment) => orderItems + shipment.lineItems.length,
                    0,
                  )}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};