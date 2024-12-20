'use client';

import React, {useState} from 'react';
import { Settings } from 'lucide-react';
import { SortBy } from '../../_components/sort-by';
import ProductGridSwitcher from './ProductGridSwitcher';
import ProductCountFilter from './ProductCountFilter';

export function ToggleFilter(){

    const [showFilters,setShowFilters]=useState(false);
    const handleClick=()=>{
        console.log("toggle")
       setShowFilters((prevState) => !prevState);
    }

    return(
        <div>
        <Settings size={28} color="#ca9618" className="mt-2 block lg:hidden" onClick={()=>{handleClick()}}/>
            <div>
        {showFilters &&
        <div className="plp-filters ml-[2.3%] w-[80%] font-[300]">
          <div className="form-field pdp hover:border-[#ca9618] hidden lg:block">
            <input
              className="form-input w-full"
              type="text"
              name="q"
              placeholder="Filter products by name or part number..."
              data-search-in-category=""
            />
          </div>
          {/*flex items-start justify-between */}
         <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between text-[#a5a5a5]">
            <div className="sort order flex items-center justify-between rounded-[4px] mb-4 lg:mb-0 border border-[#dcdcdc] hover:border-[#ca9618]">
              <SortBy />
            </div>
            <div className="product-list-modification flex gap-4">
              <div className="flex items-center justify-between rounded-[4px] border border-[#dcdcdc] px-[10px] py-2 hover:border-[#ca9618]">
                <ProductGridSwitcher />
              </div>
              <ProductCountFilter />
            </div>
          </div>
        </div>}
        </div>
        </div>
    )
}