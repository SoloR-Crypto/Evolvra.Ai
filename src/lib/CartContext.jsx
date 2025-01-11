
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => 
        i.productId === item.productId && i.variant === item.variant
      );

      if (existingItem) {
        return prevCart.map(i => 
          i.productId === item.productId && i.variant === item.variant
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      return [...prevCart, item];
    });
  };

  const removeFromCart = (productId, variant) => {
    setCart(prevCart => prevCart.filter(item => 
      !(item.productId === productId && item.variant === variant)
    ));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
