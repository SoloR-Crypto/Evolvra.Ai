
const SHOPIFY_ADMIN_API = 'https://your-store.myshopify.com/admin/api/2024-01/graphql.json';
const ADMIN_ACCESS_TOKEN = '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';

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
