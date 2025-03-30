import { NextResponse } from 'next/server';

interface LottoResponse {
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

export async function GET() {
  try {
    // 최신 회차 조회를 위해 현재 날짜 기준으로 회차 계산
    const startDate = new Date('2002-12-07'); // 로또 1회차 시작일
    const today = new Date();
    const diffWeeks = Math.floor(
      (today.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000),
    );
    const currentRound = diffWeeks + 1;

    const response = await fetch(
      `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${currentRound}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch lotto numbers');
    }

    const data: LottoResponse = await response.json();

    // 당첨번호 배열로 변환
    const winningNumbers = [
      data.drwtNo1,
      data.drwtNo2,
      data.drwtNo3,
      data.drwtNo4,
      data.drwtNo5,
      data.drwtNo6,
    ].sort((a, b) => a - b);

    return NextResponse.json({
      numbers: winningNumbers,
      bonusNumber: data.bnusNo,
      round: data.drwNo,
      date: data.drwNoDate,
    });
  } catch {
    return NextResponse.json(
      { error: '당첨번호를 가져오는데 실패했습니다.' },
      { status: 500 },
    );
  }
}
