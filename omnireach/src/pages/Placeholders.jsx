import { 
  MessageSquare, 
  Users, 
  BarChart3, 
  Search, 
  Settings as SettingsIcon,
  Construction
} from 'lucide-react';

const PlaceholderPage = ({ title, icon: Icon, description }) => (
  <div className="main-content">
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="w-20 h-20 rounded-2xl bg-[var(--surface-bright)] flex items-center justify-center mb-6 border border-[var(--border-gray)]">
        <Icon size={40} className="text-[var(--neon-lime)]" />
      </div>
      <h1 className="text-3xl font-extrabold mb-4">{title}</h1>
      <p className="text-slate-500 max-w-md mb-8">{description}</p>
      <div className="flex items-center gap-2 px-4 py-2 bg-[var(--surface-highest)] rounded-full text-[11px] font-bold text-[var(--neon-lime)] uppercase tracking-wider">
        <Construction size={14} />
        <span>Module under development</span>
      </div>
    </div>
  </div>
);

export const Conversations = () => (
  <PlaceholderPage 
    title="Conversations" 
    icon={MessageSquare} 
    description="Real-time omni-channel conversation manager. Monitor and intervene in live AI-customer interactions." 
  />
);

export const Contacts = () => (
  <PlaceholderPage 
    title="Contacts & Audience" 
    icon={Users} 
    description="Manage your global contact database, define segments, and track customer engagement history." 
  />
);

export const Reports = () => (
  <PlaceholderPage 
    title="Analyse & Reports" 
    icon={BarChart3} 
    description="Deep-dive analytics into campaign performance, cost efficiency, and agent effectiveness." 
  />
);

export const Logs = () => (
  <PlaceholderPage 
    title="Logs & Audit" 
    icon={Search} 
    description="Comprehensive system logs and security audit trails for compliance monitoring." 
  />
);

export const Settings = () => (
  <PlaceholderPage 
    title="Platform Settings" 
    icon={SettingsIcon} 
    description="Configure your API keys, provider integrations, team members, and billing preferences." 
  />
);
