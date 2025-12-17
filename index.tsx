
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// --- AI SERVICE ---
const getGeminiResponse = async function* (prompt: string, history: any[]) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "You are the Nexus Support AI. Nexus is a high-performance productivity platform for teams. You are professional, concise, and helpful. Your goal is to convert visitors into trial users by explaining the benefits of Nexus: automation, speed, and beautiful design.",
      }
    });

    const result = await chat.sendMessageStream({ message: prompt });
    for await (const chunk of result) {
      yield (chunk as GenerateContentResponse).text;
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    yield "I'm having a little trouble connecting. Please try again in a moment!";
  }
};

// --- COMPONENTS ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-slate-200 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform">N</div>
          <span className="text-xl font-extrabold tracking-tight">Nexus</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Pricing</a>
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-600 transition-all active:scale-95">
            Launch App
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <header className="relative pt-32 pb-20 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 text-center">
      <div className="inline-block px-4 py-1.5 mb-6 bg-indigo-50 border border-indigo-100 rounded-full">
        <span className="text-sm font-bold text-indigo-600">v2.0 is now live! ✨</span>
      </div>
      <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-slate-900 mb-8 leading-[1.1]">
        Design your <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">dream workflow.</span>
      </h1>
      <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
        Nexus is the all-in-one workspace for teams who care about speed, beauty, and impact. No more jumping between tools.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
        <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95">
          Get Started for Free
        </button>
        <button className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all">
          View Components
        </button>
      </div>
      <div className="relative mx-auto max-w-5xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden bg-slate-900 aspect-[16/9]">
        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2026" className="w-full h-full object-cover opacity-80" alt="Dashboard" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
      </div>
    </div>
  </header>
);

const Features = () => {
  const items = [
    { title: "Neural Sync", desc: "Data synchronization that feels like magic. Instant and reliable.", icon: "🧠" },
    { title: "Global CDN", desc: "Served from 250+ locations worldwide for sub-10ms latency.", icon: "🌐" },
    { title: "Dark Mode", desc: "Beautiful interfaces that are easy on the eyes, day or night.", icon: "🌙" },
    { title: "Team Chat", desc: "Contextual discussions baked right into your workflow.", icon: "💬" },
    { title: "Smart Logic", desc: "Build complex automations without writing a single line of code.", icon: "⚡" },
    { title: "Security First", desc: "SOC2 Type II compliant with end-to-end encryption by default.", icon: "🔐" },
  ];

  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Built for performance</h2>
          <p className="text-slate-600 max-w-xl mx-auto">Stop worrying about your infrastructure and start focusing on your product.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl border border-slate-200 hover:border-indigo-400 transition-all group hover:shadow-xl hover:shadow-indigo-50">
              <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
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
    { role: 'model', text: 'Hi! I\'m the Nexus Assistant. How can I help you build your dream workflow today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    let fullText = '';
    setMessages(prev => [...prev, { role: 'model', text: '' }]);
    
    const stream = getGeminiResponse(userMsg, messages);
    for await (const chunk of stream) {
      fullText += chunk;
      setMessages(prev => {
        const next = [...prev];
        next[next.length - 1] = { role: 'model', text: fullText };
        return next;
      });
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      {isOpen ? (
        <div className="bg-white w-[380px] h-[550px] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-500">
          <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold">N</div>
              <span className="font-bold">Nexus AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="opacity-60 hover:opacity-100 transition-opacity">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700 shadow-sm'}`}>
                  {m.text || (loading && i === messages.length - 1 ? '...' : '')}
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
              placeholder="Ask a question..."
              className="flex-1 bg-slate-100 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
            <button onClick={handleSend} className="bg-indigo-600 text-white px-5 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50">
              Send
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
        >
          <svg className="w-7 h-7 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        </button>
      )}
    </div>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-slate-500 py-16">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">N</div>
        <span className="text-white font-bold text-lg">Nexus</span>
      </div>
      <div className="flex gap-8 text-sm">
        <a href="#" className="hover:text-white transition-colors">Twitter</a>
        <a href="#" className="hover:text-white transition-colors">GitHub</a>
        <a href="#" className="hover:text-white transition-colors">Discord</a>
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
      </div>
      <p className="text-xs">&copy; 2024 Nexus. All rights reserved.</p>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Social Proof */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">Trusted by the best teams</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
            <span className="text-2xl font-black">STRIKE</span>
            <span className="text-2xl font-black">VOLT</span>
            <span className="text-2xl font-black">ORBIT</span>
            <span className="text-2xl font-black">PULSE</span>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Simple, fair pricing</h2>
            <p className="text-slate-600 text-lg">No hidden fees. No surprise charges. Just Nexus.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-10 rounded-3xl border border-slate-200 bg-slate-50">
              <h3 className="text-xl font-bold mb-2 text-slate-900">Personal</h3>
              <p className="text-slate-500 mb-6">Perfect for side projects.</p>
              <div className="text-5xl font-black mb-8">$0<span className="text-lg font-normal text-slate-400">/mo</span></div>
              <ul className="space-y-4 mb-10 text-slate-600">
                <li className="flex gap-3">✓ Unlimited files</li>
                <li className="flex gap-3">✓ 3 team members</li>
                <li className="flex gap-3">✓ Community support</li>
              </ul>
              <button className="w-full py-4 bg-white border border-slate-200 rounded-2xl font-bold hover:bg-slate-100 transition-colors">Start Free</button>
            </div>
            <div className="p-10 rounded-3xl border-2 border-indigo-600 bg-white shadow-2xl shadow-indigo-100 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">Popular</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Pro</h3>
              <p className="text-slate-500 mb-6">Best for scaling teams.</p>
              <div className="text-5xl font-black mb-8">$19<span className="text-lg font-normal text-slate-400">/mo</span></div>
              <ul className="space-y-4 mb-10 text-slate-600">
                <li className="flex gap-3 text-indigo-600 font-semibold">✓ Everything in Free</li>
                <li className="flex gap-3">✓ Unlimited members</li>
                <li className="flex gap-3">✓ 24/7 Priority support</li>
                <li className="flex gap-3">✓ Custom branding</li>
              </ul>
              <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95">Upgrade to Pro</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
};

// --- RENDER ---
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
