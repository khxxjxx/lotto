'use client';

import _ from 'lodash';
import { useQuery } from 'react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useStore } from '@/hooks';
import { getDrawInfo } from '../api/lotto';
import { useHydrationStore, useSavedLottoStore } from '@/store/lotto';
import { DrawInfo, Loading, LottoNumberList } from '@/components';

const Page = () => {
  const router = useRouter();

  const [round, setRound] = useState<number>(0);
  const [savedRounds, setSavedRounds] = useState<number[]>([]);

  const _hasHydrated = useStore(useHydrationStore, state => state._hasHydrated);
  const savedLottos = useStore(useSavedLottoStore, state => state.savedLottos);

  const hasSavedNumbers = Boolean(round) && !_.isEmpty(savedLottos[round]);

  const { data } = useQuery({
    queryKey: ['getDrawInfo', round],
    queryFn: () => getDrawInfo(round),
    enabled: hasSavedNumbers,
  });

  useEffect(() => {
    const savedRounds = Object.keys(savedLottos)
      .map(Number)
      .sort((a, b) => b - a);

    setRound(savedRounds[0]);
    setSavedRounds(savedRounds);
  }, [savedLottos]);

  if (!_hasHydrated) return <Loading />;

  const drawInfo = data?.data?.bonusNumber ? data.data : undefined;

  return (
    <main className='relative flex flex-col items-center p-8 min-h-dvh'>
      <div
        className='flex items-center justify-center w-4 h-4 absolute left-8 top-10 cursor-pointer'
        onClick={router.back}
      >
        <svg
          width='9'
          height='16'
          viewBox='0 0 9 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M8 1L1 8L8 15'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
        </svg>
      </div>
      <h1 className='text-3xl font-bold mb-8'>저장된 로또 번호</h1>

      {hasSavedNumbers ? (
        <>
          <div className='flex gap-2 ml-auto mb-4 items-center'>
            <label htmlFor='round'>회차:</label>
            <select
              id='round'
              className='border rounded-md px-1 outline-0'
              onChange={e => setRound(Number(e.target.value))}
            >
              {savedRounds.map(round => (
                <option key={round} value={String(round)}>
                  {String(round)}
                </option>
              ))}
            </select>
          </div>

          <DrawInfo result={data} />
          <LottoNumberList
            type='remove'
            round={round}
            drawInfo={drawInfo}
            lottoNumbers={savedLottos[round]}
          />
        </>
      ) : (
        <span>저장된 번호가 없습니다.</span>
      )}
    </main>
  );
};

export default Page;
