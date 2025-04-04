const getCurrentRound = () => {
  const startDate = new Date('2002-12-07'); // 로또 1회차 시작일
  const today = new Date();
  const diffWeeks = Math.floor(
    (today.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000),
  );

  const dayOfWeek = today.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
  const currentTime = today.getHours() * 60 + today.getMinutes(); // 현재 시간을 분 단위로 계산 (0~1439)
  const saturdayEveningTime = 20 * 60; // 토요일 8시 (20:00) = 1200분

  // 토요일 8시 이전인지 확인
  const isBeforeTheDraw = dayOfWeek === 6 && currentTime < saturdayEveningTime;

  // 토요일 8시 이전이면 이전 주 회차로 처리하고 아니면 다음 회차
  const additionalRound = isBeforeTheDraw ? 0 : 1;
  const currentRound = diffWeeks + additionalRound;
  console.log({ today });
  return currentRound;
};

export default getCurrentRound;
