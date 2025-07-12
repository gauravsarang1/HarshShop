export const categories = [
  {
    id: 1,
    name: "Home Decor",
    description: "Transform your space",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
  },
  {
    id: 2,
    name: "Women's Fashion",
    description: "Elegant & trendy",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
  },
  {
    id: 3,
    name: "Men's Fashion",
    description: "Style & comfort",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
  },
  {
    id: 4,
    name: "Electronics",
    description: "Latest technology",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
  }
];

export const products = [
  {
    id: 1,
    name: "Smart Watch Pro",
    description: "Stay connected in style with advanced health monitoring",
    price: "299",
    originalPrice: "399",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    ],
    categoryId: 4,
    stock: 25,
    featured: true,
    isNewArrival: false,
    discount: 25
  },
  {
    id: 2,
    name: "Wireless Headphones",
    description: "Immersive sound experience with noise cancellation",
    price: "159",
    originalPrice: "189",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    ],
    categoryId: 4,
    stock: 40,
    featured: true,
    isNewArrival: false,
    discount: 15
  },
  {
    id: 3,
    name: "Premium Coffee Maker",
    description: "Brew your perfect cup every morning",
    price: "199",
    originalPrice: "249",
    image: "https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    images: [
      "https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    ],
    categoryId: 1,
    stock: 15,
    featured: true,
    isNewArrival: false,
    discount: 20
  },
  {
    id: 4,
    name: "Athletic Running Shoes",
    description: "Run with comfort and support",
    price: "89",
    originalPrice: "129",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    ],
    categoryId: 3,
    stock: 30,
    featured: true,
    isNewArrival: false,
    discount: 30
  },
  {
    id: 5,
    name: "Summer Dress",
    description: "Light and breezy for summer",
    price: "79",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"
    ],
    categoryId: 2,
    stock: 20,
    featured: false,
    isNewArrival: true,
    discount: 0
  },
  {
    id: 6,
    name: "Leather Wallet",
    description: "Classic and durable craftsmanship",
    price: "45",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"
    ],
    categoryId: 3,
    stock: 35,
    featured: false,
    isNewArrival: true,
    discount: 0
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    description: "Portable and powerful sound",
    price: "125",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"
    ],
    categoryId: 4,
    stock: 18,
    featured: false,
    isNewArrival: true,
    discount: 0
  },
  {
    id: 8,
    name: "Fitness Tracker",
    description: "Track your progress and stay motivated",
    price: "159",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"
    ],
    categoryId: 4,
    stock: 22,
    featured: false,
    isNewArrival: true,
    discount: 0
  }
];

export const brands = [
  {
    id: 1,
    name: "LUXE",
    description: "Premium Collection",
    icon: "star",
    color: "hsl(207, 90%, 54%)"
  },
  {
    id: 2,
    name: "ECO",
    description: "Sustainable Living",
    icon: "leaf",
    color: "hsl(142, 76%, 36%)"
  },
  {
    id: 3,
    name: "TECH",
    description: "Innovation Hub",
    icon: "zap",
    color: "hsl(262, 83%, 58%)"
  },
  {
    id: 4,
    name: "TREND",
    description: "Fashion Forward",
    icon: "flame",
    color: "hsl(25, 95%, 53%)"
  }
];
