
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { 
  Zap, 
  Search, 
  ShieldCheck, 
  MessageSquare, 
  Layers, 
  Code2, 
  ChevronRight, 
  Play, 
  CheckCircle2, 
  Github, 
  Twitter, 
  Linkedin,
  X,
  ArrowRight,
  Sparkles
} from 'lucide-react';

// --- AI SERVICE ---
const getAIResponse = async function* (prompt: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are the Nexus Assistant, a world-class AI advisor for the Nexus SaaS platform. Nexus provides high-performance productivity tools and AI-driven automation. Your responses should be professional, short, and focused on helping teams ship faster.",
      }
    });

    for await (const chunk of response) {
      if (chunk.text) yield chunk.text;
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    yield "Connection to AI engine timed out. Please check your network or API configuration.";
  }
};

// --- COMPONENTS ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${scrolled ? 'glass border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-indigo-200 group-hover:rotate-6 transition-transform">
            <Layers size={20} strokeWidth={3} />
          </div>
          <span className="text-xl font-bold tracking-tighter text-slate-900 uppercase">Nexus</span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          {['Features', 'Pricing', 'Docs'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">{item}</a>
          ))}
          <button className="bg-slate-900 text-white px-7 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-slate-200">
            Launch Platform
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <header className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden bg-white">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-50/60 via-transparent to-transparent -z-10 rounded-full blur-3xl opacity-70"></div>
    <div className="max-w-7xl mx-auto px-6 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 bg-white border border-slate-200 rounded-full shadow-sm">
        <Sparkles size={14} className="text-indigo-600" />
        <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Deploy with confidence</span>
      </div>
      <h1 className="text-6xl md:text-[92px] font-extrabold tracking-tighter text-slate-900 mb-10 leading-[0.95]">
        The Operating System for <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Modern Teamwork.</span>
      </h1>
      <p className="max-w-2xl mx-auto text-xl text-slate-500 mb-14 leading-relaxed font-medium">
        Nexus replaces fragmented workflows with one lightning-fast, AI-native interface. Built for teams who refuse to compromise on speed.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-6 mb-24">
        <button className="px-12 py-5 bg-indigo-600 text-white rounded-2xl font-bold shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95 text-lg flex items-center gap-3 justify-center">
          Start for free <ArrowRight size={20} />
        </button>
        <button className="px-12 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all text-lg flex items-center justify-center gap-3">
          <Play size={18} fill="currentColor" /> Watch demo
        </button>
      </div>
      <div className="relative mx-auto max-w-6xl rounded-[3rem] border border-slate-200 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden bg-white animate-float p-3">
        <div className="rounded-[2.5rem] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=2070" className="w-full h-auto" alt="Nexus Dashboard" />
        </div>
      </div>
    </div>
  </header>
);

const Features = () => {
  const items = [
    { title: "Edge Synchronization", desc: "Collaborate globally with sub-50ms latency powered by our distributed engine.", icon: <Zap className="text-amber-500" /> },
    { title: "Semantic Search", desc: "Find anything across docs, tasks, and chats using our advanced NLP indexing.", icon: <Search className="text-indigo-500" /> },
    { title: "Military Encryption", desc: "AES-256 at rest and TLS 1.3 in transit. Your intellectual property is safe.", icon: <ShieldCheck className="text-green-500" /> },
    { title: "Neural Chat", desc: "Native team discussions that understand context and summarize long threads.", icon: <MessageSquare className="text-pink-500" /> },
    { title: "Visual Logic", desc: "Build powerful automations with an intuitive node-based editor. No code required.", icon: <Layers className="text-violet-500" /> },
    { title: "Unified SDK", desc: "Extend Nexus with a single powerful API. Fully documented for developers.", icon: <Code2 className="text-slate-700" /> },
  ];

  return (
    <section id="features" className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Core Infrastructure</h2>
          <p className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">Engineered for Peak <br/> Performance.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((item, i) => (
            <div key={i} className="group p-12 rounded-[2.5rem] bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100/30 transition-all duration-500">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-indigo-50 transition-all">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed text-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Welcome to the future of workspace. I am Nexus Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userPrompt = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userPrompt }]);
    setIsTyping(true);

    let streamText = '';
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    const stream = getAIResponse(userPrompt);
    for await (const chunk of stream) {
      streamText += chunk;
      setMessages(prev => {
        const next = [...prev];
        next[next.length - 1] = { role: 'model', text: streamText };
        return next;
      });
    }
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      {isOpen ? (
        <div className="bg-white w-[420px] h-[640px] rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25)] border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-12 fade-in duration-500">
          <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center font-bold text-xl"><MessageSquare size={20} /></div>
              <div>
                <span className="font-bold block tracking-tight">Nexus AI</span>
                <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest">Enterprise Support</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-slate-800 p-2 rounded-xl transition-all">
              <X size={20} />
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50 scroll-smooth">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-6 py-4 rounded-[1.8rem] text-[15px] leading-relaxed ${m.role === 'user' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-white border border-slate-200 text-slate-700 shadow-sm'}`}>
                  {m.text || (isTyping && i === messages.length - 1 ? 'Nexus is drafting a response...' : '')}
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-white border-t border-slate-100 flex gap-3">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Message Nexus Assistant..."
              className="flex-1 bg-slate-100 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-medium"
            />
            <button onClick={handleSend} disabled={isTyping} className="bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-100">
              Send
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-18 h-18 px-6 py-6 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <MessageSquare size={28} className="relative z-10" strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};

const Pricing = () => (
  <section id="pricing" className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-24">
        <h2 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Straightforward Pricing.</h2>
        <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium">Build, scale, and thrive without worrying about seat-based costs.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <div className="p-16 rounded-[4rem] border border-slate-100 bg-slate-50 flex flex-col justify-between hover:border-slate-200 transition-all">
          <div>
            <h3 className="text-2xl font-bold mb-4">Start Tier</h3>
            <p className="text-slate-500 mb-10 text-lg">Essential tools for individual builders.</p>
            <div className="text-7xl font-black mb-12">$0<span className="text-xl font-medium text-slate-400">/mo</span></div>
            <ul className="space-y-5 mb-14 text-slate-600 font-medium">
              <li className="flex items-center gap-4"><CheckCircle2 className="text-green-500" size={18} /> Up to 5 projects</li>
              <li className="flex items-center gap-4"><CheckCircle2 className="text-green-500" size={18} /> 10GB Data transfer</li>
              <li className="flex items-center gap-4"><CheckCircle2 className="text-green-500" size={18} /> Standard AI access</li>
            </ul>
          </div>
          <button className="w-full py-5 bg-white border border-slate-200 rounded-2xl font-bold text-xl hover:bg-slate-100 transition-all shadow-sm">Get Started</button>
        </div>
        <div className="p-16 rounded-[4rem] border-2 border-indigo-600 bg-white shadow-[0_40px_100px_-20px_rgba(79,70,229,0.15)] relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-10 right-10 bg-indigo-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">Growth Pick</div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Velocity Tier</h3>
            <p className="text-slate-500 mb-10 text-lg">Built for high-performance teams.</p>
            <div className="text-7xl font-black mb-12">$79<span className="text-xl font-medium text-slate-400">/mo</span></div>
            <ul className="space-y-5 mb-14 text-slate-700 font-medium">
              <li className="flex items-center gap-4 text-indigo-600 font-bold"><CheckCircle2 size={18} /> Unlimited seats</li>
              <li className="flex items-center gap-4 text-indigo-600 font-bold"><CheckCircle2 size={18} /> Unlimited AI workflows</li>
              <li className="flex items-center gap-4"><CheckCircle2 className="text-green-500" size={18} /> RBAC & SSO support</li>
              <li className="flex items-center gap-4"><CheckCircle2 className="text-green-500" size={18} /> Enterprise SLA</li>
            </ul>
          </div>
          <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95">Upgrade to Velocity</button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-900 text-slate-500 py-32 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24 text-left">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-bold"><Layers size={20} /></div>
            <span className="text-white font-bold text-2xl tracking-tighter">NEXUS</span>
          </div>
          <p className="text-lg leading-relaxed text-slate-400">The high-performance operating system for the next generation of giants. Speed is our religion.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-10 uppercase tracking-[0.3em] text-xs">Product</h4>
          <ul className="space-y-6 font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Core Engine</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Visual Logic</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Neural Sync</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-10 uppercase tracking-[0.3em] text-xs">Community</h4>
          <ul className="space-y-6 font-medium">
            <li className="flex items-center gap-3"><Twitter size={16} /> <a href="#" className="hover:text-white transition-colors">X (Twitter)</a></li>
            <li className="flex items-center gap-3"><Github size={16} /> <a href="#" className="hover:text-white transition-colors">Engineering</a></li>
            <li className="flex items-center gap-3"><Linkedin size={16} /> <a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-10 uppercase tracking-[0.3em] text-xs">Platform</h4>
          <ul className="space-y-6 font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-16 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-10 text-sm tracking-wide">
        <p>&copy; 2024 Nexus Technologies International. All rights reserved.</p>
        <div className="flex gap-10 items-center">
          <span className="flex items-center gap-2 font-bold text-indigo-400"><div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,1)]"></div> INFRASTRUCTURE ONLINE</span>
        </div>
      </div>
    </div>
  </footer>
);

const App = () => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <Hero />
    
    {/* Trust Section */}
    <section className="py-24 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-16">Trusted by the engineers of the future</p>
        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 opacity-20 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          <span className="text-4xl font-black italic tracking-tighter uppercase">Solaris</span>
          <span className="text-4xl font-black tracking-widest uppercase">Orbit</span>
          <span className="text-4xl font-black italic tracking-tighter uppercase">Pulse</span>
          <span className="text-4xl font-black tracking-widest uppercase">Vortex</span>
        </div>
      </div>
    </section>

    <Features />
    <Pricing />
    
    {/* CTA Block */}
    <section className="py-32 bg-indigo-600 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/40 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-8xl font-extrabold mb-12 tracking-tighter leading-[0.9]">Stop fighting tools. <br/> Start shipping.</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          <button className="px-14 py-6 bg-white text-indigo-600 rounded-3xl font-bold text-2xl hover:bg-indigo-50 transition-all shadow-2xl hover:scale-105 active:scale-95">Claim Free Access</button>
          <button className="px-14 py-6 bg-indigo-500/50 text-white rounded-3xl font-bold text-2xl border border-indigo-400/30 hover:bg-indigo-500 transition-all">Talk to Founders</button>
        </div>
      </div>
    </section>

    <Footer />
    <ChatBot />
  </div>
);

// --- RENDER ---
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
} else {
  console.error("DOM Root Element missing.");
}
