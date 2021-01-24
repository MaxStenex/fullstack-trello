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
    errors: string[] | null;
  };
};

export type LoginMutationVarsType = {
  email: string;
  password: string;
};

export type LoginMutationResponseType = {
  login: {
    user: UserType | null;
    errors: string[] | null;
  };
};

export type MeQueryResponseType = {
  me: {
    user: UserType | null;
    errors: string[] | null;
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
    errors: string[] | null;
  };
};

export type CreateTaskColumnResponseType = {
  createTaskColumn: {
    taskColumn: TaskColumnType | null;
    errors: string[] | null;
  };
};

export type UpdateColumnTitleResponseType = {
  updateColumnTitle: {
    taskColumn: TaskColumnType | null;
    errors: string[] | null;
  };
};
