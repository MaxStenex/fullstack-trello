import AuthService from "../../services/AuthService";
import TaskService from "../../services/TaskService";
import { MutationCreateTaskColumnArgs, TaskColumnResponse } from "../../types/generated";
import { MyContext } from "../../types/MyContext";

const createTaskColumn = async (
  _: any,
  { title }: MutationCreateTaskColumnArgs,
  context: MyContext
): Promise<TaskColumnResponse> => {
  try {
    await AuthService.isAuth(context);
    if (title.length < 1) {
      throw new Error("Title lenght should be greater then 0");
    }

    const taskColumn = await TaskService.createTaskColumn(title, context);
    await taskColumn.save();

    return { taskColumn };
  } catch (errors) {
    return { errors: [errors.message] };
  }
};

export default { createTaskColumn };
