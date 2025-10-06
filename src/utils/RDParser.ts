const parseBirthDateFromRD = (rd: string) => {
  if (!/^[А-ЯӨҮЁ]{2}\d{8}$/.test(rd)) {
    throw new Error("Invalid Mongolian ID format");
  }

  const year = parseInt(rd.substring(2, 4), 10);
  const month = parseInt(rd.substring(4, 6), 10);
  const day = parseInt(rd.substring(6, 8), 10);

  const fullYear = year >= 50 ? 1900 + year : 2000 + year;
  return new Date(fullYear, month - 1, day);
};

export { parseBirthDateFromRD };
