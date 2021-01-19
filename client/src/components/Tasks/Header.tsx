import { useState } from "react";
import styled from "styled-components";
import LogoImage from "../../images/logo.svg";
import UserPhoto from "../../images/user.png";

import { HeaderPopup } from "./";

const Header = () => {
  const [isPopupOpened, setPopupOpened] = useState(false);

  return (
    <Container>
      <LeftSide />
      <Logo src={LogoImage} />
      <RightSide>
        <UserImage src={UserPhoto} onClick={() => setPopupOpened(true)} />
        {isPopupOpened && <HeaderPopup closePopup={() => setPopupOpened(false)} />}
      </RightSide>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  background-color: #8d8d8d;
  padding: 6px 15px;
  align-items: center;
`;
const Logo = styled.img`
  height: 30px;
`;
const LeftSide = styled.div`
  flex: 1;
`;
const RightSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;
`;
const UserImage = styled.img`
  height: 40px;
  cursor: pointer;
`;

export default Header;
