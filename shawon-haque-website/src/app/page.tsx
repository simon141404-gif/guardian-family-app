'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, Linkedin, Twitter, Mail, ExternalLink,
  Code2, Sparkles, Zap, Globe, Bot,
  ChevronDown, Menu as MenuIcon, X, Sun, Moon,
  FileText, Calendar, FolderKanban, Image,
  MessageSquare, Bell, Bookmark, Lock, Settings,
  LayoutDashboard, Music, QrCode, Eye, EyeOff,
  Search, Wand2, Languages, Mic, Scan,
  Send, TrendingUp, User, File,
  Shield, Rocket, Target, Award, Users, Heart,
  Play, Pause, SkipForward, Volume2,
  Camera, Video, Phone, Paperclip, Smile,
  LogIn, LogOut, UserPlus, Key, Fingerprint,
  Check, AlertCircle, Loader2, Copy, Trash2, Download,
  Clock, Globe2, Sparkle, Loader, Sun as SunIcon, Sunset
} from 'lucide-react';

// Types
interface ChatMessage { id: string; role: 'user' | 'assistant'; content: string; timestamp: Date; }
interface AuthUser { name: string; email: string; avatar: string; loginTime: Date; }
interface Project { id: number; title: string; description: string; tech: string[]; icon: any; gradient: string; demo: string; }
interface Skill { name: string; level: number; color: string; }
interface Feature { icon: any; title: string; description: string; color: string; modal: string; }
interface BlogPost { id: number; title: string; date: string; readTime: string; category: string; image: string; }
interface SearchResult { id: number; title: string; desc: string; category: string; url: string; }

// Modal Component
function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl" style={{background: 'rgba(15, 15, 25, 0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(102, 126, 234, 0.3)'}} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
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

// AI ASSISTANT
function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: '1', role: 'assistant', content: "👋 Hello! I'm Shawon AI - your personal assistant. Ask me anything!", timestamp: new Date() }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    if (input.includes('code') || input.includes('programming') || input.includes('python')) return "I can help with coding! 🔹 Use clean, readable code\n🔹 Add comments for complex logic\n🔹 Follow DRY principle\n🔹 Write tests before deploying\n🔹 Use version control (Git)\n\nWould you like specific code help?";
    if (input.includes('ai') || input.includes('chatgpt')) return "AI is amazing! 🤖\n\n• Code generation & review\n• Data analysis\n• Customer service\n• Content creation\n• Problem solving\n\nPopular AI: ChatGPT, Claude, Midjourney, DALL-E\n\nWant to learn more?";
    if (input.includes('career') || input.includes('job')) return "Career advice: 📌\n\n• Build a strong portfolio\n• Contribute to open source\n• Network on LinkedIn\n• Practice coding problems\n• Learn system design\n• Prepare for interviews\n\nSoft skills matter as much as technical!";
    if (input.includes('help')) return "I can help you with: 💻\n\n• Coding & Programming\n• AI & Machine Learning\n• Data Science\n• Design & UI/UX\n• Career Advice\n• App Development\n• Web Development\n\nJust ask me anything!";
    return `Great question about "${userInput}"! 🤔\n\nI suggest:\n• Search online resources\n• Check documentation\n• Ask experts\n• Try different approaches\n\nIs there something specific about tech I can help with?`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: generateResponse(input), timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="h-80 overflow-y-auto space-y-3 pr-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'text-white' : ''}`} style={msg.role === 'user' ? {background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'} : {background: 'rgba(255,255,255,0.1)'}}>
              <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (<div className="flex justify-start"><div className="px-4 py-3 rounded-2xl" style={{background: 'rgba(255,255,255,0.1)'}}><div className="flex gap-1"><span className="w-2 h-2 rounded-full animate-bounce" style={{background: '#667eea'}} /><span className="w-2 h-2 rounded-full animate-bounce" style={{background: '#667eea', animationDelay: '150ms'}} /><span className="w-2 h-2 rounded-full animate-bounce" style={{background: '#667eea', animationDelay: '300ms'}} /></div></div></div>)}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask me anything..." className="flex-1 px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}} />
        <button onClick={handleSend} disabled={!input.trim() || isLoading} className="px-6 py-3 rounded-xl font-semibold text-white transition-all" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}><Send size={20} /></button>
      </div>
    </div>
  );
}

// AI IMAGE GENERATOR
function AIImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generatedImages, setGeneratedImages] = useState<{url: string; prompt: string; seed: number}[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 3000));
    const imageUrl = `https://picsum.photos/seed/${Date.now()}/512/512`;
    setGeneratedImages(prev => [{ url: imageUrl, prompt, seed: Date.now() }, ...prev]);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && generateImage()} placeholder="Describe your image..." className="flex-1 px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}} />
        <button onClick={generateImage} disabled={!prompt.trim() || isGenerating} className="px-6 py-3 rounded-xl font-semibold text-white flex items-center gap-2" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
          {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Wand2 size={20} />}
          {isGenerating ? 'Generating...' : 'Generate'}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        {generatedImages.map((img) => (
          <motion.div key={img.seed} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative group">
            <img src={img.url} alt={img.prompt} className="w-full rounded-xl" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
              <button onClick={() => navigator.clipboard.writeText(img.prompt)} className="p-2 rounded-full" style={{background: 'rgba(255,255,255,0.2)'}}><Copy size={20} /></button>
              <a href={img.url} target="_blank" className="p-2 rounded-full" style={{background: 'rgba(255,255,255,0.2)'}}><Download size={20} /></a>
            </div>
            <p className="text-xs text-gray-400 mt-2 truncate">{img.prompt}</p>
          </motion.div>
        ))}
      </div>
      {generatedImages.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Image className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Enter a prompt and generate AI images</p>
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {['Cyberpunk city', 'Abstract art', 'Nature landscape'].map((example) => (
              <button key={example} onClick={() => setPrompt(example)} className="px-3 py-1 rounded-full text-xs" style={{background: 'rgba(255,255,255,0.1)'}}>{example}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// SMART SEARCH
function SmartSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const allContent: SearchResult[] = [
    { id: 1, title: 'React Documentation', desc: 'Official React documentation and guides', category: 'Development', url: 'https://react.dev' },
    { id: 2, title: 'Next.js 14 Features', desc: 'Server Components, App Router', category: 'Development', url: 'https://nextjs.org' },
    { id: 3, title: 'TypeScript Handbook', desc: 'Complete guide to TypeScript', category: 'Development', url: 'https://typescriptlang.org' },
    { id: 4, title: 'Tailwind CSS', desc: 'Utility-first CSS framework', category: 'Design', url: 'https://tailwindcss.com' },
    { id: 5, title: 'OpenAI API', desc: 'Build AI with GPT-4', category: 'AI/ML', url: 'https://openai.com' },
    { id: 6, title: 'ChatGPT Guide', desc: 'How to use ChatGPT', category: 'AI/ML', url: 'https://chat.openai.com' },
  ];

  const search = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setHasSearched(true);
    await new Promise(r => setTimeout(r, 1000));
    const searchResults = allContent.filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.desc.toLowerCase().includes(query.toLowerCase()));
    setResults(searchResults);
    setIsSearching(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && search()} placeholder="Search anything..." className="flex-1 px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}} />
        <button onClick={search} disabled={!query.trim() || isSearching} className="px-6 py-3 rounded-xl" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
          {isSearching ? <Loader2 size={20} className="animate-spin text-white" /> : <Search size={20} className="text-white" />}
        </button>
      </div>
      {!isSearching && hasSearched && (
        <div className="mt-4 space-y-3">
          {results.map((result) => (
            <a key={result.id} href={result.url} target="_blank" className="block p-4 rounded-xl transition-colors" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
              <span className="px-2 py-1 rounded text-xs" style={{background: 'rgba(102, 126, 234, 0.3)', color: '#667eea'}}>{result.category}</span>
              <h4 className="font-semibold mt-2">{result.title}</h4>
              <p className="text-sm text-gray-400">{result.desc}</p>
            </a>
          ))}
          {results.length === 0 && <p className="text-center text-gray-400 py-8">No results found</p>}
        </div>
      )}
    </div>
  );
}

// AI SUMMARIZE
function AISummarize() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  const summarize = async () => {
    if (!inputText.trim()) return;
    setIsSummarizing(true);
    await new Promise(r => setTimeout(r, 2000));
    const sentences = inputText.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const summaryText = sentences.slice(0, 3).join('. ');
    setSummary(`📝 Summary:\n\n${summaryText || 'Could not generate summary.'}\n\n📊 Original: ${inputText.split(' ').length} words`);
    setIsSummarizing(false);
  };

  return (
    <div className="space-y-4">
      <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Paste text to summarize..." className="w-full h-40 px-4 py-3 rounded-xl text-white placeholder-gray-400 resize-none focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}} />
      <button onClick={summarize} disabled={!inputText.trim() || isSummarizing} className="w-full py-3 rounded-xl font-semibold text-white" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
        {isSummarizing ? 'Summarizing...' : 'Summarize'}
      </button>
      {summary && <div className="p-4 rounded-xl" style={{background: 'rgba(102, 126, 234, 0.2)', border: '1px solid rgba(102, 126, 234, 0.3)'}}><pre className="whitespace-pre-wrap text-gray-300">{summary}</pre></div>}
    </div>
  );
}

// AI TRANSLATOR
function AITranslator() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [isTranslating, setIsTranslating] = useState(false);

  const languages = [
    { code: 'en', name: 'English' }, { code: 'es', name: 'Spanish' }, { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' }, { code: 'ja', name: 'Japanese' }, { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' }, { code: 'bn', name: 'Bengali' },
  ];

  const translate = async () => {
    if (!inputText.trim()) return;
    setIsTranslating(true);
    await new Promise(r => setTimeout(r, 1500));
    setTranslatedText(`[${languages.find(l => l.code === targetLang)?.name}] ${inputText}`);
    setIsTranslating(false);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)} className="px-4 py-3 rounded-xl text-white focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}}>
          {languages.map((lang) => (<option key={lang.code} value={lang.code}>{lang.name}</option>))}
        </select>
        <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} className="px-4 py-3 rounded-xl text-white focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}}>
          {languages.map((lang) => (<option key={lang.code} value={lang.code}>{lang.name}</option>))}
        </select>
      </div>
      <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Enter text..." className="w-full h-32 px-4 py-3 rounded-xl text-white placeholder-gray-400 resize-none focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}} />
      <button onClick={translate} disabled={!inputText.trim() || isTranslating} className="w-full py-3 rounded-xl font-semibold text-white" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
        {isTranslating ? 'Translating...' : 'Translate'}
      </button>
      {translatedText && <div className="p-4 rounded-xl" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}><p className="text-gray-300">{translatedText}</p></div>}
    </div>
  );
}

// AI OCR
function AIOcr() {
  const [image, setImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      setImage(e.target?.result as string);
      setIsProcessing(true);
      await new Promise(r => setTimeout(r, 2500));
      setExtractedText(`📄 Extracted Text:\n\nThis is sample text extracted from your image using OCR technology.\n\n✅ OCR completed successfully!`);
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors" style={{borderColor: 'rgba(102, 126, 234, 0.5)'}}>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
        {image ? <img src={image} alt="Uploaded" className="max-h-48 mx-auto rounded-lg" /> : <><Scan className="w-12 h-12 mx-auto mb-4 text-gray-400" /><p className="text-gray-400">Click to upload image</p></>}
      </div>
      {isProcessing && <div className="text-center"><Loader2 className="w-8 h-8 mx-auto animate-spin" style={{color: '#667eea'}} /></div>}
      {extractedText && <div className="p-4 rounded-xl" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}><pre className="whitespace-pre-wrap text-gray-300">{extractedText}</pre></div>}
    </div>
  );
}

// MAIN COMPONENT
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [activeAIModal, setActiveAIModal] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { const timer = setInterval(() => setCurrentTime(new Date()), 1000); return () => clearInterval(timer); }, []);

  const titles = ['AI Engineer', 'Full Stack Developer', 'UI/UX Designer', 'Problem Solver'];
  const skills: Skill[] = [
    { name: 'React / Next.js', level: 96, color: 'from-cyan-400 to-blue-500' },
    { name: 'TypeScript', level: 94, color: 'from-blue-400 to-indigo-500' },
    { name: 'Node.js / Python', level: 90, color: 'from-green-400 to-emerald-500' },
    { name: 'AI / Machine Learning', level: 88, color: 'from-purple-400 to-pink-500' },
    { name: 'Cloud / DevOps', level: 85, color: 'from-orange-400 to-red-500' },
    { name: 'UI/UX Design', level: 82, color: 'from-pink-400 to-rose-500' },
  ];
  const projects: Project[] = [
    { id: 1, title: 'AI Portfolio v2', description: 'Next-gen AI-powered portfolio', tech: ['Next.js 14', 'GPT-4', 'Tailwind'], icon: Bot, gradient: 'from-violet-500 to-purple-600', demo: '#' },
    { id: 2, title: 'Smart Home Hub', description: 'IoT dashboard with AI', tech: ['React', 'Node.js', 'AI'], icon: Zap, gradient: 'from-amber-500 to-orange-600', demo: '#' },
    { id: 3, title: 'E-Learning Platform', description: 'AI-powered learning', tech: ['Next.js', 'OpenAI', 'Stripe'], icon: GraduationCap, gradient: 'from-emerald-500 to-teal-600', demo: '#' },
    { id: 4, title: 'Analytics Dashboard', description: 'Real-time visualization', tech: ['React', 'D3.js', 'FastAPI'], icon: TrendingUp, gradient: 'from-blue-500 to-cyan-600', demo: '#' },
  ];
  const features: Feature[] = [
    { icon: Bot, title: 'AI Assistant', description: 'Ask anything', color: 'violet', modal: 'assistant' },
    { icon: Wand2, title: 'Image Generation', description: 'Create images', color: 'pink', modal: 'image' },
    { icon: Search, title: 'Smart Search', description: 'Search anything', color: 'cyan', modal: 'search' },
    { icon: FileText, title: 'Auto Summarize', description: 'Summarize content', color: 'amber', modal: 'summarize' },
    { icon: Languages, title: 'Translation', description: 'Translate 8+ languages', color: 'emerald', modal: 'translate' },
    { icon: Scan, title: 'AI OCR', description: 'Extract text', color: 'blue', modal: 'ocr' },
  ];
  const navItems = ['Home', 'About', 'Projects', 'Dashboard', 'Blog', 'Contact'];

  useEffect(() => { const interval = setInterval(() => setTitleIndex((prev) => (prev + 1) % titles.length), 3000); return () => clearInterval(interval); }, []);
  useEffect(() => { let currentIndex = 0; const currentTitle = titles[titleIndex]; setTypedText(''); const typeInterval = setInterval(() => { if (currentIndex <= currentTitle.length) { setTypedText(currentTitle.slice(0, currentIndex)); currentIndex++; } else clearInterval(typeInterval); }, 80); return () => clearInterval(typeInterval); }, [titleIndex]);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginForm.email)) { setAuthError('Enter valid email'); return; }
    if (loginForm.password.length < 6) { setAuthError('Password min 6 chars'); return; }
    setAuthLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsLoggedIn(true);
    setAuthUser({ name: loginForm.email.split('@')[0], email: loginForm.email, avatar: '👤', loginTime: new Date() });
    setShowLoginModal(false);
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
    setAuthUser({ name: signupForm.name, email: signupForm.email, avatar: '👤', loginTime: new Date() });
    setShowSignupModal(false);
    setAuthLoading(false);
  };

  const handleLogout = () => { setIsLoggedIn(false); setAuthUser(null); };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', content: chatInput, timestamp: new Date() };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1500));
    const responses = ["I'm Shawon AI! I can help with coding, design, or any questions.", "Great! I specialize in React, Next.js, AI, and web development.", "I love building AI-powered applications!"];
    const aiMessage: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: responses[Math.floor(Math.random() * responses.length)], timestamp: new Date() };
    setIsTyping(false);
    setChatMessages(prev => [...prev, aiMessage]);
  };

  const renderAIModalContent = () => {
    switch (activeAIModal) {
      case 'assistant': return <AIAssistant />;
      case 'image': return <AIImageGenerator />;
      case 'search': return <SmartSearch />;
      case 'summarize': return <AISummarize />;
      case 'translate': return <AITranslator />;
      case 'ocr': return <AIOcr />;
      default: return null;
    }
  };

  const getAIModalTitle = () => {
    switch (activeAIModal) {
      case 'assistant': return '🤖 Shawon AI Assistant';
      case 'image': return '🎨 AI Image Generator';
      case 'search': return '🔍 Smart Search';
      case 'summarize': return '📝 AI Summarize';
      case 'translate': return '🌐 AI Translator';
      case 'ocr': return '📄 AI OCR';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #0f1a3a 100%)'}}>
      {/* Animated Background */}
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <motion.div animate={{ x: [0, 100, 0], y: [0, -50, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute w-[600px] h-[600px] rounded-full" style={{background: 'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)', top: '10%', left: '10%'}} />
        <motion.div animate={{ x: [0, -100, 0], y: [0, 50, 0] }} transition={{ duration: 15, repeat: Infinity }} className="absolute w-[500px] h-[500px] rounded-full" style={{background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%)', top: '50%', right: '10%'}} />
        <motion.div animate={{ x: [0, 50, 0], y: [0, 100, 0] }} transition={{ duration: 25, repeat: Infinity }} className="absolute w-[400px] h-[400px] rounded-full" style={{background: 'radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, transparent 70%)', bottom: '10%', left: '30%'}} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl" style={{background: 'rgba(10, 10, 15, 0.8)', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-xl font-bold cursor-pointer" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Shawon Haque
            </motion.div>
            
            {/* Search Bar */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 rounded-full text-sm text-white placeholder-gray-400 focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)'}} onClick={() => setActiveAIModal('search')} readOnly />
              </div>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, i) => (
                <motion.a key={item} href={item === 'Dashboard' ? '/dashboard' : `#${item.toLowerCase()}`} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Clock - Right Side */}
            <div className="flex items-center gap-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 px-3 py-2 rounded-full" style={{background: 'rgba(255,255,255,0.1)'}}>
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-mono text-gray-300">{currentTime.toLocaleTimeString()}</span>
              </motion.div>

              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full" style={{background: 'rgba(255,255,255,0.1)'}}>
                    <span>{authUser?.avatar}</span>
                    <span className="text-sm text-gray-300">{authUser?.name}</span>
                  </div>
                  <button onClick={handleLogout} className="p-2 rounded-lg" style={{background: 'rgba(255,255,255,0.1)'}}><LogOut size={20} /></button>
                </div>
              ) : (
                <>
                  <button onClick={() => setShowLoginModal(true)} className="hidden sm:block text-sm font-medium text-gray-300 hover:text-white">Sign In</button>
                  <button onClick={() => setShowSignupModal(true)} className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>Sign Up</button>
                </>
              )}
              <button onClick={() => setShowChat(!showChat)} className="p-2 rounded-lg relative" style={{background: 'rgba(255,255,255,0.1)'}}>
                <Bot size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse" style={{background: '#ec4899'}} />
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg" style={{background: 'rgba(255,255,255,0.1)'}}><MenuIcon size={24} /></button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden" style={{background: 'rgba(10, 10, 15, 0.95)', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (<a key={item} href={item === 'Dashboard' ? '/dashboard' : `#${item.toLowerCase()}`} className="block px-4 py-2 rounded-lg text-gray-300" style={{background: 'rgba(255,255,255,0.05)'}} onClick={() => setIsMenuOpen(false)}>{item}</a>))}
                <div className="flex items-center gap-2 px-4 pt-2"><Clock className="w-4 h-4 text-gray-400" /><span className="text-sm text-gray-400">{currentTime.toLocaleTimeString()}</span></div>
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
              <div className="w-44 h-44 rounded-full p-1" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'}}>
                <div className="w-full h-full rounded-full flex items-center justify-center text-6xl" style={{background: '#0a0a0f'}}>👨‍💻</div>
              </div>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -bottom-2 -right-2 w-14 h-14 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)'}}>
                <Sparkles className="w-7 h-7 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-bold mb-4" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            Shawon Haque
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="h-14 mb-8">
            <span className="text-2xl md:text-4xl text-gray-300">{typedText}<span className="animate-pulse" style={{color: '#667eea'}}>|</span></span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Building the future with <span className="font-semibold" style={{color: '#667eea'}}>AI</span>. Creating innovative solutions with cutting-edge technology.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="#projects" className="px-8 py-4 rounded-xl font-semibold text-white flex items-center gap-2 shadow-lg" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)'}}><Rocket size={20} /> View Projects</a>
            <a href="/dashboard" className="px-8 py-4 rounded-xl font-semibold flex items-center gap-2" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}}><LayoutDashboard size={20} /> Dashboard</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex justify-center gap-6 mb-12">
            {[Github, Linkedin, Twitter].map((Icon, i) => (
              <motion.a key={i} href="#" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.1 }} className="p-4 rounded-full" style={{background: 'rgba(255,255,255,0.1)'}}><Icon size={24} /></motion.a>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[{ number: '50+', label: 'Projects' }, { number: '30+', label: 'Clients' }, { number: '5+', label: 'Years Exp' }, { number: '30+', label: 'Technologies' }].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 + i * 0.1 }} className="rounded-xl p-6" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
                <div className="text-3xl font-bold mb-1" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{stat.number}</div>
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
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-16" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>About Me</motion.h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-6">
              <p className="text-lg text-gray-300">I'm a <span className="font-semibold" style={{color: '#667eea'}}>AI Engineer</span> and <span className="font-semibold" style={{color: '#764ba2'}}>Full-Stack Developer</span> passionate about modern web applications.</p>
              <p className="text-lg text-gray-400">I transform complex problems into elegant solutions using React, Next.js, Node.js, Python, and AI.</p>
              <div className="flex flex-wrap gap-3">{['Problem Solver', 'Team Player', 'Fast Learner'].map((trait) => (<span key={trait} className="px-4 py-2 rounded-full text-sm" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>{trait}</span>))}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-6">
              {skills.map((skill, i) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="font-medium">{skill.name}</span><span className="text-gray-400">{skill.level}%</span></div>
                  <div className="h-3 rounded-full overflow-hidden" style={{background: 'rgba(255,255,255,0.1)'}}><motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1, delay: i * 0.1 }} className="h-full rounded-full" style={{background: `linear-gradient(90deg, ${skill.color.split(' ')[1].replace('to-', '')}, ${skill.color.split(' ')[3]})`}} /></div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-4" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Featured Projects</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center text-gray-400 mb-16">AI integration, modern design, cutting-edge technology</motion.p>
          <div className="grid md:grid-cols-2 gap-8">{projects.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-2xl overflow-hidden" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
              <div className={`h-48 flex items-center justify-center bg-gradient-to-br ${project.gradient}`}><project.icon className="w-20 h-20 text-white/80" /></div>
              <div className="p-6"><h3 className="text-xl font-bold mb-2">{project.title}</h3><p className="text-gray-400 mb-4">{project.description}</p><div className="flex flex-wrap gap-2 mb-4">{project.tech.map((tech) => (<span key={tech} className="px-3 py-1 rounded-full text-xs" style={{background: 'rgba(255,255,255,0.1)'}}>{tech}</span>))}</div><a href={project.demo} className="inline-flex items-center gap-2" style={{color: '#667eea'}}>View Demo <ExternalLink size={16} /></a></div>
            </motion.div>
          ))}</div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-4" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>✨ AI-Powered Features</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center text-gray-400 mb-16">All features FULLY FUNCTIONAL! Click to try.</motion.p>
          <div className="grid md:grid-cols-3 gap-6">{features.map((feature, i) => (
            <motion.div key={feature.title} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} onClick={() => setActiveAIModal(feature.modal)} className="rounded-2xl p-8 cursor-pointer transition-all hover:scale-105" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{background: 'rgba(102, 126, 234, 0.2)'}}><feature.icon className="w-7 h-7" style={{color: '#667eea'}} /></div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
              <p className="text-xs mt-4" style={{color: '#667eea'}}>✨ Click to use</p>
            </motion.div>
          ))}</div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section id="dashboard" className="py-32 px-4" style={{background: 'rgba(0,0,0,0.3)'}}>
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-4" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>🎯 Personal Dashboard</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center text-gray-400 mb-16">All your tools in one place</motion.p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[{ icon: FileText, title: 'Documents' }, { icon: Calendar, title: 'Calendar' }, { icon: FolderKanban, title: 'Projects' }, { icon: Image, title: 'Gallery' }, { icon: MessageSquare, title: 'AI Chat' }, { icon: Bell, title: 'Notifications' }, { icon: Bookmark, title: 'Bookmarks' }, { icon: Lock, title: 'Password Vault' }, { icon: Music, title: 'Music' }, { icon: QrCode, title: 'QR Code' }].map((item, i) => (
              <motion.a key={item.title} href="/dashboard" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.05 }} className="rounded-2xl p-6 text-center transition-all" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
                <div className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}><item.icon className="w-7 h-7 text-white" /></div>
                <h3 className="font-bold text-sm">{item.title}</h3>
              </motion.a>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center">
            <a href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-lg" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)'}}><LayoutDashboard size={20} /> Open Dashboard</a>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-16" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Blog Posts</motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{ id: 1, title: 'Building AI Apps', date: 'Dec 15', readTime: '5 min', category: 'AI', image: '🤖' }, { id: 2, title: 'Modern Web Architecture', date: 'Dec 10', readTime: '8 min', category: 'Dev', image: '💻' }, { id: 3, title: 'Design Best Practices', date: 'Dec 5', readTime: '6 min', category: 'Design', image: '🎨' }].map((post, i) => (
              <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-2xl overflow-hidden" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
                <div className="h-48 flex items-center justify-center text-6xl" style={{background: 'linear-gradient(135deg, rgba(102,126,234,0.2) 0%, rgba(118,75,162,0.2) 100%)'}}>{post.image}</div>
                <div className="p-6"><div className="flex items-center gap-4 text-sm text-gray-400 mb-3"><span>{post.date}</span><span>•</span><span>{post.readTime}</span><span className="px-2 py-1 rounded text-xs" style={{background: 'rgba(102,126,234,0.3)', color: '#667eea'}}>{post.category}</span></div><h3 className="text-lg font-bold mb-2">{post.title}</h3><a href="#" className="inline-flex items-center gap-2 text-sm" style={{color: '#667eea'}}>Read More <ChevronDown size={16} className="rotate-270" /></a></div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4" style={{borderTop: '1px solid rgba(255,255,255,0.1)'}}>
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-2" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Shawon Haque</h3>
          <p className="text-gray-400 text-sm mb-6">Building the future with AI.</p>
          <div className="flex justify-center gap-4 mb-8">{[Github, Linkedin, Twitter, Mail].map((Icon, i) => (<a key={i} href="#" className="p-3 rounded-full" style={{background: 'rgba(255,255,255,0.1)'}}><Icon size={20} /></a>))}</div>
          <p className="text-gray-500 text-sm">© 2024 Shawon Haque. All rights reserved.</p>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <AnimatePresence>
        {showChat && (
          <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }} className="fixed bottom-24 right-4 w-96 max-w-[calc(100vw-32px)] h-[500px] rounded-2xl overflow-hidden shadow-2xl z-50" style={{background: 'rgba(15, 15, 25, 0.95)', border: '1px solid rgba(255,255,255,0.2)'}}>
            <div className="p-4 flex items-center justify-between" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
              <div className="flex items-center gap-3"><Bot size={24} /><div><h4 className="font-semibold">Shawon AI</h4><p className="text-xs text-white/70">Always here</p></div></div>
              <button onClick={() => setShowChat(false)} className="p-2 rounded-lg" style={{background: 'rgba(255,255,255,0.2)'}}><X size={20} /></button>
            </div>
            <div className="h-[calc(100%-140px)] overflow-y-auto p-4 space-y-3">
              {chatMessages.length === 0 && <div className="text-center text-gray-400 py-8"><Bot className="w-12 h-12 mx-auto mb-4 opacity-50" /><p>Ask me anything!</p></div>}
              {chatMessages.map((message) => (<div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${message.role === 'user' ? 'text-white' : ''}`} style={message.role === 'user' ? {background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'} : {background: 'rgba(255,255,255,0.1)'}}>{message.content}</div></div>))}
              {isTyping && (<div className="flex justify-start"><div className="px-4 py-3 rounded-2xl" style={{background: 'rgba(255,255,255,0.1)'}}><div className="flex gap-1"><span className="w-2 h-2 rounded-full animate-bounce" style={{background: '#667eea'}} /><span className="w-2 h-2 rounded-full animate-bounce" style={{background: '#667eea', animationDelay: '150ms'}} /><span className="w-2 h-2 rounded-full animate-bounce" style={{background: '#667eea', animationDelay: '300ms'}} /></div></div></div>)}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4" style={{borderTop: '1px solid rgba(255,255,255,0.1)'}}>
              <div className="flex gap-2">
                <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleChat()} placeholder="Ask..." className="flex-1 px-4 py-3 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none" style={{background: 'rgba(255,255,255,0.1)'}} />
                <button onClick={handleChat} className="px-4 py-3 rounded-xl" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}><Send size={20} /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Modals */}
      <Modal isOpen={!!activeAIModal} onClose={() => setActiveAIModal(null)} title={getAIModalTitle()}>{renderAIModalContent()}</Modal>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowLoginModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-md rounded-2xl p-8" style={{background: 'rgba(15, 15, 25, 0.95)', border: '1px solid rgba(255,255,255,0.2)'}} onClick={(e) => e.stopPropagation()}>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}><User className="w-8 h-8 text-white" /></div>
                <h2 className="text-2xl font-bold" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Welcome Back</h2>
                <p className="text-gray-400 mt-2">Sign in to continue</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <input type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} placeholder="Email" className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}} required />
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="Password" className="w-full px-4 py-3 pr-12 rounded-xl text-white placeholder-gray-400 focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}} required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                </div>
                {authError && <p className="text-red-400 text-sm">{authError}</p>}
                <button type="submit" disabled={authLoading} className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>{authLoading ? <Loader2 className="animate-spin" size={20} /> : <LogIn size={20} />}{authLoading ? 'Signing in...' : 'Sign In'}</button>
              </form>
              <p className="text-center text-gray-400 text-sm mt-6">Don't have account? <button onClick={() => { setShowLoginModal(false); setShowSignupModal(true); }} className="hover:underline" style={{color: '#667eea'}}>Sign up</button></p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signup Modal */}
      <AnimatePresence>
        {showSignupModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowSignupModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-md rounded-2xl p-8" style={{background: 'rgba(15, 15, 25, 0.95)', border: '1px solid rgba(255,255,255,0.2)'}} onClick={(e) => e.stopPropagation()}>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}><UserPlus className="w-8 h-8 text-white" /></div>
                <h2 className="text-2xl font-bold" style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Create Account</h2>
                <p className="text-gray-400 mt-2">Join the future</p>
              </div>
              <form onSubmit={handleSignup} className="space-y-4">
                <input type="text" value={signupForm.name} onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })} placeholder="Full Name" className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}} required />
                <input type="email" value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} placeholder="Email" className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}} required />
                <input type="password" value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} placeholder="Password (min 6 chars)" className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}} required />
                {authError && <p className="text-red-400 text-sm">{authError}</p>}
                <button type="submit" disabled={authLoading} className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2" style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>{authLoading ? <Loader2 className="animate-spin" size={20} /> : <UserPlus size={20} />}{authLoading ? 'Creating...' : 'Create Account'}</button>
              </form>
              <p className="text-center text-gray-400 text-sm mt-6">Already have account? <button onClick={() => { setShowSignupModal(false); setShowLoginModal(true); }} className="hover:underline" style={{color: '#667eea'}}>Sign in</button></p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GraduationCap({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>);
}
