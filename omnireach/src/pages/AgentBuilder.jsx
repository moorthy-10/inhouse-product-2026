import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  ChevronRight,
  Bell,
  Search,
  Check,
  Zap,
  User,
  Plus,
  Rocket,
  Mic,
  Settings,
  Calendar,
  DollarSign,
  Headphones,
  FileText,
  Volume2,
  Cpu,
  Globe,
  ArrowLeft,
  Activity,
  Save,
  Trash2
} from 'lucide-react';
import './AgentBuilder.css';

const tabs = [
  { id: 'configuration', label: 'Primary Config' },
  { id: 'voice', label: 'Voice & Language' },
  { id: 'prompt', label: 'System Persona' },
  { id: 'tools', label: 'Capabilities' },
];

const roles = [
  { id: 'sales', title: 'Sales Specialist', desc: 'High persuasion, objective oriented.', icon: DollarSign },
  { id: 'support', title: 'Customer Support', desc: 'Empathetic and problem-solving.', icon: Headphones },
  { id: 'outbound', title: 'Outbound Caller', desc: 'Firm, clear, and persistence-focused.', icon: FileText },
];

export default function AgentBuilder() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editingId = queryParams.get('id');

  const [activeTab, setActiveTab] = useState('configuration');
  const [formData, setFormData] = useState({
    name: '',
    language: 'English (US)',
    voice: 'Female - Professional',
    provider: 'ElevenLabs',
    providerIcon: 'volume_up',
    role: 'sales',
    prompt: '',
    model: 'GPT-4o'
  });

  useEffect(() => {
    if (editingId) {
      const saved = localStorage.getItem('genlab_agents');
      if (saved) {
        const agents = JSON.parse(saved);
        const agent = agents.find(a => a.id === editingId);
        if (agent) {
          setFormData({
            ...agent,
            prompt: agent.prompt || ''
          });
        }
      }
    }
  }, [editingId]);

  const handleSave = () => {
    if (!formData.name) {
      alert("Please enter an agent name.");
      return;
    }

    const saved = localStorage.getItem('genlab_agents');
    let agents = saved ? JSON.parse(saved) : [];
    
    if (editingId) {
      agents = agents.map(a => a.id === editingId ? { 
        ...formData,
        status: 'Active' 
      } : a);
    } else {
      const newAgent = {
        ...formData,
        id: `AG-${Math.floor(Math.random() * 9000) + 1000}-${Math.random().toString(36).substring(2, 3).toUpperCase()}`,
        status: 'Active',
      };
      agents.push(newAgent);
    }
    
    localStorage.setItem('genlab_agents', JSON.stringify(agents));
    navigate('/agents');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'configuration':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Identify Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#141414] border border-[#2E2E2E] rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-[var(--neon-lime)] outline-none"
                    placeholder="e.g. Sarah - Support Desk"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Model Engine</label>
                  <select 
                    className="w-full bg-[#141414] border border-[#2E2E2E] rounded-xl px-4 py-3 text-sm outline-none"
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                  >
                    <option>GPT-4o</option>
                    <option>Claude 3.5 Sonnet</option>
                    <option>Llama 3 70B</option>
                  </select>
                </div>
             </div>

             <div className="space-y-4">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Select Agent Persona</label>
                <div className="grid grid-cols-3 gap-4">
                  {roles.map(r => {
                    const Icon = r.icon;
                    const isSelected = formData.role === r.id;
                    return (
                      <div 
                        key={r.id}
                        onClick={() => setFormData({...formData, role: r.id})}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${isSelected ? 'bg-[rgba(223,255,0,0.05)] border-[rgba(223,255,0,0.3)]' : 'bg-[#141414] border-[#2E2E2E] opacity-60 hover:opacity-100'}`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${isSelected ? 'bg-primary text-black' : 'bg-slate-800 text-slate-400'}`}>
                          <Icon size={20} />
                        </div>
                        <h5 className="text-xs font-bold mb-1">{r.title}</h5>
                        <p className="text-[10px] text-slate-500 leading-tight">{r.desc}</p>
                      </div>
                    );
                  })}
                </div>
             </div>
          </div>
        );
      case 'voice':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Voice Provider</label>
                  <select 
                    className="w-full bg-[#141414] border border-[#2E2E2E] rounded-xl px-4 py-3 text-sm outline-none"
                    value={formData.provider}
                    onChange={(e) => setFormData({...formData, provider: e.target.value, providerIcon: e.target.value === 'ElevenLabs' ? 'volume_up' : 'lightbulb'})}
                  >
                    <option>ElevenLabs</option>
                    <option>OpenAI</option>
                    <option>Azure AI</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Language</label>
                  <select 
                    className="w-full bg-[#141414] border border-[#2E2E2E] rounded-xl px-4 py-3 text-sm outline-none"
                    value={formData.language}
                    onChange={(e) => setFormData({...formData, language: e.target.value})}
                  >
                    <option>English (US)</option>
                    <option>Hindi (IN)</option>
                    <option>Spanish (ES)</option>
                  </select>
                </div>
             </div>
             <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-black">
                    <Mic size={24} />
                  </div>
                   <div>
                    <h4 className="text-sm font-bold">Select Voice Identity</h4>
                    <p className="text-xs text-slate-500">Preview 42+ high-quality neural voices</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#1C1B1B] border border-[#2E2E2E] rounded-lg text-xs font-bold hover:bg-slate-800">Browse Voices</button>
             </div>
          </div>
        );
      case 'prompt':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">System Instructions</label>
             <textarea 
                className="w-full h-64 bg-[#141414] border border-[#2E2E2E] rounded-2xl p-6 text-sm font-medium leading-relaxed resize-none focus:ring-1 focus:ring-primary outline-none"
                placeholder="Define the behavior, rules, and personality of your agent..."
                value={formData.prompt}
                onChange={(e) => setFormData({...formData, prompt: e.target.value})}
             />
             <div className="flex gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                <Zap size={12} className="text-primary" />
                <span>Context Window: 128k Tokens Optimized</span>
             </div>
          </div>
        );
      default:
        return <div className="p-20 text-center text-slate-500">Advanced settings coming soon...</div>;
    }
  };

  return (
    <div className="main-content flex flex-col h-screen overflow-hidden">
      <header className="h-16 px-8 border-b border-border-dark flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/agents')} className="p-2 hover:bg-card-dark rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="h-4 w-[1px] bg-border-dark" />
          <h2 className="font-bold">{editingId ? 'Edit Identity' : 'New Autonomous Identity'}</h2>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3 py-1 bg-surface-dark rounded-full">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-[10px] font-bold">Cloud Sync Active</span>
          </div>
          <button className="icon-btn"><Bell size={18} /></button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Editor */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          <div className="max-w-3xl mx-auto space-y-12">
            
            {/* Tabs */}
            <div className="flex gap-8 border-b border-border-dark">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
              {renderTabContent()}
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-12 border-t border-border-dark">
              <button onClick={() => navigate('/agents')} className="px-8 py-3 bg-[#1C1B1B] text-slate-400 font-bold text-sm rounded-xl hover:text-white transition-colors">Discard changes</button>
              <button 
                onClick={handleSave}
                className="px-10 py-3 bg-primary text-black font-extrabold text-sm rounded-xl hover:opacity-90 transition-all flex items-center gap-2"
              >
                <Save size={18} />
                <span>{editingId ? 'Update Identity' : 'Deploy Identity'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Preview / Testing */}
        <aside className="w-[450px] border-l border-border-dark bg-[#080808] flex flex-col">
          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Real-time Identity Preview</h3>
              
              {/* Preview Card */}
              <div className="bg-card-dark p-6 rounded-2xl border border-border-dark">
                 <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl bg-surface-dark flex items-center justify-center text-slate-600 border border-slate-800">
                       <User size={32} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{formData.name || 'Agent Name'}</h3>
                      <p className="text-slate-500 text-xs mt-1">ID: {editingId || 'PENDING'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 rounded-full border border-green-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Active</span>
                  </div>
                </div>
                <div className="space-y-3">
                   <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-semibold uppercase tracking-wider">Language</span>
                      <span className="font-medium text-slate-200">{formData.language}</span>
                   </div>
                   <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-semibold uppercase tracking-wider">Model</span>
                      <span className="px-2 py-0.5 bg-surface-dark rounded text-slate-300 font-bold">{formData.model}</span>
                   </div>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-6">
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
                <span>Playground Console</span>
                <div className="flex items-center gap-1.5">
                  <Activity size={12} className="text-primary" />
                  <span className="text-[10px] text-primary">Live Ready</span>
                </div>
               </h3>
               
               <div className="h-64 bg-black rounded-2xl border border-border-dark flex flex-col items-center justify-center p-8 text-center opacity-40">
                  <Settings size={40} className="text-slate-700 mb-4 animate-spin-slow" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Finalize configuration<br/>to start test calls</p>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-card-dark rounded-xl border border-border-dark text-center">
                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Latency</p>
                    <p className="text-sm font-bold text-white">~240ms</p>
                  </div>
                  <div className="p-4 bg-card-dark rounded-xl border border-border-dark text-center">
                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Architecture</p>
                    <p className="text-sm font-bold text-white">Low-Loss</p>
                  </div>
               </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
