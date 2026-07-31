'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Twitter, Mail, ExternalLink, 
  Code2, Palette, Sparkles, Zap, Globe, Bot,
  ChevronDown, Menu, X, Sun, Moon,
  FileText, Calendar, FolderKanban, Image, 
  MessageSquare, Bell, Bookmark, Lock, Settings,
  LayoutDashboard, Music, QrCode,
  Search, Wand2, Languages, Mic,
  Send, TrendingUp, User, File
} from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: string, content: string}[]>([]);
  const [chatInput, setChatInput] = useState('');
  
  const titles = ['AI Engineer', 'Developer', 'Designer', 'Creator'];
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const currentTitle = titles[titleIndex];
    setTypedText('');
    setIsTyping(true);
    
    const typeInterval = setInterval(() => {
      if (currentIndex <= currentTitle.length) {
        setTypedText(currentTitle.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 100);
    
    return () => clearInterval(typeInterval);
  }, [titleIndex]);

  const navItems = ['Home', 'About', 'Portfolio', 'Blog', 'Dashboard', 'Contact'];

  const skills = [
    { name: 'React', level: 95, color: 'from-cyan-400 to-blue-500' },
    { name: 'Next.js', level: 92, color: 'from-white to-gray-400' },
    { name: 'TypeScript', level: 90, color: 'from-blue-400 to-indigo-500' },
    { name: 'Node.js', level: 88, color: 'from-green-400 to-emerald-500' },
    { name: 'Python', level: 85, color: 'from-yellow-400 to-orange-500' },
    { name: 'AI/ML', level: 80, color: 'from-purple-400 to-pink-500' },
  ];

  const projects = [
    { title: 'AI Portfolio', desc: 'AI-powered personal website with smart features', tech: ['Next.js', 'OpenAI', 'Three.js'], icon: Bot, color: 'from-violet-500 to-purple-500' },
    { title: 'E-Commerce Platform', desc: 'Full-stack modern shopping experience', tech: ['React', 'Node.js', 'MongoDB'], icon: Globe, color: 'from-blue-500 to-cyan-500' },
    { title: 'Task Manager', desc: 'Productivity app with AI suggestions', tech: ['Next.js', 'Firebase', 'OpenAI'], icon: Zap, color: 'from-amber-500 to-orange-500' },
    { title: 'Design System', desc: 'Complete design system with components', tech: ['React', 'Storybook', 'Tailwind'], icon: Palette, color: 'from-pink-500 to-rose-500' },
  ];

  const features = [
    { icon: Bot, title: 'AI Assistant', desc: 'Intelligent chatbot powered by GPT-4', color: 'violet' },
    { icon: Wand2, title: 'AI Image Gen', desc: 'Create images with AI', color: 'pink' },
    { icon: Search, title: 'AI Search', desc: 'Smart search powered by AI', color: 'cyan' },
    { icon: File, title: 'AI Summarize', desc: 'Summarize any content', color: 'amber' },
    { icon: Languages, title: 'AI Translate', desc: 'Translate 100+ languages', color: 'emerald' },
    { icon: Image, title: 'AI OCR', desc: 'Extract text from images', color: 'blue' },
  ];

  const tools = [
    { icon: LayoutDashboard, title: 'Dashboard', desc: 'Personal dashboard' },
    { icon: FileText, title: 'Documents', desc: 'Create & manage docs' },
    { icon: Calendar, title: 'Calendar', desc: 'Schedule management' },
    { icon: FolderKanban, title: 'Projects', desc: 'Project management' },
    { icon: Image, title: 'Gallery', desc: 'Photo management' },
    { icon: MessageSquare, title: 'AI Chat', desc: 'Chat with AI' },
    { icon: Bell, title: 'Notifications', desc: 'Stay updated' },
    { icon: Bookmark, title: 'Bookmarks', desc: 'Save links' },
    { icon: Lock, title: 'Password Vault', desc: 'Secure passwords' },
    { icon: Music, title: 'Music Player', desc: 'Listen to music' },
    { icon: QrCode, title: 'QR Profile', desc: 'Digital business card' },
    { icon: Settings, title: 'Settings', desc: 'App configuration' },
  ];

  const handleChat = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { role: 'user', content: chatInput }]);
      setChatInput('');
      setTimeout(() => {
        setChatMessages(prev => [...prev, { role: 'assistant', content: 'I am Shawon AI, your personal assistant. How can I help you today?' }]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold gradient-text"
            >
              Shawon Haque
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`text-sm font-medium transition-colors hover:text-indigo-400 ${
                    activeSection === item.toLowerCase() ? 'text-indigo-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button
                onClick={() => setShowChat(!showChat)}
                className="p-2 rounded-lg glass hover:bg-white/10 transition-colors relative"
              >
                <Bot size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg glass"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-strong border-t border-white/10"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-white/10 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1 glow-primary">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-6xl">
                👨‍💻
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            <span className="gradient-text">Shawon Haque</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="h-12 mb-8"
          >
            <span className="text-2xl md:text-3xl text-gray-400">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-12"
          >
            Building the future with AI. Passionate about creating innovative solutions 
            that blend cutting-edge technology with beautiful design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a href="#portfolio" className="btn-primary flex items-center gap-2">
              <Code2 size={20} /> View Projects
            </a>
            <a href="#contact" className="btn-secondary flex items-center gap-2">
              <Mail size={20} /> Contact Me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center gap-6 mt-12"
          >
            <a href="https://github.com" target="_blank" className="p-3 rounded-full glass hover:bg-white/10 transition-all hover:scale-110">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" className="p-3 rounded-full glass hover:bg-white/10 transition-all hover:scale-110">
              <Linkedin size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" className="p-3 rounded-full glass hover:bg-white/10 transition-all hover:scale-110">
              <Twitter size={24} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <a href="#about" className="flex flex-col items-center text-gray-400 hover:text-white transition-colors animate-bounce">
              <span className="text-sm mb-2">Scroll Down</span>
              <ChevronDown size={24} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16 gradient-text"
          >
            About Me
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate AI Engineer and Full-Stack Developer with a keen eye for design. 
                I specialize in building modern web applications that leverage the latest AI technologies 
                to create intelligent, user-friendly experiences.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                With years of experience in React, Next.js, Node.js, and various AI frameworks, 
                I transform complex problems into elegant solutions. My focus is on creating 
                products that are not only functional but also visually stunning and accessible.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { label: 'Projects', value: '50+' },
                  { label: 'Clients', value: '30+' },
                  { label: 'Experience', value: '5+ Years' },
                  { label: 'Technologies', value: '30+' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-xl p-4 text-center"
                  >
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold mb-4">Skills</h3>
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16 gradient-text"
          >
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.color} p-0.5 mb-4`}>
                  <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center">
                    <project.icon size={28} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 text-xs rounded-full bg-white/10 text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
                  <button className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300">
                    <ExternalLink size={16} /> Demo
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
                    <Github size={16} /> Code
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-4 gradient-text"
          >
            AI-Powered Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center text-gray-400 mb-16 max-w-2xl mx-auto"
          >
            Experience the power of AI with these intelligent features designed to boost your productivity
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-xl p-4 text-center hover:bg-white/10 transition-all cursor-pointer group"
              >
                <div className={`w-12 h-12 mx-auto rounded-xl bg-${feature.color}-500/20 flex items-center justify-center mb-3 group-hover:bg-${feature.color}-500/30 transition-colors`}>
                  <feature.icon size={24} className={`text-${feature.color}-400`} />
                </div>
                <h4 className="font-medium text-sm">{feature.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section id="dashboard" className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16 gradient-text"
          >
            Personal Dashboard
          </motion.h2>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-xl p-4 text-center hover:bg-white/10 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-3 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all">
                  <tool.icon size={24} className="text-indigo-400" />
                </div>
                <h4 className="font-medium text-sm">{tool.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{tool.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <a href="/dashboard" className="btn-primary inline-flex items-center gap-2">
              <LayoutDashboard size={20} /> Open Dashboard
            </a>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16 gradient-text"
          >
            Latest Blog Posts
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Building AI-Powered Applications', date: 'Dec 15, 2024', read: '5 min', cat: 'AI' },
              { title: 'Modern Web Architecture', date: 'Dec 10, 2024', read: '8 min', cat: 'Dev' },
              { title: 'Design Systems Best Practices', date: 'Dec 5, 2024', read: '6 min', cat: 'Design' },
            ].map((post, i) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-2xl overflow-hidden hover:bg-white/10 transition-all cursor-pointer group"
              >
                <div className="h-40 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                  <FileText size={48} className="text-indigo-400/50" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.read} read</span>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs">
                      {post.cat}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-indigo-400 transition-colors">
                    {post.title}
                  </h3>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16 gradient-text"
          >
            Get In Touch
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                <Send size={20} /> Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold gradient-text mb-4">Shawon Haque</div>
          <p className="text-gray-400 mb-6">Building the future with AI, one line at a time.</p>
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://github.com" className="p-3 rounded-full glass hover:bg-white/10 transition-all">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" className="p-3 rounded-full glass hover:bg-white/10 transition-all">
              <Linkedin size={20} />
            </a>
            <a href="https://twitter.com" className="p-3 rounded-full glass hover:bg-white/10 transition-all">
              <Twitter size={20} />
            </a>
          </div>
          <p className="text-sm text-gray-500">© 2024 Shawon Haque. All rights reserved.</p>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] glass-strong rounded-2xl flex flex-col overflow-hidden z-50"
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h4 className="font-semibold">Shawon AI</h4>
                  <p className="text-xs text-green-400">Online</p>
                </div>
              </div>
              <button onClick={() => setShowChat(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                  <Bot size={16} />
                </div>
                <div className="glass rounded-xl p-3 max-w-[80%]">
                  <p className="text-sm">Hello! I'm Shawon AI, your personal assistant. How can I help you today?</p>
                </div>
              </div>
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.role === 'user' ? (
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs">👤</span>
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                      <Bot size={16} />
                    </div>
                  )}
                  <div className={`glass rounded-xl p-3 max-w-[80%] ${msg.role === 'user' ? 'bg-purple-500/20' : ''}`}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChat()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 outline-none text-sm"
                />
                <button onClick={handleChat} className="p-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition-colors">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
