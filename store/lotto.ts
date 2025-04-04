import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ILottoStore {
  savedLottos: Record<number, number[][]>;
  setSavedLottos: (savedLottos: Record<number, number[][]>) => void;
}

export const useLottoStore = create(
  persist<ILottoStore>(
    (set) => ({
      savedLottos: {},
      setSavedLottos: (newLottos) => set({ savedLottos: newLottos }),
    }),
    { name: 'savedLottos' },
  ),
);
