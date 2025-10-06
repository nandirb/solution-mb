import Department from "../types/department";

const findTopParent = (data: Department[], id: number) => {
  const item = data.find((d) => d.id === id);
  if (!item) return null;
  if (item.parentId === null) return item;
  return findTopParent(data, item.parentId);
};

const findAllParents = (data: Department[], id: number): Department[] => {
  const item = data.find((d) => d.id === id);
  if (!item) return [];

  if (item.parentId === null) return [];
  const parent = data.find((d) => d.id === item.parentId);
  return parent ? [parent, ...findAllParents(data, parent.id)] : [];
};

export { findAllParents, findTopParent };
