
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

/**
 * --- AI LOGIC ---
 * Integrated directly to ensure no import failures.
 */
const getGeminiResponse = async function* (prompt: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const result = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are the Nexus Product Expert. Nexus is a cutting-edge team collaboration platform. You are helpful, professional, and energetic. Encourage users to sign up for a free trial. Keep answers short.",
      }
    });

    for await (const chunk of result) {
      yield (chunk as GenerateContentResponse).text;
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    yield "I'm having trouble connecting right now. Please check your API key configuration.";
  }
};

/**
 * --- COMPONENTS ---
 */

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
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100 group-hover:rotate-3 transition-transform">N</div>
          <span className="text-xl font-extrabold tracking-tight">Nexus</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Pricing</a>
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-600 transition-all active:scale-95">
            Launch Platform
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <header className="relative pt-32 pb-12 md:pt-48 md:pb-32 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-indigo-50 border border-indigo-100 rounded-full animate-fade-in">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        <span className="text-xs font-bold text-indigo-600 tracking-wide uppercase">New: AI Workflows are here</span>
      </div>
      <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-slate-900 mb-8 leading-[1.05]">
        The OS for <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Modern Teams.</span>
      </h1>
      <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-12 leading-relaxed">
        Nexus centralizes your docs, tasks, and chats into one high-performance interface. Experience the speed of thought.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
        <button className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95">
          Get Started — It's Free
        </button>
        <button className="px-10 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
          Book a Demo
        </button>
      </div>
      <div className="relative mx-auto max-w-6xl rounded-3xl border border-slate-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden bg-white float-anim">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=2070" 
          className="w-full h-auto" 
          alt="Nexus Interface" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
      </div>
    </div>
  </header>
);

const Features = () => {
  const cards = [
    { title: "Real-time Engine", desc: "Every keystroke synced globally in under 50ms.", icon: "⚡" },
    { title: "Universal Search", desc: "Find anything across your entire workspace in a heartbeat.", icon: "🔍" },
    { title: "Secure by Default", desc: "End-to-end encryption and SOC2 compliance built-in.", icon: "🛡️" },
    { title: "AI Assistant", desc: "Our built-in LLM helps you draft, summarize, and automate.", icon: "🤖" },
    { title: "Visual Logic", desc: "Build workflows with our intuitive drag-and-drop editor.", icon: "🎨" },
    { title: "Deep Integrations", desc: "Works with GitHub, Slack, Figma, and 500+ other apps.", icon: "🔗" },
  ];

  return (
    <section id="features" className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-4">Core Capabilities</h2>
            <p className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">Everything you need to ship faster.</p>
          </div>
          <p className="text-slate-500 max-w-xs text-lg">Nexus replaces dozens of disconnected tools with one elegant workspace.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div key={i} className="bg-white p-12 rounded-[2.5rem] border border-slate-100 hover:border-indigo-200 transition-all group hover:shadow-2xl hover:shadow-indigo-50/50">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">{card.icon}</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{card.title}</h3>
              <p className="text-slate-600 leading-relaxed text-lg">{card.desc}</p>
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
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const msg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setLoading(true);

    let fullText = '';
    // Append a placeholder for the model response
    setMessages(prev => [...prev, { role: 'model', text: '' }]);
    
    const stream = getGeminiResponse(msg);
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
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="bg-white w-[400px] h-[600px] rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-12 fade-in duration-500">
          <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center font-bold text-xl">N</div>
              <div>
                <span className="font-bold block">Nexus Expert</span>
                <span className="text-xs text-indigo-300">Ready to help</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-slate-800 p-2 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-5 py-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white border border-slate-200 text-slate-700 shadow-sm'}`}>
                  {m.text || (loading && i === messages.length - 1 ? 'Typing...' : '')}
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
              placeholder="Ask a question..."
              className="flex-1 bg-slate-100 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
            <button onClick={handleSend} disabled={loading} className="bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 shadow-lg shadow-indigo-100">
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
          <svg className="w-8 h-8 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        </button>
      )}
    </div>
  );
};

const Pricing = () => (
  <section id="pricing" className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-24">
        <h2 className="text-5xl font-extrabold text-slate-900 mb-6">Built for scale</h2>
        <p className="text-slate-500 text-xl max-w-2xl mx-auto">Start free and upgrade as your team grows. No hidden fees.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="p-16 rounded-[3rem] border border-slate-200 bg-slate-50 flex flex-col justify-between h-full hover:border-slate-300 transition-colors">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900">Nexus Basic</h3>
            <p className="text-slate-500 mb-8 text-lg leading-relaxed">Perfect for startups and side projects looking to get organized.</p>
            <div className="text-6xl font-black mb-10 text-slate-900">$0<span className="text-xl font-normal text-slate-400">/mo</span></div>
            <ul className="space-y-5 mb-12 text-slate-700 text-lg">
              <li className="flex items-center gap-4">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">✓</span>
                Unlimited Tasks
              </li>
              <li className="flex items-center gap-4">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">✓</span>
                5 Team Members
              </li>
              <li className="flex items-center gap-4">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">✓</span>
                Standard Workflows
              </li>
            </ul>
          </div>
          <button className="w-full py-5 bg-white border border-slate-200 rounded-2xl font-bold text-xl hover:bg-slate-100 transition-all shadow-sm">Get Started</button>
        </div>
        <div className="p-16 rounded-[3rem] border-2 border-indigo-600 bg-white shadow-[0_48px_96px_-24px_rgba(79,70,229,0.15)] relative overflow-hidden flex flex-col justify-between h-full">
          <div className="absolute top-8 right-8 bg-indigo-600 text-white px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">Most Popular</div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900">Nexus Pro</h3>
            <p className="text-slate-500 mb-8 text-lg leading-relaxed">For professional teams who need advanced power and priority speed.</p>
            <div className="text-6xl font-black mb-10 text-slate-900">$29<span className="text-xl font-normal text-slate-400">/mo</span></div>
            <ul className="space-y-5 mb-12 text-slate-700 text-lg">
              <li className="flex items-center gap-4">
                <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs">✓</span>
                Unlimited Members
              </li>
              <li className="flex items-center gap-4 text-indigo-600 font-semibold">
                <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs">✓</span>
                AI Workflow Assistant
              </li>
              <li className="flex items-center gap-4">
                <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs">✓</span>
                Advanced Permissions
              </li>
              <li className="flex items-center gap-4">
                <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs">✓</span>
                24/7 VIP Support
              </li>
            </ul>
          </div>
          <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95">Upgrade to Pro</button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-900 text-slate-500 py-24">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-20 mb-12">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">N</div>
          <span className="text-white font-bold text-xl">Nexus</span>
        </div>
        <p className="text-lg leading-relaxed mb-8">Building the high-performance operating system for the world's most innovative teams.</p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">Product</h4>
        <ul className="space-y-4">
          <li><a href="#" className="hover:text-white transition-colors">Desktop App</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Mobile Beta</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">Connect</h4>
        <ul className="space-y-4">
          <li><a href="#" className="hover:text-white transition-colors">Twitter (X)</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Discord Community</a></li>
          <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">Company</h4>
        <ul className="space-y-4">
          <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 text-sm flex justify-between items-center">
      <p>&copy; 2024 Nexus Technologies Inc.</p>
      <p>Made with passion for developers.</p>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Social Trust Section */}
      <section className="py-20 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-black text-slate-400 uppercase tracking-widest mb-12">Powering the next generation of giants</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-32 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-3xl font-black italic">ORBIT</span>
            <span className="text-3xl font-black">VOLT</span>
            <span className="text-3xl font-black tracking-tighter uppercase">Nexus</span>
            <span className="text-3xl font-black">PULSE</span>
            <span className="text-3xl font-black italic">SOLAR</span>
          </div>
        </div>
      </section>

      <Pricing />
      
      {/* Final CTA */}
      <section className="py-32 bg-indigo-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-10 leading-tight">Join the future of team coordination today.</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-12 py-5 bg-white text-indigo-600 rounded-2xl font-bold text-xl hover:bg-indigo-50 transition-all shadow-2xl">Create Free Account</button>
            <button className="px-12 py-5 bg-indigo-500 text-white rounded-2xl font-bold text-xl border border-indigo-400 hover:bg-indigo-400 transition-all">Talk to Sales</button>
          </div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
};

/**
 * --- RENDER ENTRY ---
 * Ensuring the application mounts to the root div correctly.
 */
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Critical Error: Root element '#root' not found in document.");
}
