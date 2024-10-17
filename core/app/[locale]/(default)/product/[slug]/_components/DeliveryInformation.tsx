import { useTranslations } from 'next-intl';
import { FragmentOf, graphql } from '~/client/graphql';

export const DeliveryinformationFragment = graphql(`
  fragment TechDataFragment on Product {
    sku
    condition
    availability
  }
`);

interface Props {
  product: FragmentOf<typeof DeliveryinformationFragment>;
}

const Deliveryinformation: React.FC<Props> = ({ product }) => {
  const t = useTranslations('Deliveryinformation');

  if (!product.sku && !product.condition && !product.availability) {
    return null; // Return null if no technical data is available
  }

  return (
    <div className="Deliveryinformation">
      <div id="Canada" className="tabcontent">
        <h2>Canadian Delivery Details</h2>
        <br />
        <p>
          We have one of the largest online stocks of bearings and ancillary components available online anywhere in the world, and we take pride in great customer service, superb products, and express delivery to Canada.
        </p>
        <h3>98% of our products are typically despatched same day, with a 1-3 day delivery option to anywhere in Canada.</h3>
        <h3>All of our Canadian Dollar website prices include Taxes and Duty.</h3>
        <table className="delivery-info" style={{ width: '100%' }} border="0px solid #ffffff">
          <tbody>
            <tr>
              <td width="70%">
                <h2 style={{ fontFamily: 'Roboto Slab' }}>1-3 Day Service</h2>
              </td>
              <td align="center" width="30%">
                <img src="https://cdn11.bigcommerce.com/s-03842/content/NewSite/Icons/DHL.jpg" alt="DHL logo" width="160px" />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <table className="deliverytable" style={{ width: '100%' }} align="center">
          <tbody>
            <tr>
              <th style={{ width: '50%' }}>Order Value</th>
              <th style={{ width: '50%' }}>Delivery Cost</th>
            </tr>
            <tr>
              <td>$0.00 to $200.00</td>
              <td>$10.00</td>
            </tr>
            <tr>
              <td>Over $200.00</td>
              <td>Free Of Charge</td>
            </tr>
          </tbody>
        </table>
        <div>
          <h4>
            If you have any specific delivery requirements, call our sales team on 438 800 2658 or email us at <a href="mailto:sales@qualitybearingsonline.com">sales@qualitybearingsonline.com</a> and they will be happy to help you.
          </h4>
        </div>
      </div>
      <div id="International" className="tabcontent">
        <h2>International Delivery Details</h2>
        <br />
        <p>
          We have one of the largest online stocks of bearings and ancillary components available online anywhere in the world, and we take pride in great customer service, superb products, and express delivery Worldwide.
        </p>
        <h3>98% of our products are typically despatched same day, with a 2-4 day delivery option available.</h3>
        <p>Many of our clients choose our standard tracked DHL service, with a delivery time of between 2 and 4 working days.</p>
        <table className="delivery-info" style={{ width: '100%' }} border="0px solid #ffffff">
          <tbody>
            <tr>
              <td width="70%">
                <h2 style={{ fontFamily: 'Roboto Slab' }}>DHL 2-4 Day Service</h2>
              </td>
              <td align="center" width="30%">
                <img src="https://cdn11.bigcommerce.com/s-03842/content/NewSite/Icons/DHL.jpg" alt="DHL Logo" width="160px" />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <table className="deliverytable" style={{ width: '100%' }} align="center">
          <tbody>
            <tr>
              <th style={{ width: '50%' }}>Order Value</th>
              <th style={{ width: '50%' }}>Delivery Cost</th>
            </tr>
            <tr>
              <td>Up to £500.00</td>
              <td>£50.00</td>
            </tr>
            <tr>
              <td>Over £500.00</td>
              <td>Free of Charge</td>
            </tr>
          </tbody>
        </table>
        <div>
          <h4>
            If you have any specific delivery requirements, call our sales team on +44 113 323 7793 or email us at <a href="mailto:sales@qualitybearingsonline.com">sales@qualitybearingsonline.com</a> and they will be happy to help you.
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Deliveryinformation;
