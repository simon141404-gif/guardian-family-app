'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, FileText, Calendar, FolderKanban, Image, 
  MessageSquare, Bell, Bookmark, Lock, Settings, Music,
  QrCode, CreditCard, Wand2, Search, Languages, Mic,
  X, Plus, Clock, TrendingUp, User, Sparkles
} from 'lucide-react';
import Link from 'next/link';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', active: true },
  { icon: FileText, label: 'Documents', href: '/dashboard/documents' },
  { icon: Calendar, label: 'Calendar', href: '/dashboard/calendar' },
  { icon: FolderKanban, label: 'Projects', href: '/dashboard/projects' },
  { icon: Image, label: 'Gallery', href: '/dashboard/gallery' },
  { icon: MessageSquare, label: 'AI Chat', href: '/dashboard/chat' },
  { icon: Bell, label: 'Notifications', href: '/dashboard/notifications' },
  { icon: Bookmark, label: 'Bookmarks', href: '/dashboard/bookmarks' },
  { icon: Lock, label: 'Password Vault', href: '/dashboard/vault' },
  { icon: Music, label: 'Music', href: '/dashboard/music' },
  { icon: QrCode, label: 'QR Profile', href: '/dashboard/qr' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

const quickActions = [
  { icon: Wand2, label: 'AI Generate', color: 'from-violet-500 to-purple-500' },
  { icon: Search, label: 'AI Search', color: 'from-blue-500 to-cyan-500' },
  { icon: Languages, label: 'Translate', color: 'from-green-500 to-emerald-500' },
  { icon: Mic, label: 'Voice Note', color: 'from-orange-500 to-amber-500' },
];

const recentDocs = [
  { title: 'Project Proposal', time: '2 hours ago', type: 'Document' },
  { title: 'Meeting Notes', time: '5 hours ago', type: 'Notes' },
  { title: 'Travel Plans', time: 'Yesterday', type: 'Plan' },
];

const stats = [
  { label: 'Tasks Completed', value: '24', change: '+12%', icon: TrendingUp, color: 'text-green-400' },
  { label: 'AI Interactions', value: '156', change: '+28%', icon: Sparkles, color: 'text-violet-400' },
  { label: 'Documents', value: '48', change: '+5', icon: FileText, color: 'text-blue-400' },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 80 }}
        className="fixed left-0 top-0 h-full bg-[#0f0f15] border-r border-white/10 z-40"
      >
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold gradient-text"
            >
              Dashboard
            </motion.span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Plus size={20} />}
          </button>
        </div>

        <nav className="mt-4 px-2 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                item.active
                  ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={22} />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all ${sidebarOpen ? 'ml-[260px]' : 'ml-[80px]'}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/10">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, Shawon!</h1>
              <p className="text-sm text-gray-400">Here's what's happening today</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="pl-10 pr-4 py-2 w-64 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 outline-none text-sm"
                />
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Quick Actions */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, i) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="glass rounded-xl p-4 text-left hover:bg-white/10 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} p-0.5 mb-3`}>
                    <div className="w-full h-full rounded-xl bg-[#0a0a0f] flex items-center justify-center">
                      <action.icon size={24} />
                    </div>
                  </div>
                  <span className="text-sm font-medium">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-green-400 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                </div>
              </motion.div>
            ))}
          </section>

          {/* Recent Documents & Activity */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Documents */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Documents</h2>
                <button className="text-sm text-indigo-400 hover:text-indigo-300">View All</button>
              </div>
              <div className="space-y-3">
                {recentDocs.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                      <FileText size={20} className="text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{doc.title}</p>
                      <p className="text-xs text-gray-400">{doc.type}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock size={12} />
                      {doc.time}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* AI Suggestions */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">AI Suggestions</h2>
                <Sparkles size={20} className="text-violet-400" />
              </div>
              <div className="space-y-3">
                {[
                  'Review your project deadlines for this week',
                  'You have 3 unread important emails',
                  'Time to update your portfolio with new projects',
                  'Remember to check your analytics dashboard',
                ].map((suggestion, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles size={16} className="text-violet-400" />
                    </div>
                    <p className="text-sm text-gray-300">{suggestion}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Productivity Chart Placeholder */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-xl p-6"
          >
            <h2 className="text-lg font-semibold mb-4">Productivity Overview</h2>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-1 mb-4">
                  <div className="w-full h-full rounded-full bg-[#0a0a0f] flex items-center justify-center">
                    <TrendingUp size={40} className="text-indigo-400" />
                  </div>
                </div>
                <p className="text-gray-400">Connect your analytics to see detailed charts</p>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
