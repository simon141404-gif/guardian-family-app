'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, Linkedin, Twitter, Mail, ExternalLink, Bot, ChevronDown, Menu as MenuIcon, X,
  FileText, Calendar, FolderKanban, Image, MessageSquare, Bell, Bookmark, Lock,
  LayoutDashboard, Music, QrCode, Search, Send, TrendingUp, User, Rocket, Sparkle,
  LogIn, LogOut, UserPlus, Eye, EyeOff, Check, AlertCircle, Loader2, Copy, Clock, Plus, Trash2, Download, CalendarDays, Target, Zap, Folder
} from 'lucide-react';

// Types
interface ChatMessage { id: string; role: 'user' | 'assistant'; content: string; timestamp: Date; }
interface Task { id: number; title: string; priority: 'high' | 'medium' | 'low'; completed: boolean; }
interface Project { id: number; title: string; progress: number; status: string; }
interface Event { id: number; title: string; date: string; time: string; type: string; }
interface Document { id: number; title: string; type: string; size: string; }
interface Bookmark { id: number; title: string; url: string; category: string; }
interface Password { id: number; site: string; username: string; password: string; }
interface Notification { id: number; title: string; message: string; time: string; read: boolean; }

// Modal Component
function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl backdrop-blur-xl" style={{background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(148, 163, 184, 0.2)'}} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 backdrop-blur-xl" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8))'}}>
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <button onClick={onClose} className="p-2 rounded-lg" style={{background: 'rgba(255,255,255,0.2)'}}><X size={20} className="text-white" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// SMART AI CHATBOT - Contextual Responses
function SmartChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'assistant', content: "👋 Hi! I'm your AI assistant. I can help you with coding, design, web development, AI, and much more! Ask me anything!", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const generateSmartResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // React related
    if (input.includes('react') && (input.includes('hook') || input.includes('state'))) {
      return "🔹 React Hooks Tips:\n\n• useState - For local state\n• useEffect - For side effects\n• useCallback - Memoize functions\n• useMemo - Memoize values\n• useRef - Access DOM or persist values\n\nExample:\n```jsx\nconst [count, setCount] = useState(0);\n```\n\nNeed more details?";
    }
    
    if (input.includes('react') || input.includes('nextjs') || input.includes('next.js')) {
      return "⚛️ React/Next.js Development:\n\n📌 Key Points:\n• React uses components & props\n• Next.js provides SSR & routing\n• App Router is the new standard\n• Server Components reduce bundle size\n• Use 'use client' for interactivity\n\n🎯 Best Practices:\n1. Keep components small\n2. Use TypeScript\n3. Follow file conventions\n4. Optimize images with next/image\n\nWhat specific aspect would you like to explore?";
    }
    
    // Python/AI related
    if (input.includes('python') && input.includes('ai')) {
      return "🐍 Python for AI/ML:\n\n📚 Best Libraries:\n• TensorFlow - Deep learning\n• PyTorch - Research & production\n• Scikit-learn - Classical ML\n• Pandas - Data manipulation\n• NumPy - Numerical computing\n\n🚀 Quick Start:\n```python\nimport tensorflow as tf\nmodel = tf.keras.Sequential()\n```\n\nWhich framework interests you most?";
    }
    
    if (input.includes('ai') || input.includes('chatgpt') || input.includes('gpt') || input.includes('machine learning')) {
      return "🤖 AI & Machine Learning:\n\n📊 Popular AI Tools:\n• ChatGPT - Conversational AI\n• DALL-E - Image generation\n• Claude - Advanced reasoning\n• Midjourney - Art creation\n• Stable Diffusion - Open source images\n\n💡 Key Concepts:\n• Prompt Engineering\n• Fine-tuning Models\n• RAG (Retrieval Augmented Gen)\n• Transfer Learning\n\nWant to build an AI project? I can help!";
    }
    
    // Web Development
    if (input.includes('frontend') || input.includes('web') && (input.includes('dev') || input.includes('build'))) {
      return "🌐 Frontend Development:\n\n🎨 Modern Stack:\n• React / Vue / Svelte\n• Tailwind CSS for styling\n• Next.js for SSR\n• TypeScript for type safety\n\n📦 Essential Tools:\n• npm / yarn / pnpm\n• Vite for fast builds\n• ESLint for code quality\n• Prettier for formatting\n\nWould you like a code example?";
    }
    
    // Backend
    if (input.includes('backend') || input.includes('api') || input.includes('server')) {
      return "⚙️ Backend Development:\n\n🔥 Popular Frameworks:\n• Node.js + Express\n• Python + FastAPI\n• Go + Gin\n• Rust + Actix\n\n📊 Databases:\n• PostgreSQL - Relational\n• MongoDB - Document\n• Redis - Cache\n• Firebase - BaaS\n\n🔐 REST API Best Practices:\n1. Use proper HTTP methods\n2. Implement authentication\n3. Handle errors gracefully\n4. Version your API\n\nNeed help with a specific backend task?";
    }
    
    // Design/UI
    if (input.includes('design') || input.includes('ui') || input.includes('ux') || input.includes('figma')) {
      return "🎨 UI/UX Design:\n\n✨ Design Principles:\n• Consistency is key\n• Use whitespace wisely\n• Contrast for readability\n• Hierarchy guides users\n\n🛠️ Popular Tools:\n• Figma - Design & prototype\n• Framer - Interactive designs\n• Tailwind - Utility CSS\n• Radix - Accessible components\n\n📱 Design Trends:\n• Glassmorphism (frosted glass)\n• Gradients & soft colors\n• Minimal animations\n• Dark mode support\n\nWant design feedback?";
    }
    
    // Mobile
    if (input.includes('mobile') || input.includes('app') || input.includes('android') || input.includes('ios')) {
      return "📱 Mobile App Development:\n\n🔧 Cross-Platform:\n• React Native - JavaScript\n• Flutter - Dart\n• Kotlin Multiplatform - Kotlin\n\n🍎 iOS:\n• SwiftUI\n• UIKit\n\n🤖 Android:\n• Jetpack Compose\n• Kotlin\n\n📲 App Ideas:\n• AI Assistant app\n• Health & fitness tracker\n• Social media tool\n• Productivity app\n\nWhat kind of mobile app would you like to build?";
    }
    
    // Career
    if (input.includes('career') || input.includes('job') || input.includes('interview') || input.includes('resume')) {
      return "💼 Career Advice:\n\n📋 To Land a Great Job:\n1. Build a strong portfolio\n2. Contribute to open source\n3. Practice DSA & System Design\n4. Prepare behavioral questions\n\n🎯 Skills to Focus:\n• Full-stack development\n• Cloud platforms (AWS/GCP)\n• AI/ML basics\n• Soft skills\n\n📚 Learning Path:\n1. HTML/CSS/JavaScript\n2. React or Vue\n3. Backend (Node/Python)\n4. Database & DevOps\n\nWhere are you in your journey?";
    }
    
    // Help
    if (input.includes('help') || input.includes('how') || input.includes('what')) {
      return "I can help you with:\n\n💻 **Coding & Development**\n• React, Vue, Angular\n• Node.js, Python, Go\n• APIs & Databases\n• DevOps & Cloud\n\n🎨 **Design**\n• UI/UX principles\n• Figma design\n• CSS & animations\n• Responsive design\n\n🤖 **AI & ML**\n• Machine learning\n• AI integration\n• Prompt engineering\n• Data science\n\n💼 **Career**\n• Job preparation\n• Portfolio building\n• Interview prep\n• Skill development\n\nWhat would you like to explore?";
    }
    
    // Greeting
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "👋 Hello! Great to meet you!\n\nI'm your AI assistant. I can help with:\n\n• 💻 Coding questions\n• 🎨 Design advice\n• 🤖 AI/ML topics\n• 💼 Career guidance\n• 📱 App development\n\nWhat would you like to know about today?";
    }
    
    // Thanks
    if (input.includes('thank') || input.includes('thanks')) {
      return "You're welcome! 😊\n\nI'm always here to help. Feel free to ask:\n\n• More coding questions\n• Design tips\n• AI concepts\n• Career advice\n• Anything else!\n\nWhat else can I help you with?";
    }
    
    // Default smart response
    const topics = [
      "That's an interesting topic! Could you tell me more about what you're trying to achieve?",
      "Great question! Let me break that down for you step by step.",
      "I'd be happy to help with that. Here's what I recommend:",
      "That's a broad topic. Let me give you the key points:",
      "Interesting! Here's my perspective on that:"
    ];
    
    return `${topics[Math.floor(Math.random() * topics.length)]}\n\nBased on your question about "${userInput.substring(0, 50)}${userInput.length > 50 ? '...' : ''}", I suggest:\n\n1️⃣ Research the fundamentals\n2️⃣ Start with a simple example\n3️⃣ Practice with small projects\n4️⃣ Join communities for help\n\nWould you like me to elaborate on any specific part?`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1500));
    const response = generateSmartResponse(input);
    const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: response, timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <div className="space-y-4">
      <div className="h-80 overflow-y-auto space-y-3 pr-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'text-white' : ''}`} style={msg.role === 'user' ? {background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'} : {background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
              <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl" style={{background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full animate-bounce" style={{background: 'rgba(99, 102, 241, 0.8)', animationDelay: '0ms'}} />
                <span className="w-2 h-2 rounded-full animate-bounce" style={{background: 'rgba(99, 102, 241, 0.8)', animationDelay: '150ms'}} />
                <span className="w-2 h-2 rounded-full animate-bounce" style={{background: 'rgba(99, 102, 241, 0.8)', animationDelay: '300ms'}} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask me anything..." className="flex-1 px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} />
        <button onClick={handleSend} disabled={!input.trim() || isTyping} className="px-6 py-3 rounded-xl font-semibold text-white backdrop-blur-xl" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}><Send size={20} /></button>
      </div>
    </div>
  );
}

// Tasks Manager
function TasksManager() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Complete API integration', priority: 'high', completed: false },
    { id: 2, title: 'Design review meeting', priority: 'medium', completed: false },
    { id: 3, title: 'Update documentation', priority: 'low', completed: true },
    { id: 4, title: 'Deploy to production', priority: 'high', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([{ id: Date.now(), title: newTask, priority: 'medium', completed: false }, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id: number) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const deleteTask = (id: number) => setTasks(tasks.filter(t => t.id !== id));

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input value={newTask} onChange={(e) => setNewTask(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addTask()} placeholder="Add new task..." className="flex-1 px-4 py-3 rounded-xl text-white placeholder-gray-400 backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} />
        <button onClick={addTask} className="px-6 py-3 rounded-xl font-semibold text-white backdrop-blur-xl" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}><Plus size={20} /></button>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-4 p-4 rounded-xl backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
            <button onClick={() => toggleTask(task.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-gray-500'}`}>
              {task.completed && <Check size={14} className="text-white" />}
            </button>
            <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${task.priority === 'high' ? 'bg-red-500/20 text-red-400' : task.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>{task.priority}</span>
            <button onClick={() => deleteTask(task.id)} className="p-2 hover:bg-red-500/20 rounded-lg" style={{color: '#ef4444'}}><Trash2 size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Projects Manager
function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, title: 'Website Redesign', progress: 75, status: 'active' },
    { id: 2, title: 'Mobile App', progress: 45, status: 'active' },
    { id: 3, title: 'API Integration', progress: 100, status: 'completed' },
  ]);
  const [newProject, setNewProject] = useState('');

  const addProject = () => {
    if (!newProject.trim()) return;
    setProjects([{ id: Date.now(), title: newProject, progress: 0, status: 'active' }, ...projects]);
    setNewProject('');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input value={newProject} onChange={(e) => setNewProject(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addProject()} placeholder="New project..." className="flex-1 px-4 py-3 rounded-xl text-white placeholder-gray-400 backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} />
        <button onClick={addProject} className="px-6 py-3 rounded-xl font-semibold text-white backdrop-blur-xl" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}><Plus size={20} /></button>
      </div>
      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p.id} className="p-6 rounded-xl backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">{p.title}</h4>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${p.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>{p.status}</span>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1"><span className="text-gray-400">Progress</span><span style={{color: 'rgba(99, 102, 241, 0.9)'}}>{p.progress}%</span></div>
              <div className="h-2 rounded-full backdrop-blur-xl" style={{background: 'rgba(148, 163, 184, 0.2)'}}><motion.div initial={{ width: 0 }} animate={{ width: `${p.progress}%` }} className="h-full rounded-full" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Calendar Manager
function CalendarManager() {
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: 'Team Meeting', date: 'Dec 20', time: '10:00 AM', type: 'meeting' },
    { id: 2, title: 'Project Deadline', date: 'Dec 25', time: '11:59 PM', type: 'deadline' },
    { id: 3, title: 'Code Review', date: 'Dec 18', time: '2:00 PM', type: 'meeting' },
  ]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '' });

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) return;
    setEvents([...events, { id: Date.now(), ...newEvent, type: 'meeting' }]);
    setNewEvent({ title: '', date: '', time: '' });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="Event title..." className="px-4 py-3 rounded-xl text-white placeholder-gray-400 backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} />
        <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className="px-4 py-3 rounded-xl text-white backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} />
      </div>
      <button onClick={addEvent} className="w-full py-3 rounded-xl font-semibold text-white backdrop-blur-xl" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}><Plus size={16} className="inline mr-2" /> Add Event</button>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {events.map((event) => (
          <div key={event.id} className="flex items-center gap-4 p-4 rounded-xl backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}><CalendarDays className="w-6 h-6 text-white" /></div>
            <div className="flex-1"><h4 className="font-medium">{event.title}</h4><p className="text-xs text-gray-400">{event.date} at {event.time}</p></div>
            <button onClick={() => setEvents(events.filter(e => e.id !== event.id))} className="p-2" style={{color: '#ef4444'}}><Trash2 size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Component
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => { const timer = setInterval(() => setCurrentTime(new Date()), 1000); return () => clearInterval(timer); }, []);
  useEffect(() => { const interval = setInterval(() => setTitleIndex((prev) => (prev + 1) % ['AI Engineer', 'Full Stack Developer', 'UI/UX Designer', 'Problem Solver'].length), 3000); return () => clearInterval(interval); }, []);
  useEffect(() => { let currentIndex = 0; const currentTitle = ['AI Engineer', 'Full Stack Developer', 'UI/UX Designer', 'Problem Solver'][titleIndex]; setTypedText(''); const typeInterval = setInterval(() => { if (currentIndex <= currentTitle.length) { setTypedText(currentTitle.slice(0, currentIndex)); currentIndex++; } else clearInterval(typeInterval); }, 80); return () => clearInterval(typeInterval); }, [titleIndex]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginForm.email)) { setAuthError('Enter valid email'); return; }
    if (loginForm.password.length < 6) { setAuthError('Password min 6 chars'); return; }
    setAuthLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setShowChat(true); // Open chat after login
    setAuthLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!signupForm.name.trim()) { setAuthError('Enter name'); return; }
    if (!emailRegex.test(signupForm.email)) { setAuthError('Enter valid email'); return; }
    if (signupForm.password.length < 6) { setAuthError('Password min 6 chars'); return; }
    setAuthLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsLoggedIn(true);
    setShowSignupModal(false);
    setShowChat(true); // Open chat after signup
    setAuthLoading(false);
  };

  const modalTitles: Record<string, string> = {
    'tasks': '✅ Tasks Manager',
    'projects': '📁 Projects',
    'calendar': '📅 Calendar',
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'tasks': return <TasksManager />;
      case 'projects': return <ProjectsManager />;
      case 'calendar': return <CalendarManager />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)'}}>
      {/* Animated Background */}
      <div className="fixed inset-0 z-[-1]">
        <motion.div animate={{ x: [0, 100, 0], y: [0, -50, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute w-[600px] h-[600px] rounded-full" style={{background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', top: '10%', left: '10%'}} />
        <motion.div animate={{ x: [0, -100, 0], y: [0, 50, 0] }} transition={{ duration: 15, repeat: Infinity }} className="absolute w-[500px] h-[500px] rounded-full" style={{background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)', top: '50%', right: '10%'}} />
        <motion.div animate={{ x: [0, 50, 0], y: [0, 100, 0] }} transition={{ duration: 25, repeat: Infinity }} className="absolute w-[400px] h-[400px] rounded-full" style={{background: 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%)', bottom: '10%', left: '30%'}} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl" style={{background: 'rgba(15, 23, 42, 0.8)', borderBottom: '1px solid rgba(148, 163, 184, 0.1)'}}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-xl font-bold cursor-pointer" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Shawon Haque
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Projects', 'Dashboard', 'Blog', 'Contact'].map((item, i) => (
                <motion.a key={item} href={`#${item.toLowerCase()}`} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
                    <span>👤</span>
                    <span className="text-sm text-gray-300">Shawon</span>
                  </div>
                  <button onClick={() => { setIsLoggedIn(false); setShowChat(false); }} className="p-2 rounded-lg backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}><LogOut size={20} /></button>
                </div>
              ) : (
                <>
                  <button onClick={() => setShowLoginModal(true)} className="hidden sm:block text-sm font-medium text-gray-300 hover:text-white">Sign In</button>
                  <button onClick={() => setShowSignupModal(true)} className="px-4 py-2 rounded-lg text-sm font-semibold text-white backdrop-blur-xl" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}>Sign Up</button>
                </>
              )}
              <button onClick={() => setShowChat(!showChat)} className="p-2 rounded-lg backdrop-blur-xl relative" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
                <Bot size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse" style={{background: '#ec4899'}} />
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}><MenuIcon size={24} /></button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden" style={{background: 'rgba(15, 23, 42, 0.95)', borderTop: '1px solid rgba(148, 163, 184, 0.1)'}}>
              <div className="px-4 py-4 space-y-2">
                {['Home', 'About', 'Projects', 'Dashboard', 'Blog', 'Contact'].map((item) => (<a key={item} href={`#${item.toLowerCase()}`} className="block px-4 py-2 rounded-lg text-gray-300 backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.4)'}} onClick={() => setIsMenuOpen(false)}>{item}</a>))}
                {!isLoggedIn && <button onClick={() => { setIsMenuOpen(false); setShowLoginModal(true); }} className="w-full text-left px-4 py-2 text-indigo-400">Sign In</button>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="mb-8">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} className="relative inline-block">
              <div className="w-44 h-44 rounded-full backdrop-blur-xl p-1" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}>
                <div className="w-full h-full rounded-full flex items-center justify-center text-6xl" style={{background: 'linear-gradient(135deg, #0f172a, #1e1b4b)'}}>👨‍💻</div>
              </div>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -bottom-2 -right-2 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-xl" style={{background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.9), rgba(239, 68, 68, 0.9))'}}>
                <Sparkle className="w-7 h-7 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-bold mb-4" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            Shawon Haque
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="h-14 mb-8">
            <span className="text-2xl md:text-4xl text-gray-300">{typedText}<span className="animate-pulse" style={{color: 'rgba(99, 102, 241, 0.9)'}}>|</span></span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Building the future with <span className="font-semibold" style={{color: 'rgba(99, 102, 241, 0.9)'}}>AI</span>. Creating innovative solutions with cutting-edge technology.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="#projects" className="px-8 py-4 rounded-xl font-semibold text-white shadow-lg backdrop-blur-xl" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))', boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4)'}}><Rocket size={20} className="inline mr-2" /> View Projects</a>
            <a href="#dashboard" className="px-8 py-4 rounded-xl font-semibold backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}}><LayoutDashboard size={20} className="inline mr-2" /> Dashboard</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex justify-center gap-6 mb-12">
            {[Github, Linkedin, Twitter].map((Icon, i) => (
              <motion.a key={i} href="#" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.1 }} className="p-4 rounded-full backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}><Icon size={24} /></motion.a>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[{ number: '50+', label: 'Projects' }, { number: '30+', label: 'Clients' }, { number: '5+', label: 'Years Exp' }, { number: '30+', label: 'Technologies' }].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 + i * 0.1 }} className="rounded-xl p-6 backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
                <div className="text-3xl font-bold mb-1" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <a href="#about" className="flex flex-col items-center text-gray-400 hover:text-white transition-colors animate-bounce"><span className="text-sm mb-2">Scroll Down</span><ChevronDown size={24} /></a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-16" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>About Me</motion.h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-6">
              <p className="text-lg text-gray-300">I'm a <span className="font-semibold" style={{color: 'rgba(99, 102, 241, 0.9)'}}>AI Engineer</span> and <span className="font-semibold" style={{color: 'rgba(168, 85, 247, 0.9)'}}>Full-Stack Developer</span> passionate about modern web applications.</p>
              <p className="text-lg text-gray-400">I transform complex problems into elegant solutions using React, Next.js, Node.js, Python, and AI.</p>
              <div className="flex flex-wrap gap-3">{['Problem Solver', 'Team Player', 'Fast Learner'].map((trait) => (<span key={trait} className="px-4 py-2 rounded-full text-sm backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>{trait}</span>))}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-6">
              {[{ name: 'React / Next.js', level: 96 }, { name: 'TypeScript', level: 94 }, { name: 'Node.js / Python', level: 90 }, { name: 'AI / ML', level: 88 }].map((skill, i) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="font-medium">{skill.name}</span><span className="text-gray-400">{skill.level}%</span></div>
                  <div className="h-3 rounded-full backdrop-blur-xl" style={{background: 'rgba(148, 163, 184, 0.2)'}}><motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1, delay: i * 0.1 }} className="h-full rounded-full" style={{background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}} /></div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-16" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Featured Projects</motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[{ id: 1, title: 'AI Portfolio', desc: 'Next-gen AI-powered portfolio', tech: ['Next.js 14', 'GPT-4', 'Tailwind'] }, { id: 2, title: 'Smart Home Hub', desc: 'IoT dashboard with AI', tech: ['React', 'Node.js', 'AI'] }, { id: 3, title: 'E-Learning Platform', desc: 'AI-powered learning system', tech: ['Next.js', 'OpenAI', 'Stripe'] }, { id: 4, title: 'Analytics Dashboard', desc: 'Real-time visualization', tech: ['React', 'D3.js', 'FastAPI'] }].map((project, i) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-2xl overflow-hidden backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
                <div className="h-48 flex items-center justify-center" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3))'}}><Bot className="w-20 h-20 text-white/80" /></div>
                <div className="p-6"><h3 className="text-xl font-bold mb-2">{project.title}</h3><p className="text-gray-400 mb-4">{project.desc}</p><div className="flex flex-wrap gap-2 mb-4">{project.tech.map((tech) => (<span key={tech} className="px-3 py-1 rounded-full text-xs backdrop-blur-xl" style={{background: 'rgba(148, 163, 184, 0.1)'}}>{tech}</span>))}</div><a href="#" className="inline-flex items-center gap-2" style={{color: 'rgba(99, 102, 241, 0.9)'}}>View Demo <ExternalLink size={16} /></a></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section id="dashboard" className="py-32 px-4" style={{background: 'rgba(0, 0, 0, 0.3)'}}>
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-16" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>🎯 Personal Dashboard</motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {[{ icon: Target, title: 'Tasks', id: 'tasks' }, { icon: Folder, title: 'Projects', id: 'projects' }, { icon: CalendarDays, title: 'Calendar', id: 'calendar' }, { icon: Image, title: 'Gallery' }, { icon: Bookmark, title: 'Bookmarks' }, { icon: Lock, title: 'Passwords' }].map((item, i) => (
              <motion.button key={item.title} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.05 }} onClick={() => item.id && setActiveModal(item.id)} className="rounded-2xl p-6 text-center backdrop-blur-xl transition-all" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
                <div className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}><item.icon className="w-7 h-7 text-white" /></div>
                <h3 className="font-bold text-sm">{item.title}</h3>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-8" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Get In Touch</motion.h2>
          
          {/* Clock Above Contact */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-4 mb-12">
            <div className="px-6 py-3 rounded-full backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
              <span className="text-sm text-gray-400">Current Time: </span>
              <span className="text-lg font-mono" style={{color: 'rgba(99, 102, 241, 0.9)'}}>{currentTime.toLocaleTimeString()}</span>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="rounded-2xl p-8 md:p-12 backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Name</label><input type="text" className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 backdrop-blur-xl focus:outline-none" style={{background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} placeholder="Your name" /></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Email</label><input type="email" className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 backdrop-blur-xl focus:outline-none" style={{background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} placeholder="you@example.com" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-300 mb-2">Message</label><textarea rows={5} className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 backdrop-blur-xl resize-none focus:outline-none" style={{background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} placeholder="Your message..." /></div>
              <button type="submit" className="w-full py-4 rounded-xl font-semibold text-white backdrop-blur-xl" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}>Send Message</button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4" style={{borderTop: '1px solid rgba(148, 163, 184, 0.1)'}}>
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-2" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Shawon Haque</h3>
          <p className="text-gray-400 text-sm mb-6">Building the future with AI.</p>
          <div className="flex justify-center gap-4 mb-8">{[Github, Linkedin, Twitter, Mail].map((Icon, i) => (<a key={i} href="#" className="p-3 rounded-full backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}><Icon size={20} /></a>))}</div>
          <p className="text-gray-500 text-sm">© 2024 Shawon Haque. All rights reserved.</p>
        </div>
      </footer>

      {/* Smart Chat Widget */}
      <AnimatePresence>
        {showChat && (
          <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }} className="fixed bottom-24 right-4 w-96 max-w-[calc(100vw-32px)] h-[500px] rounded-2xl overflow-hidden shadow-2xl z-50" style={{background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(148, 163, 184, 0.2)'}}>
            <div className="p-4 flex items-center justify-between backdrop-blur-xl" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}>
              <div className="flex items-center gap-3"><Bot size={24} /><div><h4 className="font-semibold">Shawon AI</h4><p className="text-xs text-white/70">Smart Assistant</p></div></div>
              <button onClick={() => setShowChat(false)} className="p-2 rounded-lg" style={{background: 'rgba(255,255,255,0.2)'}}><X size={20} /></button>
            </div>
            <div className="h-[calc(100%-140px)] overflow-y-auto p-4">
              <SmartChatbot />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowLoginModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-md rounded-2xl p-8 backdrop-blur-xl" style={{background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(148, 163, 184, 0.2)'}} onClick={(e) => e.stopPropagation()}>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}><User className="w-8 h-8 text-white" /></div>
                <h2 className="text-2xl font-bold" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Welcome Back</h2>
                <p className="text-gray-400 mt-2">Sign in to continue</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <input type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} placeholder="Email" className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 backdrop-blur-xl focus:outline-none" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} required />
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="Password" className="w-full px-4 py-3 pr-12 rounded-xl text-white placeholder-gray-400 backdrop-blur-xl focus:outline-none" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                </div>
                {authError && <p className="text-red-400 text-sm">{authError}</p>}
                <button type="submit" disabled={authLoading} className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}>{authLoading ? <Loader2 className="animate-spin" size={20} /> : <LogIn size={20} />}{authLoading ? 'Signing in...' : 'Sign In'}</button>
              </form>
              <p className="text-center text-gray-400 text-sm mt-6">Don't have account? <button onClick={() => { setShowLoginModal(false); setShowSignupModal(true); }} className="hover:underline" style={{color: 'rgba(99, 102, 241, 0.9)'}}>Sign up</button></p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signup Modal */}
      <AnimatePresence>
        {showSignupModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowSignupModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-md rounded-2xl p-8 backdrop-blur-xl" style={{background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(148, 163, 184, 0.2)'}} onClick={(e) => e.stopPropagation()}>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.9))'}}><UserPlus className="w-8 h-8 text-white" /></div>
                <h2 className="text-2xl font-bold" style={{background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.9))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Create Account</h2>
                <p className="text-gray-400 mt-2">Join the future</p>
              </div>
              <form onSubmit={handleSignup} className="space-y-4">
                <input type="text" value={signupForm.name} onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })} placeholder="Full Name" className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 backdrop-blur-xl focus:outline-none" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} required />
                <input type="email" value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} placeholder="Email" className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 backdrop-blur-xl focus:outline-none" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} required />
                <input type="password" value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} placeholder="Password (min 6 chars)" className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 backdrop-blur-xl focus:outline-none" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} required />
                {authError && <p className="text-red-400 text-sm">{authError}</p>}
                <button type="submit" disabled={authLoading} className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2" style={{background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.9))'}}>{authLoading ? <Loader2 className="animate-spin" size={20} /> : <UserPlus size={20} />}{authLoading ? 'Creating...' : 'Create Account'}</button>
              </form>
              <p className="text-center text-gray-400 text-sm mt-6">Already have account? <button onClick={() => { setShowSignupModal(false); setShowLoginModal(true); }} className="hover:underline" style={{color: 'rgba(99, 102, 241, 0.9)'}}>Sign in</button></p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard Modals */}
      <Modal isOpen={!!activeModal} onClose={() => setActiveModal(null)} title={activeModal ? modalTitles[activeModal] : ''}>{renderModalContent()}</Modal>
    </div>
  );
}
