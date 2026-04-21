import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Plus, 
  Circle, 
  Calendar as CalIcon, 
  Clock, 
  Phone, 
  MessageSquare, 
  Mail, 
  Users,
  Info,
  Bell,
  MoreVertical,
  Activity
} from 'lucide-react';
import './Schedule.css';

const Schedule = () => {
  const [view, setView] = useState('Week');
  const [currentTime, setCurrentTime] = useState(new Date('2025-04-22T10:10:00')); // Mock now for the design

  // Mock Events Data
  const events = [
    { id: 1, day: 1, startH: 9, endH: 11, title: 'Q1 Appointment reminder', meta: '3,200 contacts', style: 'voice' },
    { id: 2, day: 2, startH: 9, endH: 12.5, title: 'Q1 Appointment reminder', meta: 'Live now', style: 'voice', isLive: true },
    { id: 3, day: 3, startH: 9, endH: 11, title: 'Q1 Appointment reminder', meta: '3,200', style: 'voice' },
    { id: 4, day: 4, startH: 9, endH: 11, title: 'Q1 Appointment reminder', meta: '2,020 left', style: 'voice' },
    { id: 5, day: 2, startH: 11, endH: 13, title: 'EMI collection — Mar', meta: '2,800', style: 'green' },
    { id: 6, day: 3, startH: 11, endH: 13, title: 'EMI collection — Mar', meta: '11:00am – 1:00pm', style: 'green' },
    { id: 7, day: 3, startH: 14.5, endH: 16, title: 'Sales outreach — Apr', meta: '2,300', style: 'teal' },
    { id: 8, day: 4, startH: 14.5, endH: 16.5, title: 'Sales outreach — Apr', meta: '2,300', style: 'teal' },
    { id: 9, day: 5, startH: 13, endH: 15, title: 'Sales outreach — Apr', meta: 'Final batch', style: 'teal' },
    { id: 10, day: 2, startH: 15, endH: 16, title: 'Insurance renewal', meta: '4,200', style: 'orange' },
    { id: 11, day: 4, startH: 11, endH: 12, title: 'Insurance renewal', meta: '11:00am', style: 'orange' },
    { id: 12, day: 5, startH: 10, endH: 11.5, title: 'NPS survey — post appt.', meta: '3,841', style: 'purple' },
    { id: 13, day: 1, startH: 13, endH: 14, title: 'CSAT survey batch', meta: '6,000', style: 'blue' },
  ];

  const sidebarCampaigns = [
    { name: 'Q1 Appointment reminder', status: 'Live', date: '21–25 Apr', hours: '9am–6pm', tags: ['Voice', 'WhatsApp'], progress: 79, total: '12,400', count: '9,820', progType: 'green' },
    { name: 'EMI collection — Mar', status: 'Live', date: '22–23 Apr', hours: '11am–1pm', tags: ['Voice', 'WhatsApp'], progress: 66, total: '8,100', count: '5,340', progType: 'green' },
    { name: 'Sales outreach — Apr', status: 'Scheduled', date: '23–25 Apr', hours: '2:30pm start', tags: ['SMS', 'Voice'], starts: 'Starts tomorrow', progType: 'none' },
    { name: 'Insurance renewal outreach', status: 'Paused', date: '22–24 Apr', hours: '11am–12pm', tags: ['Email', 'SMS'], progress: 50, total: '4,200', count: '2,100', progType: 'orange' },
    { name: 'NPS survey — post appt.', status: 'Scheduled', date: '25 Apr', hours: '10:00–11:30am', tags: ['Survey', 'WhatsApp'], info: '3,841 ready', progType: 'none' },
  ];

  const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const days = [
    { name: 'MON', date: 21 },
    { name: 'TUE', date: 22, isToday: true },
    { name: 'WED', date: 23 },
    { name: 'THU', date: 24 },
    { name: 'FRI', date: 25 },
    { name: 'SAT', date: 26, isWeekend: true },
    { name: 'SUN', date: 27, isWeekend: true },
  ];

  const HOUR_HEIGHT = 80;
  const START_HOUR = 9;

  // Calculate now line position
  const nowH = currentTime.getHours() + currentTime.getMinutes() / 60;
  const nowTop = (nowH - START_HOUR) * HOUR_HEIGHT;

  return (
    <div className="schedule-page">
      {/* TOP BAR */}
      <div className="schedule-topbar">
        <div className="topbar-left">
          <h1 className="topbar-title">Schedule</h1>
          <div className="view-selector">
            {['Day', 'Week', 'Month'].map(v => (
              <button 
                key={v} 
                className={`view-toggle-btn ${view === v ? 'active' : ''}`}
                onClick={() => setView(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <div className="topbar-center">
          <div className="calendar-nav">
            <button className="nav-arr-btn"><ChevronLeft size={18} /></button>
            <span className="current-month-lbl">April 2025</span>
            <button className="nav-arr-btn"><ChevronRight size={18} /></button>
          </div>
        </div>
        <div className="topbar-right">
          <button className="btn-secondary">
            <Download size={14} />
            <span>Export</span>
          </button>
          <Link to="/campaigns/new" className="btn-primary" style={{ textDecoration: 'none' }}>
            <Plus size={16} />
            <span>Schedule campaign</span>
          </Link>
        </div>
      </div>

      {/* LEGEND BAR */}
      <div className="schedule-legendbar">
        <div className="legend-group">
          <div className="legend-pill"><div className="color-dot dot-voice" /> Voice</div>
          <div className="legend-pill"><div className="color-dot dot-whatsapp" /> WhatsApp</div>
          <div className="legend-pill"><div className="color-dot dot-sms" /> SMS</div>
          <div className="legend-pill"><div className="color-dot dot-email" /> Email</div>
          <div className="legend-pill"><div className="color-dot dot-survey" /> Survey</div>
          <div className="legend-pill" style={{ marginLeft: 16 }}>
             <div className="w-2 h-2 rounded-full bg-[var(--neon-lime)]"></div>
             Today
          </div>
          <div className="now-legend">
            <div className="now-indicator-line"></div>
            Now
          </div>
        </div>
        <div className="timezone-note">IST · 9am – 6pm calling window active</div>
      </div>

      {/* MAIN CONTENT */}
      <div className="schedule-main">
        {/* CALENDAR AREA */}
        <div className="calendar-grid-container">
          <div className="grid-header">
            <div className="header-cell" style={{ borderLeft: 'none' }} />
            {days.map((day, i) => (
              <div key={i} className={`header-cell ${day.isToday ? 'is-today' : ''}`} style={{ opacity: day.isWeekend ? 0.4 : 1 }}>
                <div className="day-name">{day.name}</div>
                <div className="day-number">{day.date}</div>
              </div>
            ))}
          </div>

          <div className="grid-body-scroll">
            <div className="grid-rows-container">
              {hours.map((h) => (
                <>
                  <div key={`lbl-${h}`} className="time-row-label">
                    {h > 12 ? `${h - 12} pm` : h === 12 ? '12 pm' : `${h} am`}
                  </div>
                  {days.map((d, di) => (
                    <div key={`cell-${h}-${di}`} className={`grid-cell ${d.isWeekend ? 'is-weekend' : ''}`} />
                  ))}
                </>
              ))}

              {/* Events Wrapper */}
              <div className="events-wrapper">
                {/* Now Line */}
                <div className="timeline-now" style={{ top: nowTop, width: 'calc(100% / 7)', left: '14.28%' }}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-line"></div>
                </div>

                {/* Render Events */}
                {events.map((ev) => {
                  const top = (ev.startH - START_HOUR) * HOUR_HEIGHT;
                  const height = (ev.endH - ev.startH) * HOUR_HEIGHT - 4;
                  const left = (ev.day - 1) * (100 / 7);
                  const width = (100 / 7);

                  return (
                    <div 
                      key={ev.id}
                      className={`calendar-event-item ev-style-${ev.style}`}
                      style={{ 
                        top, 
                        height, 
                        left: `${left}%`, 
                        width: `calc(${width}% - 8px)`,
                        marginLeft: 4
                      }}
                    >
                      <div className="ev-inner-title">{ev.title}</div>
                      <div className="ev-inner-time">{ev.meta}</div>
                      {ev.isLive && (
                        <div className="flex gap-1 mt-2">
                          <Circle size={4} fill="var(--neon-lime)" color="var(--neon-lime)" />
                          <Circle size={4} fill="var(--accent-emerald)" color="var(--accent-emerald)" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="schedule-sidebar">
          <div className="sidebar-scroll-area">
            {/* MINI CALENDAR */}
            <div className="mini-cal-box">
              <div className="mini-cal-hdr">
                <span className="mini-cal-month">April 2025</span>
                <div className="flex gap-1">
                  <button className="nav-arr-btn" style={{ width: 20, height: 20 }}><ChevronLeft size={12} /></button>
                  <button className="nav-arr-btn" style={{ width: 20, height: 20 }}><ChevronRight size={12} /></button>
                </div>
              </div>
              <div className="mini-grid-container">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => (
                  <div key={d} className="mini-dow-lbl">{d}</div>
                ))}
                {Array.from({ length: 31 }, (_, i) => {
                  const d = i + 1;
                  const isToday = d === 22;
                  const isSelected = d >= 21 && d <= 25;
                  return (
                    <div 
                      key={d} 
                      className={`mini-day-cell ${isToday ? 'is-today' : ''} ${isSelected && !isToday ? 'is-selected' : ''}`}
                    >
                      {d}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="sidebar-section-title">This week</div>
            
            {sidebarCampaigns.map((c, i) => (
              <div key={i} className="sidebar-campaign-card">
                <div className="card-top-row">
                  <div className="card-name-txt">{c.name}</div>
                  <div className={`card-status-tag tag-${c.status.toLowerCase()}`}>{c.status}</div>
                </div>
                <div className="card-meta-info">
                  <CalIcon size={12} className="text-slate-500" />
                  <span>{c.date} · {c.hours}</span>
                </div>
                <div className="card-tags-row">
                  {c.tags.map(t => (
                    <span key={t} className="text-[10px] font-bold text-slate-500">{t}</span>
                  ))}
                </div>
                {c.progType !== 'none' ? (
                  <div className="card-progress-section">
                    <div className="card-progress-metrics">
                      <span>Progress</span>
                      <span>{c.count} / {c.total}</span>
                    </div>
                    <div className="progress-bar">
                      <div className={`progress-fill ${c.progType === 'green' ? 'lime' : 'orange'}`} style={{ width: `${c.progress}%` }} />
                    </div>
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-500 italic">
                    {c.starts || c.info}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER STATUS */}
      <div className="schedule-footer-status">
        <div className="footer-stat-item"><Clock size={12} /> Calling window <strong>9:00am – 6:00pm IST</strong></div>
        <div className="footer-stat-item"><CalIcon size={12} /> Weekends <strong>excluded</strong></div>
        <div className="footer-stat-item"><Activity size={12} /> Max <strong>2 campaigns</strong> running</div>
        <div className="footer-stat-item"><Info size={12} /> DND sync: <strong>Daily 8am</strong></div>
      </div>
    </div>
  );
};

export default Schedule;
