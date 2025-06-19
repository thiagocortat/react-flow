import { useState } from 'react';
import { FlowTemplate } from '../examples/flowTemplates';

interface SidebarProps {
  onAdd: (type: string) => void;
  onRun: () => void;
  onSave: () => void;
  onLoad: () => void;
  templates: FlowTemplate[];
  onLoadTemplate: (template: FlowTemplate) => void;
}

export default function Sidebar({
  onAdd,
  onRun,
  onSave,
  onLoad,
  templates,
  onLoadTemplate,
}: SidebarProps) {
  const [selected, setSelected] = useState(templates[0]?.id || '');

  const current = templates.find((t) => t.id === selected);

  return (
    <div className="w-48 p-2 bg-gray-200 space-y-2 text-sm overflow-y-auto">
      <button className="w-full bg-blue-500 text-white px-2 py-1" onClick={() => onAdd('apiRequest')}>
        Add API Request
      </button>
      <button className="w-full bg-blue-500 text-white px-2 py-1" onClick={() => onAdd('transform')}>
        Add Transform
      </button>
      <button className="w-full bg-blue-500 text-white px-2 py-1" onClick={() => onAdd('condition')}>
        Add Condition
      </button>
      <button className="w-full bg-blue-500 text-white px-2 py-1" onClick={() => onAdd('merge')}>
        Add Merge
      </button>
      <button className="w-full bg-blue-500 text-white px-2 py-1" onClick={() => onAdd('output')}>
        Add Output
      </button>
      <hr />
      <select
        className="w-full border px-1 py-1"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {templates.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      <button
        className="w-full bg-purple-600 text-white px-2 py-1"
        onClick={() => current && onLoadTemplate(current)}
      >
        Carregar exemplo
      </button>
      <hr />
      <button className="w-full bg-green-600 text-white px-2 py-1" onClick={onRun}>
        Executar fluxo
      </button>
      <button className="w-full bg-gray-600 text-white px-2 py-1" onClick={onSave}>
        Salvar
      </button>
      <button className="w-full bg-gray-600 text-white px-2 py-1" onClick={onLoad}>
        Carregar
      </button>
    </div>
  );
}
