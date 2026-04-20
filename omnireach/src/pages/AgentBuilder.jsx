import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ChevronRight,
  Search,
  Bell,
  Bot,
  LayoutGrid,
  Megaphone,
  MessageSquare,
  Users,
  Brain,
  GitBranch,
  Calendar,
  BarChart3,
  Settings,
  CloudCheck,
  Activity,
  ArrowRight,
  Headphones,
  DollarSign,
  FileText,
  User,
  UserCheck,
  Check,
  Play,
  RotateCcw,
  Zap,
  MoreVertical,
  X
} from 'lucide-react';
import './AgentBuilder.css';

const tabs = [
  { id: 'configuration', label: 'Configuration' },
  { id: 'prompt', label: 'Prompt' },
  { id: 'knowledge', label: 'Knowledge' },
  { id: 'tools', label: 'Tools' },
  { id: 'testing', label: 'Testing' },
  { id: 'deployment', label: 'Deployment' },
];

const roles = [
  { id: 'sales', title: 'Sales', desc: 'Optimized for persuasion and closing.', icon: DollarSign },
  { id: 'onboarding', title: 'Onboarding', desc: 'Clear guidance at every step.', icon: Headphones },
  { id: 'collections', title: 'Collections', desc: 'Firm but professional debt recovery.', icon: FileText },
  { id: 'appointment', title: 'Appointment', desc: 'Syncing with calendars and slots.', icon: Calendar },
];

export default function AgentBuilder() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('configuration');
  const [selectedRole, setSelectedRole] = useState('sales');
  const [isMale, setIsMale] = useState(true);

  return (
    <div className="main-content builder-layout">
      {/* Middle pane: Editor */}
      <div className="builder-editor-pane">
        
        {/* Header */}
        <header className="page-header builder-header">
          <div className="flex flex-col">
            <div className="builder-breadcrumb">
              <Link to="/agents">Agents</Link>
              <ChevronRight size={12} />
              <span className="text-slate-500">Sarah</span>
            </div>
            <h1 className="builder-pagename">Sarah - Sales Support</h1>
          </div>
          
          <div className="header-actions">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px', background: 'var(--surface-bright)', borderRadius: 100 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--neon-lime)', boxShadow: '0 0 8px var(--neon-lime)' }} />
              <span style={{ fontSize: 11, fontWeight: 600 }}>Usage: 1.2k / 5k min</span>
            </div>
            <button className="icon-btn"><Bell size={18} /></button>
            <div style={{ width: 32, height: 32, borderRadius: 6, overflow: 'hidden', border: '1px solid var(--border-gray)' }}>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnY7iQTPHi7M3sVBBSU2f-FU58vfxvXBKRuwczFldZSH8gSjES6pvdtSuwApzHEL0S6ZzUAovHxXShYQiogMZMwc4_f4S4TnrJv5VlWx_ZYhKmmulsR73SgFPjTUnfJHG-EpzPLn-wByIr24IU2A4kxaQf5un94B897yopOraQiR_x6WJawFefUWvuODqWj4tKmidczZzWfGDYrt8r7xc5AUTdMnUEiPk04PSBzRa4_PdUlM_tAXLb809jmWbKOgcHfC2pcJnZZ6Q" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="builder-tabs-container">
          <div className="builder-tabs-flex">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`builder-tab-btn ${activeTab === tab.id ? 'active' : 'inactive'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editor Body */}
        <div className="builder-content-body">
          
          {/* Basic Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div className="flex flex-col gap-2">
              <label className="builder-input-label">Agent Name</label>
              <input 
                type="text" 
                defaultValue="Sarah - Sales Support"
                className="builder-input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="builder-input-label">Primary Language</label>
              <select className="builder-select">
                <option>Tanglish</option>
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>
          </div>

          {/* Voice Selection */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label className="builder-input-label">Selected Voice</label>
              <span className="text-[9px] font-bold bg-[#C9FF1F]/10 text-[#C9FF1F] px-2 py-0.5 rounded border border-[#C9FF1F20]">ULTRA LOW LATENCY</span>
            </div>
            <div className="voice-selection-grid">
              <button 
                onClick={() => setIsMale(true)}
                className={`voice-option-btn ${isMale ? 'active' : 'inactive'}`}
              >
                <User size={32} style={{ color: isMale ? 'var(--neon-lime)' : 'var(--text-dim)' }} />
                <span style={{ fontSize: 11, fontWeight: 800, color: isMale ? '#fff' : 'var(--text-dim)', textTransform: 'uppercase' }}>Male</span>
              </button>
              <button 
                onClick={() => setIsMale(false)}
                className={`voice-option-btn ${!isMale ? 'active' : 'inactive'}`}
              >
                <User size={32} style={{ color: !isMale ? 'var(--neon-lime)' : 'var(--text-dim)' }} />
                <span style={{ fontSize: 11, fontWeight: 800, color: !isMale ? '#fff' : 'var(--text-dim)', textTransform: 'uppercase' }}>Female</span>
              </button>
            </div>
          </div>

          {/* Role Selection */}
          <div className="flex flex-col gap-4">
            <label className="builder-input-label">Conversation Role</label>
            <div className="builder-roles-grid">
              {roles.map(role => {
                const Icon = role.icon;
                const isActive = selectedRole === role.id;
                return (
                  <div 
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`role-option-card ${isActive ? 'active' : 'inactive'}`}
                  >
                    <div className={`role-icon-box ${isActive ? 'active' : 'inactive'}`}>
                      <Icon size={24} style={{ color: isActive ? 'var(--neon-lime)' : 'var(--text-dim)' }} />
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-bold">
                        {role.title}
                        {isActive && <Check size={14} className="text-[#C9FF1F]" />}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{role.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="builder-footer">
          <div className="flex items-center gap-2 text-[#6B7280] text-[10px] font-bold uppercase tracking-widest">
            <CloudCheck size={14} />
            <span>Auto-saved 2m ago</span>
          </div>
          <div className="flex gap-4">
            <button className="btn-secondary border-none" onClick={() => navigate('/agents')}>Discard</button>
            <button className="btn-primary px-8 py-2.5" onClick={() => navigate('/agents')}>Save Agent</button>
          </div>
        </footer>
      </div>

      {/* Right pane: Playground */}
      <aside className="playground-aside">
        <header className="playground-header">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">Playground</span>
          <div className="flex items-center gap-2">
            <div className="agent-pulse-dot" style={{ width: 6, height: 6 }} />
            <span className="text-[10px] font-bold text-[#C9FF1F] uppercase tracking-widest">Live Ready</span>
          </div>
        </header>

        <div className="playground-content">
          <button className="btn-secondary w-full h-12 uppercase tracking-widest text-[11px] font-extrabold">
            Test Voice
          </button>

          <div className="stream-container">
            {/* Real-time indicator */}
            <div className="stream-header">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-[#C9FF1F]" />
                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Real-time Stream</span>
              </div>
              <span className="text-[10px] font-bold text-[#C9FF1F] font-mono">450 MS</span>
            </div>

            {/* Chat content */}
            <div className="chat-scroller">
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-bold text-[#6B7280] uppercase">System</span>
                <p className="text-xs italic text-slate-500">Call initiated. Connecting to PSTN gateway...</p>
              </div>

              <div className="flex flex-col gap-2.5">
                <span className="text-[9px] font-bold text-[#C9FF1F] uppercase">Agent (Sarah)</span>
                <div className="bg-[#C9FF1F]/5 border border-[#C9FF1F15] p-4 rounded-xl text-slate-300 text-[13px] leading-relaxed">
                  Hello, this is Sarah from Pulse AI. Am I speaking with the IT Manager?
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <span className="text-[9px] font-bold text-[#6B7280] uppercase">User</span>
                <div className="bg-black border border-[#2E2E2E] p-4 rounded-xl text-slate-300 text-[13px] leading-relaxed">
                  Yes, this is Michael. How can I help you today?
                </div>
              </div>

              {/* Thinking animation */}
              <div className="thinking-container">
                <div className="flex gap-1">
                  <div className="agent-pulse-dot w-1 h-1" style={{ animationDelay: '-0.3s' }} />
                  <div className="agent-pulse-dot w-1 h-1" style={{ animationDelay: '-0.15s' }} />
                  <div className="agent-pulse-dot w-1 h-1" />
                </div>
                <span className="text-[10px] font-bold text-[#C9FF1F] uppercase tracking-widest">AI Thinking...</span>
              </div>
            </div>

            {/* Audio visualizer (mock) */}
            <div className="p-4 border-t border-[#2E2E2E] bg-white/2">
              <div className="flex justify-between text-[9px] font-bold text-[#6B7280] mb-2 uppercase">
                <span>Input Gain</span>
                <span>Output Peak</span>
              </div>
              <div className="h-1.5 bg-[#2E2E2E] rounded-full overflow-hidden flex">
                <div className="w-[85%] h-full bg-[#C9FF1F]" />
                <div className="w-[10%] h-full bg-[#ff4b4b]" />
              </div>
            </div>
          </div>

          {/* Model info cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-black border border-[#2E2E2E] rounded-xl">
              <p className="text-[8px] font-bold text-[#6B7280] uppercase mb-1">Model</p>
              <p className="text-[11px] font-bold text-white">GPT-4o (Realtime)</p>
            </div>
            <div className="p-3 bg-black border border-[#2E2E2E] rounded-xl">
              <p className="text-[8px] font-bold text-[#6B7280] uppercase mb-1">Tokens/Sec</p>
              <p className="text-[11px] font-bold text-white">85.4 t/s</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
