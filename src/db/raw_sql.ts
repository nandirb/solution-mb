import { sql } from "./connectDB";

const QUERY_CREATE_CITIZENS = `CREATE TABLE citizen (
  id NUMERIC(38,0) PRIMARY KEY,
  "firstName" VARCHAR(300) NOT NULL,
  "lastName" VARCHAR(300) NOT NULL,
  "registerNo" VARCHAR(50) UNIQUE NOT NULL,
  age NUMERIC(10,0),
  "aimagName" VARCHAR(300) NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_register_no CHECK ("registerNo" ~ '^[A-Z]{2}[0-9]{8}$')
);
`;

const QUERY_LOAD_CITIZENS = `
INSERT INTO citizen (id, "firstName", "lastName", "registerNo", "aimagName") VALUES 
  (1, 'test1', 'testLastName1', 'AA88062213', 'Архангай'),
  (2, 'test2', 'testLastName2', 'AA89062213', 'Архангай'),
  (3, 'test3', 'testLastName3', 'AA87062213', 'Архангай'),
  (4, 'test4', 'testLastName4', 'AA85062213', 'Төв'),
  (5, 'test5', 'testLastName5', 'AA84062213', 'Төв'),
  (6, 'test6', 'testLastName6', 'AA98062213', 'Төв'),
  (7, 'test7', 'testLastName7', 'AA90062213', 'Өмнөговь'),
  (8, 'test8', 'testLastName8', 'AA91062213', 'Өмнөговь'),
  (9, 'test9', 'testLastName9', 'AA71062213', 'Өмнөговь'),
  (10, 'test1', 'test1LastName0', 'AA62062213', 'Увс'),
  (11, 'test1', 'test1LastName1', 'AA63062213', 'Увс'),
  (12, 'test1', 'test1LastName2', 'AA50062213', 'Увс'),
  (13, 'test2', 'test1LastName3', 'AA99062213', 'Баян-Өлгий'),
  (14, 'test3', 'test1LastName4', 'AA83062213', 'Баян-Өлгий'),
  (15, 'test4', 'test1LastName5', 'AA93062213', 'Баян-Өлгий');
  `;

const QUERY_GET_CITIZENS_BY_AIMAG = sql`
SELECT 
  "aimagName",
  COUNT(*)
FROM citizen 
GROUP BY "aimagName"
ORDER BY COUNT(*) DESC;`;

const QUERY_GET_OLDEST_CITIZENS_BY_AIMAG = sql`
SELECT DISTINCT ON (aimagName)
  aimagName,
  firstName || ' ' || lastName,
  registerNo,
  age
FROM citizen
ORDER BY aimagName, age DESC;`;

const QUERY_GET_SIMILAR_NAMES = sql`
SELECT 
  "firstName",
  COUNT(*),
  STRING_AGG("lastName", ', '),
  STRING_AGG("registerNo", ', ')
FROM citizen
GROUP BY "firstName"
HAVING COUNT(*) > 1
ORDER BY COUNT(*) DESC;`;

export {
  QUERY_CREATE_CITIZENS,
  QUERY_LOAD_CITIZENS,
  QUERY_GET_CITIZENS_BY_AIMAG,
  QUERY_GET_OLDEST_CITIZENS_BY_AIMAG,
  QUERY_GET_SIMILAR_NAMES,
};
