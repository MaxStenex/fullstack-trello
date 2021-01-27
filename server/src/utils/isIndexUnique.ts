import { TaskColumn } from "../entities/TaskColumn";

export const isIndexUnique = async (
  entity: typeof TaskColumn,
  index: number,
  userId: number
): Promise<boolean> => {
  const entityInDB = await entity.findOne({ where: { index }, relations: ["user"] });
  if (entityInDB && userId === entityInDB.user.id) {
    return false;
  }
  return true;
};
