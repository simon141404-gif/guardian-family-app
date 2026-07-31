'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FileText, Calendar, FolderKanban, Image, MessageSquare, Bell, Bookmark, Lock, Settings,
  Music, QrCode, Search, Bot, Sparkle, Plus, LogOut, ChevronLeft, ChevronRight, Clock, Target, Zap, Folder,
  Play, Pause, SkipForward, Send, Trash2, Eye, EyeOff, Copy, Download, X, Check, ExternalLink, User, Trash, Edit, Save
} from 'lucide-react';

// Modal Component
function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl backdrop-blur-xl" style={{background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(148, 163, 184, 0.2)'}} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 backdrop-blur-xl" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}>
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

// SMART AI CHAT
function AIChatModal() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: "👋 Hi! I'm Shawon AI. I can help with coding, design, AI, and more! Ask me anything!" }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateResponse = (text: string): string => {
    const input = text.toLowerCase();
    if (input.includes('react')) return "⚛️ React Tips:\n\n• Use functional components\n• useState for state\n• useEffect for side effects\n• Keep components small\n\nNeed help with specific React code?";
    if (input.includes('ai') || input.includes('chatgpt')) return "🤖 AI Help:\n\n• ChatGPT for conversations\n• DALL-E for images\n• Claude for reasoning\n• LangChain for LLM apps\n\nWhat AI topic interests you?";
    if (input.includes('help') || input.includes('how')) return "I can help with:\n\n💻 Coding\n🎨 Design\n🤖 AI/ML\n💼 Career\n📱 Apps\n\nWhat do you need?";
    if (input.includes('hello') || input.includes('hi')) return "👋 Hello! Great to meet you! How can I help you today?";
    return `Great question about "${text.substring(0, 30)}..."!\n\nHere's my suggestion:\n1️⃣ Research the topic\n2️⃣ Start small\n3️⃣ Practice regularly\n4️⃣ Join communities\n\nWant more details?`;
  };

  const send = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1500));
    setMessages(prev => [...prev, { role: 'assistant', content: generateResponse(input) }]);
    setIsTyping(false);
  };

  return (
    <div className="space-y-4">
      <div className="h-80 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[85%] px-4 py-3 rounded-2xl" style={msg.role === 'user' ? {background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'} : {background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
              <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        {isTyping && <div className="flex justify-start"><div className="px-4 py-3 rounded-2xl" style={{background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(148, 163, 184, 0.1)'}}><div className="flex gap-1"><span className="w-2 h-2 rounded-full animate-bounce" style={{background: 'rgba(99, 102, 241, 0.9)', animationDelay: '0ms'}} /><span className="w-2 h-2 rounded-full animate-bounce" style={{background: 'rgba(99, 102, 241, 0.9)', animationDelay: '150ms'}} /><span className="w-2 h-2 rounded-full animate-bounce" style={{background: 'rgba(99, 102, 241, 0.9)', animationDelay: '300ms'}} /></div></div></div>}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && send()} placeholder="Ask me anything..." className="flex-1 px-4 py-3 rounded-xl text-white placeholder-gray-400 backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} />
        <button onClick={send} className="px-6 py-3 rounded-xl backdrop-blur-xl" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}><Send size={20} /></button>
      </div>
    </div>
  );
}

// Documents
function DocumentsModal() {
  const [docs, setDocs] = useState([
    { id: 1, title: 'Project Roadmap', type: 'PDF', size: '2.4 MB' },
    { id: 2, title: 'Meeting Notes', type: 'DOC', size: '156 KB' },
    { id: 3, title: 'Design System', type: 'FIG', size: '15.8 MB' },
  ]);
  const [newDoc, setNewDoc] = useState('');

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input value={newDoc} onChange={(e) => setNewDoc(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && setDocs([{ id: Date.now(), title: newDoc, type: 'TXT', size: '0 KB' }, ...docs])} placeholder="New document..." className="flex-1 px-4 py-3 rounded-xl text-white placeholder-gray-400 backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} />
        <button onClick={() => setDocs([{ id: Date.now(), title: newDoc, type: 'TXT', size: '0 KB' }, ...docs])} className="px-6 py-3 rounded-xl backdrop-blur-xl" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}><Plus size={20} /></button>
      </div>
      <div className="space-y-2">
        {docs.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-4 rounded-xl backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
            <div className="flex items-center gap-4"><FileText className="w-5 h-5" style={{color: 'rgba(99, 102, 241, 0.9)'}} /><div><h4>{doc.title}</h4><p className="text-xs text-gray-400">{doc.type} • {doc.size}</p></div></div>
            <button onClick={() => setDocs(docs.filter(d => d.id !== doc.id))} className="p-2" style={{color: '#ef4444'}}><Trash2 size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Calendar
function CalendarModal() {
  const [events, setEvents] = useState([
    { id: 1, title: 'Team Meeting', date: 'Dec 20', time: '10:00 AM' },
    { id: 2, title: 'Project Deadline', date: 'Dec 25', time: '11:59 PM' },
  ]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '' });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="Event title..." className="px-4 py-3 rounded-xl text-white placeholder-gray-400 backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} />
        <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className="px-4 py-3 rounded-xl text-white backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} />
      </div>
      <button onClick={() => setEvents([...events, { id: Date.now(), ...newEvent, time: '12:00 PM' }])} className="w-full py-3 rounded-xl backdrop-blur-xl" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}>Add Event</button>
      <div className="space-y-2">
        {events.map((event) => (
          <div key={event.id} className="flex items-center gap-4 p-4 rounded-xl backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
            <Calendar className="w-6 h-6" style={{color: 'rgba(99, 102, 241, 0.9)'}} />
            <div className="flex-1"><h4>{event.title}</h4><p className="text-xs text-gray-400">{event.date} at {event.time}</p></div>
            <button onClick={() => setEvents(events.filter(e => e.id !== event.id))} className="p-2" style={{color: '#ef4444'}}><Trash2 size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Projects
function ProjectsModal() {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Website Redesign', progress: 75, status: 'active' },
    { id: 2, name: 'Mobile App', progress: 45, status: 'active' },
  ]);
  const [newProject, setNewProject] = useState('');

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input value={newProject} onChange={(e) => setNewProject(e.target.value)} placeholder="New project..." className="flex-1 px-4 py-3 rounded-xl text-white placeholder-gray-400 backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} />
        <button onClick={() => setProjects([{ id: Date.now(), name: newProject, progress: 0, status: 'active' }, ...projects])} className="px-6 py-3 rounded-xl backdrop-blur-xl" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}><Plus size={20} /></button>
      </div>
      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p.id} className="p-6 rounded-xl backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
            <div className="flex justify-between mb-3"><h4 className="font-semibold">{p.name}</h4><span className="px-3 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-400">{p.status}</span></div>
            <div className="h-2 rounded-full backdrop-blur-xl" style={{background: 'rgba(148, 163, 184, 0.2)'}}><motion.div initial={{ width: 0 }} animate={{ width: `${p.progress}%` }} className="h-full rounded-full" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}} /></div>
            <p className="text-xs text-gray-400 mt-1">{p.progress}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Gallery
function GalleryModal() {
  const [images, setImages] = useState([
    { id: 1, url: 'https://picsum.photos/seed/1/300/200', name: 'Screenshot 1' },
    { id: 2, url: 'https://picsum.photos/seed/2/300/200', name: 'Design Mockup' },
  ]);
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      <button onClick={() => fileRef.current?.click()} className="w-full py-3 rounded-xl backdrop-blur-xl" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}><Plus size={16} className="inline mr-2" /> Add Images</button>
      <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" />
      <div className="grid grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative group">
            <img src={img.url} alt={img.name} className="w-full aspect-video object-cover rounded-xl" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-xl flex items-center justify-center gap-2">
              <button className="p-2 rounded-full" style={{background: 'rgba(255,255,255,0.2)'}}><Copy size={16} /></button>
              <a href={img.url} download className="p-2 rounded-full" style={{background: 'rgba(255,255,255,0.2)'}}><Download size={16} /></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Notifications
function NotificationsModal() {
  const [notifs, setNotifs] = useState([
    { id: 1, title: 'New Message', message: 'You have a new message', time: '5 min ago', read: false },
    { id: 2, title: 'Task Completed', message: 'Project milestone!', time: '1 hour ago', read: false },
  ]);

  return (
    <div className="space-y-2 max-h-80 overflow-y-auto">
      {notifs.map((notif) => (
        <div key={notif.id} className="p-4 rounded-xl border-l-4 backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', borderColor: notif.read ? 'transparent' : 'rgba(99, 102, 241, 0.9)', opacity: notif.read ? 0.6 : 1}}>
          <div className="flex justify-between"><div><h4 className="font-medium">{notif.title}</h4><p className="text-sm text-gray-400">{notif.message}</p><p className="text-xs text-gray-500">{notif.time}</p></div><button onClick={() => setNotifs(notifs.filter(n => n.id !== notif.id))} className="p-1" style={{color: '#ef4444'}}><X size={16} /></button></div>
        </div>
      ))}
    </div>
  );
}

// Bookmarks
function BookmarksModal() {
  const [bookmarks, setBookmarks] = useState([
    { id: 1, title: 'GitHub', url: 'https://github.com' },
    { id: 2, title: 'Figma', url: 'https://figma.com' },
  ]);
  const [newBM, setNewBM] = useState({ title: '', url: '' });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input value={newBM.title} onChange={(e) => setNewBM({ ...newBM, title: e.target.value })} placeholder="Title..." className="px-4 py-3 rounded-xl text-white placeholder-gray-400 backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} />
        <input value={newBM.url} onChange={(e) => setNewBM({ ...newBM, url: e.target.value })} placeholder="URL..." className="px-4 py-3 rounded-xl text-white placeholder-gray-400 backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} />
      </div>
      <button onClick={() => setBookmarks([...bookmarks, { id: Date.now(), ...newBM }])} className="w-full py-3 rounded-xl backdrop-blur-xl" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}>Add Bookmark</button>
      <div className="space-y-2">
        {bookmarks.map((bm) => (
          <a key={bm.id} href={bm.url} target="_blank" className="flex items-center justify-between p-4 rounded-xl backdrop-blur-xl hover:bg-white/5" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
            <div><h4 className="font-medium">{bm.title}</h4><p className="text-xs text-gray-400 truncate">{bm.url}</p></div>
            <ExternalLink size={18} className="text-gray-400" />
          </a>
        ))}
      </div>
    </div>
  );
}

// Password Vault
function PasswordsModal() {
  const [passwords, setPasswords] = useState([
    { id: 1, site: 'Gmail', username: 'user@gmail.com', password: '••••••••' },
    { id: 2, site: 'GitHub', username: 'developer', password: '••••••••' },
  ]);
  const [showId, setShowId] = useState<number | null>(null);
  const [newPwd, setNewPwd] = useState({ site: '', username: '', password: '' });

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <input value={newPwd.site} onChange={(e) => setNewPwd({ ...newPwd, site: e.target.value })} placeholder="Site name..." className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} />
        <input value={newPwd.username} onChange={(e) => setNewPwd({ ...newPwd, username: e.target.value })} placeholder="Username..." className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} />
        <input value={newPwd.password} onChange={(e) => setNewPwd({ ...newPwd, password: e.target.value })} placeholder="Password..." className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)'}} />
      </div>
      <button onClick={() => setPasswords([...passwords, { id: Date.now(), ...newPwd }])} className="w-full py-3 rounded-xl backdrop-blur-xl" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}>Add Password</button>
      <div className="space-y-2">
        {passwords.map((pwd) => (
          <div key={pwd.id} className="flex items-center justify-between p-4 rounded-xl backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
            <div><h4 className="font-medium">{pwd.site}</h4><p className="text-sm text-gray-400">{pwd.username}</p></div>
            <div className="flex gap-2">
              <button onClick={() => setShowId(showId === pwd.id ? null : pwd.id)} className="p-2" style={{color: 'rgba(99, 102, 241, 0.9)'}}>{showId === pwd.id ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              <button onClick={() => navigator.clipboard.writeText(pwd.password)} className="p-2" style={{color: 'rgba(99, 102, 241, 0.9)'}}><Copy size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Music Player
function MusicModal() {
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);
  const tracks = [{ title: 'Focus Flow', artist: 'AI Beats', dur: '3:45' }, { title: 'Deep Work', artist: 'Neural Waves', dur: '4:12' }, { title: 'Code Mode', artist: 'Synth', dur: '3:58' }];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-40 h-40 mx-auto rounded-2xl flex items-center justify-center mb-4" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}><Music className="w-20 h-20 text-white" /></div>
        <h3 className="text-xl font-bold">{tracks[track].title}</h3><p className="text-gray-400">{tracks[track].artist}</p>
      </div>
      <div className="flex items-center justify-center gap-6">
        <button onClick={() => setTrack((track - 1 + tracks.length) % tracks.length)} className="p-3 rounded-full backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}><SkipForward className="w-6 h-6 rotate-180" /></button>
        <button onClick={() => setPlaying(!playing)} className="w-16 h-16 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}>{playing ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}</button>
        <button onClick={() => setTrack((track + 1) % tracks.length)} className="p-3 rounded-full backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}><SkipForward className="w-6 h-6" /></button>
      </div>
      <div className="space-y-2">
        {tracks.map((t, i) => (
          <button key={i} onClick={() => setTrack(i)} className="w-full flex items-center justify-between p-3 rounded-xl" style={{background: i === track ? 'rgba(99, 102, 241, 0.2)' : 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}><span style={{color: i === track ? 'rgba(99, 102, 241, 0.9)' : 'white'}}>{t.title}</span><span className="text-gray-500 text-sm">{t.dur}</span></button>
        ))}
      </div>
    </div>
  );
}

// Main Dashboard
export default function Dashboard() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  const items = [
    { icon: LayoutDashboard, label: 'Dashboard', id: null },
    { icon: MessageSquare, label: 'AI Chat', id: 'chat' },
    { icon: Target, label: 'Tasks', id: 'tasks' },
    { icon: Folder, label: 'Projects', id: 'projects' },
    { icon: Calendar, label: 'Calendar', id: 'calendar' },
    { icon: FileText, label: 'Documents', id: 'docs' },
    { icon: Image, label: 'Gallery', id: 'gallery' },
    { icon: Bell, label: 'Notifications', id: 'notifications' },
    { icon: Bookmark, label: 'Bookmarks', id: 'bookmarks' },
    { icon: Lock, label: 'Passwords', id: 'passwords' },
    { icon: Music, label: 'Music', id: 'music' },
    { icon: QrCode, label: 'QR Code', id: 'qr' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  const titles: Record<string, string> = {
    chat: '🤖 AI Chat',
    tasks: '✅ Tasks Manager',
    projects: '📁 Projects',
    calendar: '📅 Calendar',
    docs: '📄 Documents',
    gallery: '🖼️ Gallery',
    notifications: '🔔 Notifications',
    bookmarks: '🔖 Bookmarks',
    passwords: '🔐 Password Vault',
    music: '🎵 Music Player',
    qr: '📱 QR Code',
    settings: '⚙️ Settings',
  };

  const renderContent = () => {
    switch (activeModal) {
      case 'chat': return <AIChatModal />;
      case 'docs': return <DocumentsModal />;
      case 'calendar': return <CalendarModal />;
      case 'projects': return <ProjectsModal />;
      case 'gallery': return <GalleryModal />;
      case 'notifications': return <NotificationsModal />;
      case 'bookmarks': return <BookmarksModal />;
      case 'passwords': return <PasswordsModal />;
      case 'music': return <MusicModal />;
      case 'tasks': return <AIChatModal />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)'}}>
      {/* Sidebar */}
      <motion.aside animate={{ width: collapsed ? 80 : 280 }} className="fixed left-0 top-0 h-full z-30 flex flex-col backdrop-blur-xl" style={{background: 'rgba(15, 23, 42, 0.95)', borderRight: '1px solid rgba(148, 163, 184, 0.1)'}}>
        <div className="p-4" style={{borderBottom: '1px solid rgba(148, 163, 184, 0.1)'}}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}><Sparkle className="w-6 h-6 text-white" /></div>
            {!collapsed && <span className="text-lg font-bold" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Shawon AI</span>}
          </div>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {items.map((item) => (
            <button key={item.id || 'dash'} onClick={() => item.id && setActiveModal(item.id)} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all hover:bg-white/5" style={{color: 'rgba(255,255,255,0.7)'}}>
              <item.icon size={22} />
              {!collapsed && <span className="flex-1 text-left text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>
        <button onClick={() => setCollapsed(!collapsed)} className="p-4 flex items-center justify-center" style={{borderTop: '1px solid rgba(148, 163, 184, 0.1)', color: 'rgba(255,255,255,0.5)'}}>{collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}</button>
      </motion.aside>

      {/* Main */}
      <main className={`p-8 ${collapsed ? 'ml-20' : 'ml-[280px]'} transition-all duration-300`}>
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Welcome back, Shawon!</h1>
            <p className="text-gray-400 mt-1">Here's your dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-mono" style={{color: 'rgba(99, 102, 241, 0.9)'}}>{time.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}>👤</div>
              <span className="text-sm font-medium">Shawon</span>
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[{ label: 'Tasks Done', value: '24', icon: Target, color: '#10b981' }, { label: 'Hours', value: '142', icon: Clock, color: '#3b82f6' }, { label: 'Projects', value: '8', icon: Folder, color: '#8b5cf6' }, { label: 'Streak', value: '15', icon: Zap, color: '#f59e0b' }].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-2xl p-6 backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
              <div className="flex items-center justify-between mb-4"><s.icon className="w-8 h-8" style={{color: s.color}} /><span className="text-3xl font-bold" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{s.value}</span></div>
              <p className="text-gray-400 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl p-6 mb-8" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
          <h2 className="text-xl font-bold mb-6">✨ Quick Actions</h2>
          <div className="grid grid-cols-4 gap-4">
            {items.filter(i => i.id).slice(0, 8).map((item, i) => (
              <motion.button key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.05 }} whileHover={{ scale: 1.05 }} onClick={() => item.id && setActiveModal(item.id)} className="p-4 rounded-xl text-center transition-all hover:bg-white/5 backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}><item.icon className="w-6 h-6 text-white" /></div>
                <h3 className="font-medium text-sm">{item.label}</h3>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* AI Suggestions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="rounded-2xl p-6" style={{background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.1)'}}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'}}><Sparkle className="w-5 h-5 text-white" /></div>
            <h2 className="text-lg font-bold">AI Suggestions</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['🚀 Optimize database queries', '⚠️ Add error handling', '💾 Implement caching', '🔧 Refactor legacy code'].map((s, i) => (
              <div key={i} className="p-4 rounded-xl backdrop-blur-xl" style={{background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(148, 163, 184, 0.1)'}}><p className="text-sm text-gray-300">{s}</p></div>
            ))}
          </div>
        </motion.div>
      </main>

      <Modal isOpen={!!activeModal} onClose={() => setActiveModal(null)} title={activeModal ? titles[activeModal] : ''}>{renderContent()}</Modal>
    </div>
  );
}
