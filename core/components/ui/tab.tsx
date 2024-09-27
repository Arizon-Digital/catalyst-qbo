"use client"; // Add this line at the top

import React, { useState } from 'react';

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState('house');

  const tabContent = {
    house: 'Content about Houses: Beautiful designs and architecture.',
    rent: 'Content about Rent: Tips for renting properties and agreements.',
    road: 'Content about Roads: Importance of road maintenance and safety.',
    hill: 'Content about Hills: Hiking trails and scenic views.',
  };

  return (
    <div className="mb-14">
      <div className="flex justify-center space-x-4 mb-4">
        {Object.keys(tabContent).map((tab) => (
          <button
            key={tab}
            className={`p-2 rounded ${activeTab === tab ? 'bg-[#03465c] text-white' : 'bg-[#e7f5f8] text-[#03465c]'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="p-20 text-center bg-[#e7f5f8]">
        <div className="text-[#03465c] text-base">{tabContent[activeTab]}</div>
      </div>
    </div>
  );
};

export default TabComponent;
