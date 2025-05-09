export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'starters' | 'mains' | 'desserts' | 'drinks';
  tags: string[];
  popular: boolean;
  ingredients: string[];
  allergens?: string[];
  nutritionalInfo?: {
    calories: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface OrderItem {
  menuItemId: string;
  quantity: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered';
  deliveryAddress?: string;
  deliveryTime?: string;
  totalAmount: number;
  paymentMethod?: string;
}

export type SuggestionType = 'popular' | 'recommended' | 'pairs-well';

export interface Suggestion {
  type: SuggestionType;
  menuItemIds: string[];
}