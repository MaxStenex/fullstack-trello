import { gql } from "@apollo/client";

export const UPDATE_COLUMN_TITLE_MUTATION = gql`
  mutation UpdateColumnTitle($title: String!, $columnId: Int!) {
    updateColumnTitle(title: $title, columnId: $columnId) {
      taskColumn {
        id
        title
      }
      errors
    }
  }
`;
