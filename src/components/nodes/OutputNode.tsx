import { NodeProps, Handle, Position } from '@xyflow/react';
import { useExecutionStore } from '../../store';

export default function OutputNode({ id }: NodeProps) {
  const result = useExecutionStore((s) => s.results[id]);

  return (
    <div className="bg-white p-2 rounded shadow-md border w-48 text-xs">
      <div className="text-[10px] break-all">{JSON.stringify(result)}</div>
      <Handle type="target" position={Position.Top} />
    </div>
  );
}
