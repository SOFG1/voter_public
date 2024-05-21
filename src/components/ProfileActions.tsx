import styled from "styled-components"
import { useUserActions } from "../store/user/hooks"
import { LogoutBtn, SettingsBtn } from "../UI"
import { Link } from "react-router-dom";

const Box = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding: 0 20px;
`

const ProfileActions = () => {
    const {onLogout} = useUserActions()
    return <Box>
        
        <Link to="/settings"><SettingsBtn /></Link>
        <LogoutBtn onClick={onLogout} />
    </Box>
}

export default ProfileActions