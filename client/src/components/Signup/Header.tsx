import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../images/logo.svg";

const Header = () => {
  return (
    <Wrapper>
      <LogoWrapper to="/home">
        <LogoImage />
      </LogoWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: transparent;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 120px;
  padding: 35px 0px;
`;
const LogoWrapper = styled(Link)`
  margin: 0 auto;

  display: block;
  width: 150px;
`;
const LogoImage = styled(Logo)`
  height: 100%;
  width: 100%;
  display: block;
`;

export default Header;
