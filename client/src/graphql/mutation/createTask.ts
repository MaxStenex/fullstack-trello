import { gql } from "@apollo/client";

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($text: String!, $columnId: Int!) {
    createTask(text: $text, columnId: $columnId) {
      task {
        id
        text
      }
      errors
    }
  }
`;
