import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import FlowBuilder from './pages/FlowBuilder';
import Agents from './pages/Agents';
import Campaigns from './pages/Campaigns';
import AgentBuilder from './pages/AgentBuilder';
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
          <Route path="/conversations" element={<Dashboard />} />
          <Route path="/contacts" element={<Dashboard />} />
          <Route path="/automate-contacts" element={<Dashboard />} />
          <Route path="/schedule" element={<Dashboard />} />
          <Route path="/reports" element={<Dashboard />} />
          <Route path="/logs" element={<Dashboard />} />
          <Route path="/settings" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
