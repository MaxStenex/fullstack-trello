import { Task } from "../entities/Task";
import { TaskColumn } from "../entities/TaskColumn";

export const changeEtnitiesIndexes = (
  entities: Array<Task | TaskColumn>,
  sourceIndex: number,
  destinationIndex: number
): Array<Task | TaskColumn> => {
  if (sourceIndex < destinationIndex) {
    // Decrement indexes of all columns, that staying after dragged column
    for (let i = 0; i < entities.length; i++) {
      entities[i].index = entities[i].index - 1;
    }
  }
  if (sourceIndex > destinationIndex) {
    for (let i = 0; i < entities.length; i++) {
      entities[i].index = entities[i].index + 1;
    }
  }

  return entities;
};
