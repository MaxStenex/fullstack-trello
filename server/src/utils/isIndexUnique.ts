import { Task } from "../entities/Task";
import { TaskColumn } from "../entities/TaskColumn";

export const isIndexUnique = async (
  entity: typeof TaskColumn | typeof Task,
  index: number
): Promise<boolean> => {
  const entityInDB = await entity.findOne({ where: { index } });
  if (entityInDB) {
    return false;
  }
  return true;
};
