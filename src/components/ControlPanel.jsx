import { create } from "zustand"
const useCounterStore = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));


function Counter() {
  const { count, increase, reset } = useCounterStore();
  return (
    <div>
      <p>Clicked {count} times</p>
      <button onClick={increase}>+1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}