import { TaskColumn } from "../entities/TaskColumn";
import { MyContext } from "../types/MyContext";
import UserService from "./UserService";

class TaskService {
  createTaskColumn = async (title: string, context: MyContext): Promise<TaskColumn> => {
    const taskColumn = new TaskColumn();
    taskColumn.title = title;

    const creator = await UserService.findUser(context.payload?.userId!);
    if (!creator) {
      throw new Error("User not found");
    }
    taskColumn.user = creator;
    return taskColumn;
  };
}

export default new TaskService();
