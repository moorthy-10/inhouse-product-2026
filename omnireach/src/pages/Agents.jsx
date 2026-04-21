import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Bell,
  Plus,
  Settings,
  Volume2,
  Lightbulb,
  Rocket,
  Trash2,
  PlayCircle,
  Edit,
  HelpCircle,
  ArrowRight,
  User,
  Activity,
  Mic,
  Zap,
  MoreVertical
} from 'lucide-react';
import './Agents.css';

const ICON_MAP = {
  volume_up: Volume2,
  lightbulb: Lightbulb,
  Mic,
  Zap
};

const DEFAULT_AGENTS = [
  {
    id: 'AG-4829-X',
    name: 'Sarah - Sales Support',
    status: 'Active',
    language: 'English (US)',
    provider: 'ElevenLabs',
    providerIcon: 'volume_up',
    model: 'GPT-4o',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkxZmpNddGRSM0ZB4fvcLbR0JLzAJUHa7V4q4KnaiRLkAi7V5oCLfbjwFWer6EgJI56GCfG186vhRZBtmPlCskbBkwNpGowSoHPUX1UkKO1d6ZBHmQ1_Ot7ff7TeU8ce_06Z1KCXpWJxvZxCPf3LksFxKQSqCP069BFUFRz4jpTcGBvyjvnBGRJZdEiHMryUdYRvXHBQuzCzKXMDBG8_tq9riPA1rjLfMQcM8WzRp560ABhjg7fIlT9m3exjO_dEmm8Av4wQbTGks',
  },
  {
    id: 'AG-9012-Y',
    name: 'Vikram - Tech Desk',
    status: 'Active',
    language: 'Hindi (IN)',
    provider: 'OpenAI',
    providerIcon: 'lightbulb',
    model: 'GPT-4 Turbo',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDIpuzt9gCqCh0bzGsimeQtgoOVxUQruTr0UkLZfjVF2Om3C85SK1dpNoHgfYmb3LIo1EZBlV4YcOILD8RCnJUrCK1Ht9bfdTeSx11zXqx2a9UTvV0j9pzOEPj7FFQbwuyjbkj58AeOnXSQJuBUMJEctfp_bG_eX23Lvwov9geDJnxKIPhr5IAQQazq3ZUjLqvBfo0-L55xTKe6wcqI5AfvGN87vYyhUjvQ-UruCnjmGKgI85jIrZHokPjF_dz4Ls2sCOMKVlhR9g',
  },
  {
    id: 'draft-' + Date.now(),
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
  const [agents, setAgents] = React.useState([]);

  React.useEffect(() => {
    const saved = localStorage.getItem('genlab_agents');
    if (saved) {
      setAgents(JSON.parse(saved));
    } else {
      setAgents(DEFAULT_AGENTS);
      localStorage.setItem('genlab_agents', JSON.stringify(DEFAULT_AGENTS));
    }
  }, []);

  const deleteAgent = (id) => {
    const updated = agents.filter(a => a.id !== id);
    setAgents(updated);
    localStorage.setItem('genlab_agents', JSON.stringify(updated));
  };

  return (
    <div className="main-content">
      <header className="page-header" style={{ borderBottom: '1px solid var(--border-dark)' }}>
        <div className="relative w-1/2 max-w-xl group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--neon-lime)] transition-colors" size={20} />
          <input
            className="w-full bg-[#141414] border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-[var(--neon-lime)] placeholder-slate-500"
            placeholder="Search agents, models, or languages..."
            type="text"
          />
        </div>

        <div className="header-actions">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#141414] rounded-full">
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--neon-lime)' }}></div>
            <span className="text-[10px] font-bold text-slate-300">Usage: 1.2k / 5k min</span>
          </div>
          <button className="icon-btn text-slate-400 hover:text-white"><Bell size={18} /></button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--border-dark)' }}>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnY7iQTPHi7M3sVBBSU2f-FU58vfxvXBKRuwczFldZSH8gSjES6pvdtSuwApzHEL0S6ZzUAovHxXShYQiogMZMwc4_f4S4TnrJv5VlWx_ZYhKmmulsR73SgFPjTUnfJHG-EpzPLn-wByIr24IU2A4kxaQf5un94B897yopOraQiR_x6WJawFefUWvuODqWj4tKmidczZzWfGDYrt8r7xc5AUTdMnUEiPk04PSBzRa4_PdUlM_tAXLb809jmWbKOgcHfC2pcJnZZ6Q" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </header>

      <div className="agents-container">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold mb-2">Agents</h1>
            <p className="text-slate-500 dark:text-slate-400">Deploy and manage your autonomous voice identities.</p>
          </div>
          <Link to="/agents/builder" className="btn-primary" style={{ padding: '10px 24px', fontWeight: 800 }}>
            <Plus size={20} />
            <span>Create Agent</span>
          </Link>
        </div>

        <div className="agent-grid-layout">
          {agents.map((agent, i) => {
            const ProviderIcon = ICON_MAP[agent.providerIcon] || User;
            return (
              <div key={i} className="agent-vignette-card" style={{ background: 'var(--card-bg)', borderRadius: 24, border: '1px solid var(--border-dark)' }}>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#141414] border border-slate-800">
                      {agent.avatar ? (
                        <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                          <User size={32} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{agent.name}</h3>
                      <p className="text-slate-500 text-xs mt-1">ID: {agent.id}</p>
                    </div>
                  </div>
                  <div className={`agent-status-pill ${agent.status === 'Active' ? 'active' : ''}`} style={{ padding: '2px 8px', borderRadius: 100, background: agent.status === 'Active' ? 'rgba(201,255,31,0.1)' : 'var(--surface-bright)' }}>
                    {agent.status === 'Active' && <div className="status-dot-pulse" style={{ width: 6, height: 6 }} />}
                    <span className="status-text" style={{ fontSize: 10, color: agent.status === 'Active' ? 'var(--neon-lime)' : 'var(--text-dim)' }}>{agent.status}</span>
                  </div>
                </div>

                <div className="agent-details-list" style={{ gap: 16, marginBottom: 32 }}>
                  <div className="agent-detail-row">
                    <span className="detail-label">Language</span>
                    <span className={`text-sm ${agent.language === 'Pending...' ? 'text-slate-500' : 'font-medium'}`}>{agent.language}</span>
                  </div>
                  <div className="agent-detail-row">
                    <span className="detail-label">Voice Provider</span>
                    <div className="flex items-center gap-1.5">
                      <ProviderIcon size={14} className="text-slate-500" />
                      <span className={`text-sm ${agent.provider === 'Not selected' ? 'text-slate-500' : 'font-medium'}`}>{agent.provider}</span>
                    </div>
                  </div>
                  <div className="agent-detail-row">
                    <span className="detail-label">Model</span>
                    <span className="model-badge" style={{ background: 'var(--surface-bright)', padding: '2px 8px', borderRadius: 4, fontWeight: 800 }}>{agent.model}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  {agent.isDraft ? (
                    <>
                      <button className="flex-1 btn-primary" style={{ height: 44, justifyContent: 'center', background: 'rgba(223, 255, 0, 0.1)', color: 'var(--neon-lime)', border: '1px solid rgba(223, 255, 0, 0.2)' }}>
                        <Rocket size={16} />
                        <span style={{ fontSize: 12 }}>Finish Setup</span>
                      </button>
                      <button
                        className="btn-secondary"
                        style={{ width: 44, height: 44, padding: 0, justifyContent: 'center', color: 'var(--accent-red)' }}
                        onClick={() => deleteAgent(agent.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn-secondary flex-1" style={{ height: 44, justifyContent: 'center', background: '#141414' }}>
                        <PlayCircle size={18} />
                        <span>Test</span>
                      </button>
                      <button
                        onClick={() => navigate(`/agents/builder?id=${agent.id}`)}
                        className="btn-secondary flex-1"
                        style={{ height: 44, justifyContent: 'center', background: '#141414' }}
                      >
                        <Edit size={16} />
                        <span>Edit</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          })}

          <div className="border-2 border-dashed border-[#2E2E2E] rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#141414] flex items-center justify-center mb-6 text-slate-500">
              <Mic size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Ready for a new voice?</h3>
            <p className="text-slate-400 text-sm max-w-[240px] mb-8 leading-relaxed">
              Build a specialized agent with low-latency LLMs and premium voices.
            </p>
            <a className="text-[var(--neon-lime)] font-bold text-sm flex items-center gap-2 hover:underline" href="#">
              Learn how to start <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
