const getRank = (matchCount: number, bonusMatch: boolean) => {
  if (matchCount === 6) return '1등';
  if (matchCount === 5 && bonusMatch) return '2등';
  if (matchCount === 5) return '3등';
  if (matchCount === 4) return '4등';
  if (matchCount === 3) return '5등';
  return '낙첨';
};

export default getRank;
