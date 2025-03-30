const getNumberColor = (num: number) => {
  if (num <= 10) return 'bg-primary-yellow';
  if (num <= 20) return 'bg-primary-blue';
  if (num <= 30) return 'bg-primary-red';
  if (num <= 40) return 'bg-primary-gray';
  return 'bg-primary-green';
};

export default getNumberColor;
