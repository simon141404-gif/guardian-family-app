# Shawon Haque - AI-Powered Personal Website

A modern, production-ready personal website featuring AI capabilities, stunning animations, and a comprehensive dashboard.

## ✨ Features

### Landing Page
- 🌟 Beautiful Hero Section with animated typing
- 🎨 Modern Glassmorphism Design
- 🌈 Aurora Background Effects
- 📱 Fully Responsive
- 🌙 Dark/Light Theme Support
- 🔗 Social Media Integration

### AI Features
- 🤖 AI Chat Assistant
- 🎨 AI Image Generation (Ready)
- 🔍 AI Search Engine (Ready)
- 📝 AI Writing Assistant (Ready)
- 🌐 AI Translation (Ready)
- 📄 AI Document Summarizer (Ready)
- 🔮 AI Resume Builder (Ready)
- 💻 AI Code Assistant (Ready)

### Dashboard
- 📊 Personal Dashboard
- 📄 Document Management
- 📅 Calendar Integration
- 📁 Project Management
- 🖼️ Gallery
- 💬 AI Chat
- 🔔 Notifications
- 📌 Bookmarks
- 🔐 Password Vault
- 🎵 Music Player
- 📱 QR Profile
- ⚙️ Settings

### Authentication
- 🔐 Firebase Authentication
- 📧 Email Login
- 🔵 Google Login
- 💻 GitHub Login
- 🔒 Secure Session Management

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion, GSAP
- **3D Graphics**: Three.js, React Three Fiber
- **Backend**: Firebase, Node.js
- **AI**: OpenAI GPT-4, Gemini API
- **Database**: Firestore, PostgreSQL
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase Account (for authentication)

### Installation

1. Clone the repository
```bash
git clone https://github.com/shawon-haque/shawon-haque.git
cd shawon-haque
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Add your Firebase and API credentials to `.env.local`

5. Run the development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
shawon-haque/
├── src/
│   ├── app/
│   │   ├── dashboard/      # Dashboard pages
│   │   ├── api/           # API routes
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Landing page
│   ├── components/        # React components
│   ├── lib/              # Utilities & configs
│   ├── styles/           # Additional styles
│   └── types/            # TypeScript types
├── public/               # Static assets
└── ...config files
```

## 🎨 Design System

### Colors
- Primary: `#6366f1` (Indigo)
- Secondary: `#ec4899` (Pink)
- Accent: `#22d3ee` (Cyan)
- Background: `#0a0a0f` (Dark)
- Glass: `rgba(255, 255, 255, 0.05)`

### Typography
- Font: Inter (Google Fonts)
- Weights: 300-900

## 🔒 Security

- JWT Authentication
- AES-256 Encryption
- Firebase Security Rules
- XSS Protection
- CSRF Protection
- Rate Limiting

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

Deploy to Vercel:

```bash
vercel
```

Or connect your GitHub repository for automatic deployments.

## 📄 License

MIT License - See LICENSE file for details.

---

Built with ❤️ by Shawon Haque
