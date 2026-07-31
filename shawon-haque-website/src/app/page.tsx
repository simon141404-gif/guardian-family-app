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
  Search, Wand2, Languages, Mic,
  Send, TrendingUp, User, File, Sparkle,
  Shield, Rocket, Target, Award, Users, Heart,
  Play, Pause, SkipForward, Volume2,
  Camera, Video, Phone, Paperclip, Smile,
  LogIn, LogOut, UserPlus, Key, Fingerprint,
  Check, AlertCircle, Loader2
} from 'lucide-react';

// Types
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AuthUser {
  name: string;
  email: string;
  avatar: string;
  loginTime: Date;
}

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  icon: any;
  gradient: string;
  demo: string;
}

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface Feature {
  icon: any;
  title: string;
  description: string;
  color: string;
}

interface BlogPost {
  id: number;
  title: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

// Main Component
export default function Home() {
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // UI State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);

  // Chat State
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Data
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
    { icon: Bot, title: 'AI Assistant', description: 'GPT-4 powered intelligent chatbot', color: 'violet' },
    { icon: Wand2, title: 'Image Generation', description: 'Create images with AI', color: 'pink' },
    { icon: Search, title: 'Smart Search', description: 'AI-powered semantic search', color: 'cyan' },
    { icon: File, title: 'Auto Summarize', description: 'Summarize any content instantly', color: 'amber' },
    { icon: Languages, title: 'Translation', description: 'Translate 100+ languages', color: 'emerald' },
    { icon: Sparkle, title: 'Code Helper', description: 'AI code generation & review', color: 'blue' },
  ];

  const blogPosts: BlogPost[] = [
    { id: 1, title: 'Building AI-Powered Applications', date: 'Dec 15, 2024', readTime: '5 min', category: 'AI', image: '🤖' },
    { id: 2, title: 'Modern Web Architecture', date: 'Dec 10, 2024', readTime: '8 min', category: 'Dev', image: '💻' },
    { id: 3, title: 'Design Systems Best Practices', date: 'Dec 5, 2024', readTime: '6 min', category: 'Design', image: '🎨' },
  ];

  const navItems = ['Home', 'About', 'Projects', 'Blog', 'Contact'];

  // Effects
  useEffect(() => {
    const interval = setInterval(() => setTitleIndex((prev) => (prev + 1) % titles.length), 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const currentTitle = titles[titleIndex];
    setTypedText('');
    const typeInterval = setInterval(() => {
      if (currentIndex <= currentTitle.length) {
        setTypedText(currentTitle.slice(0, currentIndex));
        currentIndex++;
      } else clearInterval(typeInterval);
    }, 80);
    return () => clearInterval(typeInterval);
  }, [titleIndex]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Auth Functions
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (loginForm.email && loginForm.password) {
      setIsLoggedIn(true);
      setAuthUser({ name: loginForm.email.split('@')[0], email: loginForm.email, avatar: '👤', loginTime: new Date() });
      setShowLoginModal(false);
      setLoginForm({ email: '', password: '' });
    } else setAuthError('Please enter valid credentials');
    setAuthLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (signupForm.name && signupForm.email && signupForm.password) {
      setIsLoggedIn(true);
      setAuthUser({ name: signupForm.name, email: signupForm.email, avatar: '👤', loginTime: new Date() });
      setShowSignupModal(false);
      setSignupForm({ name: '', email: '', password: '' });
    } else setAuthError('Please fill all fields');
    setAuthLoading(false);
  };

  const handleLogout = () => { setIsLoggedIn(false); setAuthUser(null); };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', content: chatInput, timestamp: new Date() };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const responses = [
      "I'm Shawon AI! I can help you with coding, design, or any questions about my projects. What would you like to know?",
      "Great question! I specialize in React, Next.js, AI integration, and modern web development. How can I assist you today?",
      "That's interesting! I love building AI-powered applications. Would you like to see some of my recent work?",
      "I'm here to help! Feel free to ask about my skills, experience, or any project collaboration opportunities."
    ];
    const aiMessage: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: responses[Math.floor(Math.random() * responses.length)], timestamp: new Date() };
    setIsTyping(false);
    setChatMessages(prev => [...prev, aiMessage]);
  };

  return (
    <div className="min-h-screen relative">
      {/* Aurora Background */}
      <div className="aurora-bg">
        <div className="aurora-blob" style={{ width: 600, height: 600, background: 'rgba(99, 102, 241, 0.4)', top: '10%', left: '20%' }} />
        <div className="aurora-blob" style={{ width: 500, height: 500, background: 'rgba(236, 72, 153, 0.3)', top: '50%', right: '10%', animationDelay: '-5s' }} />
        <div className="aurora-blob" style={{ width: 400, height: 400, background: 'rgba(34, 211, 238, 0.3)', bottom: '10%', left: '30%', animationDelay: '-10s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass-strong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-xl font-bold gradient-text cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Shawon Haque
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, i) => (
                <motion.a key={item} href={`#${item.toLowerCase()}`} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-sm font-medium transition-colors hover:text-indigo-400 text-gray-300">
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 glass px-3 py-2 rounded-full">
                    <span>{authUser?.avatar}</span>
                    <span className="text-sm text-gray-300">{authUser?.name}</span>
                  </div>
                  <button onClick={handleLogout} className="p-2 rounded-lg glass hover:bg-white/10 transition-colors" title="Logout"><LogOut size={20} /></button>
                </div>
              ) : (
                <>
                  <button onClick={() => setShowLoginModal(true)} className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">Sign In</button>
                  <button onClick={() => setShowSignupModal(true)} className="btn-primary text-sm px-4 py-2">Sign Up</button>
                </>
              )}
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-lg glass hover:bg-white/10 transition-colors">{isDarkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
              <button onClick={() => setShowChat(!showChat)} className="p-2 rounded-lg glass hover:bg-white/10 transition-colors relative">
                <Bot size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg glass">{isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}</button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden glass-strong border-t border-white/10">
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-white/10 transition-colors" onClick={() => setIsMenuOpen(false)}>{item}</a>
                ))}
                {!isLoggedIn && <button onClick={() => { setIsMenuOpen(false); setShowLoginModal(true); }} className="w-full text-left px-4 py-2 text-indigo-400">Sign In</button>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 relative">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="mb-8">
            <div className="relative inline-block">
              <div className="w-44 h-44 mx-auto rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1 glow-primary animate-pulse-glow">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-6xl">👨‍💻</div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center animate-float">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-bold mb-4">
            <span className="gradient-text">Shawon Haque</span>
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="h-14 mb-8">
            <span className="text-2xl md:text-4xl text-gray-300">{typedText}<span className="animate-pulse text-indigo-400">|</span></span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Building the future with <span className="text-indigo-400 font-semibold">AI</span>. Passionate about creating innovative solutions that blend cutting-edge technology with beautiful design and exceptional user experiences.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="#projects" className="btn-primary flex items-center gap-2 text-lg px-8 py-4"><Rocket size={20} /> View Projects</a>
            <a href="#contact" className="btn-secondary flex items-center gap-2 text-lg px-8 py-4"><Mail size={20} /> Contact Me</a>
          </motion.div>

          {/* Social Links */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex justify-center gap-6 mb-12">
            {[{ icon: Github, href: 'https://github.com', label: 'GitHub' }, { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' }, { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' }].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="p-4 rounded-full glass hover:bg-white/10 transition-all hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/20" title={label}><Icon size={24} /></a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[{ number: '50+', label: 'Projects' }, { number: '30+', label: 'Clients' }, { number: '5+', label: 'Years Exp' }, { number: '30+', label: 'Technologies' }].map((stat, i) => (
              <div key={i} className="glass rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-3xl font-bold gradient-text">{stat.number}</div>
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
      <section id="about" className="py-32 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">About Me</motion.h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">I'm a passionate <span className="text-indigo-400 font-semibold">AI Engineer</span> and <span className="text-purple-400 font-semibold">Full-Stack Developer</span> with a keen eye for design. I specialize in building modern web applications that leverage the latest AI technologies.</p>
              <p className="text-lg text-gray-400 leading-relaxed">With years of experience in React, Next.js, Node.js, Python, and various AI frameworks, I transform complex problems into elegant solutions.</p>
              <div className="flex flex-wrap gap-3 pt-4">
                {['Problem Solver', 'Team Player', 'Fast Learner', 'Detail Oriented'].map((trait) => (<span key={trait} className="px-4 py-2 glass rounded-full text-sm text-gray-300">{trait}</span>))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-6">
              {skills.map((skill, i) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="font-medium">{skill.name}</span><span className="text-gray-400">{skill.level}%</span></div>
                  <div className="h-3 glass rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1, delay: i * 0.1 }} className={`h-full bg-gradient-to-r ${skill.color} rounded-full`} />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">Featured Projects</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">Explore my latest work featuring AI integration, modern design, and cutting-edge technology</motion.p>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 group">
                <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}>
                  <project.icon className="w-20 h-20 text-white/80 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">{project.tech.map((tech) => (<span key={tech} className="px-3 py-1 glass rounded-full text-xs text-gray-300">{tech}</span>))}</div>
                  <a href={project.demo} className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors">View Demo <ExternalLink size={16} /></a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-32 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">AI-Powered Features</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">Experience the power of AI with intelligent features designed to boost your productivity</motion.p>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                <div className="w-14 h-14 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-32 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">Latest Blog Posts</motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 group">
                <div className="h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-6xl">{post.image}</div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span>{post.date}</span><span>•</span><span>{post.readTime} read</span>
                    <span className="px-2 py-1 glass rounded text-xs text-indigo-400">{post.category}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-400 transition-colors">{post.title}</h3>
                  <a href="#" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm">Read More <ChevronDown size={16} className="rotate-270" /></a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">Get In Touch</motion.h2>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Name</label><input type="text" className="input-field" placeholder="Your name" /></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Email</label><input type="email" className="input-field" placeholder="you@example.com" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-300 mb-2">Message</label><textarea rows={5} className="input-field resize-none" placeholder="Your message..." /></div>
              <button type="submit" className="btn-primary w-full text-lg py-4">Send Message</button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold gradient-text mb-2">Shawon Haque</h3>
              <p className="text-gray-400 text-sm">Building the future with AI, one line at a time.</p>
            </div>
            <div className="flex gap-4">{[Github, Linkedin, Twitter, Mail].map((Icon, i) => (<a key={i} href="#" className="p-3 glass rounded-full hover:bg-white/10 transition-colors"><Icon size={20} /></a>))}</div>
          </div>
          <div className="text-center mt-8 text-gray-500 text-sm">© 2024 Shawon Haque. All rights reserved.</div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <AnimatePresence>
        {showChat && (
          <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }} className="fixed bottom-24 right-4 w-96 max-w-[calc(100vw-32px)] h-[500px] max-h-[calc(100vh-150px)] glass-strong rounded-2xl overflow-hidden shadow-2xl z-50">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><Bot size={24} /></div>
                <div><h4 className="font-semibold">Shawon AI</h4><p className="text-xs text-white/70">Always here to help</p></div>
              </div>
              <button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors"><X size={20} /></button>
            </div>
            <div className="h-[calc(100%-140px)] overflow-y-auto p-4 space-y-4">
              {chatMessages.length === 0 && (<div className="text-center text-gray-400 py-8"><Bot className="w-12 h-12 mx-auto mb-4 opacity-50" /><p>Hi! I'm Shawon AI. Ask me anything!</p></div>)}
              {chatMessages.map((message) => (<div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`chat-bubble ${message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'}`}>{message.content}</div></div>))}
              {isTyping && (<div className="flex justify-start"><div className="chat-bubble chat-bubble-assistant"><div className="typing-indicator"><span></span><span></span><span></span></div></div></div>)}
              <div ref={chatEndRef} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleChat()} placeholder="Type your message..." className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" />
                <button onClick={handleChat} disabled={!chatInput.trim()} className="px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"><Send size={20} /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowLoginModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="login-card w-full max-w-md p-8" onClick={(e) => e.stopPropagation()}>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"><User className="w-8 h-8 text-white" /></div>
                <h2 className="text-2xl font-bold gradient-text">Welcome Back</h2>
                <p className="text-gray-400 mt-2">Sign in to continue</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Email</label><input type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} className="input-field" placeholder="you@example.com" required /></div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} className="input-field pr-12" placeholder="••••••••" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                  </div>
                </div>
                {authError && (<div className="flex items-center gap-2 text-red-400 text-sm"><AlertCircle size={16} />{authError}</div>)}
                <button type="submit" disabled={authLoading} className="btn-primary w-full flex items-center justify-center gap-2">{authLoading ? <Loader2 className="animate-spin" size={20} /> : <LogIn size={20} />}{authLoading ? 'Signing in...' : 'Sign In'}</button>
              </form>
              <div className="mt-6 text-center text-gray-400 text-sm"><p>Don't have an account? <button onClick={() => { setShowLoginModal(false); setShowSignupModal(true); }} className="text-indigo-400 hover:text-indigo-300">Sign up</button></p></div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-center text-xs text-gray-500 mb-4">Or continue with</p>
                <div className="flex gap-3">
                  <button className="flex-1 glass py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center"><svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg></button>
                  <button className="flex-1 glass py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center"><Github size={20} /></button>
                  <button className="flex-1 glass py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center"><Fingerprint size={20} /></button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signup Modal */}
      <AnimatePresence>
        {showSignupModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowSignupModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="login-card w-full max-w-md p-8" onClick={(e) => e.stopPropagation()}>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center"><UserPlus className="w-8 h-8 text-white" /></div>
                <h2 className="text-2xl font-bold gradient-text">Create Account</h2>
                <p className="text-gray-400 mt-2">Join the future of AI</p>
              </div>
              <form onSubmit={handleSignup} className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label><input type="text" value={signupForm.name} onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })} className="input-field" placeholder="John Doe" required /></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Email</label><input type="email" value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} className="input-field" placeholder="you@example.com" required /></div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} className="input-field pr-12" placeholder="Min 8 characters" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                  </div>
                </div>
                {authError && (<div className="flex items-center gap-2 text-red-400 text-sm"><AlertCircle size={16} />{authError}</div>)}
                <button type="submit" disabled={authLoading} className="btn-primary w-full flex items-center justify-center gap-2">{authLoading ? <Loader2 className="animate-spin" size={20} /> : <UserPlus size={20} />}{authLoading ? 'Creating account...' : 'Create Account'}</button>
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
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
