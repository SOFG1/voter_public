import React from "react"
import styled from "styled-components"

const StyledWrapper = styled.label`
    padding: 2px 5px;
    border: 1px dashed #d0d9de;
    color: rgb(27, 189, 212);
    margin-bottom: 5px;
`

const StyledInput = styled.input`
    display: none;
`

interface IProps {
    label: string
    onChange: (f: File[]) => void
    multiple?: boolean
    accept?: string
    className?: string
}

const FileInput = React.memo(({ label, onChange, multiple, accept, className }: IProps) => {

    return <StyledWrapper className={className}>
        {label}
        <StyledInput type="file" multiple={multiple} onChange={(e) => onChange(Array.from(e.target.files as FileList))} accept={accept} />
    </StyledWrapper>
})

export default FileInput