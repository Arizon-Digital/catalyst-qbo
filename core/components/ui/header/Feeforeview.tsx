'use client';

import React, { useEffect, useState } from 'react';

const FeefoReview = ({ sku }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    // Dynamically load the Feefo review script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.feefo.com/en-GB/reviews/quality-bearings-online?displayFeedbackType=PRODUCT&withMedia=false&timeFrame=ALL';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="tab-content" id="tab-reviews">
      {/* Heading */}
      

      {/* Collapsible Content */}
      <div
        className={`productView-description-tabContent ${
          isCollapsed ? 'collapsed' : ''
        }`}
      >
        

        {/* Feefo Widget */}
        <div
          id="feefo-product-review-widgetId"
          className="feefo-review-widget-product"
          data-product-sku={sku}
        ></div>
      </div>

      
      <a
        href="#"
        className="emthemesModez-mobile-collapse-handle"
        onClick={(e) => {
          e.preventDefault();
          setIsCollapsed(!isCollapsed);
        }}
      >
        <span className="on">{isCollapsed ? 'View All' : 'Close'}</span>
        <span className="off">{!isCollapsed ? 'View All' : 'Close'}</span>
      </a>
    </div>
  );
};

export default FeefoReview;
