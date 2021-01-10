import styled from "styled-components";
import AboutImage from "../../images/about_photo.svg";
import { Field, Form, Formik } from "formik";

const About = () => {
  return (
    <Wrapper>
      <Container>
        <Main>
          <TextWrapper>
            <Title>Trello helps teams work more collaboratively and get more done.</Title>
            <Text>
              Trello’s boards, lists, and cards enable teams to organize and prioritize
              projects in a fun, flexible, and rewarding way.
            </Text>
          </TextWrapper>
          <Image src={AboutImage} alt="#" />
        </Main>
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={(values: { email: string }) => {
            console.log(values);
          }}
        >
          <StyledForm>
            <EmailInput placeholder="Email" type="email" name="email" />
            <SubmitButton type="submit">Sign Up - It`s Free</SubmitButton>
          </StyledForm>
        </Formik>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: linear-gradient(135deg, #0079bf, #5067c5);
  min-height: 100vh;
`;
const Container = styled.div`
  padding: 112px 15px 50px 10px;
  max-width: 1140px;
  margin: 0 auto;
  @media (max-width: 1200px) {
    max-width: 960px;
  }
`;
const Main = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 980px) {
    flex-direction: column;
    max-width: 100%;
  }
`;
const TextWrapper = styled.div`
  padding-right: 20px;
  @media (max-width: 980px) {
    text-align: center;
    padding: 0px 10px;
  }
`;
const Title = styled.h2`
  font-size: 44px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 20px;
  @media (max-width: 500px) {
    font-size: 37px;
  }
`;
const Text = styled.p`
  font-size: 25px;
  color: #fff;
  letter-spacing: 1.2px;
  @media (max-width: 500px) {
    font-size: 22px;
  }
`;
const Image = styled.img`
  @media (max-width: 1200px) {
    max-width: 450px;
  }
  @media (max-width: 980px) {
    max-width: 100%;
  }
`;
const StyledForm = styled(Form)`
  margin-top: 50px;
  display: flex;
  @media (max-width: 500px) {
    justify-content: center;
  }
`;
const EmailInput = styled(Field)`
  padding: 5px 5px 5px 15px;
  border-radius: 5px;
  line-height: 2;
  font-size: 20px;
  width: 370px;
  margin-right: 10px;
  min-width: 100px;
  @media (max-width: 500px) {
    display: none;
  }
`;
const SubmitButton = styled.button`
  color: #fff;
  background-color: #61bd4f;
  border-color: #61bd4f;
  font-size: 20px;
  letter-spacing: 1.3px;
  min-height: 100%;
  display: block;
  border-radius: 5px;
  padding: 5px 17px;
  &:hover {
    background-color: #50a73f;
    border-color: #4b9e3b;
    transition: 0.2s;
  }
  @media (max-width: 500px) {
    height: 50px;
    max-width: 90%;
  }
`;

export default About;
