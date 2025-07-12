import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  ShoppingBag, 
  Package, 
  Tag, 
  Store, 
  BarChart3, 
  Settings, 
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Menu,
  X,
  Bell,
  LogOut,
  ChevronDown,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  UserCheck,
  FileText,
  CreditCard,
  Star,
  Truck
} from 'lucide-react';
import ProductTable from '../pages/vendor/components/ProductTable';
import RenderDashboard from './RenderDashBoard';
import BrandTable from '../pages/vendor/components/BrandTable';
import OrderTable from '../pages/vendor/components/OrderTable';
import ProductFilters from '../pages/vendor/components/ProductFilters';
import Loading from './Loading';
import { Button } from './ui/button';
import OrderStatusFilter from '../pages/vendor/components/OrderStatusFilter';


// Configuration object for different user types
const userConfigs = {
  admin: {
    title: 'Admin Panel',
    userInfo: {
      name: 'Admin User',
      email: 'admin@example.com',
      avatar: 'A'
    },
    sidebarItems: [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'users', label: 'Users', icon: Users },
      { id: 'vendors', label: 'Vendors', icon: Store },
      { id: 'orders', label: 'Orders', icon: ShoppingBag },
      { id: 'deals', label: 'Deals', icon: Tag },
      { id: 'categories', label: 'Categories', icon: Package },
      { id: 'settings', label: 'Settings', icon: Settings }
    ],
    stats: [
      { label: 'Total Users', value: '2,543', change: '+12%', icon: Users, color: 'bg-blue-500' },
      { label: 'Total Orders', value: '1,234', change: '+8%', icon: ShoppingCart, color: 'bg-green-500' },
      { label: 'Revenue', value: '$45,678', change: '+23%', icon: DollarSign, color: 'bg-purple-500' },
      { label: 'Active Vendors', value: '89', change: '+5%', icon: Store, color: 'bg-orange-500' }
    ],
    permissions: {
      canManageUsers: true,
      canManageVendors: true,
      canManageOrders: true,
      canManageDeals: true,
      canManageCategories: true,
      canViewAllData: true
    }
  },
  vendor: {
    title: 'Vendor Dashboard',
    userInfo: {
      name: 'Vendor Store',
      email: 'vendor@store.com',
      avatar: 'V'
    },
    sidebarItems: [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'products', label: 'My Products', icon: Package },
      { id: 'orders', label: 'Orders', icon: ShoppingBag },
      { id: 'brands', label: 'My Brands', icon: Store },
      { id: 'deals', label: 'My Deals', icon: Tag },
      { id: 'reviews', label: 'Reviews', icon: Star },
      { id: 'payments', label: 'Payments', icon: CreditCard },
      { id: 'settings', label: 'Settings', icon: Settings }
    ],
    permissions: {
      canManageUsers: false,
      canManageVendors: false,
      canManageOrders: true,
      canManageDeals: true,
      canManageCategories: false,
      canViewAllData: false
    }
  }
};

const ReusablePanel = ({ 
    userType = 'admin',
    user = {},
    products = [],
    orders = [],
    brands = [],
    categories = [],
    deals = [],
    reviews = [],
    payments = [],
    stats = {},
    onEditProduct,
    onDeleteProduct,
    onAddProductOpenModal,
    onViewOrder,
    onUpdateOrderStatus,
    onEditBrand,
    onDeleteBrand,
    handleCategoryChange,
    handleSearchChange,
    searchQuery,
    selectedCategory = 'all',
    loading,
    orderStatusFilter,
    handleOrderStatusFilterChange,
    handleAddBrandModal,
 }) => {
  const config = userConfigs[userType];
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);


useEffect(() => {
    let isMobile = window.innerWidth < 768;
    if(!isMobile) {
        setSidebarOpen(true);
    }
    const handleResize = () => {
        isMobile = window.innerWidth < 768;
        setSidebarOpen(!isMobile);
    };
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
    }
},[]);    

// ...existing code...
const getDataForTab = (tab) => {
  switch(tab) {
    case 'products': return products.length ? products : defaultProducts;
    case 'orders': return orders.length ? orders : defaultOrders;
    case 'brands': return brands.length ? brands : defaultBrands;
    case 'categories': return categories.length ? categories : defaultCategories;
    // ...other cases
    default: return [];
  }
};
// ...existing code...

  
  const renderTable = (type) => {
    // Don't render table if user doesn't have permission
    if (!config.permissions.canViewAllData && 
        (type === 'users' || type === 'vendors') && 
        !config.permissions[`canManage${type.charAt(0).toUpperCase() + type.slice(1, -1)}s`]) {
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-500 text-center">You don't have permission to view this data.</p>
        </div>
      );
    }

    return (
        <>
            {type === 'products' && (
                <>
                    <ProductFilters
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                        onAddProduct={onAddProductOpenModal}
                    />
                    <div className='mb-5'></div>
                    <ProductTable 
                        products={products}
                        onEdit={onEditProduct}
                        onDelete={onDeleteProduct}
                        loading={loading}
                    />
                </>
            )}
            {type === 'brands' && (
                <>
                    <BrandTable 
                        brands={brands}
                        onEdit={onEditBrand}
                        onDelete={onDeleteBrand}
                        handleAddBrandModal={handleAddBrandModal}
                    />
                </>
            )
            
            
            }
            {type === 'orders' && (
                <>
                    <OrderStatusFilter 
                        activeFilter={orderStatusFilter}
                        onFilterChange={handleOrderStatusFilterChange}
                    />
                    <div className='mb-5'></div>
                    <OrderTable 
                        orders={orders}
                        onViewOrder={onViewOrder}
                        onUpdateStatus={onUpdateOrderStatus}
                        loading={loading}
                    />
                </>
                )
            }
            {/* Add other tables as needed */}
        </>
    );
};
return (
  <div className="flex h-screen overflow-hidden">
    {/* Sidebar */}
    <motion.aside
        initial={false}
        animate={sidebarOpen ? { x: 0 } : { x: -250 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`
            fixed md:relative z-30 h-full w-60  bg-white border-r border-gray-200 p-4
            ${sidebarOpen ? 'block' : 'hidden'} md:block
        `}
    >

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">{config.title}</h1>
        <button onClick={() => setSidebarOpen(false)} className="md:hidden">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <nav className="space-y-2">
        {config.sidebarItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === item.id ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>
    </motion.aside>

    {/* Main Panel */}
    <div className="flex-1 flex flex-col overflow-hidden ml-0 ">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center border-b">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold capitalize">{activeTab}</h2>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-gray-500" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
              {user.avatar}
            </div>
            <div className="text-sm">
              <p className="font-medium">{user.name}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
        {activeTab === 'dashboard'
          ? <RenderDashboard 
                userType = {userType}
                stats = {stats}
                recentOrders = {userType === 'vendor' ? orders.slice(0, 3) : [] }
                topVendors = {userType === 'admin' ? vendors.slice(0, 3) : []}
                topProducts = {products.slice(0, 3)}
          />
          : renderTable(activeTab)}
      </main>
    </div>
  </div>
);

}

export default ReusablePanel;
