import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Check, 
  Layout, 
  Settings, 
  Clock, 
  Users, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Mail, 
  Calendar as CalIcon,
  AlertTriangle,
  Send,
  Save,
  ChevronRight,
  HelpCircle,
  XCircle,
  ArrowRight
} from 'lucide-react';
import './ScheduleCampaign.css';

const ScheduleCampaign = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(2);
  const [formData, setFormData] = useState({
    name: 'Q1 Appointment reminder — Apr batch',
    type: 'Appointment confirmation',
    description: 'Outbound appointment confirmations for Tamil-speaking customers with voice-first, WhatsApp fallback.',
    language: 'Tamil',
    flow: 'Appt. confirm — voice + WA fallback',
    startDate: '22 Apr 2025',
    endDate: '28 Apr 2025',
    startTime: '09:00 am',
    endTime: '06:00 pm',
    channels: [
      { id: 'voice', name: 'Voice', icon: Phone, provider: 'Twilio', selected: true, priority: 1 },
      { id: 'whatsapp', name: 'WhatsApp', icon: MessageSquare, provider: 'Meta', selected: true, priority: 2 },
      { id: 'sms', name: 'SMS', icon: MessageSquare, provider: 'Airtel', selected: false, priority: null },
      { id: 'email', name: 'Email', icon: Mail, provider: 'SendGrid', selected: false, priority: null, error: 'Connect in Settings first' },
    ],
    audience: 'Tamil retail customers — Apr 2025'
  });

  const steps = [
    { id: 1, label: 'Campaign' },
    { id: 2, label: 'Select Flow' },
    { id: 3, label: 'Contact' },
    { id: 4, label: 'Schedule' },
    { id: 5, label: 'Review' },
  ];

  return (
    <div className="schedule-campaign-page">
      {/* TOP NAV */}
      <div className="schedule-nav">
        <div className="nav-back-group">
          <button className="back-link-btn" onClick={() => navigate('/campaigns')}>
            <ChevronLeft size={16} />
            <span>Campaigns</span>
          </button>
          <div className="nav-title-block">
            <h2>Schedule campaign</h2>
            <p>Configure timing, channels, and audience for your campaign run</p>
          </div>
        </div>
        <div className="nav-actions">
          <button className="btn-secondary">Save as draft</button>
          <button className="btn-primary" style={{ background: 'var(--neon-lime)', color: '#000' }}>
            <Check size={16} />
            <span>Publish now</span>
          </button>
        </div>
      </div>

      {/* STEPPER */}
      <div className="form-stepper">
        {steps.map((step, idx) => (
          <>
            <div key={step.id} className={`stepper-item ${activeStep === step.id ? 'active' : activeStep > step.id ? 'done' : ''}`}>
              <div className="stepper-num">
                {activeStep > step.id ? <Check size={12} strokeWidth={3} /> : step.id}
              </div>
              <span className="stepper-lbl">{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`stepper-sep ${activeStep > step.id ? 'done' : ''}`} />
            )}
          </>
        ))}
      </div>

      <div className="schedule-flex-layout">
        {/* MAIN FORM CONTENT */}
        <div className="form-content-area">
          {/* Campaign Details Card */}
          <div className="config-card">
            <div className="config-card-hdr">
              <div className="hdr-main">
                <div className="hdr-icon-box"><Layout size={18} /></div>
                <div>
                  <div className="hdr-title-txt">Campaign details</div>
                  <div className="hdr-subtitle-txt">Basic information about this campaign run</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[var(--accent-emerald)] text-[11px] font-bold">
                <ShieldCheck size={14} />
                <span>Completed</span>
              </div>
            </div>
            <div className="config-card-body">
              <div className="form-grid-row">
                <div className="input-field-group">
                  <label>Campaign name <span>*</span></label>
                  <input className="form-text-input" type="text" value={formData.name} />
                </div>
                <div className="input-field-group">
                  <label>Campaign type <span>*</span></label>
                  <input className="form-text-input" type="text" value={formData.type} />
                </div>
              </div>
              <div className="input-field-group" style={{ marginBottom: 20 }}>
                <label>Description</label>
                <textarea className="form-text-input" rows={2}>{formData.description}</textarea>
              </div>
              <div className="form-grid-row">
                <div className="input-field-group">
                  <label>Language <span>*</span></label>
                  <div className="lang-selector-tabs">
                    {['Tamil', 'English', 'Both'].map(lang => (
                      <button 
                        key={lang} 
                        className={`lang-tab-btn ${formData.language === lang ? 'active' : ''}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="input-field-group">
                  <label>Flow template <span>*</span></label>
                  <div className="relative">
                    <input className="form-text-input" type="text" value={formData.flow} readOnly />
                    <ChevronRight size={14} className="absolute right-3 top-3 text-slate-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flow Configuration Card */}
          <div className="config-card">
            <div className="config-card-hdr">
              <div className="hdr-main">
                <div className="hdr-icon-box"><Settings size={18} /></div>
                <div>
                  <div className="hdr-title-txt">Flow configuration</div>
                  <div className="hdr-subtitle-txt">Choose channels and set priority order</div>
                </div>
              </div>
            </div>
            <div className="config-card-body">
              <div className="channel-select-grid">
                {formData.channels.map(ch => {
                  const Icon = ch.icon;
                  return (
                    <div key={ch.id} className={`channel-option-card ${ch.selected ? 'selected' : ''}`}>
                      {ch.selected && <div className="selection-check"><Check size={12} strokeWidth={4} /></div>}
                      <div className="chan-icon-lbl"><Icon size={24} color={ch.selected ? 'var(--neon-lime)' : 'var(--text-dim)'} /></div>
                      <div className="chan-name-txt">{ch.name}</div>
                      <div className="chan-desc-txt">{ch.provider}</div>
                      
                      <div className="priority-flow-row">
                        {[1, 2, 3].map(p => (
                          <div key={p} className={`order-pill ${ch.priority === p ? 'active' : ''}`}>
                            {p === 1 ? '1st' : p === 2 ? '2nd' : '3rd'}
                          </div>
                        ))}
                      </div>
                      
                      {ch.error && (
                        <div className="flex items-center gap-2 mt-3 text-[10px] text-red-400 font-bold">
                          <XCircle size={12} />
                          <span>{ch.error}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="input-field-group">
                <label>Fallback trigger — escalate to next channel after</label>
                <div className="flex gap-2">
                  {['30 min', '1 hr', '2 hr', '4 hr', 'Custom'].map(t => (
                    <button key={t} className={`view-toggle-btn ${t === '30 min' ? 'active' : ''}`} style={{ flex: 1 }}>{t}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Timing Card */}
          <div className="config-card">
            <div className="config-card-hdr">
              <div className="hdr-main">
                <div className="hdr-icon-box"><Clock size={18} /></div>
                <div>
                  <div className="hdr-title-txt">Timing & schedule</div>
                  <div className="hdr-subtitle-txt">Set date range, calling window, and retry rules</div>
                </div>
              </div>
            </div>
            <div className="config-card-body">
               <div className="cal-picker-box">
                  <div className="mini-cal-widget bg-[#111] p-4 rounded-xl border border-[var(--border-gray)]">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-sm">April 2025</span>
                      <div className="flex gap-2">
                        <ChevronLeft size={16} />
                        <ChevronRight size={16} />
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                        <div key={d} className="text-[10px] text-slate-500 font-bold mb-2">{d}</div>
                      ))}
                      {/* Partial mock grid */}
                      {Array.from({ length: 30 }, (_, i) => {
                        const d = i + 1;
                        const isSelected = d >= 22 && d <= 28;
                        const isStart = d === 22;
                        const isEnd = d === 28;
                        return (
                          <div 
                            key={d} 
                            className={`text-[11px] p-2 rounded-md ${isStart || isEnd ? 'bg-[var(--neon-lime)] text-black font-bold' : isSelected ? 'bg-[var(--surface-bright)] text-[var(--neon-lime)]' : 'text-slate-400'}`}
                          >
                            {d}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="date-controls-stack">
                    <div className="input-field-group">
                      <label>Start date</label>
                      <input className="form-text-input" type="text" value={formData.startDate} />
                    </div>
                    <div className="input-field-group">
                      <label>End date</label>
                      <input className="form-text-input" type="text" value={formData.endDate} />
                    </div>
                    <div className="text-[11px] text-slate-500">7 days · 5 working days</div>
                  </div>
               </div>

               <div className="form-grid-row mt-6">
                  <div className="input-field-group">
                    <label>Start time</label>
                    <div className="form-text-input flex justify-between items-center bg-[#111]">
                      <span>09:00 am</span>
                      <Clock size={14} className="text-slate-500" />
                    </div>
                  </div>
                  <div className="input-field-group">
                    <label>End time</label>
                    <div className="form-text-input flex justify-between items-center bg-[#111]">
                      <span>06:00 pm</span>
                      <Clock size={14} className="text-slate-500" />
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR SUMMARY PREVIEW */}
        <div className="summary-sidebar">
          <div className="preview-header-txt">Campaign Preview</div>
          <div className="preview-main-title">{formData.name.split('—')[0]}</div>
          <div className="preview-main-sub">{formData.type} · {formData.language}</div>

          <div className="preview-data-grid">
            <div className="preview-data-row">
              <span className="preview-key-txt">Audience</span>
              <span className="preview-val-txt" style={{ color: 'var(--neon-lime)' }}>12,400 contacts</span>
            </div>
            <div className="preview-data-row">
              <span className="preview-key-txt">Date range</span>
              <span className="preview-val-txt">{formData.startDate} – {formData.endDate.split(' ')[0]}</span>
            </div>
            <div className="preview-data-row">
              <span className="preview-key-txt">Window</span>
              <span className="preview-val-txt">{formData.startTime} – {formData.endTime}</span>
            </div>
            <div className="preview-data-row">
              <span className="preview-key-txt">Working days</span>
              <span className="preview-val-txt">5 (Mon – Fri)</span>
            </div>
            <div className="preview-data-row">
              <span className="preview-key-txt">Retries</span>
              <span className="preview-val-txt">2 × · 4hr gap</span>
            </div>
          </div>

          <div className="sidebar-section-title" style={{ marginTop: 0 }}>Channel priority</div>
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
               <Phone size={16} className="text-[var(--neon-lime)]" />
               <div className="flex-1">
                 <div className="text-xs font-bold">Voice (Twilio)</div>
                 <div className="text-[10px] text-slate-500">1st · primary</div>
               </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 opacity-50">
               <MessageSquare size={16} />
               <div className="flex-1">
                 <div className="text-xs font-bold">WhatsApp (Meta)</div>
                 <div className="text-[10px] text-slate-500">2nd · fallback</div>
               </div>
            </div>
          </div>

          <div className="sidebar-section-title">Estimated Reach</div>
          <div className="mt-2">
            <div className="text-2xl font-bold">~2,480</div>
            <div className="text-[11px] text-slate-500">contacts per day (est.)</div>
            <div className="progress-bar mt-3">
              <div className="progress-fill lime" style={{ width: '62%' }} />
            </div>
          </div>

          <div className="sidebar-section-title">Timeline</div>
          <div className="preview-timeline mt-4">
             {[
               { label: 'Campaign starts', time: '22 Apr · 9:00am', active: true },
               { label: 'Voice calls begin', time: 'Phase 1', active: true },
               { label: 'WhatsApp fallbacks', time: 'Phase 2', active: false },
               { label: 'Campaign ends + report', time: '28 Apr · 6:00pm', active: false },
             ].map((step, i) => (
               <div key={i} className="tl-step">
                 <div className={`tl-marker ${step.active ? 'active' : ''}`} />
                 <div>
                   <div className="tl-label-txt">{step.label}</div>
                   <div className="tl-time-txt">{step.time}</div>
                 </div>
               </div>
             ))}
          </div>

          <div className="bg-orange-950/30 border border-orange-500/30 p-3 rounded-lg mt-8">
            <div className="flex items-center gap-2 text-orange-400 text-xs font-bold mb-1">
              <AlertTriangle size={14} />
              <span>Overlap detected</span>
            </div>
            <p className="text-[10px] text-slate-400">2,160 contacts overlap with EMI collection campaign. Cool-down applied.</p>
          </div>
        </div>
      </div>

      {/* BOTTOM STICKY ACTION BAR */}
      <div className="schedule-bottom-footer">
        <div className="footer-summary-txt">
          <strong>12,400</strong> contacts · <strong>5</strong> days · <strong>Voice + WhatsApp</strong> · <strong>Tamil</strong>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary" onClick={() => navigate(-1)}>Back</button>
          <button className="btn-secondary">Save draft</button>
          <button className="btn-primary" style={{ background: 'var(--neon-lime)', color: '#000' }}>
            <CalIcon size={14} />
            <span>Schedule campaign</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCampaign;
