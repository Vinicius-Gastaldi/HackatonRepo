import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import CartItem from '../components/CartItem';
import MenuCard from '../components/MenuCard';
import { CreditCard, Truck, Clock, MapPin } from 'lucide-react';

const Delivery: React.FC = () => {
  const { 
    cart, 
    cartQuantities, 
    cartTotal, 
    createOrder, 
    currentOrder,
    updateOrderStatus,
    recommendations 
  } = useAppContext();
  
  const [address, setAddress] = useState('');
  const [time, setTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [step, setStep] = useState<'cart' | 'delivery' | 'payment' | 'confirmation'>(
    cart.length > 0 ? 'cart' : 'cart'
  );
  
  const handleCreateOrder = () => {
    createOrder(address, time);
    setStep('confirmation');
    
    // Simulate order progress for demo purposes
    setTimeout(() => updateOrderStatus('confirmed'), 3000);
    setTimeout(() => updateOrderStatus('preparing'), 6000);
    setTimeout(() => updateOrderStatus('out-for-delivery'), 9000);
    setTimeout(() => updateOrderStatus('delivered'), 12000);
  };
  
  const getOrderStatusText = () => {
    if (!currentOrder) return '';
    
    switch (currentOrder.status) {
      case 'pending': return 'Order Received';
      case 'confirmed': return 'Order Confirmed';
      case 'preparing': return 'Preparing Your Food';
      case 'out-for-delivery': return 'Out For Delivery';
      case 'delivered': return 'Delivered';
      default: return '';
    }
  };
  
  const getOrderStatusPercentage = () => {
    if (!currentOrder) return 0;
    
    switch (currentOrder.status) {
      case 'pending': return 20;
      case 'confirmed': return 40;
      case 'preparing': return 60;
      case 'out-for-delivery': return 80;
      case 'delivered': return 100;
      default: return 0;
    }
  };
  
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <h1 className="text-3xl font-serif font-bold mb-8">Order Delivery</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step Indicators */}
            {(step === 'cart' || step === 'delivery' || step === 'payment') && (
              <div className="mb-8 flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === 'cart' || step === 'delivery' || step === 'payment'
                      ? 'bg-amber-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  1
                </div>
                <div className={`h-0.5 flex-1 mx-2 ${
                  step === 'cart' || step === 'delivery' || step === 'payment'
                    ? 'bg-amber-600' 
                    : 'bg-gray-200'
                }`}></div>
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === 'delivery' || step === 'payment'
                      ? 'bg-amber-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  2
                </div>
                <div className={`h-0.5 flex-1 mx-2 ${
                  step === 'delivery' || step === 'payment'
                    ? 'bg-amber-600' 
                    : 'bg-gray-200'
                }`}></div>
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === 'payment'
                      ? 'bg-amber-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  3
                </div>
              </div>
            )}
            
            {/* Cart Step */}
            {step === 'cart' && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Your Order</h2>
                  
                  {cart.length > 0 ? (
                    <div>
                      <div className="divide-y">
                        {cart.map(item => (
                          <CartItem 
                            key={item.id} 
                            item={item} 
                            quantity={cartQuantities[item.id] || 1} 
                          />
                        ))}
                      </div>
                      
                      <div className="mt-8 flex justify-between items-center">
                        <span className="text-lg font-medium text-gray-900">
                          Total: ${cartTotal.toFixed(2)}
                        </span>
                        <button 
                          onClick={() => setStep('delivery')}
                          className="bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition-colors duration-200"
                        >
                          Continue to Delivery
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                      <p className="text-gray-600 mb-6">Add items from our menu to start your order</p>
                      <a 
                        href="/menu" 
                        className="bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition-colors duration-200"
                      >
                        Browse Menu
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Delivery Step */}
            {step === 'delivery' && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Delivery Details</h2>
                  
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Address
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 bg-gray-50 text-gray-500 border border-r-0 border-gray-300 rounded-l-md">
                          <MapPin size={18} />
                        </span>
                        <input
                          type="text"
                          id="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 rounded-r-md focus:ring-amber-500 focus:border-amber-500"
                          placeholder="Enter your delivery address"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Delivery Time
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 bg-gray-50 text-gray-500 border border-r-0 border-gray-300 rounded-l-md">
                          <Clock size={18} />
                        </span>
                        <select
                          id="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 rounded-r-md focus:ring-amber-500 focus:border-amber-500"
                          required
                        >
                          <option value="">Select a time</option>
                          <option value="asap">As soon as possible</option>
                          <option value="30min">Within 30 minutes</option>
                          <option value="1hour">Within 1 hour</option>
                          <option value="2hours">Within 2 hours</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <button 
                        type="button"
                        onClick={() => setStep('cart')}
                        className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                      >
                        Back to Cart
                      </button>
                      <button 
                        type="button"
                        onClick={() => setStep('payment')}
                        disabled={!address || !time}
                        className={`px-6 py-3 rounded-md ${
                          !address || !time
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-amber-600 text-white hover:bg-amber-700 transition-colors duration-200'
                        }`}
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {/* Payment Step */}
            {step === 'payment' && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Payment Method</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="card"
                        name="paymentMethod"
                        type="radio"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                      />
                      <label htmlFor="card" className="ml-3 flex items-center">
                        <CreditCard size={20} className="mr-2 text-gray-600" />
                        <span className="text-gray-700">Credit / Debit Card</span>
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="cash"
                        name="paymentMethod"
                        type="radio"
                        checked={paymentMethod === 'cash'}
                        onChange={() => setPaymentMethod('cash')}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                      />
                      <label htmlFor="cash" className="ml-3 text-gray-700">
                        Cash on Delivery
                      </label>
                    </div>
                    
                    {paymentMethod === 'card' && (
                      <div className="mt-4 p-4 border border-gray-200 rounded-md">
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              id="cardNumber"
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                id="expiry"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                                placeholder="MM/YY"
                              />
                            </div>
                            <div>
                              <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                                CVC
                              </label>
                              <input
                                type="text"
                                id="cvc"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                                placeholder="123"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6 flex justify-between">
                      <button 
                        type="button"
                        onClick={() => setStep('delivery')}
                        className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                      >
                        Back to Delivery
                      </button>
                      <button 
                        type="button"
                        onClick={handleCreateOrder}
                        className="bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition-colors duration-200"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Confirmation Step */}
            {step === 'confirmation' && currentOrder && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="text-center mb-8">
                    <div className="h-16 w-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                      <Truck size={32} className="text-green-600" />
                    </div>
                    <h2 className="text-2xl font-medium text-gray-900 mt-4 mb-2">
                      Order Successfully Placed!
                    </h2>
                    <p className="text-gray-600">
                      Your order has been received and is being processed.
                    </p>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {getOrderStatusText()}
                      </span>
                      <span className="text-sm text-amber-600 font-medium">
                        {getOrderStatusPercentage()}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-amber-600 h-2.5 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${getOrderStatusPercentage()}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-4 mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Order Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Number:</span>
                        <span className="font-medium text-gray-900">#{currentOrder.id.slice(0, 8)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Address:</span>
                        <span className="font-medium text-gray-900">{currentOrder.deliveryAddress}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Time:</span>
                        <span className="font-medium text-gray-900">
                          {currentOrder.deliveryTime === 'asap' ? 'As soon as possible' : currentOrder.deliveryTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-medium text-gray-900">${currentOrder.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <a 
                      href="/menu" 
                      className="bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition-colors duration-200"
                    >
                      Continue Shopping
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Order Summary */}
            {(step === 'cart' || step === 'delivery' || step === 'payment') && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="bg-amber-600 text-white p-4">
                  <h2 className="text-lg font-medium">Order Summary</h2>
                </div>
                
                <div className="p-4">
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <div className="flex-1">
                          <p className="text-gray-800">
                            {item.name} <span className="text-gray-500">x{cartQuantities[item.id] || 1}</span>
                          </p>
                        </div>
                        <p className="text-gray-800 font-medium">
                          ${((cartQuantities[item.id] || 1) * item.price).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-800 font-medium">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="text-gray-800 font-medium">$2.99</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-800 font-medium">${(cartTotal * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 mt-4 pt-4">
                      <span className="text-gray-900 font-medium">Total</span>
                      <span className="text-amber-600 font-bold">
                        ${(cartTotal + 2.99 + cartTotal * 0.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Recommended Items */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-amber-600 text-white p-4">
                <h2 className="text-lg font-medium">You Might Also Like</h2>
              </div>
              
              <div className="p-4 space-y-4">
                {recommendations.map(item => (
                  <div key={item.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <div className="flex">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                        </div>
                        
                        <p className="mt-1 text-xs text-gray-500 line-clamp-1">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;