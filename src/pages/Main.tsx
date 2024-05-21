import React from "react";
import {
  ProfileActions,
} from "../components";
import Page from "../components/Page";
import styled from "styled-components";
import { useUserState } from "../store/user/hooks";
import { BingoModeView, QuestionnaireModeView, SimpleModeView } from "../views";
import { useTranslation } from "react-i18next";

const StyledLink = styled.a`
  display: block;
  margin:auto  auto 0;
  width: fit-content;
  color: #000;
  font-size: 18px;
`


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  flex-grow: 1;
`;



const Main = () => {
  const { t } = useTranslation()
  const { userInfo } = useUserState()



  return (
    <Page>
      <ProfileActions />
      <Wrapper>
        {userInfo.mode === "status_update" && <SimpleModeView />}
        {userInfo.mode === "simple" && <SimpleModeView />}

        {userInfo.mode === "questionarie" && <QuestionnaireModeView />}
        {userInfo.mode === "eday_bingo" && <BingoModeView />}
        {userInfo.mode === "eday_pledge" && <SimpleModeView />}
      </Wrapper>
      <StyledLink href="https://cms.stoi.co/privacy-policy">{t("main_privacy")}</StyledLink>
    </Page>
  );
};

export default Main;
