import { NodeProps, Handle, Position } from '@xyflow/react';
import { useExecutionStore } from '../../store';

export default function OutputNode({ id }: NodeProps) {
  const result = useExecutionStore((s) => s.results[id]);
  const formatted = JSON.stringify(result, null, 2);

  return (
    <div className="bg-white p-2 rounded shadow-md border text-xs max-w-xs max-h-40 w-fit overflow-auto">
      <pre className="text-[10px] whitespace-pre-wrap break-words">
        {formatted}
      </pre>
      <Handle type="target" position={Position.Top} />
    </div>
  );
}
