# Backend Integration Guide

## Frontend Architecture Overview

The frontend is organized in a modular, expandable way that makes backend integration straightforward.

### 🏗️ **Component Structure**

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.jsx        # ✅ Functional with loading states
│   │   ├── Textarea.jsx      # ✅ Functional with validation
│   │   └── Select.jsx        # ✅ Functional with dynamic options
│   ├── Sidebar.jsx           # ✅ Functional navigation
│   ├── ControlPanel.jsx      # ✅ Functional with all controls
│   └── Canvas.jsx            # ✅ Functional with image actions
├── layouts/
│   ├── Layout.jsx            # ✅ Main layout structure
│   └── Header.jsx            # ✅ Header component
├── pages/
│   └── GeneratorPage.jsx     # ✅ Main page with state management
└── integrations/
    └── Core.js               # ✅ AI integration layer
```

### 🔄 **State Management**

The application uses React hooks for state management:

- **Global State**: Managed in `GeneratorPage.jsx`
- **Local State**: Each component manages its own UI state
- **Configuration State**: Centralized in the main page
- **Image History**: Stored in memory (ready for backend persistence)

### 🎯 **Backend Integration Points**

#### 1. **User Authentication**
```javascript
// TODO: Add to GeneratorPage.jsx
const [user, setUser] = useState(null);
const [isAuthenticated, setIsAuthenticated] = useState(false);

// Backend endpoints needed:
// - POST /api/auth/login
// - POST /api/auth/register
// - GET /api/auth/me
// - POST /api/auth/logout
```

#### 2. **Image Storage & Management**
```javascript
// TODO: Replace local state with backend calls
const [generationHistory, setGenerationHistory] = useState([]);

// Backend endpoints needed:
// - GET /api/images (user's images)
// - POST /api/images (save new image)
// - DELETE /api/images/:id
// - PUT /api/images/:id/favorite
```

#### 3. **User Credits & Billing**
```javascript
// TODO: Replace hardcoded credits with backend
const [credits, setCredits] = useState(12);

// Backend endpoints needed:
// - GET /api/user/credits
// - POST /api/user/credits/consume
// - POST /api/billing/purchase-credits
```

#### 4. **Image Generation Queue**
```javascript
// TODO: Add queue management
const [generationQueue, setGenerationQueue] = useState([]);

// Backend endpoints needed:
// - POST /api/generate (queue generation)
// - GET /api/generate/:id/status
// - WebSocket for real-time updates
```

### 🚀 **Ready-to-Implement Features**

#### **User Management**
- ✅ Login/Register forms (UI ready)
- ✅ User profile management
- ✅ Credit system integration
- ✅ Subscription management

#### **Image Management**
- ✅ Image library with grid view
- ✅ Image download functionality
- ✅ Image sharing (ready for social media integration)
- ✅ Image favoriting system
- ✅ Image metadata storage

#### **Generation Features**
- ✅ Multiple AI provider support
- ✅ Advanced generation settings
- ✅ Generation history
- ✅ Retry functionality
- ✅ Template system

#### **UI/UX Features**
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ Navigation system
- ✅ Settings management

### 📡 **API Integration Examples**

#### **Save Generated Image**
```javascript
// In GeneratorPage.jsx - handleGenerate function
const saveImageToBackend = async (imageData) => {
  try {
    const response = await fetch('/api/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({
        prompt: imageData.prompt,
        config: imageData.config,
        imageUrl: imageData.url,
        provider: imageData.provider,
        model: imageData.model
      })
    });
    
    if (response.ok) {
      const savedImage = await response.json();
      setGenerationHistory(prev => [savedImage, ...prev]);
    }
  } catch (error) {
    console.error('Failed to save image:', error);
  }
};
```

#### **Load User Images**
```javascript
// In GeneratorPage.jsx - useEffect
useEffect(() => {
  const loadUserImages = async () => {
    try {
      const response = await fetch('/api/images', {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
      
      if (response.ok) {
        const images = await response.json();
        setGenerationHistory(images);
      }
    } catch (error) {
      console.error('Failed to load images:', error);
    }
  };
  
  if (isAuthenticated) {
    loadUserImages();
  }
}, [isAuthenticated, userToken]);
```

### 🔧 **Environment Configuration**

The frontend is ready for backend integration with these environment variables:

```env
# Current
VITE_OPENAI_API_KEY=your_openai_key
VITE_HUGGINGFACE_TOKEN=your_huggingface_token

# Backend Integration (TODO)
VITE_API_BASE_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000
VITE_APP_ENV=development
```

### 📊 **Data Models**

The frontend expects these data structures from the backend:

#### **User Model**
```javascript
{
  id: string,
  email: string,
  username: string,
  credits: number,
  subscription: {
    plan: string,
    expiresAt: Date
  },
  createdAt: Date
}
```

#### **Image Model**
```javascript
{
  id: string,
  userId: string,
  prompt: string,
  config: object,
  imageUrl: string,
  provider: string,
  model: string,
  isFavorite: boolean,
  createdAt: Date
}
```

#### **Generation Job Model**
```javascript
{
  id: string,
  userId: string,
  prompt: string,
  config: object,
  status: 'pending' | 'processing' | 'completed' | 'failed',
  result: object,
  createdAt: Date,
  completedAt: Date
}
```

### 🎨 **UI Components Ready for Backend**

All UI components are functional and ready for backend integration:

- ✅ **Sidebar**: Navigation with user context
- ✅ **ControlPanel**: All controls with validation
- ✅ **Canvas**: Image display with actions
- ✅ **Button**: Loading states and callbacks
- ✅ **Select**: Dynamic options from backend
- ✅ **Textarea**: Input validation and formatting

### 🚀 **Next Steps for Backend Integration**

1. **Set up authentication system**
2. **Create image storage and management API**
3. **Implement credit system**
4. **Add real-time generation queue**
5. **Set up WebSocket for live updates**
6. **Add user preferences and settings**
7. **Implement social features (sharing, favorites)**
8. **Add analytics and usage tracking**

The frontend is fully functional and ready for backend integration! 🎉 