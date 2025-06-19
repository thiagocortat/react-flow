import { Handle, NodeProps, Position } from 'react-flow-renderer';

export default function TaskNode({ data }: NodeProps) {
  return (
    <div className="bg-white p-2 rounded shadow-md border w-48">
      <h3 className="font-bold text-sm">{data.label}</h3>
      {data.description && <p className="text-xs mt-1">{data.description}</p>}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
