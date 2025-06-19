import { create } from 'zustand';
interface ExecutionState {
  results: Record<string, any>;
  setResult: (id: string, data: any) => void;
  resetResults: () => void;
}

export const useExecutionStore = create<ExecutionState>((set) => ({
  results: {},
  setResult: (id, data) =>
    set((state) => ({ results: { ...state.results, [id]: data } })),
  resetResults: () => set({ results: {} }),
}));
