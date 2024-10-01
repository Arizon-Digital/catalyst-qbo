"use client"; // Add this line at the top

import React, { useState, useEffect } from 'react';

import { ProductReviewSchema, ProductReviewSchemaFragment } from './product-review-schema';

interface TabComponentProps {
  productDescription: string;  // Accept the product description as a prop
  productId: number; // Accept the product ID as a prop
}

const TabComponent = ({ productDescription, productId }: TabComponentProps) => {
  const [activeTab, setActiveTab] = useState('Description');
  const [isReviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsContent, setReviewsContent] = useState<JSX.Element | null>(null);

  const tabContent: any = {
    Description: productDescription,  // Use the product description from props
    TechnicalData: 'Technical data for the product goes here.',
    BulkPricing: 'Bulk pricing details for the product.',
    DeliveryInformation: 'Delivery information for the product.',
    Reviews: reviewsContent, // Store reviews content here
  };

  const handleTabClick = async (tab: string) => {
    setActiveTab(tab);

    if (tab === 'Reviews' && !reviewsContent) {
      setReviewsLoading(true);
      try {
        // Fetch reviews asynchronously
        const reviews = await <Review productId={productId} />;
        setReviewsContent(reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setReviewsLoading(false);
      }
    }
  };

  return (
    <div className="mbc-14">
      <div className="flex justify-left mb-42">
        {Object.keys(tabContent).map((tab) => (
          <button
            key={tab}
            className={`p-5 rounded ${activeTab === tab ? 'bg-[#03465c] text-whites' : 'bg-[#e7f5f8] text-[#03465c]'}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="p-21 text-left bg-[#e7f5f8]">
        <div className="text-[#03465c] text-base">
          {activeTab === 'Description' ? (
            // Render the description as HTML for the "Description" tab
            <div dangerouslySetInnerHTML={{ __html: productDescription }} />
          ) : activeTab === 'Reviews' ? (
            // Show loading state for reviews
            isReviewsLoading ? (
              <p>Loading reviews...</p>
            ) : (
              reviewsContent
            )
          ) : (
            // Render other tab content as plain text
            tabContent[activeTab]
          )}
        </div>
      </div>
    </div>
  );
};

export default TabComponent;
