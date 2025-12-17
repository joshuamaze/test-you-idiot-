
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ChatBot from './components/ChatBot';

const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center text-white font-bold text-xs">N</div>
            <span className="text-white font-bold tracking-tight">Nexus</span>
          </div>
          <p className="text-sm leading-relaxed">Building the OS for modern teams. Simple, fast, and connected.</p>
        </div>
        <div>
          <h4 className="text-white font-bold text-sm mb-4">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold text-sm mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold text-sm mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Docs</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>&copy; 2024 Nexus Technologies Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        
        {/* About Section Preview */}
        <section id="about" className="py-24 bg-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <img 
                  src="https://picsum.photos/seed/nexus-collaboration/600/500" 
                  alt="Team Collaboration" 
                  className="rounded-2xl shadow-xl border border-slate-200"
                />
              </div>
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">Built for how teams work today</h2>
                <p className="text-lg text-slate-600">
                  Nexus was designed with the philosophy that software should adapt to you, not the other way around. Our intuitive interface hides powerful tools beneath a clean surface.
                </p>
                <ul className="space-y-4">
                  {[
                    "Distributed-first architecture",
                    "Intuitive collaborative editing",
                    "Advanced permission management",
                    "Built-in video and voice channels"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-[10px]">✓</div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section Preview */}
        <section id="pricing" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-16">Simple Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { name: "Starter", price: "$0", features: ["Up to 3 users", "Basic automations", "Standard support"] },
                { name: "Pro", price: "$29", features: ["Unlimited users", "Advanced AI tools", "Priority support"], highlight: true },
                { name: "Enterprise", price: "Custom", features: ["Dedicated manager", "SSO & SAML", "99.9% Uptime SLA"] },
              ].map((tier, i) => (
                <div key={i} className={`p-8 rounded-3xl border ${tier.highlight ? 'border-indigo-600 ring-4 ring-indigo-50 shadow-xl' : 'border-slate-200'}`}>
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <div className="text-4xl font-extrabold mb-6">{tier.price}<span className="text-sm text-slate-500 font-normal">/mo</span></div>
                  <ul className="space-y-4 mb-8 text-sm text-slate-600">
                    {tier.features.map((f, j) => <li key={j}>{f}</li>)}
                  </ul>
                  <button className={`w-full py-3 rounded-xl font-bold transition-all ${tier.highlight ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                    Choose {tier.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-indigo-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-8">Ready to transform your workflow?</h2>
            <p className="text-indigo-100 mb-10 text-lg">Join 10,000+ teams who are already building the future on Nexus.</p>
            <button className="bg-white text-indigo-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all active:scale-95 shadow-xl">
              Get Started for Free
            </button>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default App;
