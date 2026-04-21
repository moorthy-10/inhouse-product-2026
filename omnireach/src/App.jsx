import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import FlowBuilder from './pages/FlowBuilder';
import Agents from './pages/Agents';
import Campaigns from './pages/Campaigns';
import AgentBuilder from './pages/AgentBuilder';
import CampaignDetails from './pages/CampaignDetails';
import Schedule from './pages/Schedule';
import { Conversations, Contacts, Reports, Logs, Settings } from './pages/Placeholders';
import ScheduleCampaign from './pages/ScheduleCampaign';

import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/flow-builder" element={<FlowBuilder />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/agents/builder" element={<AgentBuilder />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/details" element={<CampaignDetails />} />
          <Route path="/campaigns/new" element={<ScheduleCampaign />} />

          <Route path="/conversations" element={<Conversations />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/automate-contacts" element={<Contacts />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
