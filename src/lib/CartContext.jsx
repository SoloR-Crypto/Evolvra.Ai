import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Added import

const STORE_NAME = import.meta.env.VITE_SHOPIFY_STORE_NAME;
const STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const SHOPIFY_STOREFRONT_API = `https://${STORE_NAME}.myshopify.com/api/2024-01/graphql.json`;

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const navigate = useNavigate(); // Added useNavigate

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const createCheckout = async (items) => {
    const lineItems = items.map(item => ({
      variantId: item.variantId,
      quantity: item.quantity,
    }));

    const mutation = `
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            webUrl
          }
          checkoutUserErrors {
            message
            field
          }
        }
      }
    `;

    try {
      const response = await fetch(SHOPIFY_STOREFRONT_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            input: {
              lineItems,
              allowPartialAddresses: true,
            },
          },
        }),
      });

      const { data } = await response.json();
      return data.checkoutCreate.checkout;
    } catch (error) {
      console.error('Error creating checkout:', error);
      return null;
    }
  };

  const addToCart = async (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => 
        i.variantId === item.variantId
      );

      if (existingItem) {
        return prevCart.map(i => 
          i.variantId === item.variantId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      return [...prevCart, item];
    });
  };

  const removeFromCart = (variantId) => {
    setCart(prevCart => prevCart.filter(item => item.variantId !== variantId));
  };

  const updateQuantity = (variantId, newQuantity) => {
    setCart(prevCart => {
      if (newQuantity === 0) {
        return prevCart.filter(item => item.variantId !== variantId);
      }
      return prevCart.map(item =>
        item.variantId === variantId
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  };

  const checkout = async (shippingInfo) => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    const checkoutDetails = await createCheckout(cart, shippingInfo);
    if (checkoutDetails?.webUrl) {
      setCheckoutUrl(checkoutDetails.webUrl);
      window.location.href = checkoutDetails.webUrl;
    } else {
      alert('Unable to create checkout. Please try again.');
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart,
      updateQuantity,
      checkout,
      checkoutUrl 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);