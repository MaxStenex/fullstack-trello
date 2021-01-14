import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Register($fullname: String!, $email: String!, $password: String!) {
    register(input: { fullname: $fullname, email: $email, password: $password }) {
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
