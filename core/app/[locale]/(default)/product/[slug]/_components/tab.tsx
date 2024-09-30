"use client"; // Add this line at the top

import React, { useState } from 'react';

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState('house');

  const tabContent: any = {
    Description: 'Content about Rent: Tips for renting properties and agreements.',
    TechnicalData : 'Content about Rent: Tips for renting properties and agreements.',
    BulkPricing : 'Content about Roads: Importance of road maintenance and safety.',
    DeliveryInformation : 'Content about Hills: Hiking trails and scenic views.',
    Reviews: 'Content about Hills: Hiking trails and scenic views.',
  };

  return (
    <div className="mbc-14">
      <div className="flex justify-left  mb-42">
        {Object.keys(tabContent).map((tab) => (
          <button
            key={tab}
            className={`p-5 rounded ${activeTab === tab ? 'bg-[#03465c] text-whites' : 'bg-[#e7f5f8] text-[#03465c]'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="p-21 text-leftt bg-[#e7f5f8]">
        <div className="text-[#03465c] text-base">{tabContent[activeTab]}</div>
      </div>
    </div>
  );
};

export default TabComponent;