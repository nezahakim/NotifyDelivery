export const categories = [
  { id: 1, name: 'All', icon: '🍽️' },
  { id: 2, name: 'Pizza', icon: '🍕' },
  { id: 3, name: 'Burger', icon: '🍔' },
  { id: 4, name: 'Asian', icon: '🍜' },
  { id: 5, name: 'Dessert', icon: '🍰' },
  { id: 6, name: 'Drinks', icon: '🥤' },
  { id: 7, name: 'Salad', icon: '🥗' },
  { id: 8, name: 'Coffee', icon: '☕' },
];

export const restaurants = [
  {
    id: 1,
    name: 'Pizza Palace',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    rating: 4.5,
    deliveryTime: '30-45 min',
    deliveryFee: '$2.99',
    category: 'Italian',
    distance: '1.2 km',
    description: 'Authentic Italian pizza with fresh ingredients',
    isOpen: true,
    tags: ['Popular', 'Fast Delivery'],
    menu: [
      {
        id: 1,
        name: 'Margherita Pizza',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300',
        description: 'Fresh tomato, mozzarella, basil',
        category: 'Pizza'
      },
      {
        id: 2,
        name: 'Pepperoni Pizza',
        price: 15.99,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300',
        description: 'Pepperoni, mozzarella, tomato sauce',
        category: 'Pizza'
      }
    ]
  },
  {
    id: 2,
    name: 'Burger Barn',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    rating: 4.2,
    deliveryTime: '25-35 min',
    deliveryFee: '$1.99',
    category: 'American',
    distance: '0.8 km',
    description: 'Juicy burgers made with premium beef',
    isOpen: true,
    tags: ['Bestseller', 'Under 30min'],
    menu: [
      {
        id: 3,
        name: 'Classic Cheeseburger',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300',
        description: 'Beef patty, cheese, lettuce, tomato',
        category: 'Burgers'
      }
    ]
  },
  {
    id: 3,
    name: 'Sushi Spot',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
    rating: 4.7,
    deliveryTime: '40-50 min',
    deliveryFee: '$3.99',
    category: 'Japanese',
    distance: '2.1 km',
    description: 'Fresh sushi and traditional Japanese dishes',
    isOpen: true,
    tags: ['Premium', 'Fresh'],
    menu: [
      {
        id: 4,
        name: 'Salmon Roll',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1563612116625-3012372fccce?w=300',
        description: 'Fresh salmon, avocado, cucumber',
        category: 'Sushi'
      }
    ]
  },
  {
    id: 4,
    name: 'Taco Town',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
    rating: 4.3,
    deliveryTime: '20-30 min',
    deliveryFee: '$1.49',
    category: 'Mexican',
    distance: '1.5 km',
    description: 'Authentic Mexican tacos and burritos',
    isOpen: false,
    tags: ['Spicy', 'Authentic'],
    menu: [
      {
        id: 5,
        name: 'Beef Tacos',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1565299585323-38174c683b90?w=300',
        description: 'Seasoned beef, lettuce, cheese, salsa',
        category: 'Tacos'
      }
    ]
  }
];

export const notifications = [
  {
    id: 1,
    title: 'Order Delivered!',
    message: 'Your order from Pizza Palace has been delivered successfully',
    time: '5 min ago',
    type: 'success',
    read: false,
    icon: 'checkmark-circle'
  },
  {
    id: 2,
    title: 'Special Offer',
    message: '20% off on your next order from Burger Barn',
    time: '2 hours ago',
    type: 'offer',
    read: false,
    icon: 'pricetag'
  },
  {
    id: 3,
    title: 'Order Confirmed',
    message: 'Your order #1234 has been confirmed and is being prepared',
    time: '1 day ago',
    type: 'info',
    read: true,
    icon: 'restaurant'
  }
];

export const orderStatuses = [
  {
    id: 1,
    status: 'confirmed',
    title: 'Order Confirmed',
    description: 'Your order has been confirmed by the restaurant',
    time: '10:30 AM',
    completed: true
  },
  {
    id: 2,
    status: 'preparing',
    title: 'Preparing Food',
    description: 'The restaurant is preparing your delicious meal',
    time: '10:45 AM',
    completed: true
  },
  {
    id: 3,
    status: 'on_way',
    title: 'On the Way',
    description: 'Your order is on the way to your location',
    time: '11:15 AM',
    completed: false
  },
  {
    id: 4,
    status: 'delivered',
    title: 'Delivered',
    description: 'Order delivered successfully',
    time: '11:30 AM',
    completed: false
  }
];

export const cartItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    price: 12.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300',
    restaurant: 'Pizza Palace',
    customizations: ['Extra cheese', 'Thin crust']
  },
  {
    id: 2,
    name: 'Classic Cheeseburger',
    price: 9.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300',
    restaurant: 'Burger Barn',
    customizations: ['No pickles']
  }
];

export const userLocation = {
  address: 'Downtown, NY',
  coordinates: { latitude: 40.7589, longitude: -73.9851 }
};

export const deliveryInfo = {
  estimatedTime: '25-35 min',
  deliveryFee: 2.99,
  serviceFee: 1.49,
  tax: 2.85,
  discount: 0
};

export const mockRestaurant = {
  id: 'rest1',
  name: 'Kyoji Sushi & Grill',
  coverImageUrl: 'https://picsum.photos/seed/600/600',
  rating: 4.8,
  totalReviews: 2847,
  cuisine: 'Japanese, Sushi, Grill',
  description: 'Experience the curated selection of the freshest Sushi and Wagyu beef, expertly prepared daily by our master chefs.',
  address: '123 Sakura Street, Downtown',
  phone: '+1 (555) 123-4567',
  hours: 'Mon-Sun: 11:00 AM - 10:00 PM',
  deliveryTime: '25-35 min',
  deliveryFee: 2.99,
  minOrder: 15.00,
  tags: ['Premium', 'Award Winning', 'Chef Curated'],
  about: 'Founded in 2015, Kyoji Sushi & Grill has been serving authentic Japanese cuisine with a modern twist. Our head chef, Master Takeshi Yamamoto, brings over 20 years of experience from Tokyo. We source our fish daily from sustainable fisheries and our Wagyu beef is imported directly from Japan.',
  menu: [
    {
      id: 'dish1',
      name: "Chef's Omakase Platter",
      description: "A chef's selection of the finest sushi and sashimi, featuring 12 pieces of premium cuts including bluefin tuna, salmon, and seasonal specials.",
      price: 75.00,
      imageUrl: 'https://picsum.photos/seed/600/600',
      category: 'Featured',
      featured: true,
      badge: 'Chef Special',
    },
    {
      id: 'dish_miso_soup',
      name: 'Miso Soup',
      description: 'Traditional Japanese soup with tofu, seaweed, and green onions in a rich dashi broth.',
      price: 4.00,
      imageUrl: 'https://images.unsplash.com/photo-1596645318041-0f74577f1540?q=80&w=2670',
      category: 'Featured',
      featured: true,
      badge: 'Popular',
    },
    {
      id: 'dish2',
      name: 'California Roll',
      description: 'Fresh crab meat, creamy avocado, and crisp cucumber wrapped in seasoned rice.',
      price: 12.00,
      imageUrl: 'https://images.unsplash.com/photo-1579584166258-202e81177651?q=80&w=2670',
      category: 'Signature Rolls',
    },
    {
      id: 'dish3',
      name: 'Nigiri Deluxe',
      description: 'Assorted premium nigiri selection with 10 pieces of the freshest catch.',
      price: 28.00,
      imageUrl: 'https://images.unsplash.com/photo-1601050692790-b8875791d227?q=80&w=2670',
      category: 'Signature Rolls',
    },
    {
      id: 'dish4',
      name: 'Spicy Tuna Roll',
      description: 'Premium tuna mixed with spicy mayo, cucumber, and topped with sriracha.',
      price: 14.00,
      imageUrl: 'https://images.unsplash.com/photo-1555939228-564ae8228302?q=80&w=2670',
      category: 'Signature Rolls',
      badge: 'Spicy',
    },
    {
      id: 'dish5',
      name: 'Yakitori Skewers',
      description: 'Perfectly grilled chicken skewers glazed with our signature teriyaki sauce.',
      price: 9.00,
      imageUrl: 'https://images.unsplash.com/photo-1603894468202-e221151601a9?q=80&w=2670',
      category: 'Grilled Favorites',
    },
    {
      id: 'dish6',
      name: 'Grilled Salmon',
      description: 'Atlantic salmon grilled to perfection with lemon butter and herbs.',
      price: 18.00,
      imageUrl: 'https://images.unsplash.com/photo-1519708227418-a32053f36077?q=80&w=2670',
      category: 'Grilled Favorites',
    },
    {
      id: 'dish7',
      name: 'Dragon Roll',
      description: 'Grilled eel, avocado, cucumber, topped with flying fish roe and eel sauce.',
      price: 18.00,
      imageUrl: 'https://images.unsplash.com/photo-1596001007324-4f964082354e?q=80&w=2670',
      category: 'Premium Selection',
      badge: 'Best Seller',
    },
    {
      id: 'dish8',
      name: 'Sashimi Platter',
      description: 'Chef-selected assortment of 15 slices of the freshest raw fish.',
      price: 32.00,
      imageUrl: 'https://images.unsplash.com/photo-1614798150410-b4724a7374ae?q=80&w=2670',
      category: 'Premium Selection',
    },
    {
      id: 'dish9',
      name: 'Tempura Shrimp',
      description: 'Light and crispy fried shrimp and seasonal vegetables with tempura sauce.',
      price: 15.00,
      imageUrl: 'https://images.unsplash.com/photo-1628120614833-289b70b33a76?q=80&w=2670',
      category: 'Appetizers',
    },
    {
      id: 'dish10',
      name: 'Gyoza',
      description: 'Pan-fried pork and vegetable dumplings served with ponzu sauce.',
      price: 8.00,
      imageUrl: 'https://images.unsplash.com/photo-1557997380-60b69103b41d?q=80&w=2670',
      category: 'Appetizers',
    },
  ],
  reviews: [
    {
      id: 'r1',
      userName: 'Sarah Johnson',
      rating: 5,
      date: 'Sep 28, 2025',
      comment: 'Absolutely incredible! The omakase platter was fresh and beautifully presented. Best sushi in town!',
      helpful: 24,
    },
    {
      id: 'r2',
      userName: 'Michael Chen',
      rating: 5,
      date: 'Sep 25, 2025',
      comment: 'The quality is outstanding. You can taste the freshness in every bite. The dragon roll is a must-try!',
      helpful: 18,
    },
    {
      id: 'r3',
      userName: 'Emma Davis',
      rating: 4,
      date: 'Sep 20, 2025',
      comment: 'Great food and fast delivery. Only issue was the miso soup was a bit lukewarm, but everything else was perfect.',
      helpful: 12,
    },
  ],
};

export const mockVideos = [
  {
    id: '1',
    title: 'The Art of Perfect Sushi Rice',
    chef: 'Chef Takeshi Yamamoto',
    chefImage: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=200',
    thumbnail: 'https://images.unsplash.com/photo-1579584166258-202e81177651?q=80&w=2670', // Changed to a more vertical-friendly image if possible, or adjust
    duration: '12:45',
    views: '2.3M',
    likes: '154K',
    comments: '2.7K', // Added for realism
    shares: '9.8K', // Added for realism
    uploadDate: '2 days ago',
    featured: true,
  },
  {
    id: '2',
    title: 'Wagyu Beef: The Ultimate Guide',
    chef: 'Chef Marcus Chen',
    chefImage: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=200',
    thumbnail: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2670',
    duration: '18:30',
    views: '1.8M',
    likes: '127K',
    comments: '1.5K',
    shares: '6.2K',
    uploadDate: '5 days ago',
    featured: true,
  },
  {
    id: '3',
    title: 'Authentic Ramen Bowl Secrets',
    chef: 'Chef Takeshi Yamamoto',
    chefImage: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=200',
    thumbnail: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=2670',
    duration: '25:10',
    views: '3.1M',
    likes: '201K',
    comments: '3.1K',
    shares: '12K',
    uploadDate: '1 week ago',
  },
  {
    id: '4',
    title: 'Tempura Masterclass',
    chef: 'Chef Takeshi Yamamoto',
    chefImage: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=200',
    thumbnail: 'https://images.unsplash.com/photo-1628120614833-289b70b33a76?q=80&w=2670',
    duration: '15:22',
    views: '890K',
    likes: '64K',
    comments: '800',
    shares: '3.5K',
    uploadDate: '3 days ago',
  },
  {
    id: '5',
    title: 'Delicious Pizza from Scratch',
    chef: 'Chef Maria Rodriguez',
    chefImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200',
    thumbnail: 'https://images.unsplash.com/photo-1571066810148-735999015091?q=80&w=2670',
    duration: '10:00',
    views: '1.1M',
    likes: '90K',
    comments: '1.2K',
    shares: '4K',
    uploadDate: '4 days ago',
  },
];



export const mockRecipe = {
  id: '1',
  title: 'Perfect Sushi Rolls - Master Chef Technique',
  chef: {
    name: 'Chef Takeshi Yamamoto',
    image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=200',
    specialty: 'Master Sushi Chef',
    bio: '30+ years of experience in traditional Japanese cuisine. Trained in Tokyo under Master Chef Jiro.',
  },
  image: 'https://images.unsplash.com/photo-1579584166258-202e81177651?q=80&w=2670',
  videoUrl: 'https://example.com/video.mp4',
  rating: 4.9,
  total_reviews: 2847,
  cookTime: '45 min',
  prepTime: '30 min',
  difficulty: 'Advanced',
  servings: 4,
  calories: 320,
  cuisine: 'Japanese',
  
  description: 'Learn the authentic art of sushi making from a master chef. This comprehensive guide will take you through every step of creating perfect sushi rolls with restaurant-quality results. Perfect your technique with detailed instructions and pro tips.',

  ingredients: [
    { id: '1', item: 'Sushi rice', amount: '2 cups', category: 'Base' },
    { id: '2', item: 'Rice vinegar', amount: '1/4 cup', category: 'Base' },
    { id: '3', item: 'Sugar', amount: '2 tbsp', category: 'Base' },
    { id: '4', item: 'Salt', amount: '1 tsp', category: 'Base' },
    { id: '5', item: 'Nori sheets', amount: '8 sheets', category: 'Wrapping' },
    { id: '6', item: 'Fresh salmon', amount: '8 oz', category: 'Protein' },
    { id: '7', item: 'Tuna (sushi-grade)', amount: '8 oz', category: 'Protein' },
    { id: '8', item: 'Cucumber', amount: '1 large', category: 'Vegetables' },
    { id: '9', item: 'Avocado', amount: '2 ripe', category: 'Vegetables' },
    { id: '10', item: 'Wasabi paste', amount: '2 tbsp', category: 'Condiments' },
    { id: '11', item: 'Soy sauce', amount: '1/2 cup', category: 'Condiments' },
    { id: '12', item: 'Pickled ginger', amount: '1/2 cup', category: 'Condiments' },
  ],

  steps: [
    {
      id: '1',
      title: 'Prepare the Sushi Rice',
      description: 'Rinse the sushi rice thoroughly under cold water until the water runs clear. This removes excess starch and prevents the rice from becoming too sticky. Cook the rice according to package instructions, typically using a 1:1.25 ratio of rice to water.',
      time: '5 min',
      image: 'https://images.unsplash.com/photo-1612852098516-55d01c75769a?q=80&w=400',
      tips: ['Use short-grain Japanese rice for best results', 'Let rice cool to room temperature before mixing with vinegar'],
    },
    {
      id: '2',
      title: 'Season the Rice',
      description: 'In a small saucepan, heat rice vinegar, sugar, and salt until the sugar dissolves completely. Do not boil. Once the rice is cooked, transfer it to a large wooden bowl (hangiri if available). Gently fold in the vinegar mixture while fanning the rice to cool it quickly. This creates the perfect glossy finish.',
      time: '10 min',
      image: 'https://images.unsplash.com/photo-1579584166258-202e81177651?q=80&w=400',
      tips: ['Use a wooden paddle to avoid crushing the rice grains', 'The rice should be at body temperature when ready'],
    },
    {
      id: '3',
      title: 'Prepare the Fillings',
      description: 'Slice the fish into long, thin strips about 1/4 inch thick. Cut the cucumber into thin julienne strips. Slice the avocado into thin lengthwise pieces. Arrange all ingredients on a clean, organized workspace for easy assembly.',
      time: '15 min',
      image: 'https://images.unsplash.com/photo-1579584166210-4b352c8f0b42?q=80&w=400',
      tips: ['Always use sushi-grade fish', 'Keep fish refrigerated until ready to use', 'Knife sharpness is crucial for clean cuts'],
    },
    {
      id: '4',
      title: 'Roll the Sushi',
      description: 'Place a nori sheet on a bamboo rolling mat (makisu), shiny side down. With wet hands, spread a thin layer of rice over the nori, leaving a 1-inch border at the top. Arrange your fillings in a horizontal line across the center. Using the mat, roll tightly from bottom to top, applying gentle pressure. Seal the edge with a few grains of rice.',
      time: '10 min',
      image: 'https://images.unsplash.com/photo-1563612116625-3012372fccce?q=80&w=400',
      tips: ['Keep your hands moist to prevent sticking', 'Apply even pressure while rolling', 'The tighter the roll, the better it holds'],
    },
    {
      id: '5',
      title: 'Slice and Present',
      description: 'Using a very sharp knife dipped in water, slice each roll into 6-8 pieces with a gentle sawing motion. Clean the knife between each cut for clean edges. Arrange the pieces artistically on a plate with wasabi, pickled ginger, and soy sauce on the side.',
      time: '5 min',
      image: 'https://images.unsplash.com/photo-1579584166206-0b31c2c50015?q=80&w=400',
      tips: ['A wet, sharp knife is essential', 'Wipe knife clean between cuts', 'Present with the cut side facing up'],
    },
  ],

  nutritionFacts: [
    { label: 'Calories', value: '320 kcal' },
    { label: 'Protein', value: '18g' },
    { label: 'Carbs', value: '42g' },
    { label: 'Fat', value: '8g' },
    { label: 'Fiber', value: '2g' },
    { label: 'Sodium', value: '680mg' },
  ],

  reviews: [
    {
      id: '1',
      userName: 'Sarah M.',
      rating: 5,
      date: '2 days ago',
      comment: 'This recipe is incredible! The step-by-step instructions made it so easy. My family loved it!',
      helpful: 24,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100',
    },
    {
      id: '2',
      userName: 'Michael K.',
      rating: 5,
      date: '5 days ago',
      comment: 'Best sushi recipe I\'ve tried. The chef\'s tips were invaluable. Restaurant quality at home!',
      helpful: 18,
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100',
    },
  ],
};