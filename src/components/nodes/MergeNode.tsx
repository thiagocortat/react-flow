import { NodeProps, Handle, Position } from '@xyflow/react';

export default function MergeNode({ data }: NodeProps) {
  return (
    <div className="bg-white p-2 rounded shadow-md border w-40 text-xs text-center">
      Merge
      <Handle type="target" position={Position.Left} />
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Right} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
