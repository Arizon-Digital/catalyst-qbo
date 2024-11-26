'use client';

import { useState, useRef, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from '~/components/link';
import { useCart } from '~/lib/hooks/useCart';
import { RemoveFromCartButton } from '~/app/[locale]/(default)/cart/_components/remove-from-cart-button';
import { CheckoutButtonPopUp } from './checkout-button';
import ProductPriceDisplay from '~/app/[locale]/(default)/product/[slug]/_components/exclvat';
import { RemoveItem } from '~/app/[locale]/(default)/cart/_components/remove-item';
import { MiniCartIcon } from '~/components/common-images';
import { BcImage } from '~/components/bc-image';

export const MiniCart = ({ cartItems, closeModal, cartId, count }: { cartItems: any, closeModal: any, cartId: string, count: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [removeError, setRemoveError] = useState<string | null>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const { cart, loading } = useCart();
  const [miniBag, setMiniBag] = useState();

  useEffect(() => {
    const miniBagIcons = async() => {
      let minicartIcon: any = await  MiniCartIcon();
      setMiniBag(minicartIcon);
    }
    miniBagIcons();
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasItems = cartItems?.lineItems?.physicalItems && cartItems.lineItems.physicalItems.length > 0;

  const handleRemoveItem = async (e: React.FormEvent<HTMLFormElement>, lineItemEntityId: string) => {
    e.preventDefault();
    alert(lineItemEntityId)
    try {
      const result = RemoveItem({
        lineItemEntityId
      });

      if (result.status === 'error') {
        setRemoveError(result.error || 'Failed to remove item');
        console.error('Error removing item:', result.error);
      } else {
        setRemoveError(null);
      }
    } catch (error) {
      console.error('Error removing item:', error);
      setRemoveError('Failed to remove item');
    }
  };

  return (
    <div className="relative" ref={cartRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center gap-2 p-2 rounded-full"
        aria-label="Shopping cart"
      >
        {miniBag && <BcImage 
          src={miniBag}
          alt="mini-cart" 
          width="50" 
          height="50" 
        />}

        <span className="absolute -right-3 -top-1 h-[24px] w-[24px] flex items-center justify-center rounded-full bg-[#1c2541] text-xs font-bold text-white">
          {count}
        </span>

        <span className="text-[#1c2541] font-medium text-sm">Cart</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-96 z-50 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              {removeError && (
                <p className="text-red-500 text-sm">{removeError}</p>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto">
              {hasItems ? (
                <>
                  {cartItems?.lineItems?.physicalItems?.map((item: any) => (
                    <div key={item.id} className="flex gap-4 py-4 border-b">
                      <div className="w-20 h-20 bg-gray-100 rounded">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm minicart">{item.name}</h3>
                        <p className="text-sm text-gray-500 minicart">Brand: {item.brand}</p>
                        
                        <div className="mt-2 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-sm minicart">Qty: {item.quantity}</span>
                          </div>
                          
                          <div>
                            <span className="text-sm minicart">Price: </span>
                            <div className='miniprice'>
                              <ProductPriceDisplay
                                product={{
                                  prices: {
                                    price: {
                                      value: item.extendedSalePrice.value,
                                      currencyCode: item.extendedSalePrice.currencyCode
                                    }
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-end">
                          <form onSubmit={(e) => handleRemoveItem(e, item.entityId)}>
                            <input type="hidden" name="lineItemEntityId" value={item.entityId} />
                            <RemoveFromCartButton icon="trash" />
                          </form>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Your cart is empty
                </div>
              )}
            </div>

            {hasItems && (
              <div className="mt-4 space-y-2">
                <CheckoutButtonPopUp cartId={cartId} />
                <Link
                  href="/cart"
                  className="block w-full border border-gray-200 text-center py-2 rounded-md hover:bg-gray-100"
                >
                  VIEW CART
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniCart;



