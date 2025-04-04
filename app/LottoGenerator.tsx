'use client';

import _ from 'lodash';
import Link from 'next/link';
import { useEffect } from 'react';

import { useStore } from '@/hooks';
import { getLottoNumbers } from '@/utils';
import {
  useGenerateLottoStore,
  useHydrationStore,
  useSavedLottoStore,
} from '@/store/lotto';
import { Button, DrawInfo, Loading, LottoNumberList } from '@/components';

interface LottoGeneratorProps {
  round: number;
  drawInfo: Result<DrawInfo>;
}

const LottoGenerator = (props: LottoGeneratorProps) => {
  const { round, drawInfo } = props;

  const _hasHydrated = useStore(useHydrationStore, state => state._hasHydrated);
  const lottoNumbers = useStore(
    useGenerateLottoStore,
    state => state.lottoNumbers,
  );

  const { saveLottos } = useSavedLottoStore();
  const { setLottoNumbers } = useGenerateLottoStore();

  useEffect(() => {
    if (_hasHydrated && _.isEmpty(lottoNumbers)) {
      setLottoNumbers(getLottoNumbers());
    }
  }, [_hasHydrated, lottoNumbers, setLottoNumbers]);

  if (_.isEmpty(lottoNumbers)) return <Loading />;

  return (
    <main className='flex flex-col items-center p-8 min-h-dvh'>
      <h1 className='text-3xl font-bold mb-8'>퇴사 기원 로또</h1>

      <DrawInfo result={drawInfo} />
      <LottoNumberList round={round} lottoNumbers={lottoNumbers} />

      <Button
        className='-mt-3 mb-6'
        variant='text'
        size='sm'
        onClick={() => setLottoNumbers(getLottoNumbers())}
        startIcon={
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='100%'
            height='100%'
            viewBox='0 0 14 16'
            fill='none'
          >
            <path
              d='M5.70194 1.5505C3.88994 1.93695 2.37395 3.09498 1.47475 4.68713L1.14327 3.04013C1.08868 2.76893 0.824953 2.59064 0.561505 2.64682C0.298058 2.70301 0.124853 2.9745 0.179434 3.24569L0.845064 6.55293C0.899646 6.82412 1.16338 7.00242 1.42682 6.94624L4.63959 6.26103C4.90304 6.20485 5.07625 5.93336 5.02167 5.66217C4.96708 5.39097 4.70335 5.21267 4.43991 5.26886L2.03033 5.78276C2.72322 4.13113 4.15388 2.91542 5.90163 2.54267C8.82525 1.91914 11.6953 3.85944 12.301 6.86903C12.3556 7.14023 12.6193 7.31853 12.8827 7.26234C13.1462 7.20615 13.3194 6.93467 13.2648 6.66347C12.5486 3.10488 9.15888 0.813221 5.70194 1.5505Z'
              fill='black'
              stroke='black'
              stroke-width='0.2'
            />
            <path
              d='M12.5736 9.05369L9.36081 9.73889C9.09736 9.79508 8.92416 10.0666 8.97874 10.3378C9.03332 10.6089 9.29705 10.7872 9.5605 10.7311L11.9701 10.2172C11.2772 11.8688 9.84653 13.0845 8.09878 13.4573C5.17516 14.0808 2.30514 12.1405 1.69942 9.13089C1.64484 8.85969 1.3811 8.6814 1.11766 8.73758C0.854211 8.79377 0.681005 9.06525 0.735587 9.33645C1.4518 12.895 4.84153 15.1867 8.29847 14.4494C10.1105 14.063 11.6265 12.9049 12.5257 11.3128L12.8571 12.9598C12.9117 13.231 13.1755 13.4093 13.4389 13.3531C13.7023 13.2969 13.8756 13.0254 13.821 12.7542L13.1553 9.44699C13.1008 9.1758 12.837 8.9975 12.5736 9.05369Z'
              fill='black'
              stroke='black'
              stroke-width='0.2'
            />
          </svg>
        }
      >
        재생성
      </Button>

      <div className='flex gap-4 items-center'>
        <Link href='/save'>
          <Button>저장된 번호 보기</Button>
        </Link>
        <Button
          variant='outlined'
          onClick={() => saveLottos(round, lottoNumbers)}
        >
          전체 저장
        </Button>
      </div>
    </main>
  );
};

export default LottoGenerator;
