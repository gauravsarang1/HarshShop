import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/use-debounce";
import Loading from '@/components/Loading';
import { FiStar, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useSelector, useDispatch } from "react-redux";
import { 
  fetchAllProducts, 
  fetchAllOrders, 
  fetchAllBrands,
  createBrand,
  deleteBrand,
  updateBrand,
  fetchAllCategories,
  deleteProduct, 
  updateProduct, 
  updateProductImage, 
  setSelectedProduct, 
  clearSelectedProduct, 
  fetchOrderById,
  clearSelectedOrder,
  fetchFilteredOrdersByStatus,
  updateOrderStatus,
  fetchProductByVendorAndCategory,
  fetchProductByVendorAndSearch,
  fetchProductByVendorAndCategoryAndSearch,
  fetchTotalProducts,
  fetchTotalSales,
  fetchTotalPendingOrders,
  fetchTotalRevenue,
  addProduct,
  fetchVendor
 } from "../../features/vendorSlice";
import ProductEditModal from "./components/ProductEditModal";
import OrderViewModal from "./components/OrderViewModal";
import AddProductModal from "./components/addProduct";
import BrandModal from './components/BrandModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ReusablePanel from '../../components/ReusablePanel';

// Import components
import StatCard from './components/StatCard';
import ProductFilters from './components/ProductFilters';
import ProductTable from './components/ProductTable';
import OrderStatusFilter from './components/OrderStatusFilter';
import OrderTable from './components/OrderTable';
import BrandTable from './components/BrandTable';

const Vendor = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { toast } = useToast();
  const dispatch = useDispatch();
  const { 
    products, 
    orders, 
    brands, 
    loading, 
    error, 
    selectedProduct, 
    selectedOrder,
    selectedBrand,
    stats,
    vendor,
    categories 
  } = useSelector(state => state.vendor);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [brandToDelete, setBrandToDelete] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false);
  const [brandToEdit, setBrandToEdit] = useState(null);

  useEffect(() => {
    console.log('selectedBrand', selectedBrand)
  }, [selectedBrand])

  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchVendor()).unwrap();
        if (vendor?.id) {
          await dispatch(fetchAllProducts()).unwrap();
          await dispatch(fetchAllOrders()).unwrap();
          await dispatch(fetchAllBrands()).unwrap();
          await dispatch(fetchAllCategories()).unwrap();
        }
      } catch (error) {
        console.error("Failed to fetch vendor data:", error);
      }
    };

    fetchData();
  }, [dispatch, vendor?.id]);


  // Fetch dashboard stats
  useEffect(() => {
    if(vendor?.id) {
      dispatch(fetchTotalProducts());
      dispatch(fetchTotalSales());
      dispatch(fetchTotalPendingOrders());
      dispatch(fetchTotalRevenue());
    }
  }, [dispatch, vendor?.id]);

  // Handle product filtering
  useEffect(() => {
    if (!vendor?.id) return;

    const fetchProducts = async () => {
      try {
        if (selectedCategory === 'all' && !debouncedSearchQuery) {
          await dispatch(fetchAllProducts()).unwrap();
        } else if (selectedCategory !== 'all' && !debouncedSearchQuery) {
          await dispatch(fetchProductByVendorAndCategory({ categoryId: selectedCategory })).unwrap();
        } else if (selectedCategory === 'all' && debouncedSearchQuery) {
          await dispatch(fetchProductByVendorAndSearch({ search: debouncedSearchQuery })).unwrap();
        } else {
          await dispatch(fetchProductByVendorAndCategoryAndSearch({ 
            categoryId: selectedCategory, 
            search: debouncedSearchQuery 
          })).unwrap();
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch products",
          variant: "destructive"
        });
      }
    };

    fetchProducts();
  }, [dispatch, vendor?.id, selectedCategory, debouncedSearchQuery]);

  // Handle order status filter changes
  const handleOrderStatusFilterChange = async (status) => {
    setOrderStatusFilter(status);
    try {
      if (status === 'all') {
        await dispatch(fetchAllOrders()).unwrap();
      } else {
        await dispatch(fetchFilteredOrdersByStatus({ status })).unwrap();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive"
      });
    }
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleEditProduct = (product) => {
    dispatch(setSelectedProduct(product));
    setIsEditModalOpen(true);
  };

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      await dispatch(deleteProduct({ 
        brandId: productToDelete.BrandId, 
        productId: productToDelete.id 
      })).unwrap();
      if(!loading.products || !error.products) {
        setIsDeleteDialogOpen(false);
        setProductToDelete(null);
      }
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    }
    if (brandToDelete) {
      await dispatch(deleteBrand(brandToDelete.id)).unwrap();
      if(!loading.brands || !error.brands) {
        setIsDeleteDialogOpen(false);
        setBrandToDelete(null);
      }
      toast({
        title: "Success",
        description: "Brand deleted successfully",
      });
    }
  };

  const handleUpdateProduct = async (formData) => {
    if (selectedProduct) {
      await dispatch(updateProduct({
        brandId: selectedProduct.BrandId,
        productId: selectedProduct.id,
        productData: formData
      })).unwrap();
      if(!loading.products) setIsEditModalOpen(false);
      dispatch(clearSelectedProduct());
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
    }
  };

  const handleViewOrder = async (order) => {
    try {
      await dispatch(fetchOrderById(order.id)).unwrap();
      setIsOrderModalOpen(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch order",
        variant: "destructive"
      });
    }
  };

  const handleUpdateOrderStatus = async (newStatus) => {
    try {
      await dispatch(updateOrderStatus({ orderId: selectedOrder.id, status: newStatus })).unwrap();
      toast({
        title: "Success",
        description: "Order status updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive"
      });
    }
  };

  const handleUpdateProductImage = async (images) => {
    if (selectedProduct) {
      await dispatch(updateProductImage({
        brandId: selectedProduct.BrandId,
        productId: selectedProduct.id,
        imageData: images
      })).unwrap();
      if(!loading.products) setIsEditModalOpen(false);
      dispatch(clearSelectedProduct());
      toast({
        title: "Success",
        description: "Product images updated successfully",
      });
    }
  };

  const handleAddProduct = async (product) => {
    if(product) {
      await dispatch(addProduct({
        brandId: product.BrandId,
        productData: product
      })).unwrap();
    }
  };

  const handleAddProductModalOpen = () => {
    setIsAddProductModalOpen(true);
  };

  useEffect(() => {
    if(selectedOrder) {
      setIsOrderModalOpen(true);
    }
  }, [selectedOrder]);


  const handleAddBrandModal = () => {
    setIsAddBrandModalOpen(true);
  };

  const handleAddBrand = async (brandData) => {
    try {
      await dispatch(createBrand(brandData)).unwrap();
      if(!loading.brands || !error.brands) setIsAddBrandModalOpen(false);
    } catch (error) {
      console.error("Failed to add brand:", error);
    }
  }

  const handleEditBrand = async (brandData) => {
    console.log('brandData', brandData)
    if(!brandData.id) return;
    try {
      await dispatch(updateBrand({brandId: brandData.id, brandData})).unwrap();
      if(!loading.brands || !error.brands) setIsAddBrandModalOpen(false);
    } catch (error) {
      console.error("Failed to edit brand:", error);
    }
  }

  const handleDeleBrand = (brand) => {
    setBrandToDelete(brand);
    setIsDeleteDialogOpen(true);
  }

  if (!vendor?.id) {
    return <Loading />;
  }
  

  return (
    <div className="container mx-auto px-4 py-8">


    <div className='mb-8'>
      <ReusablePanel 
        userType="vendor"
        user={vendor}
        products={products}
        orders={orders}
        brands={brands}
        categories={categories}
        stats={stats}
        loading={loading}
        recentOrders={orders.slice(0, 3)}
        topProducts={products.slice(0, 3)}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        onAddProductOpenModal={handleAddProductModalOpen}
        onViewOrder={handleViewOrder}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        handleCategoryChange={handleCategoryChange}
        handleSearchChange={handleSearchChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        orderStatusFilter={orderStatusFilter}
        handleOrderStatusFilterChange={handleOrderStatusFilterChange}
        handleAddBrandModal={handleAddBrandModal}
        onDeleteBrand={handleDeleBrand}
      />
    </div>


      {/* Modals */}
      <ProductEditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          dispatch(clearSelectedProduct());
        }}
        product={selectedProduct}
        onUpdate={handleUpdateProduct}
        onUpdateImage={handleUpdateProductImage}
        loading={loading.products}
      />

      <OrderViewModal
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false);
          dispatch(clearSelectedOrder());
        }}
        order={selectedOrder}
        onUpdateStatus={handleUpdateOrderStatus}
        loading={loading.orders}
      />

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => {
          setIsAddProductModalOpen(false);
          dispatch(clearSelectedProduct());
        }}
        onAdd={handleAddProduct}
        loading={loading.products}
        brands={brands}
        categories={categories}
      />

      <BrandModal
        isOpen={isAddBrandModalOpen}
        onClose={() => {
          setIsAddBrandModalOpen(false);
        }}
        onSubmit={selectedBrand?.mode === 'add' ? handleAddBrand : handleEditBrand}
        loading={loading.brands}
        error={error.brands}
        mode={selectedBrand?.mode}
        initialData={selectedBrand?.mode === 'edit' ? selectedBrand : null}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>{loading.brands?'Deleting...':'Delete'}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Vendor;
