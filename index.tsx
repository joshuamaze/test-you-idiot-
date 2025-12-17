
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

/**
 * AI SERVICE
 * Uses Gemini 3 Flash for fast, intelligent responses.
 */
const getAIResponse = async function* (prompt: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are the Nexus Assistant. Nexus is a premium SaaS platform for project management and team collaboration. You are professional, helpful, and concise. Your goal is to guide visitors through the features of the Nexus landing page and encourage them to sign up for a trial.",
      }
    });

    for await (const chunk of response) {
      if (chunk.text) yield chunk.text;
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    yield "I'm having trouble connecting to my brain right now. Please check the console for errors or try again!";
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">N</div>
          <span className="text-xl font-extrabold tracking-tight">Nexus</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Pricing', 'Docs'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">{item}</a>
          ))}
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-slate-200">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-50">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-100/50 to-transparent -z-10 rounded-full blur-3xl opacity-50"></div>
    <div className="max-w-7xl mx-auto px-6 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white border border-slate-200 rounded-full shadow-sm">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">v4.0 is Live</span>
        <div className="w-px h-3 bg-slate-200"></div>
        <span className="text-xs text-slate-500 font-medium">Read the changelog</span>
      </div>
      <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-slate-900 mb-8 leading-[1.05]">
        The ultimate workspace for <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">high-output teams.</span>
      </h1>
      <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-12 leading-relaxed">
        Nexus replaces five separate tools with one lightning-fast workspace. Built for developers, designers, and founders who value speed over everything.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
        <button className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95 text-lg">
          Start for free
        </button>
        <button className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all text-lg flex items-center justify-center gap-2">
          Watch demo
        </button>
      </div>
      <div className="relative mx-auto max-w-6xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden bg-white animate-float">
        <img src="https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=2070" className="w-full h-auto" alt="Dashboard" />
      </div>
    </div>
  </section>
);

const Features = () => {
  const items = [
    { title: "Global Sync", desc: "Real-time collaboration across time zones with zero latency.", icon: "⚡" },
    { title: "Universal Search", desc: "Find anything, anywhere, instantly. Powerful filters included.", icon: "🔍" },
    { title: "Secure Docs", desc: "Military-grade encryption for all your company's knowledge.", icon: "🔐" },
    { title: "Team Chat", desc: "Contextual discussions built into your workflow, not outside it.", icon: "💬" },
    { title: "Visual Logic", desc: "Automate complex tasks with our intuitive drag-and-drop builder.", icon: "⚙️" },
    { title: "API First", desc: "Built for developers. Fully documented API and CLI tools.", icon: "💻" },
  ];

  return (
    <section id="features" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-4">Features</h2>
        <p className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-20 max-w-2xl mx-auto tracking-tight leading-tight">Everything you need to ship your best work.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-left">
          {items.map((item, i) => (
            <div key={i} className="group p-8 rounded-3xl border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all">
              <div className="text-4xl mb-6">{item.icon}</div>
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
    { role: 'model', text: 'Hi! I\'m the Nexus Assistant. How can I help you today?' }
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
        <div className="bg-white w-[380px] h-[550px] rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-500">
          <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold">N</div>
              <span className="font-bold tracking-tight">Nexus AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="opacity-50 hover:opacity-100 transition-opacity">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-700 shadow-sm'}`}>
                  {m.text || (isTyping && i === messages.length - 1 ? 'Typing...' : '')}
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 bg-slate-100 border-none rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
            <button onClick={handleSend} disabled={isTyping} className="bg-indigo-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50">
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

const Pricing = () => (
  <section id="pricing" className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-24">
        <h2 className="text-5xl font-extrabold text-slate-900 mb-6">Simple, fair pricing</h2>
        <p className="text-slate-500 text-xl max-w-2xl mx-auto">Start free and upgrade as your team grows. No hidden fees.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="p-16 rounded-[3rem] border border-slate-200 bg-slate-50 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-4">Nexus Basic</h3>
            <p className="text-slate-500 mb-8 text-lg">Ideal for small projects and individuals.</p>
            <div className="text-6xl font-black mb-10">$0<span className="text-xl font-normal text-slate-400">/mo</span></div>
            <ul className="space-y-4 mb-12 text-slate-700">
              <li className="flex gap-3">✓ Up to 5 users</li>
              <li className="flex gap-3">✓ 2GB Storage</li>
              <li className="flex gap-3">✓ Standard workflows</li>
            </ul>
          </div>
          <button className="w-full py-4 bg-white border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-colors">Choose Basic</button>
        </div>
        <div className="p-16 rounded-[3rem] border-2 border-indigo-600 bg-white shadow-2xl shadow-indigo-100 relative overflow-hidden">
          <div className="absolute top-8 right-8 bg-indigo-600 text-white px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">Most Popular</div>
          <h3 className="text-2xl font-bold mb-4">Nexus Pro</h3>
          <p className="text-slate-500 mb-8 text-lg">For growing teams that need power.</p>
          <div className="text-6xl font-black mb-10">$29<span className="text-xl font-normal text-slate-400">/mo</span></div>
          <ul className="space-y-4 mb-12 text-slate-700">
            <li className="flex gap-3 text-indigo-600 font-semibold">✓ Everything in Basic</li>
            <li className="flex gap-3">✓ Unlimited members</li>
            <li className="flex gap-3">✓ 24/7 Priority support</li>
            <li className="flex gap-3">✓ Advanced security</li>
          </ul>
          <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">Choose Pro</button>
        </div>
      </div>
    </div>
  </section>
);

const App = () => (
  <div className="min-h-screen">
    <Navbar />
    <Hero />
    <Features />
    <Pricing />
    <footer className="bg-slate-900 text-slate-500 py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex justify-center items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">N</div>
          <span className="text-white font-bold text-xl">Nexus</span>
        </div>
        <p className="max-w-md mx-auto mb-12 leading-relaxed text-lg">Nexus is building the future of coordinated team intelligence. Join the movement.</p>
        <div className="flex justify-center gap-8 mb-12">
          {['Twitter', 'GitHub', 'LinkedIn', 'Discord'].map(item => (
            <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
          ))}
        </div>
        <p className="text-sm">&copy; 2024 Nexus Technologies. All rights reserved.</p>
      </div>
    </footer>
    <ChatBot />
  </div>
);

// --- RENDER ---
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
