export const daysBetween = (start, end) => {
  const DAY = 24 * 60 * 60 * 1000;

  return Math.round(Math.abs(start - end) / DAY);
};
