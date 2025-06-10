import _ from 'lodash';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { message } from '@/components';

interface IHydrationStore {
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

interface IGenerateLottoStore {
  lottoNumbers: number[][];
  setLottoNumbers: (lottoNumbers: number[][]) => void;
}

interface ISavedLottoStore {
  savedLottos: Record<number, number[][]>;
  saveLottos: (round: number, saveLottos: number[][]) => void;
  removeLottos: (round: number, deleteLottos: number[][]) => void;
}

interface IInactiveNumberStore {
  inactiveNumbers: number[];
  setInactiveNumbers: (inactiveNumbers: number | number[]) => void;
}

interface IActiveModalStore {
  activeModal?: string;
  setActiveModal: (activeModal?: string) => void;
}

export const useHydrationStore = create(
  persist<IHydrationStore>(
    set => ({
      _hasHydrated: false,
      setHasHydrated: state => set({ _hasHydrated: state }),
    }),
    {
      name: '_hasHydrated',
      onRehydrateStorage: state => () => state.setHasHydrated(true),
    },
  ),
);

export const useGenerateLottoStore = create(
  persist<IGenerateLottoStore>(
    set => ({
      lottoNumbers: [],
      setLottoNumbers: lottoNumbers => set({ lottoNumbers }),
    }),
    { name: 'lottoNumbers' },
  ),
);

export const useSavedLottoStore = create(
  persist<ISavedLottoStore>(
    set => ({
      savedLottos: {},
      saveLottos: (round: number, newLottos) => {
        set(state => {
          // 저장시엔 다음 회차꺼 저장
          const nextRound = round + 1;

          const savedLottos = state.savedLottos;
          const prevSavedLottoNumbers = savedLottos[nextRound] || [];

          const newSavedLottoNumbers = _.differenceWith(
            newLottos,
            prevSavedLottoNumbers,
            _.isEqual,
          );

          return {
            savedLottos: {
              ...savedLottos,
              [nextRound]: [...prevSavedLottoNumbers, ...newSavedLottoNumbers],
            },
          };
        });

        message.success('저장 완료');
      },

      removeLottos: (round: number, deleteLottos) => {
        set(state => {
          const savedLottos = state.savedLottos;
          const prevSavedLottoNumbers = savedLottos[round];

          const newSavedLottoNumbers = _.differenceWith(
            prevSavedLottoNumbers,
            deleteLottos,
            _.isEqual,
          );

          return {
            savedLottos: {
              ...savedLottos,
              [round]: newSavedLottoNumbers,
            },
          };
        });

        message.success('삭제 완료');
      },
    }),
    { name: 'savedLottos' },
  ),
);

export const useInactiveNumberStore = create(
  persist<IInactiveNumberStore>(
    set => ({
      inactiveNumbers: [],
      setInactiveNumbers: inactiveNumber =>
        set(state => {
          const inactiveNumbers = state.inactiveNumbers;

          if (_.isArray(inactiveNumber))
            return { inactiveNumbers: inactiveNumber };
          else
            return {
              inactiveNumbers: _.xor(inactiveNumbers, [inactiveNumber]),
            };
        }),
    }),
    { name: 'inactiveNumbers' },
  ),
);

export const useActiveModalStore = create<IActiveModalStore>(set => ({
  activeModal: undefined,
  setActiveModal: activeModal => set({ activeModal }),
}));
