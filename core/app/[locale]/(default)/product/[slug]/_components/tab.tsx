'use client';

import React, { useState, useEffect } from 'react';
import TechData from './techdata';
import Bulk from './bulkprice';
import Deliveryinformation from './DeliveryInformation';
import Reviews from './reviews';

interface TabComponentProps {
  product: any; // Prop to accept the product description
}

const TabComponent = ({ product }: any) => {
  const [activeTab, setActiveTab] = useState('Description'); // Default active tab is "Description"

  const tabContent: any = {
    Description: { data: product.description, label: 'Description' }, // Use the passed product description
    TechnicalData: { data: product.techdata, label: 'Technical Data' },
    BulkPricing: { data: product.Bulkprice, label: 'Bulk Pricing' },
    DeliveryInformation: { data: product.DelivaryInformation, label: 'Delivery Information' },
    Reviews: { data: product.reviews, label: 'Reviews' },
  };

  return (
    <div className="mb-10">
      {/* Tab layout for desktop view */}
      <div className="hidden md:block">
        <div className="justify-left mb-4 flex">
          {Object.entries(tabContent).map(([tab, value]) => (
            <button
              key={tab}
              className={`p-3 ${activeTab === tab ? 'bg-[#03465c] bg-[#ededed]' : 'bg-[#e7f5f8] text-[#03465c]'}`}
              onClick={() => setActiveTab(tab)}
            >
              {value?.label?.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="bg-[#e7f5f8] p-4 text-left">
          <div className="text-base text-[#03465c]">
            {activeTab === 'Description' ? (
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            ) : (
              <div>{tabContent[activeTab]?.data}</div>
            )}

            {activeTab === 'TechnicalData' && <TechData product={product} />}
            {activeTab === 'BulkPricing' && <Bulk product={product} />}
            {activeTab === 'DeliveryInformation' && <Deliveryinformation product={product} />}
          </div>
        </div>
      </div>

      {/* Static table layout for mobile view */}
      <div className="block rounded-lg bg-[#e7f5f8]  md:hidden overflow-x-hidden">
        <table className="table-auto text-left">
          <tbody className="text-sm p-0 m-0 text-[#03465c]">
            <tr className="qb01">
              <th className="hidden p-2 font-bold sm:table-cell">Description</th>
              <td className="w-full max-w-full md:max-w-[600px] md:w-[60%]" dangerouslySetInnerHTML={{ __html: product.description }} />
            </tr>
            <tr className="qb01">
              <th className="hidden p-2 font-bold sm:table-cell">Technical Data</th>
              <td>
                <TechData product={product} />
              </td>
            </tr>
            <tr className="qb01">
              <th className="hidden  font-bold sm:table-cell">Bulk Pricing</th>
              <td className='overflow-x-hidden'>
                <Bulk product={product} />
              </td>
            </tr>
            <tr className="qb01">
              <th className="hidden p-2 font-bold sm:table-cell">Delivery Information</th>
              <td>
                <Deliveryinformation product={product} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabComponent;
