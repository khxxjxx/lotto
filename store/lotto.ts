import _ from 'lodash';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { message } from '@/components';

interface ILottoStore {
  savedLottos: Record<number, number[][]>;
  saveLottos: (round: number, saveLottos: number[][]) => void;
  removeLottos: (round: number, deleteLottos: number[][]) => void;
}

export const useLottoStore = create(
  persist<ILottoStore>(
    (set) => ({
      savedLottos: {},
      saveLottos: (round: number, newLottos) => {
        set((state) => {
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
        set((state) => {
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
