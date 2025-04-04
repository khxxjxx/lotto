'use client';

import _ from 'lodash';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';

import { useStore } from '@/hooks';
import { getDrawInfo } from './api/lotto';
import { useLottoStore } from '@/store/lotto';
import { generateLottoNumbers, getCurrentRound } from '@/utils';
import { Button, DrawInfo, LottoNumberList } from '@/components';

export default function LottoGenerator() {
  const currentRound = getCurrentRound();

  const { data, isLoading } = useQuery({
    queryKey: ['getDrawInfo', currentRound],
    queryFn: () => getDrawInfo(currentRound),
  });

  const [lottoNumbers, setLottoNumbers] = useState<number[][]>([]);
  const { saveLottos } = useStore(useLottoStore, (state) => state);

  function getLottoNumbers() {
    const lottoNumbers: number[][] = [];

    while (lottoNumbers.length < 5) {
      const numbers = generateLottoNumbers();
      const hasLottoNumbers = lottoNumbers.some((lottoNumber) =>
        _.isEqual(lottoNumber, numbers),
      );

      if (!hasLottoNumbers) lottoNumbers.push(numbers);
    }

    return lottoNumbers;
  }

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

      <LottoNumberList round={currentRound} lottoNumbers={lottoNumbers} />

      <div className='flex gap-4'>
        <Link href='/save'>
          <Button onClick={generateLottoNumbers}>저장된 번호 보기</Button>
        </Link>
        <Button
          variant='outlined'
          onClick={() => saveLottos(currentRound, lottoNumbers)}
        >
          전체 저장
        </Button>
      </div>
    </main>
  );
}
