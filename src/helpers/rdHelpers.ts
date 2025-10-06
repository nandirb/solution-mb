import { diffInYearsMonthsDays } from "../utils/dateUtils";
import { parseBirthDateFromRD } from "../utils/RDParser";

const calculateAgeFromRD = (rd: string) => {
  const birthDate = parseBirthDateFromRD(rd);
  const today = new Date();
  return diffInYearsMonthsDays(birthDate, today);
};

export { calculateAgeFromRD };
