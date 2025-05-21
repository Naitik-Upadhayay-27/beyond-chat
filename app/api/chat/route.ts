import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from 'next/server';

// Set the API version
const API_VERSION = 'v1'; // or 'v1beta' if needed



// Validate API key
const apiKey = process.env.GOOGLE_AI_API_KEY;
if (!apiKey) {
  console.error('GOOGLE_AI_API_KEY is not set in environment variables');
  // Log all available environment variables for debugging (excluding values for security)
  console.log('Available environment variables:', Object.keys(process.env));
}

// Initialize the Google Generative AI with your API key
let genAI: GoogleGenerativeAI | null = null;
try {
  if (apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
    console.log('Successfully initialized Gemini API');
  }
} catch (error) {
  console.error('Error initializing Gemini API:', error);
}

// Helper function to convert message history to Gemini API format
function prepareChatHistory(history: any[]) {
  if (!Array.isArray(history)) return [];
  
  return history
    .filter(item => item && (item.role || item.sender)) // Filter out invalid messages
    .map(item => {
      // Determine role
      const role = (item.role === 'model' || item.sender === 'assistant') ? 'model' : 'user';
      
      // Extract content
      let content = '';
      if (typeof item.content === 'string') {
        content = item.content;
      } else if (Array.isArray(item.parts) && item.parts.length > 0) {
        content = item.parts[0]?.text || '';
      } else if (typeof item.parts === 'string') {
        content = item.parts;
      }
      
      // Format for Gemini API
      return {
        role,
        parts: [{
          text: content
        }]
      };
    });
}

export async function POST(req: NextRequest) {
  try {
    if (!genAI) {
      console.error('Gemini API is not properly configured');
      return NextResponse.json(
        { error: 'Chat service is not configured properly' },
        { status: 500 }
      );
    }

    const { message, history = [] } = await req.json();
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }
    
    try {
      // Try to use the chat model (gemini-2.0-flash is the standard chat model)
      const modelName = 'gemini-2.0-flash';
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        generationConfig: {
          temperature: 0.9,
          topP: 1,
          topK: 40,
          maxOutputTokens: 2048,
        },
      });
      
      console.log('Using model:', modelName);
      
      // Prepare chat history
      const chatHistory = prepareChatHistory(history);
      
      // For debugging
      console.log('Chat history:', JSON.stringify(chatHistory, null, 2));
      console.log('New message:', message);
      
      // Start a chat session with history
      const chat = model.startChat({
        history: chatHistory,
      });
      
      // Send the message and get the response
      const result = await chat.sendMessage(message);
      const response = await result.response;
      const text = response.text();
      
      console.log('Generated response:', text);
      
      if (!text) {
        throw new Error('No response text received from the model');
      }
      
      return NextResponse.json({ text });
      
    } catch (error: any) {
      console.error('Error in chat generation:', error);
      let errorMessage = 'Failed to generate response';
      let statusCode = 500;
      
      if (error.message) {
        errorMessage = error.message;
        // Handle specific error cases
        if (error.message.includes('model not found')) {
          errorMessage = 'The requested AI model is not available. Please try again later.';
          statusCode = 503; // Service Unavailable
        } else if (error.message.includes('API key')) {
          errorMessage = 'Invalid or missing API key';
          statusCode = 401; // Unauthorized
        }
      }
      
      return NextResponse.json(
        { 
          error: errorMessage,
          details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        },
        { status: statusCode }
      );
    }
    
  } catch (error: any) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
