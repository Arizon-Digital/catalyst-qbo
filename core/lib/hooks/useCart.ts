'use client';
 
import { useState, useEffect } from 'react';
import type { CartResponse } from '~/app/api/cart/index';
 
export const useCart = () => {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(false);
 
  const fetchCartData = async () => {
    try {
      setLoading(true);
      const cartId = document.cookie
        .split('; ')
        .find(row => row.startsWith('cartId='))
        ?.split('=')[1];
 
      if (cartId) {
        const response = await fetch(`/api/cart`);
        if (!response.ok) throw new Error('Failed to fetch cart');
        const data = await response.json();
        setCart(data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };
 
  const removeItem = async (itemId: string) => {
    try {
      const response = await fetch(`/api/cart/items/${itemId}`, {
        method: 'DELETE',
      });
 
      if (response.ok) {
        await fetchCartData();
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };
 
  useEffect(() => {
    fetchCartData();
  }, []);
 
  return {
    cart,
    loading,
    refreshCart: fetchCartData,
    removeItem,
  };
};