import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query {
    me {
      user {
        id
        fullname
        email
        createdAt
      }
      errors
    }
  }
`;
