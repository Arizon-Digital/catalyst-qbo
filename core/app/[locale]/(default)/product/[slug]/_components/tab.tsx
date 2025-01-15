'use client';

import React, { useState, useEffect } from 'react';
import TechData from './techdata';
import Bulk from './bulkprice';
import Deliveryinformation from './DeliveryInformation';
import Reviews from './reviews';
import FeefoReview from '~/components/ui/header/Feeforeview';
import { Warranty, WarrantyFragment } from './warranty';
import { FragmentOf } from '~/client/graphql';

interface TabComponentProps {
  product: FragmentOf<typeof WarrantyFragment> & {
    description: string;
    techdata: any;
    Bulkprice: any;
    DelivaryInformation: any;
    reviews: any;
  };
}

const TabComponent = ({ product }: TabComponentProps) => {
  // Create a product copy without warranty for TechData component
  const productWithoutWarranty = {
    ...product,
    warranty: undefined
  };

  const [activeTab, setActiveTab] = useState('Description');

  const tabContent: any = {
    Description: { data: product.description, label: 'Description' },
    TechnicalData: { data: product.techdata, label: 'Technical Data' },
    BulkPricing: { data: product.Bulkprice, label: 'Bulk Pricing' },
    DeliveryInformation: { data: product.DelivaryInformation, label: 'Delivery Information' },
    Reviews: { data: product.reviews, label: 'Reviews' },
    ...(product.warranty && {
      SpareParts: { data: product.warranty, label: 'Spare Parts' }
    })
  };

  const renderTabContent = (tab: string) => {
    switch (tab) {
      case 'Description':
        return <div dangerouslySetInnerHTML={{ __html: product.description }} />;
      case 'TechnicalData':
        return <TechData product={productWithoutWarranty} />;
      case 'BulkPricing':
        return <Bulk product={product} />;
      case 'DeliveryInformation':
        return <Deliveryinformation product={product} />;
      case 'Reviews':
        return <FeefoReview sku={product.sku} />;
      case 'SpareParts':
        return <div dangerouslySetInnerHTML={{ __html: product.warranty }} />;
      default:
        return <div>{tabContent[tab]?.data}</div>;
    }
  };

  return (
    <div className="mb-10">
      {/* Tab layout for desktop view */}
      <div className="hidden md:block">
        <div className="justify-left mb-4 flex">
          {Object.entries(tabContent).map(([tab, value]) => (
            <button
              key={tab}
              className={`p-3 ${
                activeTab === tab ? 'bg-[#03465c] bg-[#ededed]' : 'bg-[#e7f5f8] text-[#03465c]'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {value?.label?.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="bg-[#e7f5f8] p-4 text-left">
          <div className="text-base text-[#03465c]">
            {renderTabContent(activeTab)}
          </div>
        </div>
      </div>

      {/* Static table layout for mobile view */}
      <div className="block rounded-lg bg-[#e7f5f8] md:hidden overflow-x-hidden">
        <table className="table-auto text-left">
          <tbody className="text-sm p-0 m-0 text-[#03465c]">
            <tr className="qb01">
              <th className="hidden p-2 font-bold sm:table-cell">Description</th>
              <td 
                className="w-full max-w-full md:max-w-[600px] md:w-[60%]" 
                dangerouslySetInnerHTML={{ __html: product.description }} 
              />
            </tr>
            <tr className="qb01">
              <th className="hidden p-2 font-bold sm:table-cell">Technical Data</th>
              <td>
                <TechData product={productWithoutWarranty} />
              </td>
            </tr>
            <tr className="qb01">
              <th className="hidden font-bold sm:table-cell">Bulk Pricing</th>
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
            {product.warranty && (
              <tr className="qb01">
                <th className="hidden p-2 font-bold sm:table-cell">Spare Parts</th>
                <td dangerouslySetInnerHTML={{ __html: product.warranty }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabComponent;