'use server';

import { add, format } from 'date-fns';

interface LottoResponse {
  returnValue: 'success' | 'fail';
  drwNo: number; // 회차
  drwNoDate: string; // 추첨일
  drwtNo1: number; // 당첨번호 1
  drwtNo2: number; // 당첨번호 2
  drwtNo3: number; // 당첨번호 3
  drwtNo4: number; // 당첨번호 4
  drwtNo5: number; // 당첨번호 5
  drwtNo6: number; // 당첨번호 6
  bnusNo: number; // 보너스 번호
}

export const getDrawInfo = async (round: number): FetchReturn<DrawInfo> => {
  try {
    const response = await fetch(
      `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${round}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch lotto numbers');
    }

    const data: LottoResponse = await response.json();

    if (data.returnValue === 'fail') {
      const startDate = new Date('2002-12-07'); // 로또 1회차 시작일
      const drwNoDate = add(startDate, { weeks: Number(round) - 1 });

      return {
        success: true,
        data: {
          numbers: [],
          bonusNumber: 0,
          round,
          date: format(drwNoDate, 'yyyy-MM-dd'),
        },
      };
    }

    const winningNumbers = [
      data.drwtNo1,
      data.drwtNo2,
      data.drwtNo3,
      data.drwtNo4,
      data.drwtNo5,
      data.drwtNo6,
    ].sort((a, b) => a - b);

    return {
      success: true,
      data: {
        numbers: winningNumbers,
        bonusNumber: data.bnusNo,
        round: data.drwNo,
        date: data.drwNoDate,
      },
    };
  } catch {
    return { success: false, message: '당첨번호를 가져오는데 실패했습니다.' };
  }
};
