import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  CircleDot, 
  Download, 
  Copy, 
  Pause, 
  Play,
  Edit2, 
  Phone, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Mail, 
  Calendar, 
  Clock, 
  User,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RefreshCcw
} from 'lucide-react';
import './CampaignDetails.css';

const CampaignDetails = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isPaused, setIsPaused] = useState(false);

  // Mock data inspired by the HTML provided
  const campaignInfo = {
    name: 'Q1 Appointment reminder',
    author: 'Arjun Kumar',
    started: '3 days ago',
    description: 'Outbound campaign targeting 12,400 Tamil-speaking customers for their upcoming appointment confirmations. Uses voice-first with WhatsApp fallback.',
    tags: ['Voice', 'WhatsApp', 'Tamil', 'Appointment', 'Q1 2025'],
    startDate: '18 Apr 2025',
    endDate: '25 Apr 2025',
    timeWindow: '9am – 6pm IST',
    contacts: {
      total: 12400,
      sent: 9820,
      remaining: 2580,
      skipped: 0
    },
    performance: {
      confirmed: 74,
      noReply: 18,
      reschedule: 6,
      failed: 2
    },
    metrics: [
      { label: 'Sent', value: '9,820', sub: '79% of total', trend: 'neutral' },
      { label: 'Delivered', value: '9,612', sub: '97.9% delivery', trend: 'up' },
      { label: 'Engaged', value: '7,276', sub: '74% engagement', trend: 'up' },
      { label: 'Confirmed', value: '5,880', sub: '↑ 60% conv. rate', trend: 'up' },
      { label: 'Rescheduled', value: '592', sub: '6% rescheduled', trend: 'neutral' },
      { label: 'Failed', value: '208', sub: '2.1% fail rate', trend: 'down' }
    ],
    dailyChart: [
      { day: '18', value: 44, type: 'partial' },
      { day: '19', value: 62, type: 'full' },
      { day: '20', value: 76, type: 'full' },
      { day: '21', value: 68, type: 'full' },
      { day: '22', value: 30, type: 'partial' },
      { day: '23', value: 20, type: 'empty' },
      { day: '24', value: 20, type: 'empty' }
    ],
    funnel: [
      { label: 'Sent', count: '9,820', pct: 100, class: 'sent' },
      { label: 'Delivered', count: '9,612', pct: 97, class: 'delivered' },
      { label: 'Engaged', count: '7,276', pct: 74, class: 'engaged' },
      { label: 'Confirmed', count: '5,880', pct: 60, class: 'confirmed' },
      { label: 'Rescheduled', count: '592', pct: 6, class: 'rescheduled' }
    ],
    channels: [
      { name: 'Voice', icon: Phone, count: '7,660', pct: 78, color: 'var(--neon-lime)' },
      { name: 'WhatsApp', icon: MessageSquare, count: '2,160', pct: 62, color: 'var(--accent-emerald)' }
    ]
  };

  const progressOffset = 188.5 * (1 - 0.79);

  return (
    <div className="main-content campaign-details-page">
      {/* TOP NAV */}
      <div className="campaign-details-header">
        <div className="header-left-group">
          <Link to="/campaigns" className="back-link">
            <ChevronLeft size={16} />
            <span>Campaigns</span>
          </Link>
          <div className="campaign-nav-info">
            <div className="campaign-nav-title">{campaignInfo.name}</div>
            <div className="campaign-nav-meta">Created by {campaignInfo.author} · Started {campaignInfo.started}</div>
          </div>
        </div>
        <div className="header-right-group">
          <span className="status-badge-live">
            <div className="status-dot-blink"></div>
            Live
          </span>
          <button className="btn-secondary">
            <Download size={14} />
            <span>Export</span>
          </button>
          <button className="btn-secondary hidden-mobile">
            <Copy size={14} />
            <span>Duplicate</span>
          </button>
          <button 
            className={`btn-secondary btn-pause-action ${isPaused ? 'paused' : ''}`}
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>
          <button className="btn-primary">
            <Edit2 size={14} />
            <span>Edit campaign</span>
          </button>
        </div>
      </div>

      <div className="campaign-details-content">
        {/* BREADCRUMB */}
        <div className="breadcrumb">
          <Link to="/campaigns">Campaigns</Link>
          <ChevronRight size={12} />
          <span>{campaignInfo.name}</span>
        </div>

        {/* HERO SECTION */}
        <div className="campaign-hero-section">
          <div className="campaign-info-card">
            <h1>{campaignInfo.name}</h1>
            <p className="campaign-description">{campaignInfo.description}</p>
            <div className="campaign-tags">
              {campaignInfo.tags.map(tag => (
                <span key={tag} className={`tag tag-${tag.toLowerCase()}`}>
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="campaign-meta-grid">
              <div className="meta-item">
                <label>Start date</label>
                <span>{campaignInfo.startDate}</span>
              </div>
              <div className="meta-item">
                <label>End date</label>
                <span>{campaignInfo.endDate}</span>
              </div>
              <div className="meta-item">
                <label>Time window</label>
                <span>{campaignInfo.timeWindow}</span>
              </div>
              <div className="meta-item">
                <label>Created by</label>
                <span>{campaignInfo.author}</span>
              </div>
            </div>
          </div>

          {/* PROGRESS CARD */}
          <div className="progress-snapshot-card">
            <div className="progress-circular-stats">
              <div className="circular-progress-container">
                <svg width="80" height="80" viewBox="0 0 72 72">
                  <circle className="donut-ring-bg" cx="36" cy="36" r="30" />
                  <circle 
                    className="donut-ring-fg" 
                    cx="36" 
                    cy="36" 
                    r="30" 
                    style={{ strokeDashoffset: progressOffset, transform: 'rotate(-90deg)', transformOrigin: 'center' }} 
                  />
                </svg>
                <div className="circular-progress-text">
                  <div className="progress-pct">79%</div>
                  <div className="progress-lbl">done</div>
                </div>
              </div>
              <div className="progress-legend">
                <div className="legend-row">
                  <span className="legend-label">Contacts</span>
                  <span className="legend-value">{campaignInfo.contacts.total.toLocaleString()}</span>
                </div>
                <div className="legend-row">
                  <span className="legend-label">Sent</span>
                  <span className="legend-value highlight">{campaignInfo.contacts.sent.toLocaleString()}</span>
                </div>
                <div className="legend-row">
                  <span className="legend-label">Remaining</span>
                  <span className="legend-value">{campaignInfo.contacts.remaining.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="progress-status-bars">
              <div className="status-bar-row">
                <span className="status-bar-name">Confirmed</span>
                <div className="progress-bar"><div className="progress-fill lime" style={{ width: '74%' }} /></div>
                <span className="status-bar-pct">74%</span>
              </div>
              <div className="status-bar-row">
                <span className="status-bar-name">No reply</span>
                <div className="progress-bar"><div className="progress-fill dim" style={{ width: '18%' }} /></div>
                <span className="status-bar-pct">18%</span>
              </div>
              <div className="status-bar-row">
                <span className="status-bar-name">Reschedule</span>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '6%', background: 'var(--accent-blue)' }} /></div>
                <span className="status-bar-pct">6%</span>
              </div>
              <div className="status-bar-row">
                <span className="status-bar-name">Failed</span>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '2%', background: 'var(--accent-red)' }} /></div>
                <span className="status-bar-pct">2%</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI STRIP */}
        <div className="kpi-metrics-strip">
          {campaignInfo.metrics.map((metric, i) => (
            <div key={i} className="kpi-item">
              <div className="kpi-title">{metric.label}</div>
              <div className="kpi-val">{metric.value}</div>
              <div className={`kpi-trend trend-${metric.trend}`}>
                {metric.sub}
              </div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className="page-tabs">
          {['Overview', 'Contacts', 'Messages', 'Settings'].map(tab => (
            <button 
              key={tab} 
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {tab === 'Contacts' && <span className="tab-count">12,400</span>}
              {tab === 'Messages' && <span className="tab-count">9</span>}
            </button>
          ))}
        </div>

        {/* TAB CONTENT - OVERVIEW */}
        {activeTab === 'Overview' && (
          <div className="details-grid">
            {/* Daily Sent Chart */}
            <div className="card">
              <div className="chart-card-header">
                <span className="chart-card-title">Messages sent by day</span>
                <span className="view-report-link">Full report <ArrowRight size={12} /></span>
              </div>
              <div className="mini-bar-chart">
                {campaignInfo.dailyChart.map((d, i) => (
                  <div key={i} className="chart-column">
                    <div 
                      className={`bar-segment bar-segment-${d.type}`} 
                      style={{ height: `${d.value}%` }}
                    />
                    <span className="bar-label">{d.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <div className="w-2 h-2 rounded-[2px] bg-[var(--neon-lime)]"></div>
                  <span>Sent</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <div className="w-2 h-2 rounded-[2px] bg-[var(--neon-lime)] opacity-30"></div>
                  <span>Partial day</span>
                </div>
              </div>
            </div>

            {/* Conversion Funnel */}
            <div className="card">
              <div className="chart-card-header">
                <span className="chart-card-title">Conversion funnel</span>
              </div>
              <div className="funnel-container">
                {campaignInfo.funnel.map((item, i) => (
                  <div key={i} className="funnel-row">
                    <div className={`funnel-label-tag funnel-tag-${item.class}`}>
                      {item.label}
                    </div>
                    <div className="funnel-bar-bg">
                      <div 
                        className={`funnel-bar-fill funnel-tag-${item.class}`} 
                        style={{ width: `${item.pct}%` }} 
                      />
                    </div>
                    <div className="funnel-count-val">{item.count}</div>
                    <div className="funnel-pct-val">{item.pct}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Channel Breakdown */}
            <div className="card">
              <div className="chart-card-header">
                <span className="chart-card-title">Channel breakdown</span>
              </div>
              <div className="channel-list">
                {campaignInfo.channels.map((ch, i) => (
                  <div key={i} className="channel-stat-item">
                    <div className="channel-icon-box">
                      <ch.icon size={20} />
                    </div>
                    <div className="channel-info-expanded">
                      <div className="channel-name-header">
                        <span className="channel-name-text">{ch.name}</span>
                        <span className="channel-count-text">{ch.count}</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${ch.pct}%`, background: ch.color }} />
                      </div>
                      <div className="channel-sub-info">
                        <span>Sent</span>
                        <span style={{ color: ch.color, fontWeight: 700 }}>{ch.pct}% Engmnt</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ paddingTop: 12, borderTop: '1px solid var(--border-gray)', marginTop: 4 }}>
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fallback trigger rate</span>
                   </div>
                   <div className="progress-bar mb-2">
                     <div className="progress-fill lime" style={{ width: '22%' }} />
                   </div>
                   <p className="text-[11px] text-slate-400">22% escalated to WhatsApp after no voice reply</p>
                </div>
              </div>
            </div>

            {/* Schedule & Configuration */}
            <div className="card">
              <div className="chart-card-header">
                <span className="chart-card-title">Schedule & configuration</span>
              </div>
              <div className="info-list">
                <div className="info-row">
                  <span className="info-key">Campaign type</span>
                  <span className="info-val">Appointment confirmation</span>
                </div>
                <div className="info-row">
                  <span className="info-key">Calling window</span>
                  <span className="info-val">9:00am – 6:00pm IST</span>
                </div>
                <div className="info-row">
                  <span className="info-key">Retry attempts</span>
                  <span className="info-val">2 retries · 4hr gap</span>
                </div>
                <div className="info-row">
                  <span className="info-key">Fallback channel</span>
                  <span className="info-val val-emerald">WhatsApp after 30 min</span>
                </div>
                <div className="info-row">
                  <span className="info-key">Language</span>
                  <span className="info-val val-purple">Tamil (primary)</span>
                </div>
                <div className="info-row">
                  <span className="info-key">Do-not-disturb</span>
                  <span className="info-val">Weekends excluded</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'Overview' && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--surface-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)' }}>
               <TrendingUp size={24} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 className="text-lg font-bold">Content for {activeTab} coming soon</h3>
              <p className="text-sm text-slate-500">We're finalizing the detailed view for this section.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignDetails;
