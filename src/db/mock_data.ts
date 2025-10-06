import Department from "../types/department";

const department_data: Department[] = [
  { id: 1, name: "A1", parentId: null },
  { id: 2, name: "B1", parentId: null },
  { id: 3, name: "C1", parentId: null },
  { id: 4, name: "A1.1", parentId: 1 },
  { id: 5, name: "A1.2", parentId: 1 },
  { id: 6, name: "A1.1", parentId: 2 },
  { id: 10, name: "A1.1.1", parentId: 1 },
  { id: 11, name: "A1.1.2", parentId: 4 },
];

export { department_data };
