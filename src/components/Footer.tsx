import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">
              <span className="text-white">Gourmet</span>
              <span className="text-amber-600">AI</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Elevating dining with AI-powered assistance and exceptional cuisine.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-200">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-amber-500">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400">123 Gourmet Street, Culinary District</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-amber-500 flex-shrink-0" />
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-amber-500 flex-shrink-0" />
                <span className="text-gray-400">info@gourmetai.com</span>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="mr-2 text-amber-500 flex-shrink-0 mt-1" />
                <div className="text-gray-400">
                  <p>Mon-Thu: 11am - 10pm</p>
                  <p>Fri-Sun: 11am - 11pm</p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-amber-500">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/menu" className="text-gray-400 hover:text-amber-500 transition-colors duration-200">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="text-gray-400 hover:text-amber-500 transition-colors duration-200">
                  Order Delivery
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-amber-500 transition-colors duration-200">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-amber-500 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-amber-500 transition-colors duration-200">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-amber-500">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to receive updates on special offers and events.
            </p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button 
                type="submit" 
                className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} GourmetAI. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4 text-sm">
            <Link to="/privacy" className="hover:text-amber-500 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-amber-500 transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;