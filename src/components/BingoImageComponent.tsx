import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components"
import { FileInput, MainButton } from "../UI"
import { useUserState } from "../store/user/hooks"
import { Contacts } from "../api/Contacts"
import { handle } from "../api"
import { useAppActions } from "../store/app/hooks"
import { useTranslation } from "react-i18next"


const StyledFile = styled.p`
    margin: 0 0 10px;
`

const StyledImage = styled.img`
    height: 300px;
    width: 300px;
    object-fit: contain;
`

const StyledBtn = styled(MainButton)`
    max-width: 200px;
    margin-bottom: 10px;
`

const StyledInput = styled(FileInput)`
    margin-bottom: 15px;
`

const BingoImageComponent = React.memo(() => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const { onSetAlert } = useAppActions()
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<null | string>(null)
    const [isFetching, setIsFetching] = useState<boolean>(false)


    useEffect(() => {
        let url: any
        if (file) {
            url = URL.createObjectURL(file)
            setPreview(url)
        }
        return () => {
            if (url) {
                URL.revokeObjectURL(url)
            }
        }
    }, [file])


    const onSubmit = useCallback(async () => {
        if (token && file) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Contacts.setBingoPhoto(token, file))
            setIsFetching(false)
            if (!dataErr) {
                onSetAlert({ success: true, text: "Successfully sent" })
            }
            if (dataErr) {
                onSetAlert({ success: false, text: dataErr.error })
            }
        }
    }, [token, file])


    return <>
        <StyledInput accept="image/png, image/jpeg" label={t("bingo_image")} onChange={(f) => { if (f[0]) setFile(f[0]) }} />
        {preview && <StyledImage src={preview} />}
        {file && <StyledFile >{file.name}</StyledFile>}
        <StyledBtn disabled={!file || isFetching} onClick={onSubmit}>{t("bingo_image_submit")}</StyledBtn>

    </>
})

export default BingoImageComponent