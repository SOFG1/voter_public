import React from "react"
import Modal from "./Modal"
import styled from "styled-components";
import { MainButton } from "../UI";
import { useContactsActions } from "../store/contacts/hooks";
import { useTranslation } from "react-i18next";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
  max-width: 340px;
  padding: 13px 18px 18px;
  border: 1px solid #c2fffd;
  box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  background-color: #fff;
  height: 30vh;
  min-height: 150px;
  overflow-y: auto;
`;

const Message = styled.p`
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 80px;
`;

const StyledBtnBox = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: auto;
`

const StyledBtn = styled(MainButton)`
    width: 100px;
`


interface IProps {
    warningText: string
}

const NameWarningComponent = React.memo(({ warningText }: IProps) => {
    const { t } = useTranslation()
    const { onResolveNameWarning, onClearNameWarning } = useContactsActions()

    return <Modal onClose={() => { }}>
        <Wrapper>
            <Message>
                {warningText}
            </Message>
            <StyledBtnBox>
                <StyledBtn onClick={onClearNameWarning}>{t("warning_resolve_yes")}</StyledBtn>
                <StyledBtn onClick={onResolveNameWarning}>{t("warning_resolve_no")}</StyledBtn>
            </StyledBtnBox>
        </Wrapper>
    </Modal>
})

export default NameWarningComponent