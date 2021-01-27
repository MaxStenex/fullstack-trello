import AuthService from "../../services/AuthService";
import TaskService from "../../services/TaskService";
import {
  MutationCreateTaskArgs,
  MutationCreateTaskColumnArgs,
  TaskColumnResponse,
  TaskResponse,
  MutationUpdateColumnTitleArgs,
  DeleteResponse,
  MutationDeleteTaskArgs,
  MutationDeleteColumnArgs,
  ChangeColumnsOrderResponse,
  MutationChangeColumnsOrderArgs,
  MutationChangeTasksOrderArgs,
  ChangeTasksOrderResponse,
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
  { text, columnId, index }: MutationCreateTaskArgs,
  context: MyContext
): Promise<TaskResponse> => {
  try {
    await AuthService.isAuth(context);
    if (text.length < 1) {
      throw new Error("Text lenght should be greater then 0");
    }
    const task = await TaskService.createTask(text, columnId, index);

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

const deleteTask = async (
  _: any,
  { taskId }: MutationDeleteTaskArgs,
  context: MyContext
): Promise<DeleteResponse> => {
  try {
    await AuthService.isAuth(context);
    await TaskService.deleteTask(taskId);

    return { isSuccess: true };
  } catch (error) {
    return { isSuccess: false, errors: [error.message] };
  }
};

const deleteColumn = async (
  _: any,
  { columnId }: MutationDeleteColumnArgs,
  context: MyContext
): Promise<DeleteResponse> => {
  try {
    await AuthService.isAuth(context);
    await TaskService.deleteColumn(columnId);

    return {
      isSuccess: true,
    };
  } catch (error) {
    return { isSuccess: false, errors: [error.message] };
  }
};

const changeColumnsOrder = async (
  _: any,
  { sourceIndex, destinationIndex }: MutationChangeColumnsOrderArgs,
  context: MyContext
): Promise<ChangeColumnsOrderResponse> => {
  try {
    await AuthService.isAuth(context);
    await TaskService.changeColumnsOrder(sourceIndex, destinationIndex);

    return {
      isSuccess: true,
    };
  } catch (error) {
    return { isSuccess: false, errors: [error.message] };
  }
};

const changeTasksOrder = async (
  _: any,
  {
    input: { sourceColumnId, destinationColumnId, sourceTaskIndex, destinationTaskIndex },
  }: MutationChangeTasksOrderArgs,
  context: MyContext
): Promise<ChangeTasksOrderResponse> => {
  try {
    await AuthService.isAuth(context);
    await TaskService.changeTaskOrder(
      sourceColumnId,
      destinationColumnId,
      sourceTaskIndex,
      destinationTaskIndex
    );
    return { isSuccess: true };
  } catch (error) {
    return { isSuccess: false, errors: [error.message] };
  }
};

export default {
  createTaskColumn,
  createTask,
  updateColumnTitle,
  deleteTask,
  deleteColumn,
  changeColumnsOrder,
  changeTasksOrder,
};
