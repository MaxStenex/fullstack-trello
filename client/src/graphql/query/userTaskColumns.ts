import { gql } from "@apollo/client";

export const USER_TASK_COLUMNS_QUERY = gql`
  query {
    userTaskColumns {
      taskColumns {
        id
        title
        index
        tasks {
          id
          text
        }
      }
      errors
    }
  }
`;
