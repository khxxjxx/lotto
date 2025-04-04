import { getCurrentRound } from '@/utils';
import { getDrawInfo } from './api/lotto';
import LottoGenerator from './LottoGenerator';

const Page = async () => {
  const currentRound = getCurrentRound();

  const drawInfo = await getDrawInfo(currentRound);

  return <LottoGenerator round={currentRound} drawInfo={drawInfo} />;
};

export default Page;
