import { gql } from "@apollo/client";

export const CREATE_TASK_COLUMN_MUTATION = gql`
  mutation CreateTaskColumn($title: String!, $index: Int!) {
    createTaskColumn(title: $title, index: $index) {
      taskColumn {
        id
        title
        createdAt
        index
        tasks {
          id
          text
        }
        user {
          id
          fullname
        }
      }
      errors
    }
  }
`;
