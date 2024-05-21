import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HOCPage, Main, Settings, SignIn } from './pages'
import { useUserActions } from './store/user/hooks';
import { useAppActions, useAppState } from './store/app/hooks';
import { Modal } from './components';
import styled from 'styled-components';
import LanguageDropdown from './components/LanguageDropdown';

const StyledMessage = styled.p<{ error: boolean }>`
  font-size: 22px;
  color:  ${({ error }) => error ? "red" : "green"};
  
`

function App() {
  const { alert } = useAppState()
  const { onSetAlert } = useAppActions()
  const { onGetUserInfo } = useUserActions()
  useEffect(() => {
    onGetUserInfo()
  }, [])


  return (
    <div className="App">
      <LanguageDropdown />
      {alert && <Modal onClose={() => onSetAlert(null)}><StyledMessage error={!alert.success}>{alert.text}</StyledMessage></Modal>}
      <Routes>
        <Route path="/" element={<HOCPage><Main /></HOCPage>} />
        <Route path="/settings" element={<HOCPage><Settings /></HOCPage>} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
