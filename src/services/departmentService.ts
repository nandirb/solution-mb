import { department_data } from "../db/mock_data";
import { findAllParents, findTopParent } from "../helpers";
import Department from "../types/department";

export class DepartmentService {
  private departmentData: Department[] = department_data;
  findTopParent(id: number): Department | null {
    return findTopParent(this.departmentData, id);
  }

  findAllParents(id: number): Department[] {
    return findAllParents(this.departmentData, id);
  }

  getAllDepartments(): Department[] {
    return this.departmentData;
  }

  getDepartmentById(id: number): Department | null {
    return this.departmentData.find((d) => d.id === id) || null;
  }
}
