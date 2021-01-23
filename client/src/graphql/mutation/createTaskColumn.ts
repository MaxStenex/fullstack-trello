import { gql } from "@apollo/client";

export const CREATE_TASK_COLUMN_MUTATION = gql`
  mutation CreateTaskColumn($title: String!) {
    createTaskColumn(title: $title) {
      taskColumn {
        id
        title
        createdAt
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
