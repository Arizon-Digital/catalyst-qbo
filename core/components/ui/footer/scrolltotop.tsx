'use client'

import React, { useEffect, useState } from 'react'

export const ScrollToTop: React.FC = () => {


    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      

  return (
    <div className=''>
      <button type='button' onClick={scrollTop} className=' fixed bottom-[100px] right-[35px] flex h-[55px] w-[55px] items-center justify-center rounded-[4px] border border-[#e0e1e4] bg-white text-[#1a1a1a] transition-opacity duration-300  cursor-pointer'>
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 14l5-5 5 5"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
    </div>
  )
}
