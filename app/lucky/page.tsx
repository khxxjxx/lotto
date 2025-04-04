import { getCurrentRound } from '@/utils';
import { getDrawInfo } from '../api/lotto';
import LottoGenerator from '../LottoGenerator';

const Page = async () => {
  const currentRound = getCurrentRound();

  const drawInfo = await getDrawInfo(currentRound);

  return (
    <LottoGenerator
      title='행운 희진 로또'
      round={currentRound}
      drawInfo={drawInfo}
    />
  );
};

export default Page;
