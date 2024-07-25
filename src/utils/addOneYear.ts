export const addOneYearToDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-');
  const date = new Date(`${year}-${month}-${day}T00:00:00Z`);
  date.setFullYear(date.getFullYear() + 1);

  if (month === '02' && day === '29' && !isLeapYear(date.getFullYear())) {
    date.setMonth(1);
    date.setDate(28);
  }

  const adjustedDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60000,
  );

  return `${adjustedDate.getFullYear()}-${(
    '0' +
    (adjustedDate.getMonth() + 1)
  ).slice(-2)}-${('0' + adjustedDate.getDate()).slice(-2)}`;
};

const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
