import React, { useState } from "react";
import styled from "styled-components";
import { useSettingsActions, useSettingsState } from "../store/settings/hooks";
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
  font-size: 30px;
  line-height: 54px;
  margin-bottom: 65px;
`;

const Message = styled.p<{ color: "red" | "green" }>`
  color: red;
  text-align: center;
  margin-bottom: 10px;
  ${({ color }) => `color: ${color};`}
`;

const ChangePassView = React.memo(() => {
  const { t } = useTranslation()
  const { errorMessage, successMessage, isFetching } = useSettingsState();
  const { onChangePassword } = useSettingsActions();
  const [oldPass, setOldPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [rptPass, setRptPass] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      old_password: oldPass,
      new_password: newPass,
      reenter_password: rptPass
    }
    onChangePassword(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Title>{t("settings_title")}</Title>
      <TextInput
        value={oldPass}
        onChange={setOldPass}
        type="text"
        label={t("settings_old-pass-label")}
        placeholder={t("settings_old-pass-plhr")}
      />
      <TextInput
        value={newPass}
        onChange={setNewPass}
        type="password"
        label={t("settings_pass-label")}
        placeholder={t("settings_pass-plhr")}
      />
      <TextInput
        value={rptPass}
        onChange={setRptPass}
        type="password"
        label={t("settings_pass_rpt-label")}
        placeholder={t("settings_pass_rpt-plhr")}
      />
      {errorMessage && <Message color="red">{errorMessage}</Message>}
      {successMessage && <Message color="green">{successMessage}</Message>}
      <MainButton disabled={isFetching} type="submit">{t("settings_pass_btn")}</MainButton>
    </StyledForm>
  );
});

export default ChangePassView;
