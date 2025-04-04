'use client';

import _ from 'lodash';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';

import { useStore } from '@/hooks';
import { getDrawInfo } from './api/lotto';
import { useLottoStore } from '@/store/lotto';
import { generateLottoNumbers, getCurrentRound, getNumberColor } from '@/utils';
import { Button } from '@/components';

export default function LottoGenerator() {
  const currentRound = getCurrentRound();

  const { data, isLoading } = useQuery({
    queryKey: ['getDrawInfo', currentRound],
    queryFn: () => getDrawInfo(currentRound),
  });

  const [lottoNumbers, setLottoNumbers] = useState<number[][]>([]);
  const { savedLottos, setSavedLottos } = useStore(
    useLottoStore,
    (state) => state,
  );

  const saveLottoNumbers = (round: number, lottoNumbers: number[][]) => {
    const prevSavedLottoNumbers = savedLottos[round];

    if (!prevSavedLottoNumbers)
      return setSavedLottos({ [round]: lottoNumbers });

    const newSavedLottoNumbers = _.differenceWith(
      lottoNumbers,
      prevSavedLottoNumbers,
      _.isEqual,
    );

    setSavedLottos({
      [round]: [...prevSavedLottoNumbers, ...newSavedLottoNumbers],
    });
  };

  const getLottoNumbers = () => {
    const lottoNumbers: number[][] = [];

    while (lottoNumbers.length < 5) {
      const numbers = generateLottoNumbers();
      const hasLottoNumbers = lottoNumbers.some((lottoNumber) =>
        _.isEqual(lottoNumber, numbers),
      );

      if (!hasLottoNumbers) lottoNumbers.push(numbers);
    }

    return lottoNumbers;
  };

  useEffect(() => {
    setLottoNumbers(getLottoNumbers());
  }, []);

  if (isLoading)
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='text-xl'>로딩 중...</div>
      </div>
    );

  return (
    <main className='flex flex-col items-center p-8 min-h-screen'>
      <h1 className='text-3xl font-bold mb-8'>퇴사 기원 로또</h1>

      {data && <DrawInfo {...data} />}

      <div className='flex flex-col gap-8 py-8'>
        {lottoNumbers.map((numbers, index) => (
          <div key={index} className='flex gap-6 items-center'>
            <div className='grid grid-cols-[repeat(6,minmax(0,48px))] gap-2 w-fit'>
              {numbers.map((number) => (
                <div
                  key={number}
                  className={`aspect-square w-full h-full ${getNumberColor(
                    number,
                  )} rounded-full flex items-center justify-center text-white font-bold`}
                >
                  {number}
                </div>
              ))}
            </div>

            <Button
              width='auto'
              variant='outlined'
              size='sm'
              onClick={() => saveLottoNumbers(currentRound, [numbers])}
            >
              저장
            </Button>
          </div>
        ))}
      </div>

      <div className='flex gap-4'>
        <Link href='/save'>
          <Button onClick={generateLottoNumbers}>저장된 번호 보기</Button>
        </Link>
        <Button
          variant='outlined'
          onClick={() => saveLottoNumbers(currentRound, lottoNumbers)}
        >
          전체 저장
        </Button>
      </div>
    </main>
  );
}

const DrawInfo = (props: Result<DrawInfo>) => {
  const { success, data, message } = props;

  return (
    <div className='flex justify-center w-full max-w-2xl bg-gray-50 p-4 rounded-lg'>
      {success ? (
        <div className='flex flex-col gap-4'>
          <h3 className='text-l font-semibold text-center'>
            {data.round}회차 당첨 번호 ({data.date})
          </h3>

          <div className='flex justify-center items-center gap-2'>
            {_.isEmpty(data.numbers) ? (
              <span>아직 추첨전 입니다.</span>
            ) : (
              <div className='grid grid-cols-[repeat(8,minmax(0,40px))] gap-2 w-fit'>
                {data.numbers.map((number, index) => (
                  <div
                    key={index}
                    className={`aspect-square ${getNumberColor(
                      number,
                    )} rounded-full flex items-center text-[14px] justify-center text-white font-bold`}
                  >
                    {number}
                  </div>
                ))}
                <div className='flex items-center justify-center text-xl'>
                  +
                </div>
                <div
                  className={`aspect-square ${getNumberColor(
                    data.bonusNumber,
                  )} rounded-full flex items-center text-[14px] justify-center text-white font-bold border-2`}
                >
                  {data.bonusNumber}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <span>{message}</span>
      )}
    </div>
  );
};
