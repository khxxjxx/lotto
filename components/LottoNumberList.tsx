import _ from 'lodash';
import { useStore } from '@/hooks';
import { getNumberColor } from '@/utils';
import { useSavedLottoStore } from '@/store/lotto';
import Button from './Button';

const LottoNumberList = (props: {
  type?: 'save' | 'remove';
  round: number;
  drawInfo?: DrawInfo;
  lottoNumbers: number[][];
}) => {
  const { type = 'save', round, drawInfo, lottoNumbers = [] } = props;
  const isSaveType = type === 'save';

  const savedLottos = useStore(useSavedLottoStore, state => state.savedLottos);

  const { saveLottos, removeLottos } = useSavedLottoStore();

  const buttonHandler = isSaveType ? saveLottos : removeLottos;

  function getRanking(numbers: number[]) {
    if (!drawInfo) return '';

    const count = _.intersection(drawInfo.numbers, numbers).length;

    switch (count) {
      case 6:
        return '1등';
      case 5:
        return numbers.includes(drawInfo.bonusNumber) ? '2등' : '3등';
      case 4:
        return '4등';
      case 3:
        return '5등';
      default:
        return '낙첨';
    }
  }

  function getMatchColor(number: number) {
    if (!drawInfo) return '';

    if (drawInfo.numbers.includes(number)) return '';
    if (drawInfo.bonusNumber === number) return '';

    return 'opacity-30';
  }

  return (
    <div className='flex flex-col gap-8 py-8'>
      {lottoNumbers.map((numbers, index) => (
        <div key={index} className='flex gap-6 items-center'>
          {drawInfo ? (
            <span className='text-center font-semibold w-8'>
              {getRanking(numbers)}
            </span>
          ) : (
            ''
          )}
          <div className='grid grid-cols-[repeat(6,minmax(0,48px))] gap-2 w-fit'>
            {numbers.map(number => (
              <div
                key={number}
                className={`${getNumberColor(number)} ${getMatchColor(
                  number,
                )} aspect-square w-full h-full rounded-full flex items-center justify-center text-white font-bold`}
              >
                {number}
              </div>
            ))}
          </div>

          <Button
            width='auto'
            variant='outlined'
            size='sm'
            disabled={
              isSaveType &&
              savedLottos[round + 1]?.some(lottos => _.isEqual(lottos, numbers))
            }
            onClick={() => buttonHandler(round, [numbers])}
          >
            {isSaveType ? '저장' : '삭제'}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default LottoNumberList;
