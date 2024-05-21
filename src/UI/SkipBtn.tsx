import styled from "styled-components"
import pic from '../assets/svg/skip-btn.svg'

const StyledBtn = styled.button`
    font-size: 0;
    height: 40px;
    width: 40px;
    border: 0;
    background-color: transparent;
    background-image: url(${pic});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    &:active {
        box-shadow: 0 0 5px #000;
    }
`

interface IProps {
    onClick?: () => void
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
    className?: string
}

const SkipBtn = ({className, onClick}: IProps) => {
    return <StyledBtn className={className} onClick={onClick}>Skip btn</StyledBtn>
}

export default SkipBtn