'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FileText, Calendar, FolderKanban, Image,
  MessageSquare, Bell, Bookmark, Lock, Settings,
  Music, QrCode, Search, TrendingUp, User, Sparkle,
  Plus, LogOut, ChevronLeft, ChevronRight,
  Clock, Activity, Target, Zap, Heart,
  Play, Pause, SkipForward, Volume2, Send, Trash2,
  Eye, EyeOff, Copy, Download, Link, X, Check, Folder,
  ExternalLink, Sun, Moon
} from 'lucide-react';

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

// Documents Manager
function DocumentsManager() {
  const [documents, setDocuments] = useState([
    { id: 1, title: 'Project Roadmap', type: 'PDF', date: 'Dec 15', size: '2.4 MB' },
    { id: 2, title: 'Meeting Notes', type: 'DOC', date: 'Dec 14', size: '156 KB' },
    { id: 3, title: 'Design System', type: 'FIG', date: 'Dec 12', size: '15.8 MB' },
  ]);
  const [newDoc, setNewDoc] = useState('');

  const addDoc = () => {
    if (!newDoc.trim()) return;
    setDocuments([{ id: Date.now(), title: newDoc, type: 'TXT', date: 'Today', size: '0 KB' }, ...documents]);
    setNewDoc('');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input value={newDoc} onChange={(e) => setNewDoc(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addDoc()} placeholder="New document name..." className="flex-1 px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}} />
        <button onClick={addDoc} className="px-6 py-3 rounded-xl font-semibold text-white" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}><Plus size={20} /></button>
      </div>
      <div className="space-y-2">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-4 rounded-xl transition-colors" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{background: 'rgba(102, 126, 234, 0.2)'}}><FileText className="w-5 h-5" style={{color: '#667eea'}} /></div>
              <div><h4 className="font-medium">{doc.title}</h4><p className="text-xs text-gray-400">{doc.type} • {doc.size}</p></div>
            </div>
            <button onClick={() => setDocuments(documents.filter(d => d.id !== doc.id))} className="p-2 rounded-lg hover:bg-red-500/20" style={{color: '#ef4444'}}><Trash2 size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Calendar Manager
function CalendarManager() {
  const [events, setEvents] = useState([
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
        <input value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="Event title..." className="px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}} />
        <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className="px-4 py-3 rounded-xl text-white focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}} />
      </div>
      <button onClick={addEvent} className="w-full py-3 rounded-xl font-semibold text-white" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}><Plus size={16} className="inline mr-2" /> Add Event</button>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {events.map((event) => (
          <div key={event.id} className="flex items-center gap-4 p-4 rounded-xl" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}><Calendar className="w-6 h-6 text-white" /></div>
            <div className="flex-1"><h4 className="font-medium">{event.title}</h4><p className="text-xs text-gray-400">{event.date} at {event.time}</p></div>
            <button onClick={() => setEvents(events.filter(e => e.id !== event.id))} className="p-2" style={{color: '#ef4444'}}><Trash2 size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Projects Manager
function ProjectsManager() {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Website Redesign', progress: 75, status: 'active' },
    { id: 2, name: 'Mobile App', progress: 45, status: 'active' },
    { id: 3, name: 'API Integration', progress: 100, status: 'completed' },
  ]);
  const [newProject, setNewProject] = useState('');

  const addProject = () => {
    if (!newProject.trim()) return;
    setProjects([...projects, { id: Date.now(), name: newProject, progress: 0, status: 'active' }]);
    setNewProject('');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input value={newProject} onChange={(e) => setNewProject(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addProject()} placeholder="New project name..." className="flex-1 px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}} />
        <button onClick={addProject} className="px-6 py-3 rounded-xl font-semibold text-white" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}><Plus size={20} /></button>
      </div>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="p-6 rounded-xl" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">{project.name}</h4>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>{project.status}</span>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1"><span className="text-gray-400">Progress</span><span style={{color: '#667eea'}}>{project.progress}%</span></div>
              <div className="h-2 rounded-full overflow-hidden" style={{background: 'rgba(255,255,255,0.1)'}}><motion.div initial={{ width: 0 }} animate={{ width: `${project.progress}%` }} className="h-full rounded-full" style={{background: 'linear-gradient(90deg, #667eea, #764ba2)'}} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Gallery Manager
function GalleryManager() {
  const [images, setImages] = useState([
    { id: 1, url: 'https://picsum.photos/seed/1/300/200', name: 'Screenshot 1' },
    { id: 2, url: 'https://picsum.photos/seed/2/300/200', name: 'Design Mockup' },
    { id: 3, url: 'https://picsum.photos/seed/3/300/200', name: 'Team Photo' },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addImages = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => { setImages([{ id: Date.now(), url: e.target?.result as string, name: file.name }, ...images]); };
        reader.readAsDataURL(file);
      }
    });
  };

  return (
    <div className="space-y-4">
      <button onClick={() => fileInputRef.current?.click()} className="w-full py-3 rounded-xl font-semibold text-white" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}><Plus size={16} className="inline mr-2" /> Add Images</button>
      <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={(e) => addImages(e.target.files)} className="hidden" />
      <div className="grid grid-cols-3 gap-4">
        {images.map((img) => (
          <motion.div key={img.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative group">
            <img src={img.url} alt={img.name} className="w-full aspect-video object-cover rounded-xl" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
              <button onClick={() => navigator.clipboard.writeText(img.url)} className="p-2 rounded-full" style={{background: 'rgba(255,255,255,0.2)'}}><Copy size={16} /></button>
              <a href={img.url} download className="p-2 rounded-full" style={{background: 'rgba(255,255,255,0.2)'}}><Download size={16} /></a>
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
  const [messages, setMessages] = useState([{ role: 'assistant', content: "Hi! I'm your AI assistant. Ask me anything!" }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1500));
    const responses = ["Great question! I can help you with that.", "Let me think about that...", "Here's my suggestion:"];
    setMessages(prev => [...prev, { role: 'assistant', content: responses[Math.floor(Math.random() * responses.length)] }]);
    setIsTyping(false);
  };

  return (
    <div className="space-y-4">
      <div className="h-80 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'text-white' : ''}`} style={msg.role === 'user' ? {background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'} : {background: 'rgba(255,255,255,0.1)'}}>{msg.content}</div>
          </div>
        ))}
        {isTyping && <div className="flex justify-start"><div className="px-4 py-3 rounded-2xl" style={{background: 'rgba(255,255,255,0.1)'}}><div className="flex gap-1"><span className="w-2 h-2 rounded-full animate-bounce" style={{background: '#667eea'}} /><span className="w-2 h-2 rounded-full animate-bounce" style={{background: '#667eea', animationDelay: '150ms'}} /><span className="w-2 h-2 rounded-full animate-bounce" style={{background: '#667eea', animationDelay: '300ms'}} /></div></div></div>}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && send()} placeholder="Ask me anything..." className="flex-1 px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}} />
        <button onClick={send} className="px-6 py-3 rounded-xl" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}><Send size={20} /></button>
      </div>
    </div>
  );
}

// Notifications Manager
function NotificationsManager() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Message', message: 'You have a new message', time: '5 min ago', read: false },
    { id: 2, title: 'Task Completed', message: 'Project milestone achieved!', time: '1 hour ago', read: false },
    { id: 3, title: 'Reminder', message: 'Meeting in 30 minutes', time: '2 hours ago', read: true },
  ]);

  return (
    <div className="space-y-2 max-h-80 overflow-y-auto">
      {notifications.map((notif) => (
        <div key={notif.id} className="p-4 rounded-xl border-l-4" style={{background: 'rgba(255,255,255,0.05)', borderColor: notif.read ? 'transparent' : '#667eea', opacity: notif.read ? 0.6 : 1}}>
          <div className="flex items-start justify-between">
            <div><h4 className="font-medium">{notif.title}</h4><p className="text-sm text-gray-400">{notif.message}</p><p className="text-xs text-gray-500 mt-1">{notif.time}</p></div>
            <button onClick={() => setNotifications(notifications.filter(n => n.id !== notif.id))} className="p-1" style={{color: '#ef4444'}}><X size={16} /></button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Bookmarks Manager
function BookmarksManager() {
  const [bookmarks, setBookmarks] = useState([
    { id: 1, title: 'GitHub', url: 'https://github.com', category: 'Development' },
    { id: 2, title: 'Stack Overflow', url: 'https://stackoverflow.com', category: 'Development' },
    { id: 3, title: 'Figma', url: 'https://figma.com', category: 'Design' },
  ]);
  const [newBookmark, setNewBookmark] = useState({ title: '', url: '' });

  const addBookmark = () => {
    if (!newBookmark.title || !newBookmark.url) return;
    setBookmarks([...bookmarks, { id: Date.now(), ...newBookmark, category: 'General' }]);
    setNewBookmark({ title: '', url: '' });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input value={newBookmark.title} onChange={(e) => setNewBookmark({ ...newBookmark, title: e.target.value })} placeholder="Title..." className="px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}} />
        <input value={newBookmark.url} onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })} placeholder="URL..." className="px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}} />
      </div>
      <button onClick={addBookmark} className="w-full py-3 rounded-xl font-semibold text-white" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}><Plus size={16} className="inline mr-2" /> Add Bookmark</button>
      <div className="space-y-2">
        {bookmarks.map((bm) => (
          <a key={bm.id} href={bm.url} target="_blank" className="flex items-center justify-between p-4 rounded-xl transition-colors hover:bg-white/5" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
            <div><h4 className="font-medium">{bm.title}</h4><p className="text-xs text-gray-400">{bm.category}</p></div>
            <ExternalLink size={18} className="text-gray-400" />
          </a>
        ))}
      </div>
    </div>
  );
}

// Password Vault
function PasswordVault() {
  const [passwords, setPasswords] = useState([
    { id: 1, site: 'Gmail', username: 'user@gmail.com', password: '••••••••' },
    { id: 2, site: 'GitHub', username: 'developer', password: '••••••••' },
  ]);
  const [newEntry, setNewEntry] = useState({ site: '', username: '', password: '' });
  const [showPassword, setShowPassword] = useState<number | null>(null);

  const addEntry = () => {
    if (!newEntry.site || !newEntry.username || !newEntry.password) return;
    setPasswords([...passwords, { id: Date.now(), ...newEntry }]);
    setNewEntry({ site: '', username: '', password: '' });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <input value={newEntry.site} onChange={(e) => setNewEntry({ ...newEntry, site: e.target.value })} placeholder="Site name..." className="px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}} />
        <input value={newEntry.username} onChange={(e) => setNewEntry({ ...newEntry, username: e.target.value })} placeholder="Username/Email..." className="px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}} />
        <input value={newEntry.password} onChange={(e) => setNewEntry({ ...newEntry, password: e.target.value })} placeholder="Password..." className="px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}} />
      </div>
      <button onClick={addEntry} className="w-full py-3 rounded-xl font-semibold text-white" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}><Plus size={16} className="inline mr-2" /> Add Password</button>
      <div className="space-y-2">
        {passwords.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between p-4 rounded-xl" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
            <div><h4 className="font-medium">{entry.site}</h4><p className="text-sm text-gray-400">{entry.username}</p></div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowPassword(showPassword === entry.id ? null : entry.id)} className="p-2" style={{color: '#667eea'}}>{showPassword === entry.id ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              <button onClick={() => navigator.clipboard.writeText(entry.password)} className="p-2" style={{color: '#667eea'}}><Copy size={18} /></button>
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
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-40 h-40 mx-auto rounded-2xl flex items-center justify-center mb-4" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
          <Music className="w-20 h-20 text-white" />
        </div>
        <h3 className="text-xl font-bold">{tracks[currentTrack].title}</h3>
        <p className="text-gray-400">{tracks[currentTrack].artist}</p>
      </div>
      <div className="flex items-center justify-center gap-6">
        <button onClick={() => setCurrentTrack((currentTrack - 1 + tracks.length) % tracks.length)} className="p-3 rounded-full" style={{background: 'rgba(255,255,255,0.1)'}}><SkipForward className="w-6 h-6 rotate-180" /></button>
        <button onClick={() => setIsPlaying(!isPlaying)} className="w-16 h-16 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </button>
        <button onClick={() => setCurrentTrack((currentTrack + 1) % tracks.length)} className="p-3 rounded-full" style={{background: 'rgba(255,255,255,0.1)'}}><SkipForward className="w-6 h-6" /></button>
      </div>
      <div className="space-y-2">
        {tracks.map((track, i) => (
          <button key={i} onClick={() => setCurrentTrack(i)} className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${i === currentTrack ? 'bg-indigo-500/20' : ''}`} style={{background: i === currentTrack ? 'rgba(102,126,234,0.2)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
            <span style={{color: i === currentTrack ? '#667eea' : 'white'}}>{track.title}</span>
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
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter URL or text..." className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}} />
      <button onClick={() => setGenerated(true)} disabled={!text.trim()} className="w-full py-3 rounded-xl font-semibold text-white" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}} disabled={!text.trim() || !text.trim() ? true : false}><QrCode size={16} className="inline mr-2" /> Generate QR Code</button>
      {generated && text && (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="w-48 h-48 mx-auto rounded-xl flex items-center justify-center" style={{background: 'white'}}>
            <div className="w-40 h-40 rounded-lg flex items-center justify-center text-black text-xs text-center p-2" style={{background: '#1a1a2e'}}>QR Code Preview<br/>({text.substring(0, 20)}...)</div>
          </div>
          <button className="mt-4 px-6 py-2 rounded-lg" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}}><Download size={16} className="inline mr-2" /> Download</button>
        </motion.div>
      )}
    </div>
  );
}

// Main Dashboard
export default function Dashboard() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => { const timer = setInterval(() => setCurrentTime(new Date()), 1000); return () => clearInterval(timer); }, []);

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'overview' },
    { icon: FileText, label: 'Documents', id: 'documents' },
    { icon: Calendar, label: 'Calendar', id: 'calendar' },
    { icon: FolderKanban, label: 'Projects', id: 'projects' },
    { icon: Image, label: 'Gallery', id: 'gallery' },
    { icon: MessageSquare, label: 'AI Chat', id: 'ai-chat' },
    { icon: Bell, label: 'Notifications', id: 'notifications' },
    { icon: Bookmark, label: 'Bookmarks', id: 'bookmarks' },
    { icon: Lock, label: 'Password Vault', id: 'passwords' },
    { icon: Music, label: 'Music', id: 'music' },
    { icon: QrCode, label: 'QR Code', id: 'qr' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  const stats = [
    { label: 'Tasks Done', value: '24', icon: Target, color: '#10b981' },
    { label: 'Hours Tracked', value: '142', icon: Clock, color: '#3b82f6' },
    { label: 'Projects', value: '8', icon: FolderKanban, color: '#8b5cf6' },
    { label: 'Streak Days', value: '15', icon: Zap, color: '#f59e0b' },
  ];

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
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'documents': return <DocumentsManager />;
      case 'calendar': return <CalendarManager />;
      case 'projects': return <ProjectsManager />;
      case 'gallery': return <GalleryManager />;
      case 'ai-chat': return <AIChat />;
      case 'notifications': return <NotificationsManager />;
      case 'bookmarks': return <BookmarksManager />;
      case 'passwords': return <PasswordVault />;
      case 'music': return <MusicPlayer />;
      case 'qr': return <QRCodeGenerator />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #0f1a3a 100%)'}}>
      {/* Sidebar */}
      <motion.aside initial={false} animate={{ width: isSidebarCollapsed ? 80 : 280 }} className="fixed left-0 top-0 h-full z-30 flex flex-col" style={{background: 'rgba(10, 10, 15, 0.95)', borderRight: '1px solid rgba(255,255,255,0.1)'}}>
        <div className="p-4" style={{borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}><Sparkle className="w-6 h-6 text-white" /></div>
            {!isSidebarCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-bold" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Shawon AI</motion.span>}
          </div>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button key={item.id} onClick={() => setActiveModal(item.id)} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all hover:bg-white/5" style={{color: 'rgba(255,255,255,0.7)'}}>
              <item.icon size={22} />
              {!isSidebarCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 text-left text-sm font-medium">{item.label}</motion.span>}
            </button>
          ))}
        </nav>
        <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-4 flex items-center justify-center" style={{borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)'}}>
          {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className={`p-8 ${isSidebarCollapsed ? 'ml-20' : 'ml-[280px]'} transition-all duration-300`}>
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Welcome back, Shawon!</h1>
            <p className="text-gray-400 mt-1">Here's your dashboard overview</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{background: 'rgba(255,255,255,0.1)'}}>
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-mono text-gray-300">{currentTime.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-full" style={{background: 'rgba(255,255,255,0.1)'}}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>👤</div>
              <span className="text-sm font-medium">Shawon</span>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-2xl p-6" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
              <div className="flex items-center justify-between mb-4"><stat.icon className="w-8 h-8" style={{color: stat.color}} /><span className="text-3xl font-bold" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{stat.value}</span></div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl p-6 mb-8" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
          <h2 className="text-xl font-bold mb-6">✨ Quick Actions</h2>
          <div className="grid grid-cols-4 gap-4">
            {sidebarItems.slice(1, 9).map((item, i) => (
              <motion.button key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.05 }} whileHover={{ scale: 1.05 }} onClick={() => setActiveModal(item.id)} className="p-4 rounded-xl text-center transition-all hover:bg-white/5" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}><item.icon className="w-6 h-6 text-white" /></div>
                <h3 className="font-medium text-sm">{item.label}</h3>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* AI Suggestions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="rounded-2xl p-6" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}><Sparkle className="w-5 h-5 text-white" /></div>
            <h2 className="text-lg font-bold">AI Suggestions</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['🚀 Optimize database queries', '⚠️ Add error handling', '💾 Implement caching', '🔧 Refactor legacy code'].map((suggestion, i) => (
              <div key={i} className="p-4 rounded-xl" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}><p className="text-sm text-gray-300">{suggestion}</p></div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Modal */}
      <Modal isOpen={!!activeModal} onClose={() => setActiveModal(null)} title={activeModal ? modalTitles[activeModal] : ''}>
        {renderModalContent()}
      </Modal>
    </div>
  );
}
