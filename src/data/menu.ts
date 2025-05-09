import type { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Truffle Arancini',
    description: 'Crispy risotto balls infused with black truffle and mozzarella',
    price: 12.99,
    image: 'https://images.pexels.com/photos/5639411/pexels-photo-5639411.jpeg',
    category: 'starters',
    tags: ['vegetarian', 'italian'],
    popular: true,
    ingredients: ['arborio rice', 'black truffle', 'mozzarella', 'parmesan', 'breadcrumbs'],
    allergens: ['dairy', 'gluten'],
    nutritionalInfo: {
      calories: 320,
      protein: 10,
      carbs: 30,
      fat: 18
    }
  },
  {
    id: '2',
    name: 'Oak-Smoked Salmon',
    description: 'House-cured salmon with dill, capers, and lemon',
    price: 14.99,
    image: 'https://images.pexels.com/photos/10201663/pexels-photo-10201663.jpeg',
    category: 'starters',
    tags: ['seafood', 'gluten-free'],
    popular: false,
    ingredients: ['salmon', 'dill', 'capers', 'lemon', 'olive oil'],
    allergens: ['fish'],
    nutritionalInfo: {
      calories: 220,
      protein: 22,
      carbs: 2,
      fat: 14
    }
  },
  {
    id: '3',
    name: 'Filet Mignon',
    description: '8oz prime beef tenderloin with red wine reduction',
    price: 32.99,
    image: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg',
    category: 'mains',
    tags: ['meat', 'gluten-free'],
    popular: true,
    ingredients: ['beef tenderloin', 'butter', 'garlic', 'thyme', 'red wine'],
    allergens: ['dairy'],
    nutritionalInfo: {
      calories: 450,
      protein: 40,
      carbs: 5,
      fat: 28
    }
  },
  {
    id: '4',
    name: 'Wild Mushroom Risotto',
    description: 'Creamy arborio rice with seasonal wild mushrooms and aged parmesan',
    price: 19.99,
    image: 'https://images.pexels.com/photos/5638766/pexels-photo-5638766.jpeg',
    category: 'mains',
    tags: ['vegetarian', 'italian'],
    popular: false,
    ingredients: ['arborio rice', 'wild mushrooms', 'white wine', 'parmesan', 'butter'],
    allergens: ['dairy'],
    nutritionalInfo: {
      calories: 380,
      protein: 12,
      carbs: 45,
      fat: 16
    }
  },
  {
    id: '5',
    name: 'Chocolate Fondant',
    description: 'Warm chocolate cake with a molten center and vanilla bean ice cream',
    price: 10.99,
    image: 'https://images.pexels.com/photos/3992131/pexels-photo-3992131.jpeg',
    category: 'desserts',
    tags: ['chocolate', 'hot'],
    popular: true,
    ingredients: ['dark chocolate', 'butter', 'eggs', 'flour', 'sugar'],
    allergens: ['gluten', 'dairy', 'eggs'],
    nutritionalInfo: {
      calories: 420,
      protein: 6,
      carbs: 48,
      fat: 24
    }
  },
  {
    id: '6',
    name: 'Passion Fruit Pavlova',
    description: 'Crisp meringue topped with passion fruit curd and fresh berries',
    price: 9.99,
    image: 'https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg',
    category: 'desserts',
    tags: ['fruity', 'sweet'],
    popular: false,
    ingredients: ['egg whites', 'sugar', 'passion fruit', 'cream', 'berries'],
    allergens: ['eggs', 'dairy'],
    nutritionalInfo: {
      calories: 310,
      protein: 4,
      carbs: 56,
      fat: 9
    }
  },
  {
    id: '7',
    name: 'Artisanal Gin & Tonic',
    description: 'Small-batch gin with artisanal tonic water and botanical garnish',
    price: 12.99,
    image: 'https://images.pexels.com/photos/616836/pexels-photo-616836.jpeg',
    category: 'drinks',
    tags: ['alcoholic', 'refreshing'],
    popular: true,
    ingredients: ['gin', 'tonic water', 'lime', 'juniper berries', 'cucumber'],
    nutritionalInfo: {
      calories: 180
    }
  },
  {
    id: '8',
    name: 'Berry Kombucha',
    description: 'House-fermented kombucha with mixed berries and mint',
    price: 6.99,
    image: 'https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg',
    category: 'drinks',
    tags: ['non-alcoholic', 'probiotic'],
    popular: false,
    ingredients: ['kombucha', 'mixed berries', 'mint', 'honey'],
    nutritionalInfo: {
      calories: 90,
      carbs: 22
    }
  }
];

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return menuItems.find(item => item.id === id);
};

export const getMenuItemsByCategory = (category: MenuItem['category']): MenuItem[] => {
  return menuItems.filter(item => item.category === category);
};

export const getPopularItems = (): MenuItem[] => {
  return menuItems.filter(item => item.popular);
};

export const getMenuItemsByTag = (tag: string): MenuItem[] => {
  return menuItems.filter(item => item.tags.includes(tag));
};