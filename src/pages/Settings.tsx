import { Link } from "react-router-dom";
import styled from "styled-components";
import { ChangePassView } from "../views";
import Page from "../components/Page";
import { useTranslation } from "react-i18next";

const MainLink = styled(Link)`
  color: inherit;
  margin-bottom: 40px;
  text-decoration: none;
  font-weight: 700;
  font-size: 22px;
`;

const StyledLink = styled.a`
  display: block;
  margin:auto  auto 0;
  width: fit-content;
  color: #000;
  font-size: 18px;
`

const StyledPage = styled(Page)`
  padding: 60px 20px 60px;
`;

const Settings = () => {
  const { t } = useTranslation()
  return (
    <StyledPage>
      <MainLink to="/">{t("settings_back")}</MainLink>
      <ChangePassView />
      <StyledLink href="https://cms.stoi.co/privacy-policy">{t("settings_privacy")}</StyledLink>
    </StyledPage>
  );
};

export default Settings;
