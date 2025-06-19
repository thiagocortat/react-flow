import { Handle, NodeProps, Position } from '@xyflow/react';

interface TaskNodeData {
  label: string;
  description?: string;
}

export default function TaskNode({ data }: NodeProps<TaskNodeData>) {
  return (
    <div className="bg-white p-2 rounded shadow-md border w-48">
      <h3 className="font-bold text-sm">{data.label}</h3>
      {data.description && <p className="text-xs mt-1">{data.description}</p>}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
