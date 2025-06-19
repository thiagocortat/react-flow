import { NodeProps, Handle, Position, useReactFlow } from '@xyflow/react';
import { ChangeEvent } from 'react';

interface TransformData {
  code?: string;
}

export default function TransformNode({ id, data }: NodeProps) {
  const { setNodes } = useReactFlow();
  const d = data as TransformData;

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, code: value } } : node
      )
    );
  };

  return (
    <div className="bg-white p-2 rounded shadow-md border w-60 text-xs">
      <textarea
        className="border w-full"
        placeholder="data => ({})"
        value={d.code || ''}
        onChange={onChange}
        rows={4}
      />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
