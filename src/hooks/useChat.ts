import { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';

export const useChat = () => {
  const { 
    addMessage, 
    chatMessages, 
    clearChat
  } = useAppContext();
  const [isAiTyping, setIsAiTyping] = useState(false);

  const processUserMessage = useCallback(async (message: string) => {
    // Add user message to chat
    addMessage(message, 'user');
    setIsAiTyping(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          messages: chatMessages.concat({
            id: 'temp',
            content: message,
            sender: 'user',
            timestamp: new Date()
          })
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      addMessage(data.response, 'ai');
    } catch (error) {
      console.error('Error processing message:', error);
      addMessage('I apologize, but I\'m having trouble processing your request right now. Please try again later.', 'ai');
    } finally {
      setIsAiTyping(false);
    }
  }, [addMessage, chatMessages]);

  return {
    chatMessages,
    processUserMessage,
    isAiTyping,
    clearChat
  };
};