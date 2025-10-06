import { Request, Response } from "express";
import { DepartmentService } from "../services/departmentService";

const departmentService = new DepartmentService();

export const getTopParent = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid department ID" });
    }

    const topParent = departmentService.findTopParent(id);
    if (!topParent) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.json({ success: true, data: topParent });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllParents = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid department ID" });
    }

    const parents = departmentService.findAllParents(id);

    res.json({ success: true, data: parents });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const departments = departmentService.getAllDepartments();
    res.json({ success: true, data: departments });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getDepartmentById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid department ID" });
    }

    const department = departmentService.getDepartmentById(id);

    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.json({ success: true, data: department });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
