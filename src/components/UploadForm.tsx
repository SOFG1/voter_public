import React, { useRef, useCallback } from "react";
import styled from "styled-components";
import { useContactsActions, useContactsState } from "../store/contacts/hooks";
import { MainButton } from "../UI";
import Loader from "./Loader";
import { useUserActions, useUserState } from "../store/user/hooks";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StyledWrapper = styled.div`
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
  margin-bottom: 20px;
`;

const AppLink = styled.a`
  color: blue;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
`;

const FileInput = styled.input`
  margin-bottom: 90px;
`;

const StyledLoader = styled(Loader)`
  margin: 15px auto;
`;

const ButtonBox = styled.div`
    display: flex;
    gap: 5px;
`

const UploadForm = React.memo(() => {
  const { t } = useTranslation()
  const { userInfo, skipped_contacts_form } = useUserState()
  const { onSetSkipForm } = useUserActions()
  const { isFetching } = useContactsState();
  const { onUploadContacts, onUploadCSVFile, onSkipContacts } = useContactsActions();
  const supported = "contacts" in navigator;

  const FileInputRef = useRef<HTMLInputElement>(null);
  const onHandleFile = () => {
    if (FileInputRef.current?.files && FileInputRef.current?.files[0]) {
      onUploadCSVFile(FileInputRef.current?.files[0]);
    }
  };


  const handleSkip = useCallback(async () => {
    onSetSkipForm(true)
    onSkipContacts()
  }, [])


  if (skipped_contacts_form) return <Navigate to="/" />;

  return (
    <StyledWrapper>
      <Title>{t("upload-title")}</Title>
      {supported && (
        <>
          <Text>{t("upload-subtitle")}</Text>
          <MainButton disabled={isFetching} onClick={onUploadContacts}>
            {t("upload-btn")}
          </MainButton>
        </>
      )}
      {!supported && (
        <div>
          <AppLink
            target="_blank"
            href="https://apps.apple.com/ru/app/export-contacts-by-covve/id1532203461?l=en"
          >
            {t("upload-app_link")}
          </AppLink>
          <Text>
            {t("upload-text")}
          </Text>
          <FileInput
            accept=".csv"
            ref={FileInputRef}
            type="file"
            placeholder={t("upload-upload_plhr")}
            required={true}
          />
          <ButtonBox>
            {userInfo.skip_upload_contacts && <MainButton onClick={handleSkip} disabled={isFetching}>{t("upload-upload_skip")}</MainButton>}
            <MainButton onClick={onHandleFile} disabled={isFetching}>{t("upload-upload_btn")}</MainButton>
          </ButtonBox>
        </div>
      )}
      {isFetching && <StyledLoader />}
    </StyledWrapper>
  );
});

export default UploadForm;
