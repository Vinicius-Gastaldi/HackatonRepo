import React from 'react';
import { PlusCircle, Info } from 'lucide-react';
import { MenuItem } from '../types';
import { useAppContext } from '../context/AppContext';

interface MenuCardProps {
  item: MenuItem;
  showDetails?: boolean;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, showDetails = false }) => {
  const { addToCart } = useAppContext();
  const [showInfo, setShowInfo] = React.useState(false);
  
  const handleAddToCart = () => {
    addToCart(item, 1);
  };
  
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        {item.popular && (
          <div className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
            Popular
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
          <span className="text-amber-600 font-medium">${item.price.toFixed(2)}</span>
        </div>
        
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">{item.description}</p>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {item.tags.map(tag => (
            <span 
              key={tag} 
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {showInfo && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm text-gray-700 animate-fadeIn">
            <h4 className="font-medium mb-1">Ingredients:</h4>
            <p>{item.ingredients.join(', ')}</p>
            
            {item.allergens && (
              <>
                <h4 className="font-medium mt-2 mb-1">Allergens:</h4>
                <p>{item.allergens.join(', ')}</p>
              </>
            )}
            
            {item.nutritionalInfo && (
              <>
                <h4 className="font-medium mt-2 mb-1">Nutritional Info:</h4>
                <p>Calories: {item.nutritionalInfo.calories} kcal</p>
                {item.nutritionalInfo.protein && <p>Protein: {item.nutritionalInfo.protein}g</p>}
                {item.nutritionalInfo.carbs && <p>Carbs: {item.nutritionalInfo.carbs}g</p>}
                {item.nutritionalInfo.fat && <p>Fat: {item.nutritionalInfo.fat}g</p>}
              </>
            )}
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <button 
            onClick={toggleInfo} 
            className="text-gray-600 hover:text-amber-600 flex items-center text-sm"
          >
            <Info size={16} className="mr-1" />
            {showInfo ? 'Hide details' : 'Details'}
          </button>
          
          <button 
            onClick={handleAddToCart}
            className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded-md flex items-center transition-colors duration-200"
          >
            <PlusCircle size={16} className="mr-1" />
            Add to order
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;