import { gql } from "@apollo/client";

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($taskId: String!) {
    deleteTask(taskId: $taskId) {
      isSuccess
      errors
    }
  }
`;
