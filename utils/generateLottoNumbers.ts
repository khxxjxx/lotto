const generateLottoNumbers = () => {
  const newNumbers: number[] = [];

  while (newNumbers.length < 6) {
    const num = Math.floor(Math.random() * 45) + 1;
    if (!newNumbers.includes(num)) {
      newNumbers.push(num);
    }
  }

  return newNumbers.sort((a, b) => a - b);
};

export default generateLottoNumbers;
