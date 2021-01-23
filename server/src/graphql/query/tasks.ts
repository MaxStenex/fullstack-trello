import AuthService from "../../services/AuthService";
import TaskService from "../../services/TaskService";
import { UserTaskColumnsResponse } from "../../types/generated";
import { MyContext } from "../../types/MyContext";

const userTaskColumns = async (
  _: any,
  __: any,
  context: MyContext
): Promise<UserTaskColumnsResponse> => {
  try {
    await AuthService.isAuth(context);
    const taskColumns = await TaskService.findUserTaskColumns(context.payload?.userId!);

    return { taskColumns };
  } catch (error) {
    return { errors: [error.message] };
  }
};

export default { userTaskColumns };
