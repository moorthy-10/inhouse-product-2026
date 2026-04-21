import { Link } from 'react-router-dom';
import {

  Search,
  Bell,
  Sun,
  Plus,
  Send,
  Zap,
  MousePointerClick,
  Phone,
  MessageSquare,
  Smartphone,
  Edit2,
  Eye,
  ChevronLeft,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import './Campaigns.css';

const stats = [
  { label: 'Total Sent', value: '124.5k', change: '+12.5%', trend: 'up', icon: Send, iconColor: 'var(--neon-lime)' },
  { label: 'Active Campaigns', value: '12', change: 'Stable', trend: 'neutral', icon: Zap, iconColor: 'var(--accent-purple)' },
  { label: 'Avg. Engagement', value: '18.4%', change: '-2.1%', trend: 'down', icon: MousePointerClick, iconColor: 'var(--accent-cyan)' },
];

const campaignList = [
  {
    name: 'Q1 Appointment Reminder',
    date: 'Created Jan 12, 2024',
    channels: ['voice', 'sms'],
    sent: '4,500',
    engaged: '3,200',
    ctr: '71% CTR',
    status: 'Live',
    progress: 80,
  }
];

function getStatusInfo(status) {
  switch (status) {
    case 'Live': return { class: 'status-live', color: 'var(--neon-lime)' };
    case 'Paused': return { class: 'status-paused', color: 'var(--accent-orange)' };
    case 'Ended': return { class: 'status-ended', color: 'var(--text-dim)' };
    default: return { class: '', color: 'var(--text-muted)' };
  }
}

export default function Campaigns() {
  return (
    <div className="main-content">
      {/* Header */}
      <header className="page-header">
        <div className="flex-1 max-w-xl">
          <div className="search-container">
            <Search className="search-icon" size={16} />
            <input className="search-input" type="text" placeholder="Search campaigns, logs, or reports..." />
          </div>
        </div>
        <div className="header-actions">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Usage</span>
              <span style={{ fontSize: 11, fontWeight: 700, background: 'var(--surface-highest)', padding: '2px 6px', borderRadius: 4 }}>1.2k / 5k min</span>
            </div>
            <div className="progress-bar" style={{ width: 120 }}>
              <div className="progress-fill lime" style={{ width: '24%' }} />
            </div>
          </div>
          <button className="icon-btn" style={{ position: 'relative' }}>
            <Bell size={20} />
            <span style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, background: 'var(--neon-lime)', borderRadius: '50%', border: '2px solid var(--bg-base)' }} />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="campaigns-container">
        {/* Title and CTA */}
        <div className="campaigns-hero">
          <div>
            <h1 className="campaigns-title">Campaigns</h1>
            <p className="campaigns-subtitle">Manage and monitor your automated communication flows.</p>
          </div>
          <Link to="/campaigns/new" className="btn-primary" style={{ padding: '12px 24px', fontSize: '1rem', textDecoration: 'none' }}>
            <Plus size={20} />
            <span>New Campaign</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="campaigns-stats-grid">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="card">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="metric-label uppercase tracking-widest">{s.label}</p>
                    <h3 className="metric-value">{s.value}</h3>
                  </div>
                  <div className="stat-card-icon-wrapper">
                    <Icon size={24} style={{ color: s.iconColor }} />
                  </div>
                </div>
                <div className="metric-change">
                  <span style={{ fontWeight: 700, color: s.trend === 'up' ? '#4ADE80' : s.trend === 'down' ? '#F87171' : 'var(--text-muted)' }}>{s.change}</span>
                  <span className="text-xs text-slate-500">from last month</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Table Card */}
        <div className="card campaign-table-card">
          <div className="overflow-x-auto">
            <table className="campaign-table">
              <thead>
                <tr>
                  <th>Campaign Name</th>
                  <th>Channels</th>
                  <th>Sent / Engaged</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaignList.map((c, i) => {
                  const statusInfo = getStatusInfo(c.status);
                  return (
                    <tr key={i}>
                      <td>
                        <Link to="/campaigns/details" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                          <div className="campaign-info-stack">
                            <span className="campaign-name-text">{c.name}</span>
                            <span className="campaign-date-text">{c.date}</span>
                          </div>
                        </Link>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          {c.channels.map((ch, j) => (
                            <span key={j} className={`tag-pill tag-${ch}`}>
                              {ch}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{c.sent} / {c.engaged}</span>
                          <span className="text-[10px] font-bold text-[#C9FF1F]">{c.ctr}</span>
                        </div>
                      </td>
                      <td>
                        <div className="campaign-status-pill">
                          <div className="status-dot" style={{ background: statusInfo.color, boxShadow: `0 0 8px ${statusInfo.color}` }} />
                          <span className="text-xs font-semibold text-slate-200">{c.status}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="progress-bar flex-1" style={{ minWidth: 80 }}>
                            <div 
                              className={`progress-fill ${c.status === 'Ended' ? 'dim' : c.status === 'Paused' ? 'orange' : 'lime'}`} 
                              style={{ width: `${c.progress}%` }} 
                            />
                          </div>
                          <span className="text-xs font-bold">{c.progress}%</span>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="flex justify-end gap-2">
                          <button className="icon-btn"><Edit2 size={16} /></button>
                          <Link to="/campaigns/details">
                            <button className="icon-btn"><Eye size={16} /></button>
                          </Link>

                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination-container">
            <span className="text-sm text-slate-500">Showing 1 of 1 campaigns</span>
            <div className="flex gap-2">
              <button className="btn-secondary opacity-50 cursor-not-allowed">Previous</button>
              <button className="btn-secondary">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
