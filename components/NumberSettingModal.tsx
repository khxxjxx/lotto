'use client';

import _ from 'lodash';
import { useStore } from '@/hooks';
import { getNumberColor } from '@/utils';
import { useInactiveNumberStore } from '@/store/lotto';

import Modal from './Modal';
import Button from './Button';
import { message } from './Message';
import { useMemo } from 'react';

const NumberSettingModal = () => {
  const inactiveNumbers = useStore(
    useInactiveNumberStore,
    state => state.inactiveNumbers,
  );

  const { setInactiveNumbers } = useInactiveNumberStore();

  function getMatchColor(number: number) {
    if (inactiveNumbers.includes(number)) return 'opacity-30';

    return '';
  }

  const allNumbers = useMemo(() => _.range(1, 46), []);
  const activeNumberLength = 45 - inactiveNumbers.length;

  return (
    <Modal modalId='numberSetting' title='생성 숫자 설정'>
      <div className='flex flex-col gap-2'>
        {activeNumberLength < 6 && (
          <span className='font-semibold text-red-600 text-center'>
            최소 6개의 숫자가 선택되어야 합니다.
          </span>
        )}
        <div className='grid grid-cols-[repeat(7,minmax(0,36px))] gap-2 w-fit overflow-auto py-2 px-4'>
          {allNumbers.map(number => (
            <div
              key={number}
              className={`${getNumberColor(number)} ${getMatchColor(
                number,
              )} aspect-square w-full h-full rounded-full flex items-center justify-center text-white font-bold cursor-pointer`}
              onClick={() => {
                const isRemoveAction = !inactiveNumbers.includes(number);

                if (isRemoveAction && activeNumberLength <= 6) {
                  return message.error(
                    '최소 6개의 숫자가 선택되어야 합니다.',
                    1800,
                  );
                }
                setInactiveNumbers(number);
              }}
            >
              {number}
            </div>
          ))}
        </div>
        <div className='flex gap-4 items-center px-4 pt-2'>
          <Button size='sm' onClick={() => setInactiveNumbers([])}>
            전체 선택
          </Button>
          <Button
            size='sm'
            variant='outlined'
            onClick={() => setInactiveNumbers(allNumbers)}
          >
            전체 해제
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NumberSettingModal;
