export const addOneYearToDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-');
  const date = new Date(`${year}-${month}-${day}T00:00:00Z`);
  date.setFullYear(date.getFullYear() + 1);
  const adjustedDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60000,
  );
  return `${adjustedDate.getFullYear()}-${(
    '0' +
    (adjustedDate.getMonth() + 1)
  ).slice(-2)}-${('0' + adjustedDate.getDate()).slice(-2)}`;
};
