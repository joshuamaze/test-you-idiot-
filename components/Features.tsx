
import React from 'react';

const FeatureCard: React.FC<{ title: string; desc: string; icon: string }> = ({ title, desc, icon }) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:border-indigo-100 group">
    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
      <span className="text-xl">{icon}</span>
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

const Features: React.FC = () => {
  const features = [
    { title: "AI Automation", desc: "Automate repetitive tasks with our proprietary neural workflows.", icon: "🤖" },
    { title: "Real-time Sync", desc: "Global edge synchronization ensures your data is everywhere, instantly.", icon: "⚡" },
    { title: "Smart Security", desc: "Military-grade encryption with automated threat detection.", icon: "🛡️" },
    { title: "Team Insights", desc: "Actionable analytics to understand how your team performs.", icon: "📊" },
    { title: "Universal Connect", desc: "Seamlessly integrate with 500+ popular industry tools.", icon: "🔗" },
    { title: "Infinite Scaling", desc: "Infrastructure that grows with you, from 1 to 100,000 users.", icon: "☁️" },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Core Features</h2>
          <p className="text-4xl font-extrabold text-slate-900 mb-4">Everything you need to ship faster</p>
          <p className="text-slate-600 max-w-2xl mx-auto">Nexus replaces dozens of disconnected tools with one elegant, unified workspace.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <FeatureCard key={i} title={f.title} desc={f.desc} icon={f.icon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
