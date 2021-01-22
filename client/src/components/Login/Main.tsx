import styled from "styled-components";
import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../graphql/mutation/login";
import { LoginMutationResponseType, LoginMutationVarsType } from "../../types/graphql";
import { useAuhDispatch } from "../../state/user/UserContext";
import { setUser } from "../../state/user/actions";

type FormValuesType = {
  email: string;
  password: string;
};

const Main = () => {
  const authDispatch = useAuhDispatch();

  const [loginUser, { data, loading }] = useMutation<
    LoginMutationResponseType,
    LoginMutationVarsType
  >(LOGIN_MUTATION);

  return (
    <Wrapper>
      <MainContent>
        <Title>Log in to Trello</Title>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async ({ password, email }: FormValuesType, { resetForm }) => {
            const { data } = await loginUser({ variables: { email, password } });
            if (data?.login.user) {
              resetForm();
              authDispatch(setUser(data.login.user));
            }
          }}
        >
          <StyledForm>
            <Field type="email" placeholder="Email" name="email" />
            <Field type="password" placeholder="Password" name="password" />
            <>
              {data?.login.errors &&
                data.login.errors.map((error: string) => (
                  <ErrorText key={error}>{error}</ErrorText>
                ))}
              {data?.login.user && (
                <SuccessText>
                  Successfully logged in, to <SuccessLink to="/tasks">Tasks</SuccessLink>
                  <span> </span>page
                </SuccessText>
              )}
            </>
            <Submit isLoading={loading} disabled={loading} type="submit">
              Log In
            </Submit>
          </StyledForm>
        </Formik>
        <LoginLink to="/signup">Sign up for an account</LoginLink>
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
const SuccessLink = styled(Link)`
  color: blue;
  &:hover {
    text-decoration: underline;
  }
`;

export default Main;
