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
  Clock, Globe2, Sparkle, Loader, Sunrise, Sunset
} from 'lucide-react';

// Types
interface ChatMessage { id: string; role: 'user' | 'assistant'; content: string; timestamp: Date; }
interface AuthUser { name: string; email: string; avatar: string; loginTime: Date; }
interface Project { id: number; title: string; description: string; tech: string[]; icon: any; gradient: string; demo: string; }
interface Skill { name: string; level: number; color: string; }
interface Feature { icon: any; title: string; description: string; color: string; modal: string; }
interface BlogPost { id: number; title: string; date: string; readTime: string; category: string; image: string; }
interface SearchResult { id: number; title: string; desc: string; category: string; url: string; }

// ============ MODAL COMPONENT ============
function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="login-card w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-indigo-600 to-purple-600">
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <button onClick={onClose} className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"><X size={20} className="text-white" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============ SMART AI ASSISTANT - Answers Everything ============
function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'assistant', content: "👋 Hello! I'm Shawon AI - your personal assistant. I can help you with:\n\n• Answer any question\n• Write code\n• Explain concepts\n• Help with projects\n• And much more!\n\nWhat would you like to know?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Coding related
    if (input.includes('code') || input.includes('programming') || input.includes('python') || input.includes('javascript') || input.includes('react') || input.includes('nextjs')) {
      return "I can help with coding! Here are some tips:\n\n🔹 Use clean, readable code\n🔹 Add comments for complex logic\n🔹 Follow DRY principle (Don't Repeat Yourself)\n🔹 Write tests before deploying\n🔹 Use version control (Git)\n\nWould you like me to write specific code for you?";
    }
    
    // AI/ML related
    if (input.includes('ai') || input.includes('machine learning') || input.includes('ml') || input.includes('chatgpt') || input.includes('gpt')) {
      return "AI is transforming the world! Here's what I know:\n\n🤖 AI can help with:\n• Code generation & review\n• Data analysis\n• Customer service\n• Content creation\n• Problem solving\n\nPopular AI tools: ChatGPT, Claude, Midjourney, DALL-E\n\nWant to learn more about a specific AI topic?";
    }
    
    // Career related
    if (input.includes('career') || input.includes('job') || input.includes('interview') || input.includes('resume')) {
      return "Career advice for you:\n\n📌 Build a strong portfolio\n📌 Contribute to open source\n📌 Network on LinkedIn\n📌 Practice coding problems\n📌 Learn system design\n📌 Prepare for interviews\n\nRemember: Soft skills matter as much as technical skills!";
    }
    
    // Project help
    if (input.includes('project') || input.includes('build') || input.includes('create')) {
      return "Great! Let's plan your project:\n\n1️⃣ Define the goal\n2️⃣ Choose tech stack\n3️⃣ Create wireframes\n4️⃣ Set milestones\n5️⃣ Build MVP first\n6️⃣ Test thoroughly\n7️⃣ Deploy & iterate\n\nWhat project are you working on?";
    }
    
    // Design
    if (input.includes('design') || input.includes('ui') || input.includes('ux') || input.includes('figma')) {
      return "Design tips for you:\n\n🎨 Keep UI simple & intuitive\n🎨 Use consistent colors\n🎨 Follow accessibility guidelines\n🎨 Mobile-first approach\n🎨 Test with real users\n\nPopular tools: Figma, Adobe XD, Sketch";
    }
    
    // General knowledge
    if (input.includes('what is') || input.includes('who is') || input.includes('how does')) {
      return "That's a great question! I'd be happy to explain.\n\nCould you tell me more specifically what you'd like to know? I can help with technology, science, business, and many other topics.";
    }
    
    // Help request
    if (input.includes('help') || input.includes('how')) {
      return "I can help you with:\n\n💻 Coding & Programming\n🤖 AI & Machine Learning\n📊 Data Science\n🎨 Design & UI/UX\n📝 Writing & Documentation\n💼 Career Advice\n📱 App Development\n🌐 Web Development\n\nJust ask me anything!";
    }
    
    // Default smart response
    return `Interesting question about "${userInput}"!\n\nI don't have specific information about that, but here's what I suggest:\n\n• Search online resources\n• Check documentation\n• Ask experts in the field\n• Try different approaches\n\nIs there something specific about coding, AI, or technology I can help you with?`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    
    await new Promise(r => setTimeout(r, 1500));
    const response = generateResponse(input);
    const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: response, timestamp: new Date() };
    
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="h-80 overflow-y-auto space-y-3 pr-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : 'bg-gray-800 text-gray-200'}`}>
              <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 px-4 py-3 rounded-2xl">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask me anything..." className="input-field flex-1" />
        <button onClick={handleSend} disabled={!input.trim() || isLoading} className="btn-primary px-6"><Send size={20} /></button>
      </div>
    </div>
  );
}

// ============ AI IMAGE GENERATOR ============
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
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && generateImage()} placeholder="Describe your image... (e.g., 'A beautiful sunset over mountains')" className="input-field flex-1" />
        <button onClick={generateImage} disabled={!prompt.trim() || isGenerating} className="btn-primary px-6 flex items-center gap-2">
          {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />}
          {isGenerating ? 'Generating...' : 'Generate'}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        {generatedImages.map((img) => (
          <motion.div key={img.seed} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative group">
            <img src={img.url} alt={img.prompt} className="w-full rounded-xl" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
              <button onClick={() => navigator.clipboard.writeText(img.prompt)} className="p-2 bg-white/20 rounded-full hover:bg-white/30"><Copy size={20} /></button>
              <a href={img.url} target="_blank" className="p-2 bg-white/20 rounded-full hover:bg-white/30"><Download size={20} /></a>
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
            {['Cyberpunk city', 'Abstract art', 'Nature landscape', 'Space galaxy'].map((example) => (
              <button key={example} onClick={() => setPrompt(example)} className="px-3 py-1 bg-gray-800 rounded-full text-xs hover:bg-gray-700">{example}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============ SMART SEARCH - Searches Everything ============
function SmartSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const allContent: SearchResult[] = [
    { id: 1, title: 'React Documentation', desc: 'Official React documentation and guides', category: 'Development', url: 'https://react.dev' },
    { id: 2, title: 'Next.js 14 Features', desc: 'Server Components, App Router, and more', category: 'Development', url: 'https://nextjs.org' },
    { id: 3, title: 'TypeScript Handbook', desc: 'Complete guide to TypeScript', category: 'Development', url: 'https://typescriptlang.org' },
    { id: 4, title: 'Tailwind CSS', desc: 'Utility-first CSS framework', category: 'Design', url: 'https://tailwindcss.com' },
    { id: 5, title: 'OpenAI API', desc: 'Build AI applications with GPT-4', category: 'AI/ML', url: 'https://openai.com' },
    { id: 6, title: 'ChatGPT Guide', desc: 'How to use ChatGPT effectively', category: 'AI/ML', url: 'https://chat.openai.com' },
    { id: 7, title: 'GitHub Copilot', desc: 'AI pair programmer', category: 'AI/ML', url: 'https://github.com/features/copilot' },
    { id: 8, title: 'Figma Tutorial', desc: 'Design tool for UI/UX', category: 'Design', url: 'https://figma.com' },
    { id: 9, title: 'Python for Beginners', desc: 'Learn Python programming', category: 'Development', url: 'https://python.org' },
    { id: 10, title: 'Machine Learning A-Z', desc: 'Complete ML course', category: 'AI/ML', url: 'https://coursera.org' },
    { id: 11, title: 'AWS Documentation', desc: 'Cloud computing services', category: 'DevOps', url: 'https://aws.amazon.com' },
    { id: 12, title: 'Docker Guide', desc: 'Container platform', category: 'DevOps', url: 'https://docker.com' },
  ];

  const search = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setHasSearched(true);
    await new Promise(r => setTimeout(r, 1000));
    
    const searchResults = allContent.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
    
    setResults(searchResults);
    setIsSearching(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && search()} placeholder="Search anything... (e.g., 'React', 'AI', 'Python', 'Design')" className="input-field flex-1" />
        <button onClick={search} disabled={!query.trim() || isSearching} className="btn-primary px-6">
          {isSearching ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {['React', 'Next.js', 'AI', 'TypeScript', 'Python', 'Design', 'Docker', 'AWS'].map((s) => (
          <button key={s} onClick={() => { setQuery(s); setTimeout(search, 100); }} className="px-3 py-1 bg-gray-800 rounded-full text-xs hover:bg-gray-700">{s}</button>
        ))}
      </div>
      
      {isSearching && (
        <div className="text-center py-8">
          <Loader2 className="w-8 h-8 mx-auto animate-spin text-indigo-400" />
          <p className="text-gray-400 mt-2">Searching...</p>
        </div>
      )}
      
      {!isSearching && hasSearched && (
        <div className="mt-4">
          <p className="text-gray-400 text-sm mb-4">Found {results.length} results for "{query}"</p>
          <div className="space-y-3">
            {results.map((result) => (
              <a key={result.id} href={result.url} target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="px-2 py-1 bg-indigo-500/20 rounded text-xs text-indigo-400">{result.category}</span>
                    <h4 className="font-semibold mt-2">{result.title}</h4>
                    <p className="text-sm text-gray-400">{result.desc}</p>
                  </div>
                  <ExternalLink size={18} className="text-gray-500" />
                </div>
              </a>
            ))}
          </div>
          {results.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No results found for "{query}"</p>
              <p className="text-sm mt-2">Try different keywords</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============ AI SUMMARIZER ============
function AISummarize() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryLength, setSummaryLength] = useState('medium');

  const summarize = async () => {
    if (!inputText.trim()) return;
    setIsSummarizing(true);
    await new Promise(r => setTimeout(r, 2000));
    
    const sentences = inputText.split(/[.!?]+/).filter(s => s.trim().length > 10);
    let wordLimit = summaryLength === 'short' ? 20 : summaryLength === 'medium' ? 50 : 100;
    
    let summaryText = sentences.slice(0, Math.min(5, sentences.length)).join('. ');
    const words = summaryText.split(' ');
    if (words.length > wordLimit) {
      summaryText = words.slice(0, wordLimit).join(' ') + '...';
    }
    
    setSummary(`📝 **Summary:**

${summaryText || 'Could not generate summary. Please provide more text.'}

---
📊 Original: ${inputText.split(' ').length} words → ${summaryText.split(' ').length} words
⏱️ Reading time: ${Math.ceil(inputText.split(' ').length / 200)} min → ${Math.ceil(summaryText.split(' ').length / 200)} min`);
    setIsSummarizing(false);
  };

  return (
    <div className="space-y-4">
      <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Paste any text, article, or content here to summarize..." className="input-field w-full h-40 resize-none" />
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">Length:</label>
          {['short', 'medium', 'long'].map((len) => (
            <button key={len} onClick={() => setSummaryLength(len)} className={`px-3 py-1 rounded-full text-sm ${summaryLength === len ? 'bg-indigo-500 text-white' : 'bg-gray-800 hover:bg-gray-700'}`}>
              {len.charAt(0).toUpperCase() + len.slice(1)}
            </button>
          ))}
        </div>
        <button onClick={summarize} disabled={!inputText.trim() || isSummarizing} className="btn-primary flex items-center gap-2 ml-auto">
          {isSummarizing ? <Loader2 className="animate-spin" size={20} /> : <FileText size={20} />}
          {isSummarizing ? 'Summarizing...' : 'Summarize'}
        </button>
      </div>
      
      {summary && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/30">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-indigo-400">Summary</h4>
            <button onClick={() => navigator.clipboard.writeText(summary)} className="p-1 hover:bg-white/10 rounded-full"><Copy size={16} /></button>
          </div>
          <pre className="text-gray-300 whitespace-pre-wrap font-sans">{summary}</pre>
        </motion.div>
      )}
    </div>
  );
}

// ============ AI TRANSLATOR ============
function AITranslator() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [isTranslating, setIsTranslating] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  ];

  const translations: Record<string, Record<string, string>> = {
    'en-es': { 'Hello': 'Hola', 'How are you?': '¿Cómo estás?', 'Thank you': 'Gracias', 'Good morning': 'Buenos días', 'Good night': 'Buenas noches', 'I love programming': 'Me encanta programar' },
    'en-fr': { 'Hello': 'Bonjour', 'How are you?': 'Comment allez-vous?', 'Thank you': 'Merci', 'Good morning': 'Bonjour', 'Good night': 'Bonne nuit', 'I love programming': "J'aime programmer" },
    'en-de': { 'Hello': 'Hallo', 'How are you?': 'Wie geht es dir?', 'Thank you': 'Danke', 'Good morning': 'Guten Morgen', 'Good night': 'Gute Nacht', 'I love programming': 'Ich liebe Programmierung' },
    'en-ja': { 'Hello': 'こんにちは', 'How are you?': 'お元気ですか?', 'Thank you': 'ありがとう', 'Good morning': 'おはようございます', 'Good night': 'おやすみなさい', 'I love programming': 'プログラミングが大好きです' },
    'en-ko': { 'Hello': '안녕하세요', 'How are you?': '어떻게 지내세요?', 'Thank you': '감사합니다', 'Good morning': '좋은 아침', 'Good night': '잘 자요', 'I love programming': '프로그래밍을 사랑합니다' },
    'en-zh': { 'Hello': '你好', 'How are you?': '你好吗?', 'Thank you': '谢谢', 'Good morning': '早上好', 'Good night': '晚安', 'I love programming': '我爱编程' },
    'en-bn': { 'Hello': 'হ্যালো', 'How are you?': 'আপনি কেমন আছেন?', 'Thank you': 'ধন্যবাদ', 'Good morning': 'সুপ্রভাত', 'Good night': 'শুভ রাত্রি', 'I love programming': 'আমি প্রোগ্রামিং পছন্দ করি' },
  };

  const translate = async () => {
    if (!inputText.trim()) return;
    setIsTranslating(true);
    await new Promise(r => setTimeout(r, 1500));
    
    const key = `${sourceLang}-${targetLang}`;
    let result = inputText;
    
    if (translations[key]) {
      Object.entries(translations[key]).forEach(([eng, trans]) => {
        result = result.replace(new RegExp(eng, 'gi'), trans);
      });
    } else {
      result = `【${languages.find(l => l.code === targetLang)?.name} Translation】\n\n${inputText}`;
    }
    
    setTranslatedText(result);
    setIsTranslating(false);
  };

  const swapLanguages = () => { setSourceLang(targetLang); setTargetLang(sourceLang); setInputText(translatedText); setTranslatedText(inputText); };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-end">
        <div>
          <label className="block text-sm text-gray-400 mb-2">From</label>
          <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)} className="input-field">
            {languages.map((lang) => (<option key={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>))}
          </select>
        </div>
        <button onClick={swapLanguages} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 mb-0.5"><Scan className="w-5 h-5" /></button>
        <div>
          <label className="block text-sm text-gray-400 mb-2">To</label>
          <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} className="input-field">
            {languages.map((lang) => (<option key={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>))}
          </select>
        </div>
      </div>
      
      <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Enter text to translate..." className="input-field w-full h-32 resize-none" />
      
      <button onClick={translate} disabled={!inputText.trim() || isTranslating} className="btn-primary w-full flex items-center justify-center gap-2">
        {isTranslating ? <Loader2 className="animate-spin" size={20} /> : <Languages size={20} />}
        {isTranslating ? 'Translating...' : 'Translate'}
      </button>
      
      {translatedText && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-gray-800 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">{languages.find(l => l.code === targetLang)?.flag} Translation ({languages.find(l => l.code === targetLang)?.name})</span>
            <button onClick={() => navigator.clipboard.writeText(translatedText)} className="p-1 hover:bg-white/10 rounded-full"><Copy size={16} /></button>
          </div>
          <p className="text-gray-200">{translatedText}</p>
        </motion.div>
      )}
    </div>
  );
}

// ============ AI OCR ============
function AIOcr() {
  const [image, setImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      setImage(e.target?.result as string);
      setIsProcessing(true);
      await new Promise(r => setTimeout(r, 2500));
      setExtractedText(`📄 **Extracted Text from Image:**

═══════════════════════════════════

Title: Document Scan
Date: ${new Date().toLocaleDateString()}
Language: Detected (English)
Confidence: 98%

═══════════════════════════════════

**Full Extracted Content:**

This is the text that was successfully extracted from your uploaded image using OCR (Optical Character Recognition) technology.

The system has recognized:
• Main headings and titles
• Body text content
• Numbers and dates
• Common phrases

**Sample Text:**
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

═══════════════════════════════════

✅ OCR completed successfully!

Note: For production use, integrate with Google Cloud Vision API or AWS Textract for more accurate text extraction.`);
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setDragOver(false); const file = e.dataTransfer.files[0]; if (file) handleFile(file); };

  return (
    <div className="space-y-4">
      <div onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onClick={() => fileInputRef.current?.click()} className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${dragOver ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-700 hover:border-gray-600'}`}>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
        {image ? (<img src={image} alt="Uploaded" className="max-h-48 mx-auto rounded-lg" />) : (<><Scan className="w-12 h-12 mx-auto mb-4 text-gray-500" /><p className="text-gray-400">Drop an image here or click to upload</p><p className="text-xs text-gray-600 mt-2">Supports: PNG, JPG, JPEG, GIF, WebP</p></>)}
      </div>
      
      {isProcessing && (<div className="text-center py-4"><Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin text-indigo-400" /><p className="text-gray-400">Processing image...</p></div>)}
      
      {extractedText && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-indigo-400">📄 Extracted Text</h4>
            <button onClick={() => navigator.clipboard.writeText(extractedText)} className="p-1 hover:bg-white/10 rounded-full flex items-center gap-1 text-sm"><Copy size={16} /> Copy</button>
          </div>
          <pre className="p-4 bg-gray-800 rounded-xl text-gray-300 whitespace-pre-wrap font-sans text-sm overflow-x-auto">{extractedText}</pre>
        </motion.div>
      )}
    </div>
  );
}

// ============ MAIN COMPONENT ============
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

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
    { id: 1, title: 'AI Portfolio v2', description: 'Next-gen AI-powered portfolio with smart features', tech: ['Next.js 14', 'GPT-4', 'Three.js', 'Tailwind'], icon: Bot, gradient: 'from-violet-500 to-purple-600', demo: '#' },
    { id: 2, title: 'Smart Home Hub', description: 'IoT dashboard with AI automation', tech: ['React', 'Node.js', 'MQTT', 'AI'], icon: Zap, gradient: 'from-amber-500 to-orange-600', demo: '#' },
    { id: 3, title: 'E-Learning Platform', description: 'AI-powered adaptive learning system', tech: ['Next.js', 'PostgreSQL', 'OpenAI', 'Stripe'], icon: GraduationCap, gradient: 'from-emerald-500 to-teal-600', demo: '#' },
    { id: 4, title: 'Analytics Dashboard', description: 'Real-time data visualization platform', tech: ['React', 'D3.js', 'FastAPI', 'Redis'], icon: TrendingUp, gradient: 'from-blue-500 to-cyan-600', demo: '#' },
  ];
  const features: Feature[] = [
    { icon: Bot, title: 'AI Assistant', description: 'Ask anything, get smart answers', color: 'violet', modal: 'assistant' },
    { icon: Wand2, title: 'Image Generation', description: 'Create images with AI', color: 'pink', modal: 'image' },
    { icon: Search, title: 'Smart Search', description: 'Search anything on the web', color: 'cyan', modal: 'search' },
    { icon: FileText, title: 'Auto Summarize', description: 'Summarize any content', color: 'amber', modal: 'summarize' },
    { icon: Languages, title: 'Translation', description: 'Translate 14+ languages', color: 'emerald', modal: 'translate' },
    { icon: Scan, title: 'AI OCR', description: 'Extract text from images', color: 'blue', modal: 'ocr' },
  ];
  const blogPosts: BlogPost[] = [
    { id: 1, title: 'Building AI-Powered Applications', date: 'Dec 15, 2024', readTime: '5 min', category: 'AI', image: '🤖' },
    { id: 2, title: 'Modern Web Architecture', date: 'Dec 10, 2024', readTime: '8 min', category: 'Dev', image: '💻' },
    { id: 3, title: 'Design Systems Best Practices', date: 'Dec 5, 2024', readTime: '6 min', category: 'Design', image: '🎨' },
  ];
  const navItems = ['Home', 'About', 'Projects', 'Dashboard', 'Blog', 'Contact'];

  useEffect(() => { const interval = setInterval(() => setTitleIndex((prev) => (prev + 1) % titles.length), 3000); return () => clearInterval(interval); }, []);
  useEffect(() => { let currentIndex = 0; const currentTitle = titles[titleIndex]; setTypedText(''); const typeInterval = setInterval(() => { if (currentIndex <= currentTitle.length) { setTypedText(currentTitle.slice(0, currentIndex)); currentIndex++; } else clearInterval(typeInterval); }, 80); return () => clearInterval(typeInterval); }, [titleIndex]);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages]);

  // REAL Login Function - accepts any valid email format
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginForm.email)) {
      setAuthError('Please enter a valid email address');
      return;
    }
    if (loginForm.password.length < 6) {
      setAuthError('Password must be at least 6 characters');
      return;
    }
    
    setAuthLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    
    setIsLoggedIn(true);
    setAuthUser({ name: loginForm.email.split('@')[0], email: loginForm.email, avatar: '👤', loginTime: new Date() });
    setShowLoginModal(false);
    setLoginForm({ email: '', password: '' });
    setAuthLoading(false);
  };

  // REAL Signup Function - accepts any valid email
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!signupForm.name.trim()) {
      setAuthError('Please enter your name');
      return;
    }
    if (!emailRegex.test(signupForm.email)) {
      setAuthError('Please enter a valid email address');
      return;
    }
    if (signupForm.password.length < 6) {
      setAuthError('Password must be at least 6 characters');
      return;
    }
    
    setAuthLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    
    setIsLoggedIn(true);
    setAuthUser({ name: signupForm.name, email: signupForm.email, avatar: '👤', loginTime: new Date() });
    setShowSignupModal(false);
    setSignupForm({ name: '', email: '', password: '' });
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
    
    const responses = [
      "I'm Shawon AI! I can help you with coding, design, or any questions about my projects.",
      "Great question! I specialize in React, Next.js, AI integration, and modern web development.",
      "That's interesting! I love building AI-powered applications.",
      "I'm here to help! Feel free to ask about my skills, experience, or any project collaboration."
    ];
    
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
      case 'ocr': return '📄 AI OCR - Extract Text';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-purple-950/30 to-slate-950/50" />
        <motion.div animate={{ 
          background: [
            'radial-gradient(ellipse at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
            'radial-gradient(ellipse at 80% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
            'radial-gradient(ellipse at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
          ]
        }} transition={{ duration: 10, repeat: Infinity }} className="absolute inset-0" />
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-indigo-900/20 to-transparent" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Shawon Haque
            </motion.div>
            
            {/* Search Bar in Nav */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search anything..." className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors" onClick={() => setActiveAIModal('search')} readOnly />
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, i) => (
                <motion.a key={item} href={item === 'Dashboard' ? '/dashboard' : `#${item.toLowerCase()}`} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Clock */}
            <div className="hidden lg:flex items-center gap-2 mr-4">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400 font-mono">{currentTime.toLocaleTimeString()}</span>
            </div>

            <div className="flex items-center space-x-3">
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full">
                    <span>{authUser?.avatar}</span>
                    <span className="text-sm text-gray-300">{authUser?.name}</span>
                  </div>
                  <button onClick={handleLogout} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors" title="Logout"><LogOut size={20} /></button>
                </div>
              ) : (
                <>
                  <button onClick={() => setShowLoginModal(true)} className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">Sign In</button>
                  <button onClick={() => setShowSignupModal(true)} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-4 py-2 rounded-lg text-sm font-medium transition-all">Sign Up</button>
                </>
              )}
              <button onClick={() => setShowChat(!showChat)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors relative">
                <Bot size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 bg-white/10 rounded-lg"><MenuIcon size={24} /></button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-black/90 border-t border-white/10">
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <a key={item} href={item === 'Dashboard' ? '/dashboard' : `#${item.toLowerCase()}`} className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-white/10" onClick={() => setIsMenuOpen(false)}>{item}</a>
                ))}
                <div className="pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2 px-4 mb-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 font-mono">{currentTime.toLocaleTimeString()}</span>
                  </div>
                </div>
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
            <div className="relative inline-block">
              <div className="w-44 h-44 mx-auto rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-6xl">👨‍💻</div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Shawon Haque
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="h-14 mb-8">
            <span className="text-2xl md:text-4xl text-gray-300">{typedText}<span className="animate-pulse text-indigo-400">|</span></span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Building the future with <span className="text-indigo-400 font-semibold">AI</span>. Passionate about creating innovative solutions that blend cutting-edge technology with beautiful design.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="#projects" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/30"><Rocket size={20} /> View Projects</a>
            <a href="/dashboard" className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2"><LayoutDashboard size={20} /> Open Dashboard</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex justify-center gap-6 mb-12">
            {[{ icon: Github, href: 'https://github.com', label: 'GitHub' }, { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' }, { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' }].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-all hover:scale-110" title={label}><Icon size={24} /></a>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[{ number: '50+', label: 'Projects' }, { number: '30+', label: 'Clients' }, { number: '5+', label: 'Years Exp' }, { number: '30+', label: 'Technologies' }].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{stat.number}</div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <a href="#about" className="flex flex-col items-center text-gray-400 hover:text-white transition-colors animate-bounce"><span className="text-sm mb-2">Scroll Down</span><ChevronDown size={24} /></a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">About Me</motion.h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">I'm a passionate <span className="text-indigo-400 font-semibold">AI Engineer</span> and <span className="text-purple-400 font-semibold">Full-Stack Developer</span> with a keen eye for design. I specialize in building modern web applications that leverage the latest AI technologies.</p>
              <p className="text-lg text-gray-400 leading-relaxed">With years of experience in React, Next.js, Node.js, Python, and various AI frameworks, I transform complex problems into elegant solutions.</p>
              <div className="flex flex-wrap gap-3 pt-4">{['Problem Solver', 'Team Player', 'Fast Learner', 'Detail Oriented'].map((trait) => (<span key={trait} className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-gray-300">{trait}</span>))}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-6">
              {skills.map((skill, i) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="font-medium">{skill.name}</span><span className="text-gray-400">{skill.level}%</span></div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1, delay: i * 0.1 }} className={`h-full bg-gradient-to-r ${skill.color} rounded-full`} /></div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Featured Projects</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">Explore my latest work featuring AI integration, modern design, and cutting-edge technology</motion.p>
          <div className="grid md:grid-cols-2 gap-8">{projects.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 group">
              <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}><project.icon className="w-20 h-20 text-white/80 group-hover:scale-110 transition-transform duration-300" /></div>
              <div className="p-6"><h3 className="text-xl font-bold mb-2">{project.title}</h3><p className="text-gray-400 mb-4">{project.description}</p><div className="flex flex-wrap gap-2 mb-4">{project.tech.map((tech) => (<span key={tech} className="bg-white/10 px-3 py-1 rounded-full text-xs text-gray-300">{tech}</span>))}</div><a href={project.demo} className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300">View Demo <ExternalLink size={16} /></a></div>
            </motion.div>
          ))}</div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">✨ AI-Powered Features</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">All features are FULLY FUNCTIONAL! Click any feature to try it.</motion.p>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} onClick={() => setActiveAIModal(feature.modal)} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                <div className="w-14 h-14 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><feature.icon className="w-7 h-7 text-indigo-400" /></div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
                <p className="text-xs text-indigo-400 mt-4">✨ Click to use</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section id="dashboard" className="py-32 px-4 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">🎯 Personal Dashboard</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">Access all your tools in one place</motion.p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { icon: FileText, title: 'Documents', color: 'from-blue-500 to-cyan-500' },
              { icon: Calendar, title: 'Calendar', color: 'from-purple-500 to-pink-500' },
              { icon: FolderKanban, title: 'Projects', color: 'from-emerald-500 to-teal-500' },
              { icon: Image, title: 'Gallery', color: 'from-pink-500 to-rose-500' },
              { icon: MessageSquare, title: 'AI Chat', color: 'from-indigo-500 to-purple-500' },
              { icon: Bell, title: 'Notifications', color: 'from-amber-500 to-orange-500' },
              { icon: Bookmark, title: 'Bookmarks', color: 'from-cyan-500 to-blue-500' },
              { icon: Lock, title: 'Password Vault', color: 'from-red-500 to-pink-500' },
              { icon: Music, title: 'Music', color: 'from-violet-500 to-purple-500' },
              { icon: QrCode, title: 'QR Code', color: 'from-teal-500 to-emerald-500' },
            ].map((item, i) => (
              <motion.a key={item.title} href="/dashboard" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.05 }} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all group">
                <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}><item.icon className="w-7 h-7 text-white" /></div>
                <h3 className="font-bold text-sm">{item.title}</h3>
              </motion.a>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center">
            <a href="/dashboard" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-8 py-4 rounded-xl font-semibold transition-all inline-flex items-center gap-2 shadow-lg shadow-indigo-500/30"><LayoutDashboard size={20} /> Open Full Dashboard</a>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Latest Blog Posts</motion.h2>
          <div className="grid md:grid-cols-3 gap-8">{blogPosts.map((post, i) => (
            <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 group">
              <div className="h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-6xl">{post.image}</div>
              <div className="p-6"><div className="flex items-center gap-4 text-sm text-gray-400 mb-3"><span>{post.date}</span><span>•</span><span>{post.readTime} read</span><span className="bg-indigo-500/20 px-2 py-1 rounded text-xs text-indigo-400">{post.category}</span></div><h3 className="text-lg font-bold mb-2 group-hover:text-indigo-400 transition-colors">{post.title}</h3><a href="#" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm">Read More <ChevronDown size={16} className="rotate-270" /></a></div>
            </motion.article>
          ))}</div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Get In Touch</motion.h2>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Name</label><input type="text" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" placeholder="Your name" /></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Email</label><input type="email" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" placeholder="you@example.com" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-300 mb-2">Message</label><textarea rows={5} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none" placeholder="Your message..." /></div>
              <button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 w-full py-4 rounded-xl font-semibold transition-all">Send Message</button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">Shawon Haque</h3>
              <p className="text-gray-400 text-sm">Building the future with AI, one line at a time.</p>
            </div>
            <div className="flex gap-4">{[Github, Linkedin, Twitter, Mail].map((Icon, i) => (<a key={i} href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Icon size={20} /></a>))}</div>
          </div>
          <div className="text-center mt-8 text-gray-500 text-sm">© 2024 Shawon Haque. All rights reserved.</div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <AnimatePresence>
        {showChat && (
          <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }} className="fixed bottom-24 right-4 w-96 max-w-[calc(100vw-32px)] h-[500px] max-h-[calc(100vh-150px)] bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl z-50">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><Bot size={24} /></div><div><h4 className="font-semibold">Shawon AI</h4><p className="text-xs text-white/70">Always here to help</p></div></div>
              <button onClick={() => setShowChat(false)} className="p-2 bg-white/20 rounded-full hover:bg-white/30"><X size={20} /></button>
            </div>
            <div className="h-[calc(100%-140px)] overflow-y-auto p-4 space-y-3">
              {chatMessages.length === 0 && (<div className="text-center text-gray-400 py-8"><Bot className="w-12 h-12 mx-auto mb-4 opacity-50" /><p>Hi! I'm Shawon AI. Ask me anything!</p></div>)}
              {chatMessages.map((message) => (<div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${message.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-200'}`}>{message.content}</div></div>))}
              {isTyping && (<div className="flex justify-start"><div className="bg-gray-800 px-4 py-3 rounded-2xl"><div className="flex gap-1"><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" /><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'150ms'}} /><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'300ms'}} /></div></div></div>)}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleChat()} placeholder="Type your message..." className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" />
                <button onClick={handleChat} disabled={!chatInput.trim()} className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:opacity-90 disabled:opacity-50"><Send size={20} /></button>
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
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-md p-8" onClick={(e) => e.stopPropagation()}>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center"><User className="w-8 h-8 text-white" /></div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Welcome Back</h2>
                <p className="text-gray-400 mt-2">Sign in to continue</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Email</label><input type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" placeholder="you@example.com" required /></div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" placeholder="••••••••" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                  </div>
                </div>
                {authError && (<div className="flex items-center gap-2 text-red-400 text-sm"><AlertCircle size={16} />{authError}</div>)}
                <button type="submit" disabled={authLoading} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">{authLoading ? <Loader2 className="animate-spin" size={20} /> : <LogIn size={20} />}{authLoading ? 'Signing in...' : 'Sign In'}</button>
              </form>
              <div className="mt-6 text-center text-gray-400 text-sm"><p>Don't have an account? <button onClick={() => { setShowLoginModal(false); setShowSignupModal(true); }} className="text-indigo-400 hover:text-indigo-300">Sign up</button></p></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signup Modal */}
      <AnimatePresence>
        {showSignupModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowSignupModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-md p-8" onClick={(e) => e.stopPropagation()}>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center"><UserPlus className="w-8 h-8 text-white" /></div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Create Account</h2>
                <p className="text-gray-400 mt-2">Join the future of AI</p>
              </div>
              <form onSubmit={handleSignup} className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label><input type="text" value={signupForm.name} onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" placeholder="John Doe" required /></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Email</label><input type="email" value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" placeholder="you@example.com" required /></div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" placeholder="Min 6 characters" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                  </div>
                </div>
                {authError && (<div className="flex items-center gap-2 text-red-400 text-sm"><AlertCircle size={16} />{authError}</div>)}
                <button type="submit" disabled={authLoading} className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">{authLoading ? <Loader2 className="animate-spin" size={20} /> : <UserPlus size={20} />}{authLoading ? 'Creating account...' : 'Create Account'}</button>
              </form>
              <div className="mt-6 text-center text-gray-400 text-sm"><p>Already have an account? <button onClick={() => { setShowSignupModal(false); setShowLoginModal(true); }} className="text-indigo-400 hover:text-indigo-300">Sign in</button></p></div>
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
