import AuthService from "../../services/AuthService";
import TaskService from "../../services/TaskService";
import {
  MutationCreateTaskArgs,
  MutationCreateTaskColumnArgs,
  TaskColumnResponse,
  TaskResponse,
  MutationUpdateColumnTitleArgs,
} from "../../types/generated";
import { MyContext } from "../../types/MyContext";

const createTaskColumn = async (
  _: any,
  { title, index }: MutationCreateTaskColumnArgs,
  context: MyContext
): Promise<TaskColumnResponse> => {
  try {
    await AuthService.isAuth(context);
    if (title.length < 1) {
      throw new Error("Title lenght should be greater then 0");
    }

    const taskColumn = await TaskService.createTaskColumn(title, index, context);
    await taskColumn.save();

    return { taskColumn };
  } catch (error) {
    return { errors: [error.message] };
  }
};

const createTask = async (
  _: any,
  { text, columnId }: MutationCreateTaskArgs,
  context: MyContext
): Promise<TaskResponse> => {
  try {
    await AuthService.isAuth(context);
    if (text.length < 1) {
      throw new Error("Text lenght should be greater then 0");
    }
    const task = await TaskService.createTask(text, columnId);

    return { task };
  } catch (error) {
    return { errors: [error.message] };
  }
};

const updateColumnTitle = async (
  _: any,
  { columnId, title }: MutationUpdateColumnTitleArgs,
  context: MyContext
): Promise<TaskColumnResponse> => {
  try {
    await AuthService.isAuth(context);
    const updatedColumn = await TaskService.updateTaskColumnTitle(columnId, title);
    return {
      taskColumn: updatedColumn,
    };
  } catch (error) {
    return { errors: [error.message] };
  }
};

export default { createTaskColumn, createTask, updateColumnTitle };
