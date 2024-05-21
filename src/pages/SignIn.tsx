import { Navigate } from "react-router-dom";
import styled from "styled-components";
import bg from "../assets/img/red-bg.png";
import logo from '../assets/svg/logo.svg'
import { AgreementForm, SignInForm, UploadForm } from "../components";
import { useUserState } from "../store/user/hooks";

const SignInPage = styled.div`
  min-height: 100vh;
  background-image: url(${bg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0 120px;
  padding: 60px 20px 60px;
`;

const StyledLogo = styled.img`
display: block;
  height: 54px;
  width: 175px;
  object-fit: contain;
  margin: 0 auto 55px;
`;



const SignIn = () => {

  // use state instread of this
  const { token, isAgreed, userInfo } = useUserState()
  if (token && isAgreed && userInfo.is_contacts_uploaded) return <Navigate to="/" />
  if (token && isAgreed && userInfo.is_sync_contacts === false) return <Navigate to="/" />

  return (
    <SignInPage>
      <StyledLogo src={logo} />
      {!token && <SignInForm />}
      {!isAgreed && token && <AgreementForm />}
      {!userInfo.is_contacts_uploaded && token && isAgreed && <UploadForm />}
    </SignInPage>
  );
};

export default SignIn;
