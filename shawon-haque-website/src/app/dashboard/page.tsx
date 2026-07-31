'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FileText, Calendar, FolderKanban, Image,
  MessageSquare, Bell, Bookmark, Lock, Settings,
  Music, QrCode, Search, TrendingUp, User, Sparkle,
  Plus, Moon, Sun, LogOut, ChevronLeft, ChevronRight,
  Clock, Activity, Target, Award, Users, Zap, Heart,
  Play, Pause, SkipForward, Volume2, Mic, Send
} from 'lucide-react';

interface QuickAction {
  icon: any;
  title: string;
  subtitle: string;
  color: string;
}

interface Document {
  id: number;
  title: string;
  type: string;
  date: string;
  size: string;
}

interface Task {
  id: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

interface AISuggestion {
  id: number;
  text: string;
  icon: string;
}

export default function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: 'assistant', content: 'Hi! I\'m your AI assistant. How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const quickActions: QuickAction[] = [
    { icon: FileText, title: 'New Document', subtitle: 'Create a doc', color: 'from-blue-500 to-cyan-500' },
    { icon: Calendar, title: 'Schedule', subtitle: 'Add event', color: 'from-purple-500 to-pink-500' },
    { icon: MessageSquare, title: 'AI Chat', subtitle: 'Ask anything', color: 'from-indigo-500 to-purple-500' },
    { icon: Image, title: 'Gallery', subtitle: 'View photos', color: 'from-pink-500 to-rose-500' },
    { icon: FolderKanban, title: 'Projects', subtitle: 'Manage', color: 'from-orange-500 to-amber-500' },
    { icon: QrCode, title: 'QR Code', subtitle: 'Generate', color: 'from-emerald-500 to-teal-500' },
  ];

  const documents: Document[] = [
    { id: 1, title: 'Project Roadmap 2024', type: 'PDF', date: 'Dec 15, 2024', size: '2.4 MB' },
    { id: 2, title: 'Meeting Notes', type: 'DOC', date: 'Dec 14, 2024', size: '156 KB' },
    { id: 3, title: 'Design System', type: 'FIG', date: 'Dec 12, 2024', size: '15.8 MB' },
    { id: 4, title: 'API Documentation', type: 'MD', date: 'Dec 10, 2024', size: '89 KB' },
  ];

  const tasks: Task[] = [
    { id: 1, title: 'Complete API integration', priority: 'high', completed: false },
    { id: 2, title: 'Design review meeting', priority: 'medium', completed: false },
    { id: 3, title: 'Update documentation', priority: 'low', completed: true },
    { id: 4, title: 'Deploy to production', priority: 'high', completed: false },
  ];

  const aiSuggestions: AISuggestion[] = [
    { id: 1, text: 'Optimize database queries for better performance', icon: '🚀' },
    { id: 2, text: 'Add error handling to improve reliability', icon: '⚠️' },
    { id: 3, text: 'Consider implementing caching mechanism', icon: '💾' },
    { id: 4, text: 'Review and refactor legacy code sections', icon: '🔧' },
  ];

  const stats = [
    { label: 'Tasks Done', value: '24', icon: Target, color: 'text-emerald-400' },
    { label: 'Hours Tracked', value: '142', icon: Clock, color: 'text-blue-400' },
    { label: 'Projects', value: '8', icon: FolderKanban, color: 'text-purple-400' },
    { label: 'Streak Days', value: '15', icon: Zap, color: 'text-amber-400' },
  ];

  const handleChat = () => {
    if (!chatInput.trim()) return;
    setMessages([...messages, { role: 'user', content: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'I\'m working on that! Let me help you with your task.' }]);
    }, 1000);
  };

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'overview' },
    { icon: FileText, label: 'Documents', id: 'docs' },
    { icon: FolderKanban, label: 'Projects', id: 'projects' },
    { icon: Calendar, label: 'Calendar', id: 'calendar' },
    { icon: MessageSquare, label: 'Messages', id: 'messages', badge: 3 },
    { icon: Bell, label: 'Notifications', id: 'notifications', badge: 5 },
    { icon: Bookmark, label: 'Bookmarks', id: 'bookmarks' },
    { icon: Image, label: 'Gallery', id: 'gallery' },
    { icon: Music, label: 'Music', id: 'music' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: 280 }}
        animate={{ width: isSidebarCollapsed ? 80 : 280 }}
        className="fixed left-0 top-0 h-full glass-strong z-30 flex flex-col"
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkle className="w-6 h-6 text-white" />
            </div>
            {!isSidebarCollapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-bold gradient-text">
                Shawon AI
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'hover:bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <item.icon size={22} />
              {!isSidebarCollapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 text-left text-sm font-medium">
                  {item.label}
                </motion.span>
              )}
              {!isSidebarCollapsed && item.badge && (
                <span className="px-2 py-0.5 text-xs font-bold bg-pink-500 rounded-full">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Collapse Button */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="p-4 border-t border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 p-8 ${isSidebarCollapsed ? 'ml-20' : 'ml-[280px]'} transition-all duration-300`}>
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Welcome back, Shawon!</h1>
            <p className="text-gray-400 mt-1">Here's what's happening with your projects today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-3 glass rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <button className="p-3 glass rounded-xl hover:bg-white/10 transition-colors relative">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3 glass px-4 py-2 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm">👤</div>
              <span className="text-sm font-medium">Shawon</span>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <span className="text-3xl font-bold gradient-text">{stat.value}</span>
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Quick Actions</h2>
                <button className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
                  <Plus size={16} /> Add New
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {quickActions.map((action, i) => (
                  <motion.button
                    key={action.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="p-4 glass rounded-xl hover:bg-white/10 transition-all text-left group"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm">{action.title}</h3>
                    <p className="text-xs text-gray-400">{action.subtitle}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Documents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6 mt-8"
            >
              <h2 className="text-xl font-bold mb-6">Recent Documents</h2>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 glass rounded-xl hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">{doc.title}</h3>
                        <p className="text-xs text-gray-400">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">{doc.date}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tasks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6 mt-8"
            >
              <h2 className="text-xl font-bold mb-6">Today's Tasks</h2>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/10 transition-colors">
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-gray-500'
                    } flex items-center justify-center`}>
                      {task.completed && <TrendingUp className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                      task.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* AI Suggestions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Sparkle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-bold">AI Suggestions</h2>
              </div>
              <div className="space-y-3">
                {aiSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="p-4 glass rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                    <p className="text-sm text-gray-300">{suggestion.icon} {suggestion.text}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-3 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                View all suggestions →
              </button>
            </motion.div>

            {/* Productivity Overview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-lg font-bold mb-6">Productivity</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Weekly Goal</span>
                    <span className="text-emerald-400">78%</span>
                  </div>
                  <div className="h-3 glass rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '78%' }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Tasks Completed</span>
                    <span className="text-indigo-400">24/30</span>
                  </div>
                  <div className="h-3 glass rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '80%' }}
                      transition={{ delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Focus Time</span>
                    <span className="text-amber-400">6.5h</span>
                  </div>
                  <div className="h-3 glass rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      transition={{ delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mini AI Chat */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Mini AI</h3>
                    <p className="text-xs text-white/70">Powered by GPT-4</p>
                  </div>
                </div>
              </div>
              <div className="h-48 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                      msg.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-white/10 text-gray-300'
                    }`}>
                      {msg.content}
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
                    onKeyPress={(e) => e.key === 'Enter' && handleChat()}
                    placeholder="Ask AI..."
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button onClick={handleChat} className="px-3 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors">
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
