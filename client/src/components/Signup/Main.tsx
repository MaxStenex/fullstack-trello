import styled from "styled-components";
import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "../../graphql/mutation/register";
import {
  RegisterMutationResponseType,
  RegisterMutationVarsType,
} from "../../types/graphql";

type FormValuesType = {
  email: string;
  fullname: string;
  password: string;
};

const Main = () => {
  const parsedQueryString = queryString.parse(window.location.search);
  const [registerUser, { data, loading }] = useMutation<
    RegisterMutationResponseType,
    RegisterMutationVarsType
  >(REGISTER_MUTATION);

  return (
    <Wrapper>
      <MainContent>
        <Title>Sign up for your account</Title>
        <Formik
          initialValues={{
            email: (parsedQueryString.email as string) || "",
            fullname: "",
            password: "",
          }}
          onSubmit={async (
            { email, password, fullname }: FormValuesType,
            { resetForm }
          ) => {
            const { data } = await registerUser({
              variables: { email, password, fullname },
            });
            if (data?.register.user) {
              resetForm();
            }
          }}
        >
          <StyledForm>
            <Field type="email" placeholder="Email" name="email" />
            <Field type="text" placeholder="Fullname" name="fullname" />
            <Field type="password" placeholder="Password" name="password" />
            <>
              {data?.register.errors &&
                data.register.errors.map((error: string) => (
                  <ErrorText key={error}>{error}</ErrorText>
                ))}
            </>
            <>
              {data?.register.user && <SuccessText>Successfully registered</SuccessText>}
            </>
            <Submit isLoading={loading} disabled={loading} type="submit">
              {loading ? "Loading..." : "Sign up"}
            </Submit>
          </StyledForm>
        </Formik>
        <LoginLink to="/login">Already have an account? Log In</LoginLink>
      </MainContent>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: linear-gradient(135deg, #0079bf, #5067c5);
  min-height: 100vh;
  padding: 130px 15px 50px 15px;
`;
const MainContent = styled.div`
  background-color: #fff;
  max-width: 450px;
  padding: 35px 50px;
  margin: 0 auto;
  border-radius: 7px;
  box-shadow: 1px 1px 4px black;
  @media (max-width: 450px) {
    padding: 30px;
  }
`;
const Title = styled.h2`
  color: #5e6c84;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin-top: 23px;
  & input {
    border: 2px solid #dfe1e6;
    border-radius: 3px;
    padding: 10px 10px 10px 7px;
    font-size: 16px;
    margin-bottom: 15px;
    &:focus {
      transition: 0.2s;
      border: 2px solid #386ef8;
    }
  }
`;
const Submit = styled.button<{ isLoading: boolean }>`
  background-color: ${(props) => (props.isLoading ? "#ccc" : "#5aac44")};
  color: ${(props) => (props.isLoading ? "#000" : "#fff")};
  font-weight: 600;
  padding: 8px;
  font-size: 18px;
  border-radius: 5px;
  &:not([disabled]) {
    &:hover,
    &:focus {
      transition: 0.2s;
      background-color: #72db54;
    }
  }
`;
const LoginLink = styled(Link)`
  display: block;
  margin-top: 50px;
  text-align: center;
  position: relative;
  font-size: 15px;
  color: blue;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
  &::before {
    content: "";
    display: block;
    height: 2px;
    position: absolute;
    top: -20px;
    left: 0;
    right: 0;
    background-color: #ccc;
  }
`;
const ErrorText = styled.span`
  display: block;
  color: red;
  margin-bottom: 10px;
`;
const SuccessText = styled.span`
  display: block;
  color: green;
  margin-bottom: 10px;
`;

export default Main;
