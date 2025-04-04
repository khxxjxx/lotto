import _ from 'lodash';
import { getNumberColor } from '@/utils';

const DrawInfo = (props: { result?: Result<DrawInfo> }) => {
  if (!props.result) {
    return (
      <div className='w-full max-w-2xl bg-gray-50 p-4 rounded-lg'>
        <div className='flex flex-col items-center gap-4 animate-pulse'>
          <div className='h-6 w-52 rounded bg-gray-200' />
          <div className='rounded bg-gray-200 grid grid-cols-[repeat(8,minmax(0,40px))] gap-2 w-fit'>
            <div className='aspect-square' />
          </div>
        </div>
      </div>
    );
  }

  const { success, data, message } = props.result;

  return (
    <div className='flex justify-center w-full max-w-2xl bg-gray-50 p-4 rounded-lg'>
      {success ? (
        <div className='flex flex-col gap-4'>
          <h3 className='text-l font-semibold text-center'>
            {data.round}회차 당첨 번호 ({data.date})
          </h3>

          <div className='flex justify-center items-center gap-2'>
            {_.isEmpty(data.numbers) ? (
              <span className='font-semibold text-gray-400'>
                아직 추첨전 입니다.
              </span>
            ) : (
              <div className='grid grid-cols-[repeat(8,minmax(0,40px))] gap-2 w-fit'>
                {data.numbers.map((number, index) => (
                  <div
                    key={index}
                    className={`${getNumberColor(
                      number,
                    )} aspect-square rounded-full flex items-center text-[14px] justify-center text-white font-bold`}
                  >
                    {number}
                  </div>
                ))}
                <div className='flex items-center justify-center text-xl'>
                  +
                </div>
                <div
                  className={`${getNumberColor(
                    data.bonusNumber,
                  )} aspect-square rounded-full flex items-center text-[14px] justify-center text-white font-bold border-2`}
                >
                  {data.bonusNumber}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <span className='font-semibold text-red-600'>{message}</span>
      )}
    </div>
  );
};

export default DrawInfo;
