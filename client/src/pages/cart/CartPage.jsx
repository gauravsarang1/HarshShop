import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingCart, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading';
import { fetchCart, updateCartItem, removeFromCart } from '@/features/cartSlice';
import { toast } from 'react-hot-toast';
import { createOrder } from '@/features/orderSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, isLoading, error } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { isLoading: orderLoading, error: orderError } = useSelector((state) => state.order);
  const cartItems = cart?.CartItems || [];

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  const handleQuantityChange = async (cartItemId, change, currentQuantity) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;

    try {
      await dispatch(updateCartItem({ cartItemId, quantity: newQuantity })).unwrap();
      toast.success('Cart updated successfully');
    } catch (error) {
      toast.error(error.message || 'Error updating cart');
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await dispatch(removeFromCart(cartItemId)).unwrap();
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error(error.message || 'Error removing item');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.Product.discountedPrice);
      return total + (price * item.quantity);
    }, 0);
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = cartItems.map(item => ({
        productId: item.ProductId,
        quantity: item.quantity
      }));

      const result = await dispatch(createOrder(orderData)).unwrap();
      toast.success('Order placed successfully!');
      navigate(`/orders/${result.id}`);
    } catch (error) {
      toast.error(error.message || 'Error creating order');
    }
  };


  console.log('user', user);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-semibold mb-4">Please login to view your cart</h2>
          <p className="text-gray-500 mb-8">You need to be logged in to access your shopping cart.</p>
          <Link to="/login">
            <Button className="bg-[#FB641B] hover:bg-[#FB641B]/90">
              Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <Loading type="skeleton" />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-red-600">Error loading cart</h2>
          <p className="text-gray-500 mb-8">{error}</p>
          <Button onClick={() => dispatch(fetchCart())} className="bg-[#FB641B] hover:bg-[#FB641B]/90">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products">
            <Button className="bg-[#FB641B] hover:bg-[#FB641B]/90">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side - Cart Items */}
        <div className="lg:w-8/12">
          <Card className="p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">My Cart ({cartItems.length} items)</h2>
            
            <div className="space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex flex-col md:flex-row gap-6 border-b pb-6 last:border-b-0">
                  <div className="w-full md:w-40 h-40 relative group">
                    <img
                      src={item.Product.images[0]}
                      alt={item.Product.name}
                      className="w-full h-full object-contain rounded-lg transition-transform group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-lg mb-1">{item.Product.name}</h3>
                        <p className="text-gray-500 mb-2">Brand: {item.Product.Brand.name}</p>
                        
                        <div className="flex items-center gap-4 mt-4">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, -1, item.quantity)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, 1, item.quantity)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-lg">₹{parseFloat(item.Product.discountedPrice).toLocaleString('en-IN')}</p>
                        <Button
                          variant="ghost"
                          className="text-red-500 mt-2 hover:bg-red-50"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right side - Price Details */}
        <div className="lg:w-4/12">
          <Card className="p-6 sticky top-4 shadow-lg">
            <h2 className="text-xl font-semibold mb-6 pb-3 border-b">PRICE DETAILS</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Price ({cartItems.length} items)</span>
                <span>₹{calculateTotal().toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Charges</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              
              <div className="my-4 pt-4 border-t">
                <div className="flex justify-between text-base font-semibold">
                  <span>Total Amount</span>
                  <span>₹{calculateTotal().toLocaleString('en-IN')}</span>
                </div>
                <p className="text-green-600 text-sm mt-2">You will save ₹0 on this order</p>
              </div>

              <Button 
                className="w-full mt-4 bg-[#FB641B] hover:bg-[#FB641B]/90 py-6 text-lg font-medium" 
                onClick={handlePlaceOrder}
                disabled={orderLoading}
              >
                {orderLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                PLACE ORDER
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 