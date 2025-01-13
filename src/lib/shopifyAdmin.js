
const SHOPIFY_ADMIN_API = import.meta.env.VITE_SHOPIFY_ADMIN_API;
const ADMIN_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_ADMIN_TOKEN;

export async function updateInventory(variantId, quantity) {
  const mutation = `
    mutation inventoryAdjustQuantity($input: InventoryAdjustQuantityInput!) {
      inventoryAdjustQuantity(input: $input) {
        inventoryLevel {
          available
        }
      }
    }
  `;

  const response = await fetch(SHOPIFY_ADMIN_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query: mutation,
      variables: {
        input: {
          inventoryItemId: variantId,
          availableDelta: quantity
        }
      }
    }),
  });

  return response.json();
}

export async function getInventoryLevels(productId) {
  const query = `
    query {
      product(id: "${productId}") {
        variants(first: 10) {
          edges {
            node {
              id
              inventoryQuantity
            }
          }
        }
      }
    }
  `;

  const response = await fetch(SHOPIFY_ADMIN_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query }),
  });

  return response.json();
}
