import styled from "styled-components";
import AboutImage from "../../images/about_photo.svg";

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
        <Form>
          <EmailInput placeholder="Email" type="email" />
          <SubmitButton type="submit">Sign Up - It`s Free</SubmitButton>
        </Form>
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
`;
const Main = styled.div`
  display: flex;
  align-items: center;
`;
const TextWrapper = styled.div`
  padding-right: 20px;
`;
const Title = styled.h2`
  font-size: 44px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 20px;
`;
const Text = styled.p`
  font-size: 25px;
  color: #fff;
  letter-spacing: 1.2px;
`;
const Image = styled.img``;
const Form = styled.form`
  margin-top: 50px;
  display: flex;
`;
const EmailInput = styled.input`
  padding: 5px 5px 5px 15px;
  border-radius: 5px;
  line-height: 2;
  font-size: 20px;
  width: 370px;
  margin-right: 10px;
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
`;

export default About;
