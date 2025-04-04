export const getDrawInfo = async (round: number): FetchReturn<DrawInfo> => {
  try {
    const response = await fetch(`/api/lotto?round=${round}`);
    if (!response.ok) throw new Error('당첨번호 조회에 실패했습니다.');

    return await response.json();
  } catch (err) {
    const message = err instanceof Error ? err.message : '오류가 발생했습니다.';
    return { success: false, message };
  }
};
