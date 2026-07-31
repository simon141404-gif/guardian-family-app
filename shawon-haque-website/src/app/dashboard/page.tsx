'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FileText, Calendar, FolderKanban, Image,
  MessageSquare, Bell, Bookmark, Lock, Settings,
  Music, QrCode, Search, TrendingUp, User, Sparkle,
  Plus, Moon, Sun, LogOut, ChevronLeft, ChevronRight,
  Clock, Activity, Target, Award, Users, Zap, Heart,
  Play, Pause, SkipForward, Volume2, Mic, Send, Trash2,
  Eye, EyeOff, Copy, Download, Link, X, Check, Folder,
  Camera, Video, Phone, Paperclip, Smile, Filter,
  Home, Menu, ExternalLink, Save, Edit, GripVertical,
  Shield, Key, Database, Cloud, Server, Code, Terminal
} from 'lucide-react';

// Types
interface QuickAction {
  icon: any;
  title: string;
  subtitle: string;
  color: string;
  id: string;
}

interface Document {
  id: number;
  title: string;
  type: string;
  date: string;
  size: string;
  content?: string;
}

interface Task {
  id: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  category: string;
}

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'deadline' | 'reminder';
}

interface Project {
  id: number;
  name: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  tasks: number;
  color: string;
}

interface Bookmark {
  id: number;
  title: string;
  url: string;
  category: string;
  icon: string;
}

interface PasswordEntry {
  id: number;
  site: string;
  username: string;
  password: string;
  icon: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

interface GalleryImage {
  id: number;
  url: string;
  name: string;
  date: string;
}

interface AISuggestion {
  id: number;
  text: string;
  icon: string;
  category: string;
}

// Modal Component
function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="login-card w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold gradient-text">{title}</h2>
              <button onClick={onClose} className="p-2 rounded-lg glass hover:bg-white/10"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Documents Manager
function DocumentsManager({ onClose }: { onClose: () => void }) {
  const [documents, setDocuments] = useState<Document[]>([
    { id: 1, title: 'Project Roadmap 2024', type: 'PDF', date: 'Dec 15, 2024', size: '2.4 MB' },
    { id: 2, title: 'Meeting Notes', type: 'DOC', date: 'Dec 14, 2024', size: '156 KB' },
    { id: 3, title: 'Design System', type: 'FIG', date: 'Dec 12, 2024', size: '15.8 MB' },
    { id: 4, title: 'API Documentation', type: 'MD', date: 'Dec 10, 2024', size: '89 KB' },
  ]);
  const [newDoc, setNewDoc] = useState('');
  const [viewingDoc, setViewingDoc] = useState<Document | null>(null);

  const createDoc = () => {
    if (!newDoc.trim()) return;
    const doc: Document = { id: Date.now(), title: newDoc, type: 'TXT', date: new Date().toLocaleDateString(), size: '0 KB' };
    setDocuments([doc, ...documents]);
    setNewDoc('');
  };

  const deleteDoc = (id: number) => setDocuments(documents.filter(d => d.id !== id));

  return (
    <div className="space-y-4">
      {viewingDoc ? (
        <div className="space-y-4">
          <button onClick={() => setViewingDoc(null)} className="text-indigo-400 hover:text-indigo-300 text-sm">← Back to documents</button>
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">{viewingDoc.title}</h3>
            <textarea className="input-field w-full h-64 resize-none" placeholder="Document content..." />
            <button className="btn-primary mt-4 flex items-center gap-2"><Save size={16} /> Save</button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <input value={newDoc} onChange={(e) => setNewDoc(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && createDoc()} placeholder="New document name..." className="input-field flex-1" />
            <button onClick={createDoc} className="btn-primary px-4"><Plus size={20} /></button>
          </div>
          <div className="space-y-2">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 glass rounded-xl hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => setViewingDoc(doc)}>
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center"><FileText className="w-5 h-5 text-indigo-400" /></div>
                  <div><h4 className="font-medium">{doc.title}</h4><p className="text-xs text-gray-400">{doc.type} • {doc.size}</p></div>
                </div>
                <button onClick={() => deleteDoc(doc.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Calendar Manager
function CalendarManager() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: 1, title: 'Team Meeting', date: 'Dec 20, 2024', time: '10:00 AM', type: 'meeting' },
    { id: 2, title: 'Project Deadline', date: 'Dec 25, 2024', time: '11:59 PM', type: 'deadline' },
    { id: 3, title: 'Code Review', date: 'Dec 18, 2024', time: '2:00 PM', type: 'meeting' },
    { id: 4, title: 'Remember to backup', date: 'Dec 22, 2024', time: '9:00 AM', type: 'reminder' },
  ]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', type: 'meeting' as const });

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) return;
    setEvents([...events, { id: Date.now(), ...newEvent }]);
    setNewEvent({ title: '', date: '', time: '', type: 'meeting' });
  };

  const deleteEvent = (id: number) => setEvents(events.filter(e => e.id !== id));

  const typeColors = { meeting: 'from-blue-500 to-cyan-500', deadline: 'from-red-500 to-orange-500', reminder: 'from-purple-500 to-pink-500' };
  const typeIcons = { meeting: Users, deadline: Target, reminder: Bell };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="Event title..." className="input-field" />
        <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className="input-field" />
        <input value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} placeholder="Time..." className="input-field" />
        <select value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as any })} className="input-field">
          <option value="meeting">Meeting</option><option value="deadline">Deadline</option><option value="reminder">Reminder</option>
        </select>
      </div>
      <button onClick={addEvent} className="btn-primary w-full flex items-center justify-center gap-2"><Plus size={16} /> Add Event</button>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((event) => {
          const Icon = typeIcons[event.type];
          return (
            <div key={event.id} className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/10">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${typeColors[event.type]} flex items-center justify-center`}><Icon className="w-6 h-6 text-white" /></div>
              <div className="flex-1"><h4 className="font-medium">{event.title}</h4><p className="text-xs text-gray-400">{event.date} at {event.time}</p></div>
              <button onClick={() => deleteEvent(event.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"><Trash2 size={18} /></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Projects Manager
function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: 'Website Redesign', progress: 75, status: 'active', tasks: 12, color: 'from-violet-500 to-purple-600' },
    { id: 2, name: 'Mobile App', progress: 45, status: 'active', tasks: 24, color: 'from-blue-500 to-cyan-600' },
    { id: 3, name: 'API Integration', progress: 100, status: 'completed', tasks: 8, color: 'from-emerald-500 to-teal-600' },
    { id: 4, name: 'Documentation', progress: 30, status: 'paused', tasks: 5, color: 'from-amber-500 to-orange-600' },
  ]);
  const [newProject, setNewProject] = useState('');

  const addProject = () => {
    if (!newProject.trim()) return;
    setProjects([...projects, { id: Date.now(), name: newProject, progress: 0, status: 'active', tasks: 0, color: 'from-indigo-500 to-purple-600' }]);
    setNewProject('');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input value={newProject} onChange={(e) => setNewProject(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addProject()} placeholder="New project name..." className="input-field flex-1" />
        <button onClick={addProject} className="btn-primary px-4"><Plus size={20} /></button>
      </div>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="glass rounded-xl p-6 hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${project.color}`} />
                <h4 className="font-semibold">{project.name}</h4>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : project.status === 'completed' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'}`}>{project.status}</span>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1"><span>Progress</span><span className="text-indigo-400">{project.progress}%</span></div>
              <div className="h-2 glass rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${project.progress}%` }} className={`h-full bg-gradient-to-r ${project.color} rounded-full`} /></div>
            </div>
            <p className="text-xs text-gray-400">{project.tasks} tasks</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Gallery Manager
function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([
    { id: 1, url: 'https://picsum.photos/seed/1/300/200', name: 'Screenshot 1', date: 'Dec 15' },
    { id: 2, url: 'https://picsum.photos/seed/2/300/200', name: 'Design Mockup', date: 'Dec 14' },
    { id: 3, url: 'https://picsum.photos/seed/3/300/200', name: 'Team Photo', date: 'Dec 12' },
    { id: 4, url: 'https://picsum.photos/seed/4/300/200', name: 'Project Preview', date: 'Dec 10' },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addImages = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImages([{ id: Date.now(), url: e.target?.result as string, name: file.name, date: new Date().toLocaleDateString() }, ...images]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  return (
    <div className="space-y-4">
      <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={(e) => addImages(e.target.files)} className="hidden" />
      <button onClick={() => fileInputRef.current?.click()} className="btn-primary w-full flex items-center justify-center gap-2"><Plus size={16} /> Add Images</button>
      <div className="grid grid-cols-3 gap-4">
        {images.map((img) => (
          <motion.div key={img.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative group">
            <img src={img.url} alt={img.name} className="w-full aspect-video object-cover rounded-xl" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
              <button onClick={() => navigator.clipboard.writeText(img.url)} className="p-2 bg-white/20 rounded-full hover:bg-white/30"><Copy size={16} /></button>
              <a href={img.url} download className="p-2 bg-white/20 rounded-full hover:bg-white/30"><Download size={16} /></a>
            </div>
            <p className="text-xs text-gray-400 mt-1 truncate">{img.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// AI Chat
function AIChat() {
  const [messages, setMessages] = useState<{role: string; content: string}[]>([
    { role: 'assistant', content: "Hi! I'm your AI assistant. Ask me anything about coding, design, or productivity!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1500));
    const responses = [
      "Great question! I can help you with coding, design, and productivity tips.",
      "That's interesting! Let me help you think through this.",
      "I recommend focusing on clean code and user experience.",
      "Would you like me to suggest some best practices?"
    ];
    setMessages(prev => [...prev, { role: 'assistant', content: responses[Math.floor(Math.random() * responses.length)] }]);
    setIsTyping(false);
  };

  return (
    <div className="space-y-4">
      <div className="h-80 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-white/10'}`}>{msg.content}</div>
          </div>
        ))}
        {isTyping && <div className="flex justify-start"><div className="bg-white/10 px-4 py-3 rounded-2xl"><div className="flex gap-1"><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" /><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'150ms'}} /><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'300ms'}} /></div></div></div>}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && send()} placeholder="Ask me anything..." className="input-field flex-1" />
        <button onClick={send} disabled={!input.trim()} className="btn-primary px-6"><Send size={20} /></button>
      </div>
    </div>
  );
}

// Notifications Manager
function NotificationsManager() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: 'New Message', message: 'You have a new message from Sarah', time: '5 min ago', read: false, type: 'info' },
    { id: 2, title: 'Task Completed', message: 'Project milestone achieved!', time: '1 hour ago', read: false, type: 'success' },
    { id: 3, title: 'Reminder', message: 'Meeting starts in 30 minutes', time: '2 hours ago', read: true, type: 'warning' },
    { id: 4, title: 'Update Available', message: 'New version of the app is available', time: '1 day ago', read: true, type: 'info' },
  ]);

  const markAllRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));
  const deleteNotification = (id: number) => setNotifications(notifications.filter(n => n.id !== id));
  const typeColors = { info: 'border-l-blue-500', success: 'border-l-emerald-500', warning: 'border-l-amber-500' };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-400">{notifications.filter(n => !n.read).length} unread</span>
        <button onClick={markAllRead} className="text-indigo-400 text-sm hover:text-indigo-300">Mark all as read</button>
      </div>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {notifications.map((notif) => (
          <div key={notif.id} className={`p-4 glass rounded-xl border-l-4 ${typeColors[notif.type]} ${notif.read ? 'opacity-60' : ''}`}>
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{notif.title}</h4>
                <p className="text-sm text-gray-400">{notif.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
              </div>
              <button onClick={() => deleteNotification(notif.id)} className="p-1 hover:bg-red-500/20 rounded text-red-400"><X size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Bookmarks Manager
function BookmarksManager() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
    { id: 1, title: 'GitHub', url: 'https://github.com', category: 'Development', icon: '🐙' },
    { id: 2, title: 'Stack Overflow', url: 'https://stackoverflow.com', category: 'Development', icon: '📚' },
    { id: 3, title: 'Figma', url: 'https://figma.com', category: 'Design', icon: '🎨' },
    { id: 4, title: 'Notion', url: 'https://notion.so', category: 'Productivity', icon: '📝' },
  ]);
  const [newBookmark, setNewBookmark] = useState({ title: '', url: '', category: 'Development' });

  const addBookmark = () => {
    if (!newBookmark.title || !newBookmark.url) return;
    setBookmarks([...bookmarks, { id: Date.now(), ...newBookmark, icon: '🔗' }]);
    setNewBookmark({ title: '', url: '', category: 'Development' });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input value={newBookmark.title} onChange={(e) => setNewBookmark({ ...newBookmark, title: e.target.value })} placeholder="Title..." className="input-field" />
        <input value={newBookmark.url} onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })} placeholder="URL..." className="input-field" />
      </div>
      <select value={newBookmark.category} onChange={(e) => setNewBookmark({ ...newBookmark, category: e.target.value })} className="input-field">
        <option>Development</option><option>Design</option><option>Productivity</option><option>Social</option>
      </select>
      <button onClick={addBookmark} className="btn-primary w-full flex items-center justify-center gap-2"><Plus size={16} /> Add Bookmark</button>
      <div className="space-y-2">
        {bookmarks.map((bm) => (
          <a key={bm.id} href={bm.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 glass rounded-xl hover:bg-white/10 transition-colors group">
            <div className="flex items-center gap-4">
              <span className="text-2xl">{bm.icon}</span>
              <div><h4 className="font-medium group-hover:text-indigo-400 transition-colors">{bm.title}</h4><p className="text-xs text-gray-400">{bm.category}</p></div>
            </div>
            <ExternalLink size={18} className="text-gray-400 group-hover:text-indigo-400" />
          </a>
        ))}
      </div>
    </div>
  );
}

// Password Vault
function PasswordVault() {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([
    { id: 1, site: 'Gmail', username: 'user@gmail.com', password: '••••••••', icon: '📧' },
    { id: 2, site: 'GitHub', username: 'developer', password: '••••••••', icon: '🐙' },
    { id: 3, site: 'AWS Console', username: 'admin@company.com', password: '••••••••', icon: '☁️' },
  ]);
  const [newEntry, setNewEntry] = useState({ site: '', username: '', password: '' });
  const [showPassword, setShowPassword] = useState<number | null>(null);

  const addEntry = () => {
    if (!newEntry.site || !newEntry.username || !newEntry.password) return;
    setPasswords([...passwords, { id: Date.now(), ...newEntry, icon: '🔐' }]);
    setNewEntry({ site: '', username: '', password: '' });
  };

  const copyPassword = (pwd: string) => { navigator.clipboard.writeText(pwd); alert('Password copied!'); };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <input value={newEntry.site} onChange={(e) => setNewEntry({ ...newEntry, site: e.target.value })} placeholder="Site name..." className="input-field" />
        <input value={newEntry.username} onChange={(e) => setNewEntry({ ...newEntry, username: e.target.value })} placeholder="Username/Email..." className="input-field" />
        <div className="flex gap-2">
          <input type={showPassword === -1 ? 'text' : 'password'} value={newEntry.password} onChange={(e) => setNewEntry({ ...newEntry, password: e.target.value })} placeholder="Password..." className="input-field flex-1" />
          <button onClick={() => setShowPassword(showPassword === -1 ? null : -1)} className="btn-secondary px-4">{showPassword === -1 ? <EyeOff size={20} /> : <Eye size={20} />}</button>
        </div>
      </div>
      <button onClick={addEntry} className="btn-primary w-full flex items-center justify-center gap-2"><Plus size={16} /> Add Password</button>
      <div className="space-y-2">
        {passwords.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between p-4 glass rounded-xl hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-4">
              <span className="text-2xl">{entry.icon}</span>
              <div><h4 className="font-medium">{entry.site}</h4><p className="text-sm text-gray-400">{entry.username}</p></div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowPassword(showPassword === entry.id ? null : entry.id)} className="p-2 hover:bg-white/10 rounded-lg">{showPassword === entry.id ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              <button onClick={() => copyPassword(entry.password)} className="p-2 hover:bg-white/10 rounded-lg"><Copy size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Music Player
function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const tracks = [
    { title: 'Focus Flow', artist: 'AI Beats', duration: '3:45' },
    { title: 'Deep Work', artist: 'Neural Waves', duration: '4:12' },
    { title: 'Code Mode', artist: 'Synth Master', duration: '3:58' },
    { title: 'Creative Zone', artist: 'Digital Dreams', duration: '5:01' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-40 h-40 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 animate-pulse-glow">
          <Music className="w-20 h-20 text-white" />
        </div>
        <h3 className="text-xl font-bold">{tracks[currentTrack].title}</h3>
        <p className="text-gray-400">{tracks[currentTrack].artist}</p>
        <p className="text-sm text-gray-500 mt-2">{tracks[currentTrack].duration}</p>
      </div>
      <div className="flex items-center justify-center gap-6">
        <button onClick={() => setCurrentTrack((currentTrack - 1 + tracks.length) % tracks.length)} className="p-3 glass rounded-full hover:bg-white/10"><SkipForward className="w-6 h-6 rotate-180" /></button>
        <button onClick={() => setIsPlaying(!isPlaying)} className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center hover:scale-105 transition-transform">
          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </button>
        <button onClick={() => setCurrentTrack((currentTrack + 1) % tracks.length)} className="p-3 glass rounded-full hover:bg-white/10"><SkipForward className="w-6 h-6" /></button>
      </div>
      <div className="space-y-2">
        {tracks.map((track, i) => (
          <button key={i} onClick={() => setCurrentTrack(i)} className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${i === currentTrack ? 'bg-indigo-500/20' : 'hover:bg-white/10'}`}>
            <span className={i === currentTrack ? 'text-indigo-400' : ''}>{track.title}</span>
            <span className="text-gray-500 text-sm">{track.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// QR Code Generator
function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [generated, setGenerated] = useState(false);

  return (
    <div className="space-y-4">
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter URL or text..." className="input-field w-full" />
      <button onClick={() => setGenerated(true)} disabled={!text.trim()} className="btn-primary w-full flex items-center justify-center gap-2"><QrCode size={16} /> Generate QR Code</button>
      {generated && text && (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="w-48 h-48 mx-auto bg-white rounded-xl flex items-center justify-center">
            <div className="w-40 h-40 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center text-white text-xs text-center p-2">
              QR Code Preview<br/>({text.substring(0, 30)}...)
            </div>
          </div>
          <button onClick={() => alert('In production, this would download the QR code image')} className="btn-secondary mt-4 mx-auto flex items-center gap-2"><Download size={16} /> Download</button>
        </motion.div>
      )}
    </div>
  );
}

// Settings
function SettingsPanel() {
  const [settings, setSettings] = useState({ darkMode: true, notifications: true, sound: false, autoSave: true });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {[
          { key: 'darkMode', label: 'Dark Mode', desc: 'Use dark theme' },
          { key: 'notifications', label: 'Notifications', desc: 'Enable push notifications' },
          { key: 'sound', label: 'Sound Effects', desc: 'Play sounds on actions' },
          { key: 'autoSave', label: 'Auto Save', desc: 'Automatically save changes' },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4 glass rounded-xl">
            <div><h4 className="font-medium">{item.label}</h4><p className="text-sm text-gray-400">{item.desc}</p></div>
            <button onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })} className={`w-14 h-8 rounded-full p-1 transition-colors ${settings[item.key as keyof typeof settings] ? 'bg-indigo-500' : 'bg-gray-600'}`}>
              <motion.div animate={{ x: settings[item.key as keyof typeof settings] ? 24 : 0 }} className="w-6 h-6 bg-white rounded-full" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Dashboard
export default function Dashboard() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [messages, setMessages] = useState<{role: string; content: string}[]>([{ role: 'assistant', content: "Hi! I'm your AI assistant. How can I help you?" }]);
  const [chatInput, setChatInput] = useState('');

  const quickActions: QuickAction[] = [
    { icon: FileText, title: 'Documents', subtitle: 'Manage files', color: 'from-blue-500 to-cyan-500', id: 'documents' },
    { icon: Calendar, title: 'Calendar', subtitle: 'Schedule events', color: 'from-purple-500 to-pink-500', id: 'calendar' },
    { icon: FolderKanban, title: 'Projects', subtitle: 'Track progress', color: 'from-emerald-500 to-teal-500', id: 'projects' },
    { icon: Image, title: 'Gallery', subtitle: 'Photos & media', color: 'from-pink-500 to-rose-500', id: 'gallery' },
    { icon: MessageSquare, title: 'AI Chat', subtitle: 'Ask anything', color: 'from-indigo-500 to-purple-500', id: 'ai-chat' },
    { icon: Bell, title: 'Notifications', subtitle: 'Stay updated', color: 'from-amber-500 to-orange-500', id: 'notifications' },
    { icon: Bookmark, title: 'Bookmarks', subtitle: 'Save links', color: 'from-cyan-500 to-blue-500', id: 'bookmarks' },
    { icon: Lock, title: 'Password Vault', subtitle: 'Secure passwords', color: 'from-red-500 to-pink-500', id: 'passwords' },
    { icon: Music, title: 'Music', subtitle: 'Listen & relax', color: 'from-violet-500 to-purple-500', id: 'music' },
    { icon: QrCode, title: 'QR Code', subtitle: 'Generate codes', color: 'from-teal-500 to-emerald-500', id: 'qr' },
    { icon: Settings, title: 'Settings', subtitle: 'Configure app', color: 'from-gray-500 to-gray-600', id: 'settings' },
  ];

  const tasks: Task[] = [
    { id: 1, title: 'Complete API integration', priority: 'high', completed: false, category: 'Dev' },
    { id: 2, title: 'Design review meeting', priority: 'medium', completed: false, category: 'Design' },
    { id: 3, title: 'Update documentation', priority: 'low', completed: true, category: 'Docs' },
    { id: 4, title: 'Deploy to production', priority: 'high', completed: false, category: 'Dev' },
  ];

  const stats = [
    { label: 'Tasks Done', value: '24', icon: Target, color: 'text-emerald-400' },
    { label: 'Hours Tracked', value: '142', icon: Clock, color: 'text-blue-400' },
    { label: 'Projects', value: '8', icon: FolderKanban, color: 'text-purple-400' },
    { label: 'Streak Days', value: '15', icon: Zap, color: 'text-amber-400' },
  ];

  const aiSuggestions: AISuggestion[] = [
    { id: 1, text: 'Optimize database queries for better performance', icon: '🚀', category: 'Performance' },
    { id: 2, text: 'Add error handling to improve reliability', icon: '⚠️', category: 'Code Quality' },
    { id: 3, text: 'Consider implementing caching mechanism', icon: '💾', category: 'Architecture' },
    { id: 4, text: 'Review and refactor legacy code sections', icon: '🔧', category: 'Maintenance' },
  ];

  const handleChat = () => {
    if (!chatInput.trim()) return;
    setMessages([...messages, { role: 'user', content: chatInput }]);
    setChatInput('');
    setTimeout(() => { setMessages(prev => [...prev, { role: 'assistant', content: "I'm working on that! Let me help you with your task." }]); }, 1000);
  };

  const modalTitles: Record<string, string> = {
    'documents': '📄 Documents Manager',
    'calendar': '📅 Calendar & Events',
    'projects': '📁 Projects',
    'gallery': '🖼️ Photo Gallery',
    'ai-chat': '🤖 AI Chat',
    'notifications': '🔔 Notifications',
    'bookmarks': '🔖 Bookmarks',
    'passwords': '🔐 Password Vault',
    'music': '🎵 Music Player',
    'qr': '📱 QR Code Generator',
    'settings': '⚙️ Settings',
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'documents': return <DocumentsManager onClose={() => setActiveModal(null)} />;
      case 'calendar': return <CalendarManager />;
      case 'projects': return <ProjectsManager />;
      case 'gallery': return <GalleryManager />;
      case 'ai-chat': return <AIChat />;
      case 'notifications': return <NotificationsManager />;
      case 'bookmarks': return <BookmarksManager />;
      case 'passwords': return <PasswordVault />;
      case 'music': return <MusicPlayer />;
      case 'qr': return <QRCodeGenerator />;
      case 'settings': return <SettingsPanel />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Sidebar */}
      <motion.aside initial={{ width: 280 }} animate={{ width: isSidebarCollapsed ? 80 : 280 }} className="fixed left-0 top-0 h-full glass-strong z-30 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"><Sparkle className="w-6 h-6 text-white" /></div>
            {!isSidebarCollapsed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-bold gradient-text">Shawon AI</motion.div>}
          </div>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {quickActions.map((action) => (
            <button key={action.id} onClick={() => setActiveModal(action.id)} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all hover:bg-white/5 text-gray-400 hover:text-white">
              <action.icon size={22} />
              {!isSidebarCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 text-left text-sm font-medium">{action.title}</motion.span>}
            </button>
          ))}
        </nav>
        <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-4 border-t border-white/10 flex items-center justify-center text-gray-400 hover:text-white">
          {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 p-8 ${isSidebarCollapsed ? 'ml-20' : 'ml-[280px]'} transition-all duration-300`}>
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Welcome back, Shawon!</h1>
            <p className="text-gray-400 mt-1">Here's what's happening with your projects today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" placeholder="Search..." className="w-64 pl-10 pr-4 py-3 glass rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" /></div>
            <button className="p-3 glass rounded-xl hover:bg-white/10 relative"><Bell size={22} /><span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full" /></button>
            <div className="flex items-center gap-3 glass px-4 py-2 rounded-xl"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm">👤</div><span className="text-sm font-medium">Shawon</span></div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-center justify-between mb-4"><stat.icon className={`w-8 h-8 ${stat.color}`} /><span className="text-3xl font-bold gradient-text">{stat.value}</span></div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">✨ Quick Actions</h2>
              <div className="grid grid-cols-4 gap-4">
                {quickActions.slice(0, 8).map((action, i) => (
                  <motion.button key={action.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.05 }} onClick={() => setActiveModal(action.id)} className="p-4 glass rounded-xl hover:bg-white/10 transition-all text-left group">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}><action.icon className="w-5 h-5 text-white" /></div>
                    <h3 className="font-medium text-sm">{action.title}</h3>
                    <p className="text-xs text-gray-400">{action.subtitle}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Tasks */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">Today's Tasks</h2>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/10 transition-colors">
                    <div className={`w-5 h-5 rounded-full border-2 ${task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-gray-500'} flex items-center justify-center`}>{task.completed && <Check className="w-3 h-3 text-white" />}</div>
                    <div className="flex-1"><h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</h3><p className="text-xs text-gray-400">{task.category}</p></div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${task.priority === 'high' ? 'bg-red-500/20 text-red-400' : task.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>{task.priority}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* AI Suggestions */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"><Sparkle className="w-5 h-5 text-white" /></div><h2 className="text-lg font-bold">AI Suggestions</h2></div>
              <div className="space-y-3">
                {aiSuggestions.map((suggestion) => (<div key={suggestion.id} className="p-4 glass rounded-xl hover:bg-white/10 transition-colors cursor-pointer"><p className="text-sm text-gray-300">{suggestion.icon} {suggestion.text}</p><span className="text-xs text-indigo-400">{suggestion.category}</span></div>))}
              </div>
            </motion.div>

            {/* Productivity */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-6">Productivity</h2>
              <div className="space-y-4">
                <div><div className="flex justify-between text-sm mb-2"><span className="text-gray-400">Weekly Goal</span><span className="text-emerald-400">78%</span></div><div className="h-3 glass rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: '78%' }} className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" /></div></div>
                <div><div className="flex justify-between text-sm mb-2"><span className="text-gray-400">Tasks</span><span className="text-indigo-400">24/30</span></div><div className="h-3 glass rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: '80%' }} transition={{ delay: 0.3 }} className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" /></div></div>
                <div><div className="flex justify-between text-sm mb-2"><span className="text-gray-400">Focus Time</span><span className="text-amber-400">6.5h</span></div><div className="h-3 glass rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: '65%' }} transition={{ delay: 0.5 }} className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" /></div></div>
              </div>
            </motion.div>

            {/* Mini AI Chat */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><Sparkle className="w-4 h-4 text-white" /></div><div><h3 className="font-semibold text-sm">Mini AI</h3><p className="text-xs text-white/70">Powered by GPT-4</p></div></div></div>
              <div className="h-48 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (<div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${msg.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-white/10 text-gray-300'}`}>{msg.content}</div></div>))}
              </div>
              <div className="p-4 border-t border-white/10"><div className="flex gap-2"><input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleChat()} placeholder="Ask AI..." className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" /><button onClick={handleChat} className="px-3 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600"><Send size={16} /></button></div></div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Modal */}
      <Modal isOpen={!!activeModal} onClose={() => setActiveModal(null)} title={activeModal ? modalTitles[activeModal] : ''}>
        {renderModalContent()}
      </Modal>
    </div>
  );
}
