import { gql } from "@apollo/client";

export const CHANGE_TASKS_ORDER_MUTATION = gql`
  mutation ChangeTasksOrder(
    $sourceColumnId: Int!
    $destinationColumnId: Int!
    $sourceTaskIndex: Int!
    $destinationTaskIndex: Int!
  ) {
    changeTasksOrder(
      input: {
        sourceColumnId: $sourceColumnId
        destinationColumnId: $destinationColumnId
        sourceTaskIndex: $sourceTaskIndex
        destinationTaskIndex: $destinationTaskIndex
      }
    ) {
      isSuccess
      errors
    }
  }
`;
