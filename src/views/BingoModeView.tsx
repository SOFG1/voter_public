import React from "react"
import styled from "styled-components"
import { BingoImageComponent, SetBingoComponent } from "../components"
import { useContactsState } from "../store/contacts/hooks"
import NameWarningComponent from "../components/NameWarningComponent"
import { useTranslation } from "react-i18next"


const StyledText = styled.p`
margin: 20px 0;
`


const BingoModeView = React.memo(() => {
    const { t } = useTranslation()
    const { currentContact } = useContactsState()


    return <>
        <SetBingoComponent />
        {currentContact?.name_warning && (
            <NameWarningComponent warningText={currentContact?.name_warning} />
        )}
        <StyledText>{t("bingo_or")}</StyledText>
        <BingoImageComponent />
    </>
})

export default BingoModeView