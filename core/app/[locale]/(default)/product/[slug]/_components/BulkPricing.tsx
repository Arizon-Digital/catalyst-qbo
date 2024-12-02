'use client';
import React, { ChangeEvent } from 'react';

export default function BulkPricing() {
  const clickEventhandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
  }

  return (
    <div>
      <h3 className="font-semibold flex productView-info-name">Bulk Pricing  <p className="pr productView-info-value underline hover:text-blue-500">:
        <a href="/bulkpricing/" onClick={() => clickEventhandler}> Click Here to Enquire</a>
      </p></h3>
    </div>
  );
};
