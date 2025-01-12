
import React, { createContext, useContext, useState, useEffect } from 'react';

const SHOPIFY_STOREFRONT_API = 'https://your-store.myshopify.com/api/2024-01/graphql';
const STOREFRONT_ACCESS_TOKEN = '536ea351df8e040ef4f4a45aeea05641';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [checkoutId, setCheckoutId] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const createCheckout = async () => {
    const mutation = `
      mutation {
        checkoutCreate(input: {}) {
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

    const response = await fetch(SHOPIFY_STOREFRONT_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query: mutation }),
    });

    const { data } = await response.json();
    return data.checkoutCreate.checkout;
  };

  const addToCart = async (item) => {
    // Create checkout if it doesn't exist
    if (!checkoutId) {
      const checkout = await createCheckout();
      setCheckoutId(checkout.id);
    }

    // Add item to Shopify cart
    const mutation = `
      mutation {
        checkoutLineItemsAdd(
          checkoutId: "${checkoutId}",
          lineItems: [{ variantId: "${item.variantId}", quantity: ${item.quantity} }]
        ) {
          checkout {
            id
            lineItems {
              edges {
                node {
                  id
                  quantity
                  title
                }
              }
            }
          }
        }
      }
    `;

    await fetch(SHOPIFY_STOREFRONT_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query: mutation }),
    });

    // Update local cart state
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

  const removeFromCart = async (productId, variant) => {
    // Remove from Shopify cart
    if (checkoutId) {
      const mutation = `
        mutation {
          checkoutLineItemsRemove(
            checkoutId: "${checkoutId}",
            lineItemIds: ["${productId}"]
          ) {
            checkout {
              id
            }
          }
        }
      `;

      await fetch(SHOPIFY_STOREFRONT_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query: mutation }),
      });
    }

    // Update local cart state
    setCart(prevCart => prevCart.filter(item => 
      !(item.productId === productId && item.variant === variant)
    ));
  };

  const checkout = async () => {
    if (!checkoutId) return null;
    
    const query = `
      query {
        node(id: "${checkoutId}") {
          ... on Checkout {
            webUrl
          }
        }
      }
    `;

    const response = await fetch(SHOPIFY_STOREFRONT_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const { data } = await response.json();
    return data.node.webUrl;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
