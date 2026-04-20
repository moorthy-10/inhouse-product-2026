import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Bell,
  Plus,
  Radio,
  ListFilter,
  Mic,
  Play,
  Edit2,
  Trash2,
  ChevronRight,
  User,
  Zap,
  Sun,
  PlayCircle,
  Edit,
  Rocket,
  ArrowRight,
  Volume2,
  Lightbulb
} from 'lucide-react';
import './Agents.css';

const agentData = [
  {
    id: 'AG-4829-X',
    name: 'Sarah - Sales Support',
    status: 'Active',
    language: 'English (US)',
    provider: 'ElevenLabs',
    providerIcon: Volume2,
    model: 'GPT-4o',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkxZmpNddGRSM0ZB4fvcLbR0JLzAJUHa7V4q4KnaiRLkAi7V5oCLfbjwFWer6EgJI56GCfG186vhRZBtmPlCskbBkwNpGowSoHPUX1UkKO1d6ZBHmQ1_Ot7ff7TeU8ce_06Z1KCXpWJxvZxCPf3LksFxKQSqCP069BFUFRz4jpTcGBvyjvnBGRJZdEiHMryUdYRvXHBQuzCzKXMDBG8_tq9riPA1rjLfMQcM8WzRp560ABhjg7fIlT9m3exjO_dEmm8Av4wQbTGks',
  },
  {
    id: 'AG-9012-Y',
    name: 'Vikram - Tech Desk',
    status: 'Active',
    language: 'Hindi (IN)',
    provider: 'OpenAI',
    providerIcon: Lightbulb,
    model: 'GPT-4 Turbo',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDIpuzt9gCqCh0bzGsimeQtgoOVxUQruTr0UkLZfjVF2Om3C85SK1dpNoHgfYmb3LIo1EZBlV4YcOILD8RCnJUrCK1Ht9bfdTeSx11zXqx2a9UTvV0j9pzOEPj7FFQbwuyjbkj58AeOnXSQJuBUMJEctfp_bG_eX23Lvwov9geDJnxKIPhr5IAQQazq3ZUjLqvBfo0-L55xTKe6wcqI5AfvGN87vYyhUjvQ-UruCnjmGKgI85jIrZHokPjF_dz4Ls2sCOMKVlhR9g',
  },
  {
    id: 'Last edited 2h ago',
    name: 'Un-named Agent',
    status: 'Draft',
    language: 'Pending...',
    provider: 'Not selected',
    model: 'Llama 3',
    isDraft: true,
  },
];

export default function Agents() {
  const navigate = useNavigate();

  return (
    <div className="main-content">
      {/* Header */}
      <header className="page-header">
        <div className="flex-1 max-w-xl">
          <div className="search-container">
            <Search className="search-icon" size={16} />
            <input className="search-input" type="text" placeholder="Search agents, models, or languages..." />
          </div>
        </div>
        <div className="header-actions">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 12px', background: 'var(--surface-bright)', borderRadius: 100 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--neon-lime)' }} />
            <span style={{ fontSize: 12, fontWeight: 500 }}>Usage: 1.2k / 5k min</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
             <button className="icon-btn"><Bell size={18} /></button>
             <div style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border-gray)', overflow: 'hidden' }}>
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnY7iQTPHi7M3sVBBSU2f-FU58vfxvXBKRuwczFldZSH8gSjES6pvdtSuwApzHEL0S6ZzUAovHxXShYQiogMZMwc4_f4S4TnrJv5VlWx_ZYhKmmulsR73SgFPjTUnfJHG-EpzPLn-wByIr24IU2A4kxaQf5un94B897yopOraQiR_x6WJawFefUWvuODqWj4tKmidczZzWfGDYrt8r7xc5AUTdMnUEiPk04PSBzRa4_PdUlM_tAXLb809jmWbKOgcHfC2pcJnZZ6Q" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="agents-container">
        {/* Page Hero */}
        <div className="agents-hero">
          <div>
            <h1 className="agents-title">Agents</h1>
            <p className="agents-subtitle">Deploy and manage your autonomous voice identities.</p>
          </div>
          <Link to="/agents/builder" className="btn-primary" style={{ padding: '12px 24px', fontSize: '1rem', textDecoration: 'none' }}>
            <Plus size={20} />
            <span>Create Agent</span>
          </Link>
        </div>

        {/* Agents Grid */}
        <div className="agent-grid-layout">
          {agentData.map((agent, i) => (
            <div key={i} className="agent-vignette-card">
              <div className="agent-card-header">
                <div className="agent-info-group">
                  {agent.avatar ? (
                    <img src={agent.avatar} alt={agent.name} className="agent-avatar" />
                  ) : (
                    <div className="agent-avatar-placeholder">
                      <User size={32} />
                    </div>
                  )}
                  <div className="agent-name-stack">
                    <h3>{agent.name}</h3>
                    <p className="agent-id-label">{agent.id}</p>
                  </div>
                </div>
                <div className={`agent-status-pill ${agent.status === 'Active' ? 'active' : ''}`}>
                  {!agent.isDraft && <div className="status-dot-pulse" />}
                  <span className={`status-text ${agent.status === 'Active' ? 'active' : ''}`}>{agent.status}</span>
                </div>
              </div>

              {/* Details */}
              <div className="agent-details-list">
                <div className="agent-detail-row">
                  <span className="detail-label">Language</span>
                  <span className="detail-value">{agent.language}</span>
                </div>
                <div className="agent-detail-row">
                  <span className="detail-label">Voice Provider</span>
                  <div className="flex items-center gap-2">
                    {agent.providerIcon && <agent.providerIcon size={14} className="text-slate-400" />}
                    <span className="detail-value">{agent.provider}</span>
                  </div>
                </div>
                <div className="agent-detail-row">
                  <span className="detail-label">Model</span>
                  <span className="model-badge">{agent.model}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {agent.isDraft ? (
                  <>
                    <button className="btn-primary" style={{ flex: 1, height: 44, justifyContent: 'center', textTransform: 'uppercase', fontSize: 12 }}>
                      <Rocket size={16} />
                      <span>Finish Setup</span>
                    </button>
                    <button className="btn-secondary" style={{ width: 44, padding: 0, justifyContent: 'center', color: 'var(--accent-red)' }}>
                      <Trash2 size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn-secondary" style={{ flex: 1, height: 44, justifyContent: 'center', fontWeight: 600 }}>
                      <PlayCircle size={18} />
                      <span>Test</span>
                    </button>
                    <button className="btn-secondary" style={{ flex: 1, height: 44, justifyContent: 'center', fontWeight: 600 }}>
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {/* New Agent CTA */}
          <div className="agent-cta-dash-card">
             <div className="cta-icon-wrapper">
               <Mic size={32} />
             </div>
             <h3 className="cta-title">Ready for a new voice?</h3>
             <p className="cta-desc">
               Build a specialized agent with low-latency LLMs and premium voices.
             </p>
             <a href="#" className="cta-link">
               Learn how to start <ArrowRight size={16} />
             </a>
          </div>
        </div>
      </div>
    </div>
  );
}
