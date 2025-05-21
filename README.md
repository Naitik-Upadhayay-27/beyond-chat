# Intercom Admin Panel Clone with AI Chat

A Next.js replica of Intercom's AI-powered admin panel with modern UI/UX, full responsiveness, and AI chat capabilities powered by Google's Gemini API.

## 🧱 Tech Stack

- **Framework**: Next.js (App Router)
- **AI Integration**: Google Gemini API
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Icons**: Lucide-react
- **State Management**: React Hooks + Custom Hooks
- **Real-time Chat**: WebSockets for real-time messaging
- **Charts**: Recharts (for dashboard metrics)

## 🚀 Features

- **Modern UI**: Clean, responsive interface with Intercom-style design
- **Dashboard**: Overview with key metrics and activity feed
- **Chat Interface**: 
  - Conversation list with filtering and search
  - Real-time chat window with AI suggestions
  - User info sidebar with detailed customer information
- **User Management**: View and manage customer data
- **Settings**: Configure notifications and app preferences
- **Dark Mode**: Full support for light/dark themes
- **Responsive Design**: Works on mobile, tablet, and desktop

## 📱 Screenshots

![Dashboard](https://via.placeholder.com/800x450.png?text=Intercom+Dashboard)
![Chat Interface](https://via.placeholder.com/800x450.png?text=Intercom+Chat+Interface)

## 🧪 How to Run Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your Google Gemini API key:
     ```
     GOOGLE_AI_API_KEY=your_api_key_here
     ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔑 Getting a Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env.local` file

## ✨ AI Chat Features

- **Real-time AI Responses**: Get instant responses from the AI assistant
- **Conversation History**: View and continue previous conversations
- **Smart Suggestions**: Quick reply suggestions for common queries
- **Context-Aware**: The AI maintains conversation context
- **Typing Indicators**: Visual feedback when the AI is generating a response
- **Error Handling**: Graceful handling of API errors and timeouts

## 🛠️ Development

Key files and directories:
- `app/api/chat/route.ts` - API route for handling chat completions
- `lib/useChat.ts` - Custom hook for managing chat state and API calls
- `components/shared/ChatWindow.tsx` - Main chat interface component
- `components/shared/ChatList.tsx` - Conversation list component
- `components/shared/DraggableConversation.tsx` - Individual conversation item component

## 📁 Project Structure

```
/app
  /dashboard
    /components - Dashboard-specific components
    /chat - Chat interface
    /users - User management
    /settings - App settings
  layout.tsx - Root layout
  page.tsx - Main page (redirects to dashboard)
/components
  /shared - Shared components like Sidebar, Header
  /ui - UI components
/lib - Utility functions
/public - Static assets
/styles - Global CSS
```

## 📋 Known Issues & Future Improvements

- Currently using dummy data; could be connected to a real backend
- Add authentication with Clerk/Auth.js
- Implement real-time chat functionality
- Add more interactive charts and analytics
- Improve mobile navigation experience

## 🧑‍💻 Development

This project uses:
- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for styling
- Next.js App Router for routing

## 📄 License

MIT
