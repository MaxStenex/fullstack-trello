import { TaskColumnType } from "../types/graphql";

export const makeTaskColumnsCopy = (taskColumns: TaskColumnType[]): TaskColumnType[] => {
  return [
    ...taskColumns.map((column) => {
      return {
        ...column,
        tasks: [...column.tasks],
      };
    }),
  ];
};
