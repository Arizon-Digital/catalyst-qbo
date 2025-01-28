// "use client"; 
// import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
// import React from 'react';
// import { BcImage } from '~/components/bc-image';

// const ViewedItems = ({ recentlyViewed }: { recentlyViewed: any }) => {
//     // Clean up recently viewed items
//     let recentlyViewedItems = removeEdgesAndNodes(recentlyViewed);

    

//     return (
//         <div>
//             <ul id="viewed-items-list">
//                 {recentlyViewedItems.length > 0 ? (
//                     recentlyViewedItems.map((item, i) => (
//                         <li key={i} className="viewed-item">
//                             <div>
//                                 <BcImage
//                                     width={320}
//                                     height={320} 
//                                     className="imagerecents"
//                                     src={item?.defaultImage?.url320wide}
//                                     alt={item?.defaultImage?.altText}
//                                 />
                               
//                                 {item.pricesWithTax && item.pricesWithTax.price ? (
//                                     <div className="price-ss">
//                                         <div className="recently">{item.name || 'Item'}</div>
//                                         <div className="price">
//                                             {item.pricesWithTax.price.value.toFixed(2)} {item.pricesWithTax.price.currencyCode}
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <div>Price not available</div>
//                                 )}
//                             </div>
//                         </li>
//                     ))
//                 ) : (
//                     <li>No recently viewed items.</li>
//                 )}
//             </ul>
//         </div>
//     );
// };

// export default ViewedItems;




"use client";

import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import React from 'react';
import { BcImage } from '~/components/bc-image';
import { Link } from '~/components/link';
import ProductPriceDisplay from '~/app/[locale]/(default)/product/[slug]/_components/exclvat';

const ViewedItems = ({ recentlyViewed }: { recentlyViewed: any }) => {
    // Clean up recently viewed items
    let recentlyViewedItems = removeEdgesAndNodes(recentlyViewed);
    
    const getProductUrl = (item: any) => {
        if (item.path) return item.path;
        if (item.url) return item.url;
        return item.entityId ? `/product/${item.entityId}` : '#';
    };
    
    return (
        <div>
            <ul id="viewed-items-list">
                {recentlyViewedItems.length > 0 ? (
                    recentlyViewedItems.map((item, i) => {
                        const productUrl = getProductUrl(item);

                        return (
                            <li key={i} className="viewed-item">
                                <div>
                                    <BcImage
                                        width={320}
                                        height={320}
                                        className="imagerecents"
                                        src={item?.defaultImage?.url320wide}
                                        alt={item?.defaultImage?.altText}
                                    />
                                    
                                    {item.pricesWithTax && item.pricesWithTax.price ? (
                                        <div className="price-ss">
                                            <div className="recently">
                                                <Link href={productUrl} className="hover:underline text-blue-600">
                                                    {item.name || 'Item'}
                                                </Link>
                                            </div>
                                            <div className="miniprice">
                                                <ProductPriceDisplay
                                                    page="bag"
                                                    currencyData={item.pricesWithTax.price.currencyCode}
                                                    product={{
                                                        prices: {
                                                            price: {
                                                                value: item.pricesWithTax.price.value,
                                                                currencyCode: item.pricesWithTax.price.currencyCode,
                                                            },
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <Link href={productUrl} className="hover:underline text-blue-600">
                                                {item.name || 'Item'}
                                            </Link>
                                            <div>Price not available</div>
                                        </div>
                                    )}
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <li>No recently viewed items.</li>
                )}
            </ul>
        </div>
    );
};

export default ViewedItems;