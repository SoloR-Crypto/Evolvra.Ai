import React, { createContext, useContext, useState, useEffect } from 'react';

const SHOPIFY_STOREFRONT_API = import.meta.env.VITE_SHOPIFY_STOREFRONT_API;
const STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

if (!SHOPIFY_STOREFRONT_API || !STOREFRONT_ACCESS_TOKEN) {
  console.error('Missing required Shopify API configuration');
}

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [checkoutUrl, setCheckoutUrl] = useState(null);

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

  const checkout = async () => {
    const checkoutDetails = await createCheckout(cart);
    if (checkoutDetails?.webUrl) {
      setCheckoutUrl(checkoutDetails.webUrl);
      window.location.href = checkoutDetails.webUrl;
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      checkout,
      checkoutUrl 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);