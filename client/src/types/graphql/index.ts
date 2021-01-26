type ErrorsType = Array<string> | null;

export type UserType = {
  id: number;
  fullname: string;
  email: string;
  createdAt: string;
};

export type RegisterMutationVarsType = {
  fullname: string;
  email: string;
  password: string;
};

export type RegisterMutationResponseType = {
  register: {
    user: UserType | null;
    errors: ErrorsType;
  };
};

export type LoginMutationVarsType = {
  email: string;
  password: string;
};

export type LoginMutationResponseType = {
  login: {
    user: UserType | null;
    errors: ErrorsType;
  };
};

export type MeQueryResponseType = {
  me: {
    user: UserType | null;
    errors: ErrorsType;
  };
};

export type TaskType = {
  id: string;
  text: string;
};

export type TaskColumnType = {
  id: number;
  title: string;
  index: number;
  tasks: Array<TaskType>;
};

export type UserTaskColumnsQueryType = {
  userTaskColumns: {
    taskColumns: Array<TaskColumnType> | null;
    errors: ErrorsType;
  };
};

export type CreateTaskColumnResponseType = {
  createTaskColumn: {
    taskColumn: TaskColumnType | null;
    errors: ErrorsType;
  };
};

export type UpdateColumnTitleResponseType = {
  updateColumnTitle: {
    taskColumn: TaskColumnType | null;
    errors: ErrorsType;
  };
};

export type CreateTaskResponseType = {
  createTask: {
    task: TaskType | null;
    errors: ErrorsType;
  };
};

export type LogoutResponseType = {
  logout: {
    isSuccess: boolean;
    errors: ErrorsType;
  };
};

export type DeleteTaskColumnResponse = {
  deleteColumn: {
    isSuccess: boolean;
    errors: ErrorsType;
  };
};

export type DeleteTaskResponse = {
  deleteTask: {
    isSuccess: boolean;
    errors: ErrorsType;
  };
};

export type ChangeColumnsOrderResponse = {
  changeColumnsOrder: {
    isSuccess: boolean;
    errors: ErrorsType;
  };
};
