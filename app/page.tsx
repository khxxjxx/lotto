import { getCurrentRound } from '@/utils';
import { getDrawInfo } from './api/lotto';
import LottoGenerator from './LottoGenerator';

const Page = async () => {
  const currentRound = getCurrentRound();

  const drawInfo = await getDrawInfo(currentRound);

  return (
    <>
      <LottoGenerator
        title='퇴사 기원 로또'
        round={currentRound}
        drawInfo={drawInfo}
      />
      <div id='__root__portal' />
    </>
  );
};

export default Page;
