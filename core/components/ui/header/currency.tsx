import { removeEdgesAndNodes } from "@bigcommerce/catalyst-client";
import { getSessionCustomerId } from "~/auth";
import { client } from "~/client";
import { Currenciesquires } from "~/components/header/currency";
import { revalidate } from '~/client/revalidate-target';


// const customerId = await getSessionCustomerId();
// const { data: currencyData} = await client.fetch({
//     document: Currenciesquires,
//     fetchOptions: customerId ? { cache: 'no-store' } : { next: { revalidate } },
//   });
  
//   const currency = removeEdgesAndNodes(currencyData?.site?.currencies);
//   console.log('---currencies---', JSON.stringify(currency));
//    {currency.map ((item) => {
//     <li>
//       <h3>{item.name}{item.code}</h3>
     
//     </li>
//    })}
// }

export async function getCurrencies() {
    const customerId = await getSessionCustomerId();
    
    const { data: currencyData } = await client.fetch({
      document: Currenciesquires,
      fetchOptions: customerId ? { cache: 'no-store' } : { next: { revalidate } },
    });
  
    const currency = removeEdgesAndNodes(currencyData?.site?.currencies);
    return currency;
  }
  
  // Optional: If you want to type the currency data
  export interface Currency {
    code: string;
    entityId: number;
    name: string;
  }
  
  // Optional: Export a currency selector component if needed
  export const CurrencyList = ({ currency }: { currency: Currency[] }) => {
    return (
      <ul>
        {currency.map((item) => (
          <li key={item.entityId}>
            <h3> currency Code:{item.name} {item.code}</h3>
          </li>
        ))}
      </ul>
    );
  };

