import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "../../images/logo.svg";
import UserPhoto from "../../images/user.svg";
import { useAuthState } from "../../state/user/UserContext";

import { HeaderPopup } from "./";

const Header = () => {
  const { user } = useAuthState();
  const [isPopupOpened, setPopupOpened] = useState(false);

  return (
    <Container>
      <LeftSide />
      <Link to="/home">
        <Logo src={LogoImage} />
      </Link>
      <RightSide>
        <UserInfo onClick={() => setPopupOpened(true)}>
          <UserName> {user?.fullname}</UserName>
          <UserImage src={UserPhoto} />
        </UserInfo>
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
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    & span {
      border-bottom: 2px solid #fff;
    }
  }
`;
const UserName = styled.span`
  margin-right: 5px;
  padding-top: 2px;
  color: #fff;
  border-bottom: 2px solid transparent;
`;
const UserImage = styled.img`
  height: 40px;
`;

export default Header;
