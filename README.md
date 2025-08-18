# enKod Hook - AI Image Generation Platform

A modern, feature-rich AI image generation web application built with React, Vite, and multiple AI providers. Create stunning images with advanced controls and a beautiful dark-themed interface.

## ✨ Features

### 🎨 **AI Image Generation**

- **Multiple AI Providers**: OpenAI DALL-E, Stability AI, Replicate
- **Advanced Controls**: Model selection, size options, quality settings
- **Negative Prompts**: Specify what you don't want in your images
- **Real-time Generation**: Live feedback and progress indicators

### 🎯 **User Experience**

- **Modern Dark Theme**: Sophisticated purple/blue color scheme
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Image Gallery**: View and manage all generated images
- **Fullscreen Mode**: Immersive image viewing experience
- **Download Support**: Save images directly to your device

### 🚀 **Advanced Features**

- **Prompt Templates**: Pre-built templates for inspiration
- **Generation History**: Track and retry previous generations
- **Credit System**: Manage your AI usage
- **Error Handling**: Graceful error recovery and retry options
- **Loading States**: Beautiful animations and progress indicators

### 🛠 **Technical Features**

- **Real AI Integration**: Connect to actual AI APIs
- **Fallback Mode**: Demo mode when no API keys are configured
- **Performance Optimized**: Fast loading and smooth interactions
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- AI API keys (optional for demo mode)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd enkodHook
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure API keys** (optional)

   ```bash
   cp env.example .env
   ```

   Edit `.env` and add your API keys:

   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_STABILITY_API_KEY=your_stability_api_key_here
   VITE_REPLICATE_API_KEY=your_replicate_api_key_here
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### AI Provider Setup

#### OpenAI (DALL-E)

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add to `.env`: `VITE_OPENAI_API_KEY=your_key_here`
3. Available models: DALL-E 3, DALL-E 2

#### Stability AI

1. Get your API key from [Stability AI](https://platform.stability.ai/)
2. Add to `.env`: `VITE_STABILITY_API_KEY=your_key_here`
3. Available models: Stable Diffusion XL, Stable Diffusion v1.6

#### Replicate

1. Get your API key from [Replicate](https://replicate.com/)
2. Add to `.env`: `VITE_REPLICATE_API_KEY=your_key_here`
3. Available models: SDXL, Midjourney, Kandinsky

### Environment Variables

| Variable                 | Description          | Default     |
| ------------------------ | -------------------- | ----------- |
| `VITE_OPENAI_API_KEY`    | OpenAI API key       | -           |
| `VITE_STABILITY_API_KEY` | Stability AI API key | -           |
| `VITE_REPLICATE_API_KEY` | Replicate API key    | -           |
| `VITE_DEFAULT_PROVIDER`  | Default AI provider  | `openai`    |
| `VITE_DEFAULT_MODEL`     | Default model        | `dall-e-3`  |
| `VITE_DEFAULT_SIZE`      | Default image size   | `1024x1024` |

## 📱 Usage

### Basic Image Generation

1. **Enter a prompt** describing the image you want
2. **Select AI provider** and model
3. **Choose image size** and quality settings
4. **Click "Generate Image"**
5. **Download** or view in fullscreen

### Advanced Features

- **Negative Prompts**: Add what you don't want in the image
- **Prompt Templates**: Use pre-built templates for inspiration
- **Image Gallery**: Switch between single view and gallery mode
- **Generation History**: Retry previous generations

### Keyboard Shortcuts

- `Ctrl/Cmd + Enter`: Generate image
- `Escape`: Close modals
- `Arrow Keys`: Navigate between images (in single view)

## 🎨 Customization

### Theme Colors

Edit the CSS custom properties in `src/layouts/Layout.jsx`:

```css
:root {
  --bg-primary: #1a0e27ff;
  --bg-secondary: #614b4bff;
  --bg-tertiary: #0c553fff;
  --border-color: #661414ff;
  --text-primary: #c4c4c4ff;
  --text-secondary: #777777ff;
  --text-tertiary: #5a5a5aff;
  --accent-primary: #321b55ff;
  --accent-secondary: #407fa7ff;
}
```

### Adding New AI Providers

1. Add provider to `AI_PROVIDERS` in `src/integrations/Core.js`
2. Implement generation function
3. Add to `GenerateImage` switch statement
4. Update utility functions for models/sizes

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Select, etc.)
│   ├── Canvas.jsx      # Image display and gallery
│   ├── ControlPanel.jsx # Generation controls
│   └── Sidebar.jsx     # Navigation sidebar
├── integrations/       # AI provider integrations
│   └── Core.js         # Main AI generation logic
├── layouts/            # Layout components
│   ├── Header.jsx      # Top navigation
│   └── Layout.jsx      # Main layout wrapper
├── pages/              # Page components
│   └── GeneratorPage.jsx # Main generation page
└── App.jsx             # Root component
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Deploy to Netlify

1. Connect your repository to Netlify
2. Add environment variables in Netlify dashboard
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add feature'`
6. Push: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for DALL-E
- [Stability AI](https://stability.ai/) for Stable Diffusion
- [Replicate](https://replicate.com/) for model hosting
- [Lucide React](https://lucide.dev/) for icons
- [Vite](https://vitejs.dev/) for build tooling

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include your environment and steps to reproduce

---

**Made with ❤️ by the enKod Hook team**
