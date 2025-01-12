
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: ['read_products'],
  hostName: process.env.SHOPIFY_STORE_URL,
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false,
});

export default shopify;
