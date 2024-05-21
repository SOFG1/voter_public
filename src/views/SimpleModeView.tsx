import React, { useEffect } from "react"
import { Loader, WarningResolveComponent, SearchContact, Stats, UserActions } from "../components"
import { useContactsActions, useContactsState } from "../store/contacts/hooks"
import styled from "styled-components";
import { CallBtn, SkipBtn, SmsBtn } from "../UI";
import { ICurrentContact } from "../store/contacts";
import NameWarningComponent from "../components/NameWarningComponent";


const StyledLoader = styled(Loader)`
  height: 80px;
  width: 80px;
  margin: 0 auto;
`;


const StyledName = styled.h1`
  font-weight: 700;
  font-size: 36px;
  line-height: 49px;
  text-align: center;
  margin-bottom: 10px;
`;


const StyledSkipBtn = styled(SkipBtn)`
  display: block;
  margin: 0 auto 30px;
`;



const ErrorMessage = styled.p`
    margin: 70px 0 30px;
    font-weight: 700;
    text-align: center;
    font-size: 40px;
    line-height: 54px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px; 
  align-items: center;
`;


const SimpleModeView = React.memo(() => {
  const { currentContact, error, previousId, isFetching } = useContactsState();
  const { onNext, onAnswer, onSelect } = useContactsActions();

  useEffect(() => {
    if (!currentContact) onNext();
  }, [currentContact]);

  const handlePrev = () => {
    if (previousId !== null) onSelect(previousId)
  }


  useEffect(() => {
    if (!currentContact) onNext()
  }, [currentContact])


  if (isFetching) return <StyledLoader />
  return (

    <>
      <Stats />
      {!!currentContact?.warning?.length && (
        <WarningResolveComponent currentContact={currentContact as ICurrentContact} />
      )}
      {currentContact?.name_warning && (
        <NameWarningComponent warningText={currentContact?.name_warning} />
      )}
      <SearchContact />
      <StyledName>{currentContact?.first_name} {currentContact?.last_name}</StyledName>
      <StyledName>{currentContact?.city}</StyledName>

      <StyledSkipBtn onClick={onNext} />
      <UserActions
        onLeft={() => onAnswer(2)}
        onRight={() => onAnswer(1)}
        onCenter={() => onAnswer(3)}
        onDown={previousId !== null ? handlePrev : undefined}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {currentContact && <BtnBox>
        <CallBtn href={`tel:${currentContact?.phone}`} />
        <SmsBtn href={`sms:${currentContact?.phone}`} />
      </BtnBox>}
    </>

  );
})

export default SimpleModeView