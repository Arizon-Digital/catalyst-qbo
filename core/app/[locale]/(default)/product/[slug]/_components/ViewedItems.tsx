"use client"; 
import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import React from 'react';

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
                                <img 
                                    className="imagerecents"
                                    src= "https://cdn11.bigcommerce.com/s-03842/images/stencil/640w/products/14073/376570/PR45BI45_6006_2rs1_c3_skf_6006_2RS1_C3_SKF_Deep_Groove_Bearing_30_x_55_x_13mm_SZ4__62601.1729679797.jpg"
                                    alt={item.name}
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
