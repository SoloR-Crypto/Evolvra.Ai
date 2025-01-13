import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaSearch, FaLeaf, FaDna, FaBrain, FaFlask } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../lib/CartContext';
import ProductCard from './ProductCard';

const STORE_NAME = import.meta.env.VITE_SHOPIFY_STORE_NAME;
const STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const SHOPIFY_STOREFRONT_API = `https://${STORE_NAME}.myshopify.com/api/2024-01/graphql.json`;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All'); // Re-added from original
  const { cart, addToCart, checkout } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    if (!SHOPIFY_STOREFRONT_API || !STOREFRONT_ACCESS_TOKEN) {
      console.error('Missing Shopify API credentials');
      setLoading(false);
      return;
    }

    const query = `
      query {
        products(first: 20) {
          edges {
            node {
              id
              title
              description
              images(first: 1) {
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
        }
      }
    `;

    try {
      if (!STORE_NAME || !STOREFRONT_ACCESS_TOKEN) {
        console.error('Missing required environment variables:');
        console.error('STORE_NAME:', !!STORE_NAME);
        console.error('STOREFRONT_ACCESS_TOKEN:', !!STOREFRONT_ACCESS_TOKEN);
        throw new Error('Missing Shopify API credentials');
      }

      console.log('Store name:', STORE_NAME);
      console.log('API URL:', SHOPIFY_STOREFRONT_API);
      console.log('Token present:', !!STOREFRONT_ACCESS_TOKEN);
      
      const response = await fetch(SHOPIFY_STOREFRONT_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
          'Accept': 'application/json',
          'Origin': window.location.origin,
        },
        body: JSON.stringify({ query }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const text = await response.text();
      console.log('Response text:', text);

      if (!text) {
        throw new Error('Empty response from server');
      }

      const json = JSON.parse(text);
      if (!json.data || !json.data.products) {
        console.error('Invalid response:', json);
        throw new Error('Invalid response format');
      }

      setProducts(json.data.products.edges.map(edge => edge.node));
    } catch (error) {
      console.error('Error fetching products:', error.message);
      console.error('Full error:', error);
      setProducts([]); // Set empty products on error
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    const variant = product.variants.edges[0].node;
    if (!variant.availableForSale) {
      console.log('Product not available for sale');
      return;
    }
    await addToCart({
      variantId: variant.id,
      title: product.title,
      price: {
        amount: Number(variant.price.amount),
        currencyCode: variant.price.currencyCode
      },
      quantity: 1,
      image: product.images.edges[0]?.node.url
    });
  };

  const categories = [ // Re-added from original
    { name: 'All', icon: <FaLeaf /> },
    { name: 'Nootropics', icon: <FaBrain /> },
    { name: 'Supplements', icon: <FaDna /> },
    { name: 'Elixirs', icon: <FaFlask /> },
    { name: 'Sacred Herbs', icon: <FaLeaf /> },
    { name: 'Ceremonial Tools', icon: <FaFlask /> }
  ];

  const filteredProducts = activeCategory === 'All' // Re-added from original
    ? products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products.filter(product =>
        (product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
        //This part is a guess, there's no category field in the shopify data.  Needs adjustment to match Shopify data structure if different.
        product.title.includes(activeCategory)
      );


  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="relative flex-1 max-w-xl">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary-500 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={checkout}
            className="ml-4 px-6 py-3 bg-primary-500 text-white rounded-lg flex items-center space-x-2 hover:bg-primary-600 transition-colors"
          >
            <FaShoppingCart />
            <span>Checkout ({cart.length})</span>
          </button>
        </div>

        {/* Categories - Re-added from original */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-6 py-3 rounded-lg flex items-center space-x-2 ${
                activeCategory === category.name
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </motion.button>
          ))}
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <ProductCard key={`skeleton-${index}`} loading={true} />
            ))
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <p className="text-gray-400 text-xl">No products found</p>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </motion.div>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="luxury-card group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
              >
                <Link to={`/product/${product.id}`}>
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={product.images.edges[0]?.node.url}
                      alt={product.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </Link>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl text-white">
                      {Number(product.variants.edges[0].node.price.amount).toFixed(2)} {product.variants.edges[0].node.price.currencyCode}
                    </span>
                    <motion.button
                      onClick={() => handleAddToCart(product)}
                      className="luxury-button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!product.variants.edges[0].node.availableForSale}
                    >
                      {product.variants.edges[0].node.availableForSale
                        ? 'Add to Cart'
                        : 'Sold Out'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
        {/* Subscription Plans - Re-added from original */}
        <div className="mt-24">
          <h2 className="premium-heading text-center mb-12">Elite Membership Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sovereign",
                price: "99",
                features: ["Basic Protocol Access", "Community Support", "Monthly Supplies"]
              },
              {
                name: "Illuminated",
                price: "199",
                features: ["Advanced Protocols", "Priority Support", "Bi-weekly Supplies", "Expert Consultations"]
              },
              {
                name: "Transcendent",
                price: "399",
                features: ["All Protocols", "24/7 VIP Support", "Weekly Supplies", "Personal Biohacking Coach"]
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                className="luxury-card p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <FaLeaf className="text-primary-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full luxury-button">
                  Choose Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;