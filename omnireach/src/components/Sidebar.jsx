import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutGrid,
  ClipboardList,
  MessageSquare,
  Users,
  Zap,
  Calendar,
  BarChart3,
  Search,
  Settings,
  CircleDot,
  Bot,
  Square,
  Share2,
  ListFilter,
  Radio,
  Menu,
  X,
} from 'lucide-react';
import './Sidebar.css';

const navSections = [
  {
    title: 'Workspace',
    items: [
      { label: 'Dashboard', icon: LayoutGrid, to: '/' },
      { label: 'Campaigns', icon: ClipboardList, to: '/campaigns', badge: 3 },
      { label: 'Conversations', icon: MessageSquare, to: '/conversations' },
      { label: 'Contacts', icon: Users, to: '/contacts' },
    ],
  },
  {
    title: 'Automate',
    items: [
      { label: 'Agents', icon: Bot, to: '/agents' },
      { label: 'Flow builder', icon: Zap, to: '/flow-builder' },
      { label: 'Contacts', icon: Users, to: '/automate-contacts' },
      { label: 'Schedule', icon: Calendar, to: '/schedule' },
    ],
  },
  {
    title: 'Analyse',
    items: [
      { label: 'Reports', icon: BarChart3, to: '/reports' },
      { label: 'Logs & audit', icon: Search, to: '/logs' },
    ],
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="mobile-menu-btn" 
        style={{ position: 'fixed', top: 20, left: 20, zIndex: 100 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon" style={{ borderRadius: '4px' }}>
            <div style={{ width: 14, height: 14, border: '3px solid #000', borderRadius: '2px' }} />
          </div>
          <span className="sidebar-logo-text" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff' }}>Omnireach</span>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navSections.map((section) => (
            <div key={section.title} className="sidebar-section">
              <p className="sidebar-section-title">{section.title}</p>
              <div>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `sidebar-link ${isActive ? 'active' : ''}`
                      }
                      end={item.to === '/'}
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="sidebar-link-badge">{item.badge}</span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <NavLink to="/settings" className="sidebar-link" style={{ marginBottom: 16 }} onClick={() => setIsOpen(false)}>
            <Settings size={16} />
            <span>Settings</span>
          </NavLink>
          <div className="sidebar-user">
            <div className="sidebar-avatar">AK</div>
            <div>
              <p className="sidebar-user-name">Arjun Kumar</p>
              <p className="sidebar-user-role">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(0,0,0,0.5)', 
            backdropFilter: 'blur(4px)',
            zIndex: 45 
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
