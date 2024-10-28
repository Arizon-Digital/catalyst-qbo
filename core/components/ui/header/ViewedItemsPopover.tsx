'use client';

import React, { useEffect, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { graphql } from "~/client/graphql";
import ViewedItems from 'app/[locale]/(default)/product/[slug]/_components/ViewedItems'; 
import { getRecentlyViewedProducts } from "~/components/graphql-apis";


const ViewedItemsPopover = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<any>([]);
  useEffect(() => {
    const getRecentlyViewDatas = async() => {
      let productIds: any = JSON?.parse(localStorage.getItem('qbo_recently_viewed_items')) || [];
      let currencyCode = 'USD';
      let recentlyReviewed = await getRecentlyViewedProducts(productIds, currencyCode);
      setRecentlyViewed(recentlyReviewed);
    }
    getRecentlyViewDatas();
  }, []);
  return ( 
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="tab"
          style={{
            
          }}
          aria-label="Quickview"
        >
          hi
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="fixed bg-white rounded-md p-6 z-50"
          style={{
            top: '120px',
            right: '-190px',
            transform: 'translate(-50%, -50%)',
            width: '290px',
            maxWidth: '1500px',
          }}
          sideOffset={5}
        >
          <h3 className="text-lg font-bold">Recently viewed products</h3>
          <div className="mt-4">
            <ViewedItems recentlyViewed={recentlyViewed} /> 
          </div>
          <div style={{ display: "flex", marginTop: '20px', justifyContent: "flex-end" }}>
            <Popover.Close asChild>
              <button className="Button bg-green-500 text-white px-4 py-2 rounded" aria-label="Close">
                Close
              </button>
            </Popover.Close>
          </div>
          <Popover.Arrow className="PopoverArrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  ); 
};

export default ViewedItemsPopover; 
