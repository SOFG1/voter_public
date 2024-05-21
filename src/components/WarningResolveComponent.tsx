import React, { useState } from "react";
import styled from "styled-components";
import { ICurrentContact } from "../store/contacts";
import { useContactsActions } from "../store/contacts/hooks";
import { MainButton, RadioInput } from "../UI";
import Modal from "./Modal";
import { useTranslation } from "react-i18next";

const Wrapper = styled.form`
  max-width: 340px;
  padding: 13px 18px 18px;
  border: 1px solid #c2fffd;
  box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  background-color: #fff;
  height: 70vh;
  overflow-y: auto;
`;

const Message = styled.p`
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 20px;
`;

const Hint = styled.p`
  font-weight: 300;
  font-size: 14px;
  line-height: 19px;
  color: #000000;
  margin-bottom: 12px;
`;

const Match = styled.label`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 10px;
`;

const MatchText = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
`;

const SubmitBtn = styled(MainButton)`
  display: block;
  width: 200px;
  margin: 10px auto 0 ;
`;

const WarningResolveComponent = React.memo(({ currentContact }: { currentContact: ICurrentContact }) => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<number | null | undefined>(undefined)
  const { onResolveWarning } = useContactsActions()


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selected !== undefined) {
      onResolveWarning(currentContact.id, selected)
    }
  }


  return (
    <Modal onClose={() => console.log("user can't close this modal")}>
      <Wrapper onSubmit={(e) => handleSubmit(e)}>
        <Message>
          {t("warning_resolve_message", {name: currentContact.first_name, last_name: currentContact.last_name && currentContact.last_name})}
          {` (${currentContact.phone}).`}
        </Message>
        <Hint>{t("warning_resolve_hint")}</Hint>

        {currentContact.warning.map((w, index) => {
          return (
            <Match key={index}>
              <RadioInput
                selected={selected === w.id}
                onSelect={() => setSelected(w.id)}
              />
              <MatchText>{w?.first_name} {w?.last_name} {w?.phone}</MatchText>
            </Match>
          )
        })}

        <Match>
          <RadioInput
            selected={selected === null}
            onSelect={() => setSelected(null)}
          />
          <MatchText>{t("warning_resolve_none")}</MatchText>
        </Match>

        <SubmitBtn disabled={selected === undefined}>{t("warning_resolve_submit")}</SubmitBtn>
      </Wrapper>
    </Modal>
  );
});

export default WarningResolveComponent;
