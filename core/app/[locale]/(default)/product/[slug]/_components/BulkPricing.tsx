'use client';
import React, { ChangeEvent } from 'react';

export default function BulkPricing() {
  const clickEventhandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
  }

  return (
    <div>
      <h3 className="font-semibold flex productView-info-name">Bulk Pricing  <p className="pr productView-info-value">:
        <a href="/bulk-pricing" onClick={() => clickEventhandler}> <span className="underline hover:text-blue-500 capitalize">Click Here to Enquire</span></a>
      </p></h3>
    </div>
  );
};
