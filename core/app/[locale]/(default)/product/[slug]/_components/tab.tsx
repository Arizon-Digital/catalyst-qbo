"use client";

import React, { useState } from 'react';

interface TabComponentProps {
  productDescription: string;  // Prop to accept the product description
}

const TabComponent = ({ productDescription }: TabComponentProps) => {
  const [activeTab, setActiveTab] = useState('Description'); // Default active tab is "Description"

  const tabContent: any = {
    Description: productDescription,  // Use the passed product description
    TechnicalData: 'Technical data for the product goes here.',
    BulkPricing: 'Bulk pricing details for the product.',
    DeliveryInformation: 'Delivery information for the product.',
    Reviews: 'Customer reviews for the product.',
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
            <div dangerouslySetInnerHTML={{ __html: productDescription }} />
          ) : (
            // Render other tab content for non-description tabs
            <div>{tabContent[activeTab]}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabComponent;
