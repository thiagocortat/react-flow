import { create } from 'zustand';
import { Edge, Node } from '@xyflow/react';

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  addNode: (node: Node) => void;
  setEdges: (edges: Edge[]) => void;
}

export const useFlowStore = create<FlowState>((set) => ({
  nodes: [],
  edges: [],
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  setEdges: (edges) => set({ edges }),
}));
