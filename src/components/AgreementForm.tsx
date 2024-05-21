import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { handle } from "../api";
import { User } from "../api/User";
import { useUserActions, useUserState } from "../store/user/hooks";
import { Checkbox, MainButton } from "../UI";
import Loader from "./Loader";
import { t } from "i18next";

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
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 10px;
  max-height: 35vh;
  overflow-y: auto;
`

const StyledCheckbox = styled(Checkbox)`
  margin-bottom: 18px;
`;

const StyledLoader = styled(Loader)`
  margin: 0 auto;
`;

const AgreementForm = React.memo(() => {
  const { token } = useUserState();
  const { onSetAgreed } = useUserActions();
  const [agreed, setAgreed] = useState<boolean>(false);
  const [isFetchingDescription, setIsFetchingDescription] = useState<boolean>(true);
  const [descText, setDescText] = useState<string | null>(null);
  const [agreeText, setAgreeText] = useState<string | null>(null);

  const fetchDescText = useCallback(async () => {
    if (token) {
      setIsFetchingDescription(true);
      const [dataRes, dataErr] = await handle(User.getDescriptionText(token));
      setIsFetchingDescription(false);
      if (dataRes?.description) setDescText(dataRes.description);
      if (dataRes?.agree) setAgreeText(dataRes.agree);
      if (dataErr) {
        console.log(dataErr);
      }
    }
  }, [token])

  const handleSubmit = (e: React.SyntheticEvent) => {
    onSetAgreed(true);
    e.preventDefault();
  };

  useEffect(() => {
    fetchDescText();
  }, []);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Title>{t("sign-in_description")}</Title>
      {isFetchingDescription && <StyledLoader />}
      {descText && <Text dangerouslySetInnerHTML={{__html: descText}} />}
      <StyledCheckbox
        label={(agreeText && !isFetchingDescription) ? agreeText : t("sign-in_agree")}
        checked={agreed}
        setIsChecked={setAgreed}
      />
      <MainButton disabled={!agreed}>{t("sign-in_next")}</MainButton>
    </StyledForm>
  );
});

export default AgreementForm;
