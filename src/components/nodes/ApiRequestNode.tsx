import { NodeProps, Handle, Position, useReactFlow } from '@xyflow/react';
import { ChangeEvent } from 'react';

interface ApiRequestData {
  method?: string;
  url?: string;
  headers?: string;
  body?: string;
}

export default function ApiRequestNode({ id, data }: NodeProps) {
  const { setNodes } = useReactFlow();
  const d = data as ApiRequestData;

  const onChange = (field: keyof ApiRequestData) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, [field]: value } } : node
      )
    );
  };

  return (
    <div className="bg-white p-2 rounded shadow-md border w-60 text-xs">
      <select
        className="border w-full mb-1"
        value={d.method || 'GET'}
        onChange={onChange('method')}
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>
      <input
        className="border w-full mb-1"
        placeholder="URL"
        value={d.url || ''}
        onChange={onChange('url')}
      />
      <textarea
        className="border w-full mb-1"
        placeholder="Headers JSON"
        value={d.headers || ''}
        onChange={onChange('headers')}
        rows={2}
      />
      <textarea
        className="border w-full"
        placeholder="Body JSON"
        value={d.body || ''}
        onChange={onChange('body')}
        rows={2}
      />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
