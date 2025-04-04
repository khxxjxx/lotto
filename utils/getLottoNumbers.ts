import _ from 'lodash';

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

export default getLottoNumbers;
