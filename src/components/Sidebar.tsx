interface SidebarProps {
  onAdd: (type: string) => void;
  onRun: () => void;
  onSave: () => void;
  onLoad: () => void;
}

export default function Sidebar({ onAdd, onRun, onSave, onLoad }: SidebarProps) {
  return (
    <div className="w-48 p-2 bg-gray-200 space-y-2 text-sm">
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
