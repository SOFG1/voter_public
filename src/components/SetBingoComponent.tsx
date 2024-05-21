import React, { useCallback, useEffect, useState } from "react"
import { MainButton, TextInput } from "../UI"
import styled from "styled-components"
import { useUserState } from "../store/user/hooks"
import { useDebounce } from "use-debounce"
import { handle } from "../api"
import { onlyNumbersValidator } from "../utils/onlyNumbersValidator"
import { Contacts } from "../api/Contacts"
import { useAppActions } from "../store/app/hooks"
import { useTranslation } from "react-i18next"

const StyledBtn = styled(MainButton)`
    max-width: 200px;
    margin-bottom: 10px;
`


const SetBingoComponent = React.memo(() => {
    const { t } = useTranslation()
    const { token, userInfo } = useUserState()
    const { onSetAlert } = useAppActions()
    const [ballotNumber, setBallotNumber] = useState<string>(userInfo.ballot_id ? String(userInfo.ballot_id) : "")
    const [voterNumber, setVoterNumber] = useState<string>("")
    const [error, setError] = useState<string | undefined>(undefined)
    const [value] = useDebounce(ballotNumber, 1500);
    const [isFetching, setIsFetching] = useState<boolean>(false)

    const handleFetch = useCallback(async () => {
        if (token) {
            const [dataRes, dataErr] = await handle(Contacts.checkBallotId(token, Number(value)))
            if (!dataErr) {
                setError(undefined)
            }
            if (dataErr) {
                setError(dataErr.error)
            }
        }
    }, [token, value])

    useEffect(() => {
        handleFetch()
    }, [handleFetch])

    useEffect(() => {
        setError(undefined)
    }, [ballotNumber])

    const handleChangeBallotId = useCallback((val: string) => {
        if (onlyNumbersValidator(val) || !val) {
            setBallotNumber(val)
        }
    }, [])

    const handleChangeNumber = useCallback((val: string) => {
        if (onlyNumbersValidator(val) || !val) {
            setVoterNumber(val)
        }
    }, [])


    const handleSetBingo = useCallback(async () => {
        if (token) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Contacts.setBingo(token, Number(ballotNumber), Number(voterNumber)))
            setIsFetching(false)
            if (!dataErr) {
                onSetAlert({ success: true, text: t("bingo_success") })
            }
            if (dataErr) {
                onSetAlert({ success: false, text: dataErr.error })
            }
        }
    }, [token, ballotNumber, voterNumber, t])



    return <>
        <TextInput value={ballotNumber} disabled={!!userInfo.ballot_id} onChange={handleChangeBallotId} label={t("ballot_number")} placeholder={t("ballot_number")} errorMessage={error} />
        <TextInput value={voterNumber} onChange={handleChangeNumber} label={t("voter_number")} placeholder={t("voter_number")} />
        <StyledBtn disabled={!ballotNumber || !voterNumber || !!error || isFetching} onClick={handleSetBingo}>{t("bingo_submit")}</StyledBtn>
    </>
})

export default SetBingoComponent