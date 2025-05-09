import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2 } from 'lucide-react';
import { useChat } from '../hooks/useChat';

const ChatInterface: React.FC = () => {
  const { chatMessages, processUserMessage, isAiTyping, clearChat } = useChat();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;
    
    processUserMessage(message);
    setMessage('');
  };
  
  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);
  
  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-lg shadow-md overflow-hidden">
      {/* Chat Header */}
      <div className="bg-amber-600 text-white p-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium">Restaurant Assistant</h2>
          <p className="text-sm text-amber-100">Ask about our menu, place orders, or get recommendations</p>
        </div>
        <button 
          onClick={clearChat}
          className="p-2 hover:bg-amber-700 rounded-full transition-colors duration-200"
          aria-label="Clear chat"
        >
          <Trash2 size={18} />
        </button>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[75%] rounded-lg p-3 ${
                msg.sender === 'user' 
                  ? 'bg-amber-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 shadow-sm rounded-tl-none'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <span className="text-xs mt-1 block opacity-70">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        
        {isAiTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 shadow-sm rounded-lg rounded-tl-none max-w-[75%] p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-200">
        <div className="flex rounded-lg border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about our menu, delivery, or recommendations..."
            className="flex-grow px-4 py-2 focus:outline-none"
          />
          <button 
            type="submit"
            className={`px-4 bg-amber-600 text-white transition-colors duration-200 ${
              message.trim() === '' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amber-700'
            }`}
            disabled={message.trim() === ''}
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;