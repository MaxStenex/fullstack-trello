import { Task } from "../entities/Task";
import { TaskColumn } from "../entities/TaskColumn";
import { User } from "../entities/User";
import { MyContext } from "../types/MyContext";
import { isIndexUnique } from "../utils/isIndexUnique";
import UserService from "./UserService";

class TaskService {
  createTaskColumn = async (
    title: string,
    index: number,
    context: MyContext
  ): Promise<TaskColumn> => {
    const indexUnique = await isIndexUnique(TaskColumn, index);
    if (!indexUnique) {
      throw new Error("Index is not unique");
    }

    const taskColumn = new TaskColumn();

    const creator = await UserService.findUser(context.payload?.userId!);
    if (!creator) {
      throw new Error("User not found");
    }

    taskColumn.title = title;
    taskColumn.user = creator;
    taskColumn.index = index;
    taskColumn.tasks = [];

    return taskColumn;
  };

  createTask = async (text: string, columnId: number): Promise<Task> => {
    const task = new Task();
    const taskColumn = await TaskColumn.findOne({ where: { id: columnId } });

    if (!taskColumn) {
      throw new Error("Task column not found");
    }
    task.text = text;
    task.taskColumn = taskColumn;
    await task.save();

    return task;
  };

  findUserTaskColumns = async (userId: number): Promise<TaskColumn[]> => {
    const user = await User.findOne(userId);

    const taskColumns = await TaskColumn.find({
      where: { user: user },
      relations: ["tasks"],
    });

    return taskColumns;
  };

  updateTaskColumnTitle = async (
    columnId: number,
    title: string
  ): Promise<TaskColumn> => {
    const column = await TaskColumn.findOne({ where: { id: columnId } });
    if (!column) {
      throw new Error("Column not found");
    }
    column.title = title;
    await column.save();

    return column;
  };

  deleteTask = async (taskId: string): Promise<boolean> => {
    const task = await Task.findOne(taskId);
    if (!task) {
      throw new Error("Invalid task id");
    }
    task.remove();
    return false;
  };

  deleteColumn = async (columnId: number): Promise<true> => {
    const column = await TaskColumn.findOne(columnId);
    if (!column) {
      throw new Error("Invalid column id");
    }
    column.tasks = [];
    await column.save();
    await TaskColumn.delete(columnId);

    return true;
  };
}

export default new TaskService();
