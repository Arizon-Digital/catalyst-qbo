

"use client";

import React, { useState, useEffect } from 'react';
import TechData  from './techdata';
import Bulk from './bulkprice';
import Deliveryinformation from './DeliveryInformation';
import Reviews from './reviews';



interface TabComponentProps {
  product: any;  // Prop to accept the product description
}

const TabComponent = ({product}: any) => {
  const [activeTab, setActiveTab] = useState('Description'); // Default active tab is "Description"
  console.log('-------', product.description)
  const tabContent: any = {
    Description: product.description,  // Use the passed product description
    TechnicalData: product.techdata,
    BulkPricing: product.Bulkprice,
    DeliveryInformation: product.DelivaryInformation,
    Reviews: product.reviews ,
  };

  return (
    <div className="mb-143">
      <div className="flex justify-left mb-41">
        {Object.keys(tabContent).map((tab) => (
          <button
            key={tab}
            className={`p-5 ${activeTab === tab ? 'bg-[#03465c] text-whitee' : 'bg-[#e7f5f8] text-[#03465c]'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="p-53 text-left bg-[#e7f5f8]">
        <div className="text-[#03465c] text-basee">
          {activeTab === 'Description' ? (
            // Use dangerouslySetInnerHTML to render the product description as HTML
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          ) : ( 
            // Render other tab content for non-description tabs
            <div>{tabContent[activeTab]}</div>
          )}

{activeTab === 'TechnicalData' && (
            <TechData product={product} />
          )}
          {activeTab === 'BulkPricing' && (
            <Bulk product={product} />
          )}
          {activeTab === 'DeliveryInformation' && (
            <Deliveryinformation product={product} />
          )}
         
          
          
         
          
        </div>
      </div>
    </div>
  );
};



export default TabComponent;
