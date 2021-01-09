import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as LogoImage } from "../../images/logo.svg";

const Header = () => {
  return (
    <Wrapper>
      <Navigation>
        <Link to="/home">
          <Logo />
        </Link>
        <AuthMenu>
          <LoginLink to="login">Log In</LoginLink>
          <SignupLink to="signup">Sign Up</SignupLink>
        </AuthMenu>
      </Navigation>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  background-color: transparent;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
`;
const Navigation = styled.nav`
  height: 72px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
const Logo = styled(LogoImage)`
  height: 100%;
  width: 130px;
`;
const AuthMenu = styled.div`
  display: flex;
  align-items: center;
`;
const LoginLink = styled(Link)`
  color: #fff;
  line-height: 1.5;
  padding: 4px 8px;
  font-size: 18px;
  margin-right: 8px;
  &:hover {
    text-decoration: underline;
  }
`;
const SignupLink = styled(Link)`
  padding: 5px 9px;
  color: #0279bf;
  background-color: #fff;
  border-radius: 5px;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.5;
`;

export default Header;
