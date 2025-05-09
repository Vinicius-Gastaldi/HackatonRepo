import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UtensilsCrossed, Truck, MessageSquareText } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import MenuCard from '../components/MenuCard';

const Home: React.FC = () => {
  const { recommendations } = useAppContext();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg')" 
          }}
        ></div>
        
        <div className="container mx-auto px-4 h-full relative z-20 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 animate-fadeIn">
            <span className="text-white">Gourmet</span>
            <span className="text-amber-500">AI</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl animate-fadeIn animation-delay-200">
            Elevating your dining experience with AI-powered assistance and exceptional cuisine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn animation-delay-400">
            <Link
              to="/menu"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-300"
            >
              Explore Our Menu
            </Link>
            <Link
              to="/support"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium transition-colors duration-300"
            >
              Ask Our AI Assistant
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center animate-bounce">
          <a href="#features" className="text-white hover:text-amber-500 transition-colors duration-300">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">How We Elevate Your Experience</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered assistant makes dining easier and more enjoyable with smart recommendations, easy ordering, and instant support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-8 transition-transform duration-300 hover:-translate-y-2">
              <div className="bg-amber-50 text-amber-600 h-14 w-14 rounded-full flex items-center justify-center mb-6">
                <UtensilsCrossed size={28} />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Personalized Menu</h3>
              <p className="text-gray-600 mb-4">
                Get custom food recommendations based on your preferences, dietary needs, and past orders.
              </p>
              <Link to="/menu" className="text-amber-600 hover:text-amber-700 flex items-center font-medium">
                Browse Menu <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-8 transition-transform duration-300 hover:-translate-y-2">
              <div className="bg-amber-50 text-amber-600 h-14 w-14 rounded-full flex items-center justify-center mb-6">
                <Truck size={28} />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Easy Delivery</h3>
              <p className="text-gray-600 mb-4">
                Order with a few taps and track your delivery in real-time with accurate ETAs and updates.
              </p>
              <Link to="/delivery" className="text-amber-600 hover:text-amber-700 flex items-center font-medium">
                Order Now <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md p-8 transition-transform duration-300 hover:-translate-y-2">
              <div className="bg-amber-50 text-amber-600 h-14 w-14 rounded-full flex items-center justify-center mb-6">
                <MessageSquareText size={28} />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">AI Assistant</h3>
              <p className="text-gray-600 mb-4">
                Get instant answers about our menu, ingredients, allergens, and special requests.
              </p>
              <Link to="/support" className="text-amber-600 hover:text-amber-700 flex items-center font-medium">
                Chat Now <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Dishes Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Popular Dishes</h2>
              <p className="text-gray-600 max-w-2xl">
                Discover our most loved dishes, made with the finest ingredients and culinary expertise.
              </p>
            </div>
            <Link 
              to="/menu" 
              className="text-amber-600 hover:text-amber-700 flex items-center font-medium"
            >
              View Full Menu <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendations.slice(0, 3).map(item => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Ready to Experience Our AI-Enhanced Dining?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start a conversation with our AI assistant or browse our menu to discover delightful culinary creations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/support"
              className="bg-white text-amber-700 hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition-colors duration-300"
            >
              Chat with AI Assistant
            </Link>
            <Link
              to="/menu"
              className="bg-amber-600 hover:bg-amber-800 text-white px-6 py-3 rounded-full font-medium transition-colors duration-300"
            >
              Browse Our Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;