import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaLeaf, FaShieldAlt, FaTruck, FaCrown } from 'react-icons/fa';
import { useCart } from '../lib/CartContext';

const STORE_NAME = import.meta.env.VITE_SHOPIFY_STORE_NAME;
const STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const SHOPIFY_STOREFRONT_API = `https://${STORE_NAME}.myshopify.com/api/2024-01/graphql.json`;

const ProductPage = () => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    fetchProduct();
  }, [handle]);

  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        descriptionHtml
        vendor
        productType
        images(first: 5) {
          edges {
            node {
              url
              altText
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
              quantityAvailable
            }
          }
        }
      }
    }
  `;

  const fetchProduct = async () => {
    try {
      const response = await fetch(SHOPIFY_STOREFRONT_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          query,
          variables: { handle }
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
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-gray-800 rounded-xl"></div>
            <div className="h-8 bg-gray-800 w-1/3 rounded"></div>
            <div className="h-4 bg-gray-800 w-1/4 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-white text-center">
            <h2 className="text-2xl font-bold">Product not found</h2>
            <button 
              onClick={() => navigate('/shop')}
              className="mt-4 luxury-button"
            >
              Return to Shop
            </button>
          </div>
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
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          {/* Image Gallery */}
          <div className="space-y-6">
            <motion.div 
              className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden bg-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img 
                src={images[selectedImage]?.node.url}
                alt={images[selectedImage]?.node.altText || product.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <motion.button
                  key={idx}
                  className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                    selectedImage === idx ? 'ring-2 ring-primary-500' : ''
                  }`}
                  onClick={() => setSelectedImage(idx)}
                  whileHover={{ scale: 1.05 }}
                >
                  <img 
                    src={img.node.url}
                    alt={`${product.title} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="text-sm text-navy-600">FOR {product.productType || 'ALL'}</div>
            <motion.h1 
              className="text-3xl font-bold text-navy-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {product.title}
            </motion.h1>
            
            <div className="flex items-center space-x-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-sm" />
              ))}
            </div>

            <motion.div 
              className="flex items-baseline space-x-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-3xl font-bold text-emerald-700">
                ${Number(variant.price.amount).toFixed(2)} {variant.price.currencyCode}
              </span>
              <span className="text-gray-500 line-through text-lg">
                ${(Number(variant.price.amount) * 1.2).toFixed(2)}
              </span>
            </motion.div>

            <div className="bg-green-50 rounded-lg p-3 inline-block">
              <p className="text-emerald-700 text-sm flex items-center">
                🎁 FREE Gift With Subscription
              </p>
            </div>

            <motion.div 
              className="luxury-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="text-white font-medium block">Quantity</label>
              <div className="flex items-center space-x-4">
                <button 
                  className="w-12 h-12 rounded-lg bg-gray-800 text-white flex items-center justify-center text-xl hover:bg-gray-700"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="text-white text-xl w-12 text-center">{quantity}</span>
                <button 
                  className="w-12 h-12 rounded-lg bg-gray-800 text-white flex items-center justify-center text-xl hover:bg-gray-700"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </motion.div>

            <motion.button
              className="w-full bg-emerald-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-emerald-700 transition-colors duration-200"
              onClick={handleAddToCart}
              disabled={!variant.availableForSale}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Shop Now
            </motion.button>

            <motion.div 
              className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-center">
                <FaShieldAlt className="text-primary-400 text-2xl mx-auto mb-2" />
                <p className="text-white text-sm">Premium Quality</p>
              </div>
              <div className="text-center">
                <FaTruck className="text-primary-400 text-2xl mx-auto mb-2" />
                <p className="text-white text-sm">Fast Shipping</p>
              </div>
              <div className="text-center">
                <FaCrown className="text-primary-400 text-2xl mx-auto mb-2" />
                <p className="text-white text-sm">Luxury Service</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductPage;