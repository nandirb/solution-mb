import { Request, Response } from "express";
import { calculateAgeFromRD } from "../helpers";
import { formatAge } from "../utils";
import { sql } from "../db/connectDB";
import {
  QUERY_GET_CITIZENS_BY_AIMAG,
  QUERY_GET_OLDEST_CITIZENS_BY_AIMAG,
  QUERY_GET_SIMILAR_NAMES,
} from "../db/raw_sql";

enum FORMATS {
  DISPLAY,
  RAW,
}

const queries = {
  getAllCitizens: sql`SELECT * FROM citizen`,
  getCitizensByAimag: QUERY_GET_CITIZENS_BY_AIMAG,
  getOldestCitizensByAimag: QUERY_GET_OLDEST_CITIZENS_BY_AIMAG,
  getSimilarNames: QUERY_GET_SIMILAR_NAMES,
};

export const calculateAge = async (req: Request, res: Response) => {
  try {
    const { rd, format } = req.body;

    if (!rd) {
      return res
        .status(400)
        .json({ error: "Identification Number is required" });
    }

    if (typeof rd !== "string") {
      return res
        .status(400)
        .json({ error: "Identification Number must be a string" });
    }

    const dates = calculateAgeFromRD(rd);
    let response = dates.years.toString();

    if (format && format === FORMATS.DISPLAY) {
      response = formatAge({
        years: dates.years,
        months: dates.months,
        days: dates.days,
      });
    }

    res.json({ success: true, age: response });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateAllAges = async (req: Request, res: Response) => {
  try {
    const citizensWithNullAges = await sql`
      SELECT id, "registerNo" 
      FROM citizen 
      WHERE age IS NULL
    `;

    let updatedCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const citizen of citizensWithNullAges) {
      try {
        const calculatedAge = calculateAgeFromRD(citizen.registerNo);

        await sql`
          UPDATE citizen 
          SET age = ${calculatedAge.years}, "updatedAt" = NOW()
          WHERE id = ${citizen.id}
        `;

        updatedCount++;
      } catch (error) {
        errorCount++;
        errors.push(`Failed to update age for citizen ${citizen.id}: ${error}`);
      }
    }

    res.json({
      success: true,
      message: `Updated ${updatedCount} citizens' ages`,
      updatedCount,
      errorCount,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCitizens = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, groupBy } = req.query;
    let citizens;
    if (!filter) {
      citizens = await queries.getAllCitizens;
    } else if (filter) {
      switch (filter) {
        case "aimag":
          citizens = await queries.getCitizensByAimag;
          break;
        case "oldest":
          citizens = await queries.getOldestCitizensByAimag;
          break;
        case "similar":
          citizens = await queries.getSimilarNames;
          break;
        default:
          return res.status(400).json({ error: "Invalid filter type" });
      }
    }

    // Calculate ages for citizens where age is null
    if (Array.isArray(citizens)) {
      citizens = citizens.map((citizen: any) => {
        if (citizen.age === null || citizen.age === undefined) {
          const calculatedAge = calculateAgeFromRD(citizen.registerNo);
          return { ...citizen, age: calculatedAge.years };
        }
        return citizen;
      });
    }

    res.json({ success: true, data: citizens });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
