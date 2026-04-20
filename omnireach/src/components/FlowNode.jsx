import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import {
  Zap,
  MessageSquare,
  Clock,
  GitBranch,
  CheckCircle,
  CalendarDays,
  Phone,
  MessageCircle,
} from 'lucide-react';

const iconMap = {
  Zap,
  MessageSquare,
  Clock,
  GitBranch,
  CheckCircle,
  CalendarDays,
  Phone,
  MessageCircle,
};

function FlowNode({ data, selected }) {
  const Icon = iconMap[data.icon] || Zap;

  return (
    <div
      className={`custom-flow-node ${selected ? 'selected' : ''}`}
      style={data.borderColor ? { borderColor: data.borderColor } : {}}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="flow-handle"
      />

      <div className="custom-flow-node-body">
        {/* Node Type Header */}
        <div className="custom-flow-node-type">
          <div
            className="custom-flow-node-type-icon"
            style={{ backgroundColor: data.iconBg, color: data.iconColor }}
          >
            <Icon size={12} />
          </div>
          <span className="custom-flow-node-type-label">{data.nodeType}</span>
        </div>

        {/* Title & Subtitle */}
        <h4 className="custom-flow-node-title">{data.label}</h4>
        {data.subtitle && (
          <p
            className="custom-flow-node-subtitle"
            style={data.subtitle.startsWith('"') ? { fontStyle: 'italic' } : {}}
          >
            {data.subtitle}
          </p>
        )}

        {/* Tag */}
        {data.tag && (
          <span
            className="custom-flow-node-tag"
            style={{ backgroundColor: data.tag.bg, color: data.tag.color }}
          >
            {data.tag.label}
          </span>
        )}
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="flow-handle"
      />
    </div>
  );
}

export default memo(FlowNode);
