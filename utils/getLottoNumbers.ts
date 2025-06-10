'use client';

import _ from 'lodash';
import { useInactiveNumberStore } from '@/store/lotto';

const generateLottoNumbers = (nums: number[]) => {
  const newNumbers: number[] = [];

  while (newNumbers.length < 6) {
    const index = Math.floor(Math.random() * nums.length);
    const num = nums[index];

    if (num && !newNumbers.includes(num)) newNumbers.push(num);
    else if (nums.length - newNumbers.length <= 0) break;
  }

  return newNumbers.sort((a, b) => a - b);
};

const getLottoNumbers = () => {
  const lottoNumbers: number[][] = [];

  const inactiveNumbers = useInactiveNumberStore.getState().inactiveNumbers;
  const allNumbers = _.range(1, 46);

  const nums = _.xor(allNumbers, inactiveNumbers);

  while (lottoNumbers.length < 5) {
    const numbers = generateLottoNumbers(nums);
    const hasLottoNumbers = lottoNumbers.some(lottoNumber =>
      _.isEqual(lottoNumber, numbers),
    );

    if (!hasLottoNumbers) lottoNumbers.push(numbers);
    else if (nums.length <= 6) break;
  }

  return lottoNumbers;
};

export default getLottoNumbers;
