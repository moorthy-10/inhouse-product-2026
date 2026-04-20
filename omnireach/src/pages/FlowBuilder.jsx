import { useState, useCallback, useRef, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import FlowNode from '../components/FlowNode';
import {
  Search,
  Zap,
  MessageSquare,
  Phone,
  GitBranch,
  Clock,
  CheckCircle,
  CalendarDays,
  LayoutGrid,
  MessageCircle,
  Users,
  Sun,
  X,
  Home,
  GitMerge,
  GripVertical,
} from 'lucide-react';
import './FlowBuilder.css';

/* ============================================
   NODE LIBRARY (Drag source)
   ============================================ */
const nodeLibrary = [
  {
    section: 'Triggers',
    items: [
      { name: 'Inbound call', desc: 'Voice trigger', icon: 'Zap', iconColor: '#EAB308', iconBg: 'rgba(234,179,8,0.2)', nodeType: 'Trigger' },
      { name: 'SMS received', desc: 'SMS trigger', icon: 'MessageSquare', iconColor: '#3B82F6', iconBg: 'rgba(59,130,246,0.2)', nodeType: 'Trigger' },
      { name: 'WA message', desc: 'WhatsApp trigger', icon: 'MessageCircle', iconColor: '#22C55E', iconBg: 'rgba(34,197,94,0.2)', nodeType: 'Trigger' },
    ],
  },
  {
    section: 'Messages',
    items: [
      { name: 'Play message', desc: 'TTS or audio', icon: 'Phone', iconColor: '#84CC16', iconBg: 'rgba(132,204,22,0.2)', nodeType: 'Message' },
      { name: 'Send SMS', desc: 'Outbound text', icon: 'MessageSquare', iconColor: '#3B82F6', iconBg: 'rgba(59,130,246,0.2)', nodeType: 'Message' },
    ],
  },
  {
    section: 'Logic',
    items: [
      { name: 'Condition', desc: 'Branch by value', icon: 'GitBranch', iconColor: '#A855F7', iconBg: 'rgba(168,85,247,0.2)', nodeType: 'Condition' },
    ],
  },
  {
    section: 'Actions',
    items: [
      { name: 'Confirm booking', desc: 'Update CRM + SMS', icon: 'CheckCircle', iconColor: '#4ADE80', iconBg: 'rgba(74,222,128,0.2)', nodeType: 'Action' },
      { name: 'Book new slot', desc: 'Send WA date picker', icon: 'CalendarDays', iconColor: '#C084FC', iconBg: 'rgba(168,85,247,0.2)', nodeType: 'Action' },
    ],
  },
];

/* ============================================
   INITIAL NODES & EDGES
   ============================================ */
const initialNodes = [];

const edgeDefaults = {
  type: 'smoothstep',
  animated: true,
  style: { stroke: '#444', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#666', width: 16, height: 16 },
};

const initialEdges = [];

/* ============================================
   ICON MAP (for library panel rendering)
   ============================================ */
const lucideIconMap = {
  Zap, MessageSquare, Phone, GitBranch, Clock, CheckCircle, CalendarDays, MessageCircle,
};

/* ============================================
   COMPONENT
   ============================================ */
let nodeIdCounter = 10;

export default function FlowBuilder() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [channels, setChannels] = useState({ voice: true, sms: true, whatsapp: false });
  const [searchQuery, setSearchQuery] = useState('');
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const nodeTypes = useMemo(() => ({ flowNode: FlowNode }), []);

  /* Connect two nodes */
  const onConnect = useCallback((params) => {
    setEdges((eds) =>
      addEdge({
        ...params,
        ...edgeDefaults,
      }, eds)
    );
  }, [setEdges]);

  /* Click a node → show settings */
  const onNodeClick = useCallback((_, node) => {
    setSelectedNode(node);
  }, []);

  /* Click canvas → deselect */
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  /* Drag from library → start */
  const onDragStart = (event, nodeData) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeData));
    event.dataTransfer.effectAllowed = 'move';
  };

  /* Drop on canvas → create node */
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const rawData = event.dataTransfer.getData('application/reactflow');
      if (!rawData) return;

      const nodeData = JSON.parse(rawData);
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

      const position = {
        x: event.clientX - reactFlowBounds.left - 112,
        y: event.clientY - reactFlowBounds.top - 40,
      };

      nodeIdCounter++;
      const newNode = {
        id: `node-${nodeIdCounter}`,
        type: 'flowNode',
        position,
        data: {
          label: nodeData.name,
          nodeType: nodeData.nodeType,
          subtitle: nodeData.desc,
          icon: nodeData.icon,
          iconColor: nodeData.iconColor,
          iconBg: nodeData.iconBg,
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  /* Filter library */
  const filteredLibrary = nodeLibrary
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0);

  /* Selected node data for settings */
  const selectedData = selectedNode?.data;

  return (
    <div className="flow-layout">

      {/* Node Library (drag source) */}
      <aside className={`node-library ${isLibraryOpen ? 'open' : ''}`}>
        <div className="node-library-header">
          <h2 className="node-library-title">Node library</h2>
          <div className="node-search">
            <Search className="node-search-icon" size={14} />
            <input
              type="text"
              placeholder="Search nodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="node-library-content">
          {filteredLibrary.map((section, si) => (
            <div key={si} style={{ marginBottom: 24 }}>
              <h3 className="node-section-title">{section.section}</h3>
              {section.items.map((item, ii) => {
                const Icon = lucideIconMap[item.icon] || Zap;
                return (
                  <div
                    key={ii}
                    className="node-item draggable-node"
                    draggable
                    onDragStart={(e) => onDragStart(e, item)}
                  >
                    <div className="node-item-icon" style={{ backgroundColor: item.iconBg, color: item.iconColor }}>
                      <Icon size={14} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p className="node-item-name">{item.name}</p>
                      <p className="node-item-desc">{item.desc}</p>
                    </div>
                    <GripVertical size={14} className="drag-grip" />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </aside>

      {/* ReactFlow Canvas */}
      <main className="flow-canvas" ref={reactFlowWrapper}>
        <header className="flow-canvas-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button 
              className="mobile-menu-btn" 
              onClick={() => setIsLibraryOpen(!isLibraryOpen)}
              style={{ display: 'flex' }}
            >
              <LayoutGrid size={20} />
            </button>
            <div className="flow-breadcrumb">
              <span className="hidden-mobile">Flows / </span>
              <span>Q1 Appointment reminder</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button className="btn-secondary hidden-mobile"><Home size={14} /><span>Test</span></button>
            <button className="btn-secondary hidden-mobile"><GitMerge size={14} /><span>Version</span></button>
            <button className="btn-primary" style={{ boxShadow: '0 4px 14px rgba(201,255,31,0.2)' }}>
              <span className="hidden-mobile">Publish flow</span>
              <span className="visible-mobile">Publish</span>
            </button>
          </div>
        </header>

        <div style={{ flex: 1 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.3 }}
            defaultEdgeOptions={edgeDefaults}
            connectionLineStyle={{ stroke: '#C9FF1F', strokeWidth: 2 }}
            connectionLineType="smoothstep"
            snapToGrid
            snapGrid={[16, 16]}
            proOptions={{ hideAttribution: true }}
            colorMode="dark"
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              color="#2a2a2a"
            />
            <Controls
              showInteractive={false}
              style={{ bottom: 24, left: 24 }}
            />
            <MiniMap
              nodeColor={() => '#C9FF1F'}
              maskColor="rgba(0,0,0,0.7)"
              style={{ bottom: 24, right: 24, background: '#1a1a1a', border: '1px solid #333' }}
            />
          </ReactFlow>
        </div>
      </main>

      {/* Settings Panel - Only visible when a node is selected */}
      {selectedData && (
        <aside className={`settings-panel open`}>
          <div className="settings-header">
            <div className="settings-header-info">
              <div className="settings-dot" />
              <h3 style={{ fontWeight: 700, fontFamily: 'Manrope' }}>{selectedData.label}</h3>
            </div>
            <button className="icon-btn" onClick={() => setSelectedNode(null)}><X size={18} /></button>
          </div>

          <div className="settings-body">
            {/* Node Settings */}
            <div className="settings-section">
              <h4 className="settings-section-title">Node Settings</h4>
              <div className="settings-input-group">
                <label className="settings-label">Node label</label>
                <input className="settings-input" type="text" defaultValue={selectedData.label} />
              </div>
              <div className="settings-input-group">
                <label className="settings-label">Node type</label>
                <input className="settings-input" type="text" defaultValue={selectedData.nodeType} readOnly style={{ opacity: 0.6 }} />
              </div>
              {selectedData.subtitle && (
                <div className="settings-input-group">
                  <label className="settings-label">Description</label>
                  <input className="settings-input" type="text" defaultValue={selectedData.subtitle} />
                </div>
              )}
            </div>

            {/* Language */}
            <div className="settings-section">
              <h4 className="settings-section-title">Language</h4>
              <div className="lang-tabs">
                <button className="lang-tab active">Tamil</button>
                <button className="lang-tab">English</button>
                <button className="lang-tab">Both</button>
              </div>
            </div>

            {/* Channels */}
            <div className="settings-section">
              <h4 className="settings-section-title">Channels</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { name: 'Voice', key: 'voice', dotColor: 'var(--neon-lime)' },
                  { name: 'SMS', key: 'sms', dotColor: 'var(--accent-blue)' },
                  { name: 'WhatsApp', key: 'whatsapp', dotColor: 'rgba(34,197,94,0.5)' },
                ].map((ch) => (
                  <div key={ch.key} className="toggle-container">
                    <div className="toggle-info" style={!channels[ch.key] ? { color: 'var(--text-dim)' } : {}}>
                      <div className="toggle-dot" style={{ backgroundColor: ch.dotColor }} />
                      <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{ch.name}</span>
                    </div>
                    <button
                      className={`toggle-switch ${channels[ch.key] ? 'on' : ''}`}
                      onClick={() => setChannels(prev => ({ ...prev, [ch.key]: !prev[ch.key] }))}
                    >
                      <div className="toggle-switch-knob" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Retry Logic */}
            <div className="settings-section">
              <h4 className="settings-section-title">Retry Logic</h4>
              <div className="settings-input-group">
                <label className="settings-label">Max attempts</label>
                <input className="settings-input" type="text" defaultValue="3 attempts" />
              </div>
              <div className="settings-input-group">
                <label className="settings-label">Retry interval</label>
                <input className="settings-input" type="text" defaultValue="30 minutes" />
              </div>
            </div>

            {/* Conditions */}
            <div className="settings-section">
              <h4 className="settings-section-title">Conditions on this node</h4>
              <div>
                <div className="condition-row">
                  <span className="condition-label">Time window</span>
                  <span className="condition-value">9am – 6pm</span>
                </div>
                <div className="condition-row">
                  <span className="condition-label">DND check</span>
                  <span className="condition-value">Enabled</span>
                </div>
                <div className="condition-row">
                  <span className="condition-label">Fallback</span>
                  <span className="condition-value">Send SMS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="settings-footer">
            <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '12px 16px' }}>Save node</button>
            <button className="btn-danger">Delete</button>
          </div>
        </aside>
      )}
    </div>
  );
}
