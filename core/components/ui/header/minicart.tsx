"use client";  // Mark this component as a Client Component

import React, { useState, useEffect } from 'react';
import Link from 'next/link';  // Import Next.js Link component

const MiniCart = () => {
  const [cart, setCart] = useState(null);  // State to store cart data
  const [isCartOpen, setIsCartOpen] = useState(false);  // State to toggle mini cart display

  useEffect(() => {
    fetchCart();  // Fetch the cart when the component mounts
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/storefront/carts');
      const data = await response.json();
      setCart(data[0]);  // Assuming you have one active cart
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);  // Toggle the cart visibility
  };

  return (
    <div className="mini-cart-container">
      <button onClick={toggleCart} className="mini-cart-trigger">
        <i className="icon-cart"></i>
        <span className="mini-cart-count">{cart?.lineItems?.physicalItems.length || 0}</span>
      </button>

      {isCartOpen && (
        <div className="mini-cart">
          {cart && cart.lineItems?.physicalItems.length > 0 ? (
            <div>
              <ul className="mini-cart-items">
                {cart.lineItems.physicalItems.map((item) => (
                  <li key={item.id} className="mini-cart-item">
                    <Link href={`/product/${item.productId}`} className="mini-cart-item-name">
                      {item.name}
                    </Link>
                    <span className="mini-cart-item-quantity">Qty: {item.quantity}</span>
                    <span className="mini-cart-item-price">${item.salePrice}</span>
                  </li>
                ))}
              </ul>
              <div className="mini-cart-summary">
                <span className="mini-cart-total">Total: ${cart.baseAmount}</span>
                <Link href="/cart.php" className="mini-cart-view-cart">View Cart</Link>
                <Link href="/checkout.php" className="mini-cart-checkout">Checkout</Link>
              </div>
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MiniCart;
