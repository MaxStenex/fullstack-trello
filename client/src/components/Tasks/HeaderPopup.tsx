import React from "react";
import styled from "styled-components";
import CloseSvg from "../../images/close_form.svg";
import UserPhoto from "../../images/user.png";

type Props = {
  closePopup: () => void;
};

const HeaderPopup: React.FC<Props> = ({ closePopup }) => {
  return (
    <Container>
      <Header>
        <Title>Account</Title>
        <CloseButton onClick={closePopup}>
          <CloseButtonImage src={CloseSvg} />
        </CloseButton>
      </Header>
      <InfoSection>
        <Avatar src={UserPhoto} />
        <Text>
          <Fullname>Bob</Fullname>
          <Email>bob@bob.com</Email>
        </Text>
      </InfoSection>
      <LogoutButton>Log Out</LogoutButton>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  z-index: 1000;
  top: calc(100% + 10px);
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 4px;
  width: 300px;
  padding: 10px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`;
const Title = styled.h3`
  flex: 1;
  text-align: center;
  margin: 0px 50px;
  font-size: 15px;
`;
const CloseButton = styled.button`
  display: flex;
  background-color: transparent;
  width: 25px;
  height: 25px;
  position: absolute;
  right: 0;
  &:hover,
  &:focus {
    background-color: #ccc;
    transition: 0.2s;
    border-radius: 3px;
  }
`;
const CloseButtonImage = styled.img`
  width: 100%;
  height: 100%;
`;
const InfoSection = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 8px;
`;
const Text = styled.div``;
const Fullname = styled.div``;
const Email = styled.div`
  color: #b6b6b6;
`;
const LogoutButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 15px;
  font-weight: 700;
  border: 2px solid #ccc;
  background-color: transparent;
  &:hover,
  &:focus {
    background-color: #ccc;
    transition: 0.1s;
  }
`;

export default HeaderPopup;
