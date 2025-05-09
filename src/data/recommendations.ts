import { MenuItem } from '../types';
import { menuItems } from './menu';

// Simple recommendation algorithm based on food pairing and popularity
export const getRecommendedItems = (
  currentItems: MenuItem[] = [],
  dietaryPreferences: string[] = []
): MenuItem[] => {
  if (currentItems.length === 0) {
    // If no items selected, return popular items that match dietary preferences
    return menuItems
      .filter(item => item.popular)
      .filter(item => 
        dietaryPreferences.length === 0 || 
        dietaryPreferences.some(pref => item.tags.includes(pref))
      )
      .slice(0, 3);
  }

  // Get categories and tags from current items
  const selectedCategories = currentItems.map(item => item.category);
  const selectedTags = currentItems.flatMap(item => item.tags);
  
  // Find complementary categories
  const needsDrink = !selectedCategories.includes('drinks');
  const needsDessert = !selectedCategories.includes('desserts');
  
  // Filter menu items to find complementary items
  return menuItems
    .filter(item => !currentItems.some(selected => selected.id === item.id))
    .filter(item => {
      // Match by complementary category
      if ((needsDrink && item.category === 'drinks') || 
          (needsDessert && item.category === 'desserts')) {
        return true;
      }
      
      // Match by shared tags
      const sharedTags = item.tags.filter(tag => selectedTags.includes(tag));
      return sharedTags.length > 0;
    })
    .filter(item => 
      dietaryPreferences.length === 0 || 
      dietaryPreferences.some(pref => item.tags.includes(pref))
    )
    .slice(0, 3);
};

// Get pairing recommendations for a specific menu item
export const getPairingsForItem = (menuItemId: string): MenuItem[] => {
  const item = menuItems.find(item => item.id === menuItemId);
  
  if (!item) return [];
  
  const complementaryCategory = getComplementaryCategory(item.category);
  const itemTags = item.tags;
  
  return menuItems
    .filter(otherItem => otherItem.id !== menuItemId)
    .filter(otherItem => {
      // Prioritize complementary categories
      if (otherItem.category === complementaryCategory) {
        return true;
      }
      
      // Match by shared tags
      const sharedTags = otherItem.tags.filter(tag => itemTags.includes(tag));
      return sharedTags.length > 0;
    })
    .slice(0, 2);
};

// Helper function to determine complementary food categories
const getComplementaryCategory = (category: MenuItem['category']): MenuItem['category'] => {
  switch (category) {
    case 'starters': return 'mains';
    case 'mains': return 'desserts';
    case 'desserts': return 'drinks';
    case 'drinks': return 'starters';
    default: return 'mains';
  }
};