
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaLeaf } from 'react-icons/fa';
import { useCart } from '../lib/CartContext';

const STORE_NAME = import.meta.env.VITE_SHOPIFY_STORE_NAME;
const STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const SHOPIFY_STOREFRONT_API = `https://${STORE_NAME}.myshopify.com/api/2024-01/graphql.json`;

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const query = `
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          title
          description
          images(first: 5) {
            edges {
              node {
                url
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                price {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
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
          query,
          variables: { id }
        }),
      });

      const json = await response.json();
      setProduct(json.data.product);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white">Product not found</div>
        </div>
      </div>
    );
  }

  const variant = product.variants.edges[0].node;
  const images = product.images.edges;

  const handleAddToCart = async () => {
    if (!variant.availableForSale) return;
    
    await addToCart({
      variantId: variant.id,
      title: product.title,
      price: variant.price,
      quantity,
      image: images[0]?.node.url
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="aspect-w-1 aspect-h-1">
              <img 
                src={images[0]?.node.url}
                alt={product.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {images.slice(1).map((img, idx) => (
                <img 
                  key={idx}
                  src={img.node.url}
                  alt={`${product.title} ${idx + 2}`}
                  className="w-full h-24 object-cover rounded-lg cursor-pointer"
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-bold text-white">{product.title}</h1>
            <p className="text-2xl text-primary-400">
              {Number(variant.price.amount).toFixed(2)} {variant.price.currencyCode}
            </p>
            <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: product.description }} />

            <div className="space-y-2">
              <label className="text-white font-medium">Quantity</label>
              <div className="flex items-center space-x-3">
                <button 
                  className="w-10 h-10 rounded-lg bg-gray-800 text-white flex items-center justify-center"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="text-white">{quantity}</span>
                <button 
                  className="w-10 h-10 rounded-lg bg-gray-800 text-white flex items-center justify-center"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="w-full luxury-button flex items-center justify-center space-x-2"
              onClick={handleAddToCart}
              disabled={!variant.availableForSale}
            >
              <FaShoppingCart />
              <span>{variant.availableForSale ? 'Add to Cart' : 'Sold Out'}</span>
            </button>

            <div className="border-t border-gray-800 pt-6 mt-6">
              <div className="flex items-center space-x-2 text-primary-400">
                <FaLeaf />
                <span>Premium Quality Product</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
