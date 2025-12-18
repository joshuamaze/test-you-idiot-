
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
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
  X,
  ArrowRight,
  Sparkles,
  Cpu,
  Lock,
  Menu
} from 'lucide-react';

// --- AI SERVICE ---
const getAIResponse = async function* (prompt: string) {
  try {
    // Initializing GoogleGenAI with process.env.API_KEY directly as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are the Nexus Assistant, a world-class AI advisor for the Nexus SaaS platform. Nexus provides high-performance productivity tools and AI-driven automation. Your responses should be professional, short, and focused on helping teams ship faster.",
      }
    });

    for await (const chunk of response) {
      const c = chunk as GenerateContentResponse;
      // Directly access .text property from the chunk
      if (c.text) yield c.text;
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    yield "I'm having trouble connecting to the Nexus core. Please check your API configuration.";
  }
};

// --- COMPONENTS ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

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
            <Layers size={22} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-extrabold tracking-tighter text-slate-900 uppercase">Nexus</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          <a href="#features" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Pricing</a>
          <button className="bg-slate-900 text-white px-7 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-slate-200">
            Launch Platform
          </button>
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenu && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200">
          <a href="#features" onClick={() => setMobileMenu(false)} className="text-lg font-bold">Features</a>
          <a href="#pricing" onClick={() => setMobileMenu(false)} className="text-lg font-bold">Pricing</a>
          <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold">Get Started</button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
  <header className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden bg-white">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-50/60 via-transparent to-transparent -z-10 rounded-full blur-3xl opacity-70"></div>
    <div className="max-w-7xl mx-auto px-6 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 bg-white border border-slate-200 rounded-full shadow-sm">
        <Sparkles size={14} className="text-indigo-600" />
        <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Deploying Tomorrow</span>
      </div>
      <h1 className="text-5xl md:text-[84px] font-extrabold tracking-tighter text-slate-900 mb-10 leading-[0.95]">
        The Operating System for <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Hyper-Performance.</span>
      </h1>
      <p className="max-w-2xl mx-auto text-xl text-slate-500 mb-14 leading-relaxed font-medium">
        Nexus replaces fragmented legacy tools with one lightning-fast, AI-native interface. Built for builders who refuse to compromise.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-6 mb-24">
        <button className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95 text-lg flex items-center gap-3 justify-center">
          Start for free <ArrowRight size={20} />
        </button>
        <button className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all text-lg flex items-center justify-center gap-3">
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
    { title: "Edge Synchronization", desc: "Sub-50ms latency across global nodes for real-time collaboration.", icon: <Zap className="text-amber-500" /> },
    { title: "Semantic Search", desc: "Instantly index and retrieve any document or thread with vector search.", icon: <Search className="text-indigo-500" /> },
    { title: "Secure Infrastructure", desc: "Military-grade encryption and automated threat detection.", icon: <Lock className="text-green-500" /> },
    { title: "AI-Native Logic", desc: "A built-in intelligence layer that understands your team's context.", icon: <MessageSquare className="text-pink-500" /> },
    { title: "Visual Automation", desc: "Construct complex workflows with our node-based automation engine.", icon: <Cpu className="text-violet-500" /> },
    { title: "Deep Integration", desc: "Seamlessly connect with your existing toolchain via our robust SDK.", icon: <Code2 className="text-slate-700" /> },
  ];

  return (
    <section id="features" className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Core Infrastructure</h2>
          <p className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">Engineered to Win.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-2xl transition-all duration-500">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-50 transition-all">
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

const Pricing = () => (
  <section id="pricing" className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-24">
        <h2 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Fair & Scalable.</h2>
        <p className="text-slate-500 text-xl font-medium">Build without worrying about the bill.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="p-12 rounded-[3rem] bg-slate-50 border border-slate-100">
          <h3 className="text-xl font-bold mb-2">Starter</h3>
          <p className="text-slate-500 mb-8">For individuals and experiments.</p>
          <div className="text-6xl font-black mb-10">$0<span className="text-lg text-slate-400 font-normal">/mo</span></div>
          <ul className="space-y-4 mb-12">
            <li className="flex items-center gap-3 font-medium"><CheckCircle2 className="text-green-500" size={18} /> 5 Active Projects</li>
            <li className="flex items-center gap-3 font-medium"><CheckCircle2 className="text-green-500" size={18} /> Basic AI Assistance</li>
            <li className="flex items-center gap-3 font-medium"><CheckCircle2 className="text-green-500" size={18} /> Community Support</li>
          </ul>
          <button className="w-full py-4 bg-white border border-slate-200 rounded-xl font-bold hover:bg-slate-100 transition-all">Start Free</button>
        </div>
        <div className="p-12 rounded-[3rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-200">
          <h3 className="text-xl font-bold mb-2 text-indigo-100">Pro</h3>
          <p className="text-indigo-200 mb-8">For high-velocity teams.</p>
          <div className="text-6xl font-black mb-10">$49<span className="text-lg text-indigo-300 font-normal">/mo</span></div>
          <ul className="space-y-4 mb-12">
            <li className="flex items-center gap-3 font-medium"><CheckCircle2 className="text-indigo-300" size={18} /> Unlimited Seats</li>
            <li className="flex items-center gap-3 font-medium"><CheckCircle2 className="text-indigo-300" size={18} /> Full Neural API</li>
            <li className="flex items-center gap-3 font-medium"><CheckCircle2 className="text-indigo-300" size={18} /> 24/7 Priority Support</li>
          </ul>
          <button className="w-full py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all">Upgrade Now</button>
        </div>
      </div>
    </div>
  </section>
);

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Nexus Assistant active. How can I help you today?' }
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
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="bg-white w-[380px] h-[580px] rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
          <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center"><MessageSquare size={16} /></div>
              <span className="font-bold">Nexus AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-slate-800 p-1 rounded-lg transition-all"><X size={20} /></button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700 shadow-sm'}`}>
                  {m.text || (isTyping && i === messages.length - 1 ? 'Nexus is thinking...' : '')}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-slate-100 border-none rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button onClick={handleSend} disabled={isTyping} className="bg-indigo-600 text-white px-4 py-3 rounded-xl font-bold disabled:opacity-50">Send</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="w-16 h-16 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
};

const App = () => (
  <div className="min-h-screen">
    <Navbar />
    <Hero />
    <Features />
    <Pricing />
    <footer className="bg-slate-900 text-slate-500 py-24 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center text-white"><Layers size={18} /></div>
          <span className="text-white font-bold text-xl uppercase tracking-tighter">Nexus</span>
        </div>
        <p className="mb-12">Building the high-output workspace of the future.</p>
        <div className="pt-8 border-t border-slate-800 text-sm">
          &copy; 2024 Nexus Technologies. All systems nominal.
        </div>
      </div>
    </footer>
    <ChatBot />
  </div>
);

const root = document.getElementById('root');
if (root) createRoot(root).render(<App />);