import { gql } from "@apollo/client";

export const CHANGE_COLUMNS_ORDER_MUTATION = gql`
  mutation ChangeColumnOrder($sourceIndex: Int!, $destinationIndex: Int!) {
    changeColumnsOrder(sourceIndex: $sourceIndex, destinationIndex: $destinationIndex) {
      isSuccess
      errors
    }
  }
`;
