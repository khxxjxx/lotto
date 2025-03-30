const getCurrentRound = () => {
  const startDate = new Date('2002-12-07'); // 로또 1회차 시작일
  const today = new Date();
  const diffWeeks = Math.floor(
    (today.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000),
  );
  const currentRound = diffWeeks + 1;

  return currentRound;
};

export default getCurrentRound;
