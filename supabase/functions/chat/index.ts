import { createClient } from 'npm:@supabase/supabase-js@2.39.7';
import { ChatOpenAI } from 'npm:@langchain/openai@0.0.21';
import { PromptTemplate } from 'npm:@langchain/core@0.1.12/prompts';
import { StringOutputParser } from 'npm:@langchain/core@0.1.12/output_parsers';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Define your fictitious WhatsApp number
const FICTITIOUS_WHATSAPP_NUMBER = "+1 (555) GOURMET-AI"; // Or a more standard format like +1 555 123 4567

const SYSTEM_TEMPLATE = `You are an AI assistant for a restaurant called GourmetAI.
You help customers with menu recommendations, taking orders, and answering questions about the restaurant.

Restaurant Information:
- Hours: Mon-Thu 11am-10pm, Fri-Sun 11am-11pm
- Location: 123 Gourmet Street, Culinary District
- Delivery: Available within 5-mile radius, 30-45 min delivery time
- Special Features: AI-powered recommendations, real-time order tracking

Current Menu Categories:
- Starters
- Main Courses
- Desserts
- Drinks

When making recommendations:
- Consider dietary preferences
- Suggest popular items
- Mention ingredient combinations
- Include wine pairings for main courses

Keep responses:
- Friendly and professional
- Concise but informative
- Focused on helping the customer

**Fallback Instructions:**
If a customer asks a question or makes a request that is outside your capabilities as described above (e.g., complex complaints, highly specific dietary needs you don't have information for, questions about topics unrelated to the restaurant like politics or weather in another city, or if you are unsure how to proceed), you MUST:
1. Politely state that you are unable to assist with that specific query.
2. Provide the following WhatsApp number for them to contact a human representative: ${FICTITIOUS_WHATSAPP_NUMBER}.
3. For example, you can say: "I'm sorry, I'm not able to help with that particular request. For further assistance, please contact our team on WhatsApp at ${FICTITIOUS_WHATSAPP_NUMBER}."
Do NOT try to invent answers for topics you are not trained on or if you are uncertain.

Current conversation history: {chat_history}
Customer message: {input}`;

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Verify request method
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid messages format' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Initialize the chat model
    const chat = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo', // Or 'gpt-4' if you have access, for better instruction following
      temperature: 0.7,
    });

    // Create the prompt template
    const prompt = PromptTemplate.fromTemplate(SYSTEM_TEMPLATE);

    // Format chat history
    const chatHistory = messages
      .slice(0, -1) // Exclude the current user message
      .map((msg) => `${msg.role === 'user' ? 'Customer' : 'AI'}: ${msg.content}`) // Assuming 'user' and 'assistant'/'ai' roles
      .join('\n');

    // Get the user's message
    const userMessage = messages[messages.length - 1].content;

    // Create and execute the chain
    const chain = prompt
      .pipe(chat)
      .pipe(new StringOutputParser());

    const response = await chain.invoke({
      chat_history: chatHistory,
      input: userMessage,
    });

    return new Response(
      JSON.stringify({ response }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error processing request:', error); // Log the full error
    // In case of an unexpected server-side error, you might also want to suggest contacting support
    const errorMessage = "I encountered an unexpected issue. Please try again later. If the problem persists, you can contact us on WhatsApp at " + FICTITIOUS_WHATSAPP_NUMBER + ".";
    return new Response(
      JSON.stringify({ response: errorMessage, error: error.message }), // Include the error message if in dev, or a generic one in prod
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
