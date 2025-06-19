import { useState } from 'react';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string, description: string) => void;
}

export default function AddTaskModal({ isOpen, onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded w-80">
        <h2 className="text-lg font-bold mb-2">Adicionar Tarefa</h2>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button className="px-3 py-1" onClick={onClose}>Cancelar</button>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => {
              onAdd(title, description);
              setTitle('');
              setDescription('');
              onClose();
            }}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
