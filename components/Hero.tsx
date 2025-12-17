
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent -z-10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in">
          <span>✨ Discover the Future</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          Empower Your Team with <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Smart Productivity</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
          Nexus combines high-performance tools with AI intelligence to help you build, collaborate, and scale faster than ever before.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:scale-95">
            Start Free Trial
          </button>
          <button className="w-full sm:w-auto bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group">
            Watch Demo
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>

        <div className="mt-20 relative float-animation">
          <img 
            src="https://picsum.photos/seed/nexus-dashboard/1200/600" 
            alt="Nexus Dashboard Preview" 
            className="rounded-2xl shadow-2xl border border-slate-200 mx-auto"
          />
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -z-10"></div>
          <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-violet-500/10 rounded-full blur-2xl -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
