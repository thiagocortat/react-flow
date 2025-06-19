import { NodeProps, Handle, Position } from '@xyflow/react';
import { JsonView, collapseAllNested, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { useExecutionStore } from '../../store';

export default function OutputNode({ id }: NodeProps) {
  const result = useExecutionStore((s) => s.results[id]);

  return (
    <div className="bg-white p-2 rounded shadow-md border text-xs w-60 max-h-60 overflow-auto">
      <JsonView data={result} shouldExpandNode={collapseAllNested} style={defaultStyles} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
}
