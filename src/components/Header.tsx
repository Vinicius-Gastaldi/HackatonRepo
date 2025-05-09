import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, cartTotal } = useAppContext();
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif font-bold text-burgundy-900">
            <span className={`transition-colors duration-300 ${isScrolled ? 'text-burgundy-900' : 'text-white'}`}>
              Gourmet
            </span>
            <span className="text-amber-600">AI</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-amber-600' 
                  : isScrolled ? 'text-gray-800 hover:text-amber-600' : 'text-white hover:text-amber-400'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/menu" 
              className={`font-medium transition-colors duration-200 ${
                isActive('/menu') 
                  ? 'text-amber-600' 
                  : isScrolled ? 'text-gray-800 hover:text-amber-600' : 'text-white hover:text-amber-400'
              }`}
            >
              Menu
            </Link>
            <Link 
              to="/delivery" 
              className={`font-medium transition-colors duration-200 ${
                isActive('/delivery') 
                  ? 'text-amber-600' 
                  : isScrolled ? 'text-gray-800 hover:text-amber-600' : 'text-white hover:text-amber-400'
              }`}
            >
              Delivery
            </Link>
            <Link 
              to="/support" 
              className={`font-medium transition-colors duration-200 ${
                isActive('/support') 
                  ? 'text-amber-600' 
                  : isScrolled ? 'text-gray-800 hover:text-amber-600' : 'text-white hover:text-amber-400'
              }`}
            >
              AI Support
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/search" 
              className={`p-2 rounded-full transition-colors duration-200 ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
              }`}
            >
              <Search size={20} />
            </Link>
            <Link 
              to="/cart" 
              className={`p-2 rounded-full transition-colors duration-200 relative ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
              }`}
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
            <Link 
              to="/profile" 
              className={`p-2 rounded-full transition-colors duration-200 ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
              }`}
            >
              <User size={20} />
            </Link>
            
            {/* Mobile menu button */}
            <button 
              onClick={toggleMenu} 
              className={`md:hidden p-2 rounded-full transition-colors duration-200 ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
              }`}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-slideDown">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`font-medium py-2 ${isActive('/') ? 'text-amber-600' : 'text-gray-800'}`} 
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link 
                to="/menu" 
                className={`font-medium py-2 ${isActive('/menu') ? 'text-amber-600' : 'text-gray-800'}`} 
                onClick={closeMenu}
              >
                Menu
              </Link>
              <Link 
                to="/delivery" 
                className={`font-medium py-2 ${isActive('/delivery') ? 'text-amber-600' : 'text-gray-800'}`} 
                onClick={closeMenu}
              >
                Delivery
              </Link>
              <Link 
                to="/support" 
                className={`font-medium py-2 ${isActive('/support') ? 'text-amber-600' : 'text-gray-800'}`} 
                onClick={closeMenu}
              >
                AI Support
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;