import { findTopParent, findAllParents, calculateAgeFromRD } from "./helpers";
import { department_data } from "./db/mock_data";

function demoRun() {
  console.log("\n\n - Group 1 \n");

  const age = calculateAgeFromRD("АА84062213");
  console.log(`1. Find age from RD. ${age}`);

  console.log("\n\n - Group 2 \n");

  const topParent = findTopParent(department_data, 11);
  console.log(`1. Returns one top-level parent.
  INPUT: id=11
  OUTPUT: ${JSON.stringify(topParent)} \n\n`);

  const parents = findAllParents(department_data, 11);
  console.log(`2. Returns all parents of given item.
  INPUT: id=11
  OUTPUT: ${JSON.stringify(parents)} \n\n`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  demoRun();
}
