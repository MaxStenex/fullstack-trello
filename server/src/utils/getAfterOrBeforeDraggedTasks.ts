import { Between, getConnection } from "typeorm";
import { Task } from "../entities/Task";
import { TaskColumn } from "../entities/TaskColumn";

export const getAfterOrBeforeDraggedTasks = async (
  sourceTaskIndex: number,
  destinationTaskIndex: number,
  column: TaskColumn
) => {
  const connection = getConnection();

  return sourceTaskIndex < destinationTaskIndex
    ? await connection.getRepository(Task).find({
        where: {
          index: Between(sourceTaskIndex + 1, destinationTaskIndex),
          taskColumn: column,
        },
      })
    : await connection.getRepository(Task).find({
        where: {
          index: Between(destinationTaskIndex, sourceTaskIndex - 1),
          taskColumn: column,
        },
      });
};
