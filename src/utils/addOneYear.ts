export const addOneYearToDate = (dateString: string) => {
  const [day, month, year] = dateString.split('/');
  const date = new Date(`${year}-${month}-${day}T00:00:00Z`);
  date.setFullYear(date.getFullYear() + 1);
  // Corregimos la zona horaria para asegurarnos de que la fecha no cambie
  const adjustedDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60000,
  );
  return `${('0' + adjustedDate.getDate()).slice(-2)}/${(
    '0' +
    (adjustedDate.getMonth() + 1)
  ).slice(-2)}/${adjustedDate.getFullYear()}`;
};
