"use client"; 
import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import React from 'react';
import { BcImage } from '~/components/bc-image';

const ViewedItems = ({ recentlyViewed }: { recentlyViewed: any }) => {
    // Clean up recently viewed items
    let recentlyViewedItems = removeEdgesAndNodes(recentlyViewed);

    console.log('---recentlyViewed-------', recentlyViewedItems);

    return (
        <div>
            <ul id="viewed-items-list">
                {recentlyViewedItems.length > 0 ? (
                    recentlyViewedItems.map((item, i) => (
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
                                    <div className='price-ss'>
                                         <div className='recently'>{item.name || 'Item'}</div>
                                        <div> {item.pricesWithTax.price.value.toFixed(2)} {item.pricesWithTax.price.currencyCode}</div>
                                    </div>
                                ) : (
                                    <div>Price not available</div>
                                )}
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No recently viewed items.</li>
                )}
            </ul>
        </div>
    );
};

export default ViewedItems;
