import React from 'react';
import ChatInterface from '../components/ChatInterface';
import { useAppContext } from '../context/AppContext';
import MenuCard from '../components/MenuCard';

const Support: React.FC = () => {
  const { recommendations } = useAppContext();
  
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Chat Interface */}
          <div className="lg:col-span-2 h-[70vh]">
            <ChatInterface />
          </div>
          
          {/* Sidebar with Recommendations */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-amber-600 text-white p-4">
                <h2 className="text-lg font-medium">Recommended For You</h2>
                <p className="text-sm text-amber-100">Based on popular choices</p>
              </div>
              
              <div className="p-4 space-y-4">
                {recommendations.map(item => (
                  <div key={item.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <div className="flex">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                          <p className="text-base font-medium text-gray-900">${item.price.toFixed(2)}</p>
                        </div>
                        
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.description}</p>
                        
                        <button 
                          className="mt-2 text-sm text-amber-600 hover:text-amber-700 transition-colors duration-200"
                          onClick={() => {
                            const supportEl = document.querySelector('.support-element');
                            if (supportEl) {
                              supportEl.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                        >
                          Ask about this dish
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Common Questions */}
            <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-amber-600 text-white p-4">
                <h2 className="text-lg font-medium">Common Questions</h2>
                <p className="text-sm text-amber-100">Try asking these</p>
              </div>
              
              <div className="p-4">
                <ul className="space-y-2">
                  <li>
                    <button className="text-left w-full py-2 px-3 rounded-md bg-gray-50 hover:bg-amber-50 text-gray-700 hover:text-amber-700 transition-colors duration-200">
                      What are your most popular dishes?
                    </button>
                  </li>
                  <li>
                    <button className="text-left w-full py-2 px-3 rounded-md bg-gray-50 hover:bg-amber-50 text-gray-700 hover:text-amber-700 transition-colors duration-200">
                      Do you have vegetarian options?
                    </button>
                  </li>
                  <li>
                    <button className="text-left w-full py-2 px-3 rounded-md bg-gray-50 hover:bg-amber-50 text-gray-700 hover:text-amber-700 transition-colors duration-200">
                      What are your delivery hours?
                    </button>
                  </li>
                  <li>
                    <button className="text-left w-full py-2 px-3 rounded-md bg-gray-50 hover:bg-amber-50 text-gray-700 hover:text-amber-700 transition-colors duration-200">
                      Can you recommend a wine pairing?
                    </button>
                  </li>
                  <li>
                    <button className="text-left w-full py-2 px-3 rounded-md bg-gray-50 hover:bg-amber-50 text-gray-700 hover:text-amber-700 transition-colors duration-200">
                      How long does delivery take?
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;