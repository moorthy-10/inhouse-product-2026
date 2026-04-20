import {
  Search,
  Bell,
  Sun,
  Plus,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Phone,
  MessageSquare,
  Smartphone,
  Mail,
} from 'lucide-react';
import './Dashboard.css';

const metrics = [
  { label: 'Total conversations', value: '48,302', change: '12.4%', positive: true, progress: 40, color: 'lime' },
  { label: 'Automation rate', value: '96.2%', change: '2.1%', positive: true, progress: 80, color: 'lime' },
  { label: 'Appointments booked', value: '3,841', change: '8.7%', positive: true, progress: 55, color: 'cyan' },
  { label: 'Collections resolved', value: '₹2.4M', change: '1.2%', positive: false, progress: 30, color: 'red' },
];

const campaigns = [
  {
    name: 'Q1 Appointment reminder',
    meta: 'Tamil · 12,400 contacts',
    channels: [{ label: 'Voice', type: 'voice' }, { label: 'SMS', type: 'sms' }],
    sent: '9,820', engaged: '74%', status: 'Live', progress: 70,
  },
  {
    name: 'EMI collection — Mar',
    meta: 'Tamil + English · 8,100 contacts',
    channels: [{ label: 'Voice', type: 'voice' }, { label: 'WhatsApp', type: 'whatsapp' }],
    sent: '5,340', engaged: '61%', status: 'Live', progress: 55,
  },
  {
    name: 'Insurance renewal outreach',
    meta: 'English · 4,200 contacts',
    channels: [{ label: 'Email', type: 'email' }, { label: 'SMS', type: 'sms' }],
    sent: '2,100', engaged: '48%', status: 'Paused', progress: 45,
  },
  {
    name: 'CSAT survey — Feb batch',
    meta: 'Tamil · 6,000 contacts',
    channels: [{ label: 'WhatsApp', type: 'whatsapp' }],
    sent: '6,000', engaged: '82%', status: 'Ended', progress: 100,
  },
];

const activities = [
  { dot: 'var(--neon-lime)', text: <><strong>Q1 Appointment reminder</strong> reached 9,820 contacts. Engagement at 74%.</>, time: '2 minutes ago' },
  { dot: 'var(--accent-blue)', text: <><strong>Priya S.</strong> replied via WhatsApp — appointment rescheduled to 15 Apr.</>, time: '11 minutes ago' },
  { dot: 'var(--accent-orange)', text: <><strong>EMI collection Mar</strong> — ₹42,000 collected via payment link in last hour.</>, time: '34 minutes ago' },
  { dot: '#6B7280', text: <><strong>Insurance renewal</strong> paused by Arjun Kumar. Flow updated.</>, time: '2 hours ago' },
];

const channels = [
  { name: 'Voice', icon: Phone, color: 'var(--neon-lime)', pct: 80 },
  { name: 'WhatsApp', icon: MessageSquare, color: 'var(--accent-emerald)', pct: 61 },
  { name: 'SMS', icon: Smartphone, color: 'var(--accent-blue)', pct: 44 },
  { name: 'Email', icon: Mail, color: 'var(--accent-orange)', pct: 29 },
];

function getStatusClass(status) {
  if (status === 'Live') return 'status-live';
  if (status === 'Paused') return 'status-paused';
  return 'status-ended';
}

export default function Dashboard() {
  return (
    <div className="main-content">
      {/* Header */}
      <header className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <div className="header-actions">
          <div className="search-container">
            <Search className="search-icon" size={16} />
            <input className="search-input" type="text" placeholder="Search campaigns, contacts..." />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="icon-btn"><Bell size={20} /></button>
            <button className="icon-btn"><Sun size={20} /></button>
          </div>
          <button className="btn-primary">
            <Plus size={16} />
            <span>New campaign</span>
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <div style={{ padding: '0 32px 32px', display: 'flex', flexDirection: 'column', gap: 24, overflow: 'auto' }}>
        {/* Metric Cards */}
        <section className="metrics-grid">
          {metrics.map((m, i) => (
            <div key={i} className={`card animate-fade-in animate-delay-${i + 1}`}>
              <p className="metric-label">{m.label}</p>
              <h2 className="metric-value">{m.value}</h2>
              <div className={`metric-change ${m.positive ? 'positive' : 'negative'}`}>
                {m.positive ? <ChevronUp size={12} strokeWidth={3} /> : <ChevronDown size={12} strokeWidth={3} />}
                <span>{m.change} vs last month</span>
              </div>
              <div className="progress-bar">
                <div className={`progress-fill ${m.color}`} style={{ width: `${m.progress}%` }} />
              </div>
            </div>
          ))}
        </section>

        {/* Campaigns Table */}
        <section>
          <div className="section-header">
            <h3 className="section-title">Active campaigns</h3>
            <a href="#" className="section-link">
              <span>View all</span>
              <ChevronRight size={12} />
            </a>
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="campaign-table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Channels</th>
                  <th>Sent</th>
                  <th>Engaged</th>
                  <th>Status</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c, i) => (
                  <tr key={i}>
                    <td>
                      <p className="campaign-name">{c.name}</p>
                      <p className="campaign-meta">{c.meta}</p>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {c.channels.map((ch, j) => (
                          <span key={j} className={`tag tag-${ch.type}`}>{ch.label}</span>
                        ))}
                      </div>
                    </td>
                    <td style={{ color: '#D1D5DB' }}>{c.sent}</td>
                    <td style={{ color: '#D1D5DB' }}>{c.engaged}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(c.status)}`}>{c.status}</span>
                    </td>
                    <td>
                      <div className="progress-bar" style={{ width: 96, height: 6 }}>
                        <div className="progress-fill lime" style={{ width: `${c.progress}%`, height: '100%' }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Lower Grid */}
        <section className="lower-grid">
          {/* Activity Feed */}
          <div className="card">
            <div className="section-header" style={{ marginBottom: 24 }}>
              <h3 className="section-title">Recent activity</h3>
              <a href="#" className="section-link">
                <span>View all</span>
                <ChevronRight size={12} />
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {activities.map((a, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-dot" style={{ backgroundColor: a.dot }} />
                  <div>
                    <p className="activity-text">{a.text}</p>
                    <p className="activity-time">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Stats */}
          <div className="stats-stack">
            {/* Language Split */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>Language split</h3>
                <p style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'Manrope' }}>2 langs</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[{ name: 'Tamil', pct: 63, color: 'lime' }, { name: 'English', pct: 37, color: 'cyan' }].map((l, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 6 }}>
                      <span style={{ color: 'var(--text-muted)' }}>{l.name}</span>
                      <span>{l.pct}%</span>
                    </div>
                    <div className="progress-bar" style={{ height: 6 }}>
                      <div className={`progress-fill ${l.color}`} style={{ width: `${l.pct}%`, height: '100%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Channel Usage */}
            <div className="card">
              <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: 20 }}>Channel usage</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {channels.map((ch, i) => {
                  const Icon = ch.icon;
                  return (
                    <div key={i} className="channel-item">
                      <Icon size={16} style={{ color: ch.color }} />
                      <div className="channel-bar-container">
                        <div className="channel-bar-header">
                          <span>{ch.name}</span>
                          <span>{ch.pct}%</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${ch.pct}%`, backgroundColor: ch.color }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
