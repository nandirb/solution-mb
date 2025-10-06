const formatAge = ({
  years,
  months,
  days,
}: {
  years: number;
  months: number;
  days: number;
}) => {
  return `${years} жил  ${months} сар ${days} өдөр`;
};


export { formatAge };