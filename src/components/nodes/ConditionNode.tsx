import { NodeProps, Handle, Position, useReactFlow } from '@xyflow/react';
import { ChangeEvent } from 'react';

interface ConditionData {
  expression?: string;
}

export default function ConditionNode({ id, data }: NodeProps) {
  const { setNodes } = useReactFlow();
  const d = data as ConditionData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, expression: value } } : node
      )
    );
  };

  return (
    <div className="bg-white p-2 rounded shadow-md border w-56 text-xs">
      <input
        className="border w-full"
        placeholder="data.status === 200"
        value={d.expression || ''}
        onChange={onChange}
      />
      <div className="flex justify-between text-[10px] mt-1">
        <span>true</span>
        <span>false</span>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} id="true" style={{ left: 10 }} />
      <Handle type="source" position={Position.Bottom} id="false" style={{ left: '90%' }} />
    </div>
  );
}
