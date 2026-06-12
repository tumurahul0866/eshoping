export const initialProductTypes = [
  'Pickles',
  'Podis',
  'Sweets',
  'Snacks'
];

export const initialProducts = [
  {
    id: '1',
    name: 'Mango Pickle',
    category: 'Veg',
    productType: 'Pickles',
    weights: [
      { weight: '250g', price: 150 },
      { weight: '500g', price: 280 },
      { weight: '1kg', price: 500 }
    ],
    spiceLevel: 'Medium',
    description: 'Traditional home-style raw mango pickle with authentic spices.',
    ingredients: 'Raw mango, mustard oil, fenugreek, red chili powder, salt',
    shelfLife: '6 months',
    discountPrice: 0,
    bulkPrice: 1400,
    stockQuantity: 24,
    inStock: true,
    bestSeller: true,
    newArrival: false,
    visible: true,
    image: 'https://images.unsplash.com/photo-1596503893341-3b764b8a4a58?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    additionalImages: ['https://images.unsplash.com/photo-1596503893341-3b764b8a4a58?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80']
  },
  {
    id: '2',
    name: 'Gongura Pickle',
    category: 'Veg',
    productType: 'Pickles',
    weights: [
      { weight: '250g', price: 160 },
      { weight: '500g', price: 300 },
      { weight: '1kg', price: 550 }
    ],
    spiceLevel: 'Hot',
    description: 'Classic Andhra style Gongura leaves blended with garlic and red chilies.',
    ingredients: 'Gongura leaves, garlic, red chilies, mustard seeds',
    shelfLife: '6 months',
    discountPrice: 0,
    bulkPrice: 1600,
    stockQuantity: 18,
    inStock: true,
    bestSeller: false,
    newArrival: false,
    visible: true,
    image: 'https://images.unsplash.com/photo-1626002167669-0268a719f9bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    additionalImages: ['https://images.unsplash.com/photo-1626002167669-0268a719f9bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80']
  },
  {
    id: '3',
    name: 'Chicken Pickle',
    category: 'Non-Veg',
    productType: 'Pickles',
    weights: [
      { weight: '250g', price: 350 },
      { weight: '500g', price: 650 },
      { weight: '1kg', price: 1200 }
    ],
    spiceLevel: 'Hot',
    description: 'Premium boneless chicken chunks marinated in a rich, spicy gravy.',
    ingredients: 'Chicken, mustard oil, garlic, chili powder, spices',
    shelfLife: '4 months refrigerated',
    discountPrice: 0,
    bulkPrice: 2800,
    stockQuantity: 12,
    inStock: true,
    bestSeller: true,
    newArrival: true,
    visible: true,
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    additionalImages: ['https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80']
  }
];

const initialReviews = [
  {
    id: 'r1',
    name: 'Sai Kumar',
    product: 'Gongura Pickle',
    rating: 5,
    date: '10 Jun 2025',
    text: 'The Gongura pickle is very authentic. It is quite spicy, exactly how I like it. Delivery was prompt and packaging was very premium.',
    visible: true
  },
  {
    id: 'r2',
    name: 'Anjali',
    product: 'Mango Pickle',
    rating: 4,
    date: '05 Jun 2025',
    text: 'Mango pickle has a wonderful tang and the balance of spices is perfect. My whole family loved it.',
    visible: true
  }
];

const initialOffers = [
  {
    id: 'o1',
    title: 'Summer Spice Sale',
    description: 'Get 10% off on all pickles. Limited time offer on all orders above ₹999.',
    discount: 10,
    active: true,
    productId: '' // empty means global offer
  }
];

const defaultStoreSettings = {
  logoUrl: '/logo.svg',
  heroBackgroundUrl: 'https://images.unsplash.com/photo-1626002167669-0268a719f9bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  featureImageUrl: 'https://images.unsplash.com/photo-1596503893341-3b764b8a4a58?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  brandTagline: 'Crafted to Crave.',
  heroTitle: 'ACHARRUCHI',
  heroSubtitle: 'Handcrafted premium pickles for every meal.',
  whatsappMessage: 'Hi! I would like to place an order for Acharruchi.',
  contactNumber: '+91 8885473903',
  email: 'admin@vasukipickles.com',
  instagram: 'https://instagram.com/vasukipickles',
  facebook: '',
  mapLink: 'https://maps.google.com',
  deliveryNote: 'Delivery available across Hyderabad and nearby locations.',
  aboutText: 'Acharruchi brings you authentic, handcrafted pickles made using premium ingredients and traditional family recipes.',
  businessName: 'Acharruchi',
  address: '123 Spice Lane, Culinary District, Hyderabad, India 500001'
};

const defaultPaymentSettings = {
  qrImage: 'https://via.placeholder.com/300x300?text=PhonePe+QR',
  upiId: 'vasukipickles@upi',
  phone: '+91 8885473903',
  enableCOD: true,
  enableUPI: true,
  enableScanner: true,
  scannerNote: 'Use the QR code scanner in your UPI app to complete payment.',
  instructions: 'Scan the QR code or use UPI ID to pay. Please upload the payment screenshot for verification.'
};

const defaultAdminProfile = {
  ownerName: 'Vasuki Owner',
  businessName: 'Acharruchi',
  email: 'admin@vasukipickles.com',
  phone: '+91 8885473903',
  whatsapp: '+91 8885473903',
  address: '123 Spice Lane, Culinary District, Hyderabad, India 500001',
  instagram: 'https://instagram.com/vasukipickles',
  mapLink: 'https://maps.google.com',
  profileImage: '/logo.png',
  logoImage: '/logo.png'
};

export const getProducts = () => {
  const products = localStorage.getItem('vasuki_products');
  if (!products) {
    localStorage.setItem('vasuki_products', JSON.stringify(initialProducts));
    return initialProducts;
  }
  return JSON.parse(products);
};

export const saveProduct = (product) => {
  const products = getProducts();
  const normalized = {
    id: product.id || Date.now().toString(),
    name: product.name || '',
    category: product.category || 'Veg',
    productType: product.productType || 'Pickles',
    weights: product.weights || [
      { weight: '250g', price: 0 },
      { weight: '500g', price: 0 },
      { weight: '1kg', price: 0 }
    ],
    spiceLevel: product.spiceLevel || 'Medium',
    description: product.description || '',
    ingredients: product.ingredients || '',
    shelfLife: product.shelfLife || '',
    discountPrice: Number(product.discountPrice) || 0,
    bulkPrice: Number(product.bulkPrice) || 0,
    stockQuantity: Number(product.stockQuantity) || 0,
    inStock: Number(product.stockQuantity) > 0,
    bestSeller: Boolean(product.bestSeller),
    newArrival: Boolean(product.newArrival),
    visible: product.visible !== undefined ? product.visible : true,
    image: product.image || '',
    additionalImages: product.additionalImages || []
  };

  const existingIndex = products.findIndex(p => p.id === normalized.id);
  if (existingIndex >= 0) {
    products[existingIndex] = normalized;
  } else {
    products.push(normalized);
  }
  localStorage.setItem('vasuki_products', JSON.stringify(products));
};

export const getProductTypes = () => {
  const types = localStorage.getItem('vasuki_product_types');
  if (!types) {
    localStorage.setItem('vasuki_product_types', JSON.stringify(initialProductTypes));
    return initialProductTypes;
  }
  return JSON.parse(types);
};

export const addProductType = (type) => {
  const types = getProductTypes();
  if (!types.includes(type)) {
    types.push(type);
    localStorage.setItem('vasuki_product_types', JSON.stringify(types));
  }
};

export const deleteProduct = (id) => {
  const products = getProducts();
  const updated = products.filter(p => p.id !== id);
  localStorage.setItem('vasuki_products', JSON.stringify(updated));
};

export const toggleProductVisibility = (id) => {
  const products = getProducts();
  const target = products.find(p => p.id === id);
  if (target) {
    target.visible = !target.visible;
    localStorage.setItem('vasuki_products', JSON.stringify(products));
  }
};

export const updateProductStock = (id, quantity) => {
  const products = getProducts();
  const product = products.find(p => p.id === id);
  if (product) {
    product.stockQuantity = Number(quantity);
    product.inStock = Number(quantity) > 0;
    localStorage.setItem('vasuki_products', JSON.stringify(products));
  }
};

export const getOrders = () => {
  const orders = localStorage.getItem('vasuki_orders');
  return orders ? JSON.parse(orders) : [];
};

export const saveOrder = (order) => {
  const orders = getOrders();
  const newOrder = {
    ...order,
    id: order.id || 'ORD' + Date.now().toString().slice(-6),
    date: order.date || new Date().toISOString(),
    status: order.status || 'Pending',
    paymentStatus: order.paymentStatus || 'Pending'
  };
  orders.push(newOrder);
  localStorage.setItem('vasuki_orders', JSON.stringify(orders));
  return newOrder.id;
};

export const updateOrderStatus = (id, status, paymentStatus) => {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index >= 0) {
    if (status) orders[index].status = status;
    if (paymentStatus) orders[index].paymentStatus = paymentStatus;
    localStorage.setItem('vasuki_orders', JSON.stringify(orders));
  }
};

export const getReviews = () => {
  const reviews = localStorage.getItem('vasuki_reviews');
  if (!reviews) {
    localStorage.setItem('vasuki_reviews', JSON.stringify(initialReviews));
    return initialReviews;
  }
  return JSON.parse(reviews);
};

export const saveReview = (review) => {
  const reviews = getReviews();
  const normalized = {
    id: review.id || Date.now().toString(),
    name: review.name || '',
    product: review.product || '',
    rating: Number(review.rating) || 5,
    date: review.date || new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }),
    text: review.text || '',
    visible: review.visible !== undefined ? review.visible : true
  };
  const existingIndex = reviews.findIndex(r => r.id === normalized.id);
  if (existingIndex >= 0) {
    reviews[existingIndex] = normalized;
  } else {
    reviews.push(normalized);
  }
  localStorage.setItem('vasuki_reviews', JSON.stringify(reviews));
};

export const deleteReview = (id) => {
  const reviews = getReviews();
  const updated = reviews.filter(r => r.id !== id);
  localStorage.setItem('vasuki_reviews', JSON.stringify(updated));
};

export const toggleReviewVisibility = (id) => {
  const reviews = getReviews();
  const target = reviews.find(r => r.id === id);
  if (target) {
    target.visible = !target.visible;
    localStorage.setItem('vasuki_reviews', JSON.stringify(reviews));
  }
};

export const getOffers = () => {
  const offers = localStorage.getItem('vasuki_offers');
  if (!offers) {
    localStorage.setItem('vasuki_offers', JSON.stringify(initialOffers));
    return initialOffers;
  }
  return JSON.parse(offers);
};

export const saveOffer = (offer) => {
  const offers = getOffers();
  const normalized = {
    id: offer.id || Date.now().toString(),
    title: offer.title || '',
    description: offer.description || '',
    discount: Number(offer.discount) || 0,
    active: offer.active !== undefined ? offer.active : true,
    productId: offer.productId || ''
  };
  const index = offers.findIndex(o => o.id === normalized.id);
  if (index >= 0) {
    offers[index] = normalized;
  } else {
    offers.push(normalized);
  }
  localStorage.setItem('vasuki_offers', JSON.stringify(offers));
};

export const deleteOffer = (id) => {
  const offers = getOffers();
  const updated = offers.filter(o => o.id !== id);
  localStorage.setItem('vasuki_offers', JSON.stringify(updated));
};

export const toggleOffer = (id) => {
  const offers = getOffers();
  const target = offers.find(o => o.id === id);
  if (target) {
    target.active = !target.active;
    localStorage.setItem('vasuki_offers', JSON.stringify(offers));
  }
};

export const getStoreSettings = () => {
  const data = localStorage.getItem('vasuki_settings');
  if (data) return JSON.parse(data);
  localStorage.setItem('vasuki_settings', JSON.stringify(defaultStoreSettings));
  return defaultStoreSettings;
};

export const updateStoreSettings = (settings) => {
  localStorage.setItem('vasuki_settings', JSON.stringify({ ...defaultStoreSettings, ...settings }));
};

export const getPaymentSettings = () => {
  const data = localStorage.getItem('vasuki_payment_settings');
  if (data) return JSON.parse(data);
  localStorage.setItem('vasuki_payment_settings', JSON.stringify(defaultPaymentSettings));
  return defaultPaymentSettings;
};

export const updatePaymentSettings = (settings) => {
  localStorage.setItem('vasuki_payment_settings', JSON.stringify({ ...defaultPaymentSettings, ...settings }));
};

export const getAdminProfile = () => {
  const data = localStorage.getItem('vasuki_admin_profile');
  if (data) return JSON.parse(data);
  localStorage.setItem('vasuki_admin_profile', JSON.stringify(defaultAdminProfile));
  return defaultAdminProfile;
};

export const updateAdminProfile = (profile) => {
  localStorage.setItem('vasuki_admin_profile', JSON.stringify({ ...defaultAdminProfile, ...profile }));
};

export const getCustomers = () => {
  const orders = getOrders();
  const customersMap = {};
  orders.forEach((order) => {
    const key = order.customer.email || order.customer.phone || order.customer.name;
    if (!customersMap[key]) {
      customersMap[key] = {
        name: order.customer.name,
        email: order.customer.email,
        phone: order.customer.phone,
        totalOrders: 0,
        lastOrder: order.date
      };
    }
    customersMap[key].totalOrders += 1;
    if (new Date(order.date) > new Date(customersMap[key].lastOrder)) {
      customersMap[key].lastOrder = order.date;
    }
  });
  return Object.values(customersMap);
};
