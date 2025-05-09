import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { MenuItem } from '../types';
import { useAppContext } from '../context/AppContext';

interface CartItemProps {
  item: MenuItem;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ item, quantity }) => {
  const { updateQuantity, removeFromCart } = useAppContext();
  
  const handleIncrement = () => {
    updateQuantity(item.id, quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(item.id, quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(item.id);
  };
  
  return (
    <div className="flex items-start py-4 border-b border-gray-200 group">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img 
          src={item.image} 
          alt={item.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
          <p className="text-base font-medium text-gray-900">${(item.price * quantity).toFixed(2)}</p>
        </div>
        
        <p className="mt-1 text-sm text-gray-500 line-clamp-1">{item.description}</p>
        
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <button 
              onClick={handleDecrement}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            >
              <Minus size={16} />
            </button>
            <span className="px-3 py-1 text-gray-800">{quantity}</span>
            <button 
              onClick={handleIncrement}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button 
            onClick={handleRemove}
            className="text-gray-500 hover:text-red-500 transition-colors duration-200"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;