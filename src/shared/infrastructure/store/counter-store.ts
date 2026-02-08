import { create } from 'zustand';

/**
 * Counter Store - Example Zustand Store
 * 
 * Location: common/infrastructure/store
 * 
 * Why infrastructure layer?
 * - Zustand is an external dependency (library)
 * - State management is an infrastructure concern
 * - Domain layer should remain pure (no external dependencies)
 * - Presentation layer consumes this via hooks
 */

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (count: number) => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  setCount: (count: number) => set({ count }),
}));
