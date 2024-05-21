import React, { useState } from "react";
import styled from "styled-components";
import { useUserActions, useUserState } from "../store/user/hooks";
import { MainButton, TextInput } from "../UI";
import { useTranslation } from "react-i18next";

const StyledForm = styled.form`
  padding: 40px 20px 35px;
  background-color: #fff;
  border-radius: 20px;
  border: 1px solid #c2fffd;
  box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  font-weight: 700;
  text-align: center;
  font-size: 40px;
  line-height: 54px;
  margin-bottom: 65px;
`;

const StyledInput = styled(TextInput)`
  margin-bottom: 65px;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 10px;
`

const StyledLink = styled.a`
  display: block;
  margin:auto  auto 10px;
  width: fit-content;
  color: #000;
  font-size: 18px;
`

const SignInForm = React.memo(() => {
  const { t } = useTranslation()
  const { error } = useUserState()
  const { onSetError, onLogin } = useUserActions()
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!username || !password) onSetError('Enter required fields')
    if (username && password) {
      onLogin({ username, password })
    }
  }

  return (
    <StyledForm onSubmit={(e) => handleSubmit(e)}>
      <Title>{t("sign-in_title")}</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <TextInput
        value={username}
        onChange={setUsername}
        type="text"
        label={t("sign-in_login-label")}
        placeholder={t("sign-in_login-plhr")}
      />
      <StyledInput
        value={password}
        onChange={setPassword}
        type="password"
        label={t("sign-in_pass-label")}
        placeholder={t("sign-in_pass-plhr")}
      />
      <StyledLink href="https://cms.stoi.co/privacy-policy">{t("sign-in_privacy")}</StyledLink>
      <MainButton type="submit">{t("sign-in_login")}</MainButton>
    </StyledForm>
  );
});

export default SignInForm;
