import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ChatMessage, MenuItem, Order } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { menuItems, getMenuItemById } from '../data/menu';
import { getRecommendedItems } from '../data/recommendations';

interface AppContextType {
  chatMessages: ChatMessage[];
  addMessage: (content: string, sender: 'user' | 'ai') => void;
  clearChat: () => void;
  cart: MenuItem[];
  cartQuantities: Record<string, number>;
  addToCart: (menuItem: MenuItem, quantity?: number) => void;
  removeFromCart: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  currentOrder: Order | null;
  createOrder: (deliveryAddress?: string, deliveryTime?: string) => void;
  updateOrderStatus: (status: Order['status']) => void;
  userPreferences: string[];
  updateUserPreferences: (preferences: string[]) => void;
  recommendations: MenuItem[];
  refreshRecommendations: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: MenuItem[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      content: "Hi there! I'm your restaurant assistant. How can I help you today? You can ask about our menu, place an order, or get recommendations.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({});
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [userPreferences, setUserPreferences] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<MenuItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MenuItem[]>([]);

  const addMessage = (content: string, sender: 'user' | 'ai') => {
    const newMessage: ChatMessage = {
      id: uuidv4(),
      content,
      sender,
      timestamp: new Date()
    };
    setChatMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const clearChat = () => {
    setChatMessages([{
      id: uuidv4(),
      content: "Hi there! I'm your restaurant assistant. How can I help you today? You can ask about our menu, place an order, or get recommendations.",
      sender: 'ai',
      timestamp: new Date()
    }]);
  };

  const addToCart = (menuItem: MenuItem, quantity = 1) => {
    setCart(prevCart => {
      if (!prevCart.some(item => item.id === menuItem.id)) {
        return [...prevCart, menuItem];
      }
      return prevCart;
    });
    
    setCartQuantities(prevQuantities => ({
      ...prevQuantities,
      [menuItem.id]: (prevQuantities[menuItem.id] || 0) + quantity
    }));
  };

  const removeFromCart = (menuItemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== menuItemId));
    setCartQuantities(prevQuantities => {
      const newQuantities = { ...prevQuantities };
      delete newQuantities[menuItemId];
      return newQuantities;
    });
  };

  const updateQuantity = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(menuItemId);
      return;
    }
    
    setCartQuantities(prevQuantities => ({
      ...prevQuantities,
      [menuItemId]: quantity
    }));
  };

  const clearCart = () => {
    setCart([]);
    setCartQuantities({});
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * (cartQuantities[item.id] || 0),
    0
  );

  const createOrder = (deliveryAddress?: string, deliveryTime?: string) => {
    if (cart.length === 0) return;
    
    const orderItems = cart.map(item => ({
      menuItemId: item.id,
      quantity: cartQuantities[item.id] || 1
    }));
    
    const newOrder: Order = {
      id: uuidv4(),
      items: orderItems,
      status: 'pending',
      totalAmount: cartTotal,
      deliveryAddress,
      deliveryTime
    };
    
    setCurrentOrder(newOrder);
    clearCart();
  };

  const updateOrderStatus = (status: Order['status']) => {
    if (!currentOrder) return;
    setCurrentOrder({ ...currentOrder, status });
  };

  const updateUserPreferences = (preferences: string[]) => {
    setUserPreferences(preferences);
  };

  const refreshRecommendations = () => {
    const currentItems = cart.length ? cart : [];
    setRecommendations(getRecommendedItems(currentItems, userPreferences));
  };

  // Update search results when search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = menuItems.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query)) ||
      item.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
    );
    
    setSearchResults(results);
  }, [searchQuery]);

  // Refresh recommendations when cart or preferences change
  useEffect(() => {
    refreshRecommendations();
  }, [cart, userPreferences]);

  return (
    <AppContext.Provider value={{
      chatMessages,
      addMessage,
      clearChat,
      cart,
      cartQuantities,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      currentOrder,
      createOrder,
      updateOrderStatus,
      userPreferences,
      updateUserPreferences,
      recommendations,
      refreshRecommendations,
      searchQuery,
      setSearchQuery,
      searchResults
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};