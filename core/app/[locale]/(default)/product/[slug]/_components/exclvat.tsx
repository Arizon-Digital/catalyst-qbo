// 'use client';

// import { useEffect, useState } from 'react';
// import { getCurrencyCodeFn } from '~/components/header/_actions/getCurrencyList';

// export function CurrencyTextWrapper() {
//   const [showExclTax, setShowExclTax] = useState(false);

//   useEffect(() => {
//     const checkCurrency = async () => {
//       const currency = await getCurrencyCodeFn() || 'CAD';
//       setShowExclTax(currency === 'GBP');
//     };
//     checkCurrency();
//   }, []);

//   if (!showExclTax) return null;
//   return <span> exclusive Vat.</span>
//   ;
  
// }

'use client';

import { useEffect, useState } from 'react';
import { getCurrencyCodeFn } from '~/components/header/_actions/getCurrencyList';

export function CurrencyTextWrapper() {
  const [showExclTax, setShowExclTax] = useState(false);

  useEffect(() => {
    const checkCurrency = async () => {
      const currency = await getCurrencyCodeFn() || 'CAD';
      setShowExclTax(currency === 'GBP');
    };
    checkCurrency();
  }, []);

  if (!showExclTax) return null;
  return (
    <div>
      <span> excl. VAT</span>
      {showExclTax && (
        <div>
          <span> incl. VAT</span>
        </div>
      )}
    </div>
  );
}