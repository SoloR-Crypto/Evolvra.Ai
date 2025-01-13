
const SHOPIFY_ADMIN_API = import.meta.env.VITE_SHOPIFY_ADMIN_API;
const ADMIN_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_ADMIN_TOKEN;

async function shopifyAdminFetch(query, variables = {}) {
  const response = await fetch(SHOPIFY_ADMIN_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }
  return json.data;
}

export async function updateInventory(variantId, quantity) {
  const mutation = `
    mutation inventoryAdjustQuantity($variantId: ID!, $quantity: Int!) {
      inventoryBulkAdjustQuantityAtLocation(
        inventoryItemAdjustments: [
          {
            inventoryItemId: $variantId
            quantityDelta: $quantity
          }
        ]
      ) {
        inventoryLevels {
          available
        }
      }
    }
  `;

  return shopifyAdminFetch(mutation, {
    variantId,
    quantity
  });
}

export async function getInventoryLevels(productId) {
  const query = `
    query getProduct($productId: ID!) {
      product(id: $productId) {
        variants(first: 10) {
          edges {
            node {
              id
              inventoryQuantity
              inventoryItem {
                id
                inventoryLevels(first: 1) {
                  edges {
                    node {
                      available
                      location {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  return shopifyAdminFetch(query, { productId });
}
