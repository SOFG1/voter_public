import styled from "styled-components"
import LogoutIcon from '../assets/svg/logout-logo.svg'

const LogoutBtn = styled.button`
    height: 30px;
    width: 30px;
    background-color: transparent;
    border: 0;
    background-image: url(${LogoutIcon});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
`
export default LogoutBtn