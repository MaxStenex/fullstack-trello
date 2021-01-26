import { gql } from "@apollo/client";

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($text: String!, $columnId: Int!, $index: Int!) {
    createTask(text: $text, columnId: $columnId, index: $index) {
      task {
        id
        text
        index
      }
      errors
    }
  }
`;
