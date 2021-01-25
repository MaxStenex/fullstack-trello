import { gql } from "@apollo/client";

export const DELETE_TASK_COLUMN_MUTATION = gql`
  mutation DeleteColumn($columnId: Int!) {
    deleteColumn(columnId: $columnId) {
      isSuccess
      errors
    }
  }
`;
