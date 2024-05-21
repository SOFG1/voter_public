import styled from "styled-components";
import SettingsIcon from '../assets/svg/settings-logo.svg'


const SettingsBtn = styled.button`
    height: 30px;
    width: 30px;
    background-color: transparent;
    border: 0;
    background-image: url(${SettingsIcon});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
`

export default SettingsBtn