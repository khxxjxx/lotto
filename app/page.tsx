'use client';

import { generateLottoNumbers, getNumberColor } from '@/utils';
import _ from 'lodash';
import { useState, useEffect } from 'react';

interface WinningInfo {
  numbers: number[];
  bonusNumber: number;
  round: number;
  date: string;
}

export default function LottoGenerator() {
  const [winningInfo, setWinningInfo] = useState<WinningInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [lottoNumbers, setLottoNumbers] = useState<number[][]>([]);

  useEffect(() => {
    fetchWinningNumbers();
    setLottoNumbers(getLottoNumbers());
  }, []);

  const fetchWinningNumbers = async () => {
    try {
      const response = await fetch('/api/lotto');
      if (!response.ok) throw new Error('당첨번호 조회에 실패했습니다');
      const data = await response.json();
      setWinningInfo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
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

  if (loading)
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='text-xl'>로딩 중...</div>
      </div>
    );

  if (error)
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='text-xl text-red-500'>{error}</div>
      </div>
    );

  return (
    <main className='flex flex-col items-center p-8 min-h-screen'>
      <h1 className='text-3xl font-bold mb-8'>퇴사 기원 로또</h1>

      {winningInfo && (
        <div className='w-full max-w-2xl bg-gray-50 p-4 rounded-lg mb-8'>
          <h3 className='text-l font-semibold text-center mb-4'>
            {winningInfo.round}회차 당첨 번호 ({winningInfo.date})
          </h3>
          <div className='flex justify-center items-center gap-2'>
            {winningInfo.numbers.map((number, index) => (
              <div
                key={index}
                className={`w-7 h-7 ${getNumberColor(
                  number,
                )} rounded-full flex items-center text-[12px] justify-center text-white font-bold`}
              >
                {number}
              </div>
            ))}
            <div className='mx-2 text-xl'>+</div>
            <div
              className={`w-7 h-7 ${getNumberColor(
                winningInfo.bonusNumber,
              )} rounded-full flex items-center text-[12px] justify-center text-white font-bold border-2`}
            >
              {winningInfo.bonusNumber}
            </div>
          </div>
        </div>
      )}

      {lottoNumbers.map((numbers, index) => (
        <div
          key={index}
          className='flex justify-center gap-2 mb-8 items-center'
        >
          {numbers.map((number) => (
            <div
              key={number}
              className={`w-12 h-12 ${getNumberColor(
                number,
              )} rounded-full flex items-center justify-center text-white font-bold`}
            >
              {number}
            </div>
          ))}

          {/* <Button className='ml-4' width='auto' variant='outlined' size='sm'>
            저장
          </Button> */}
        </div>
      ))}

      {/* <div className='flex gap-4 mb-8'>
        <Link href='/save'>
          <Button onClick={generateLottoNumbers}>저장된 번호 보기</Button>
        </Link>
        <Button variant='outlined' onClick={saveNumbers}>
          전체 저장
        </Button>
      </div> */}
    </main>
  );
}
