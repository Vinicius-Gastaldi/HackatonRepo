import React, { useState } from 'react';
import { menuItems, getMenuItemsByCategory } from '../data/menu';
import MenuCard from '../components/MenuCard';
import { MenuItem } from '../types';

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MenuItem['category']>('starters');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const categories: { id: MenuItem['category']; label: string }[] = [
    { id: 'starters', label: 'Starters' },
    { id: 'mains', label: 'Main Courses' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'drinks', label: 'Drinks' }
  ];
  
  // Get all unique tags across all menu items
  const allTags = Array.from(
    new Set(menuItems.flatMap(item => item.tags))
  );
  
  // Filter items by category and tag
  const displayedItems = menuItems
    .filter(item => item.category === activeCategory)
    .filter(item => selectedTag ? item.tags.includes(selectedTag) : true);
  
  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Menu Hero */}
      <div className="bg-amber-700 py-12 mb-8">
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-3xl font-serif font-bold mb-4">Our Menu</h1>
          <p className="max-w-2xl">
            Explore our selection of expertly crafted dishes, made with fresh, locally-sourced ingredients.
            Use the filters below to find exactly what you're craving.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Category Navigation */}
        <div className="mb-8 overflow-x-auto">
          <div className="min-w-max flex border-b border-gray-200">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`py-4 px-6 font-medium relative ${
                  activeCategory === category.id 
                    ? 'text-amber-600' 
                    : 'text-gray-600 hover:text-amber-600'
                } transition-colors duration-300`}
              >
                {category.label}
                {activeCategory === category.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600"></span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tag Filters */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <span className="text-sm text-gray-700 font-medium">Filters:</span>
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedTag === null
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-colors duration-200`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedTag === tag
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors duration-200`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedItems.length > 0 ? (
            displayedItems.map(item => (
              <MenuCard key={item.id} item={item} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No items found matching your filter criteria. Please try a different filter.
              </p>
              <button
                onClick={() => setSelectedTag(null)}
                className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;