import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  Connection,
  Edge,
  Node,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import AddTaskModal from './AddTaskModal';
import TaskNode from './TaskNode';
import { useFlowStore } from '../store';

let id = 0;
const getId = () => `task_${id++}`;

export default function TaskFlow() {
  const { nodes, edges, addNode, setEdges } = useFlowStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [nodesState, setNodesState, onNodesChange] = useNodesState(nodes);
  const [edgesState, setEdgesState, onEdgesChange] = useEdgesState(edges);

  const onConnect = useCallback(
    (connection: Edge | Connection) =>
      setEdgesState((eds) => addEdge(connection, eds)),
    [setEdgesState]
  );

  const handleAdd = (title: string, description: string) => {
    const newNode: Node = {
      id: getId(),
      type: 'task',
      data: { label: title, description },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
    };
    addNode(newNode);
    setNodesState((nds) => nds.concat(newNode));
  };

  return (
    <>
      <ReactFlow
        nodeTypes={{ task: TaskNode }}
        nodes={nodesState}
        edges={edgesState}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      <button
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setModalOpen(true)}
      >
        Adicionar Tarefa
      </button>
      <AddTaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAdd}
      />
    </>
  );
}
