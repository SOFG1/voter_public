import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "..";
import { contactsClearNameWarning, contactsSetIsFetching } from "./reducer";
import { uploadContacts, contactsNext, contactsWarningResolve, contactsSetAnswer, uploadCSVFile, contactsSelect, contactsGetQuestionnaire, contactsSetAnswerQuestionnaire, contactsSkipUpload, contactsNameWarningResolve } from "./sagaActions";
import { ContactStatusType, IContact } from "./types";

export const contactsSelector = (state: RootState) => state.contacts;

export const useContactsState = () => useSelector(contactsSelector);

export const useContactsActions = () => {
  const dispatch = useDispatch();

  const onSetIsFetching = (val: boolean) => {
    dispatch(contactsSetIsFetching(val));
  };

  const onUploadContacts = async () => {
    dispatch(contactsSetIsFetching(true));
    //@ts-ignore
    const rawContacts: any[] = await navigator.contacts.select(
      ["name", "tel"],
      { multiple: true }
    );
    dispatch(contactsSetIsFetching(false));
    if (rawContacts.length > 0) {
      const contacts: IContact[] = rawContacts.map((c) => {
        return {
          first_name: c.name[0] ? c.name[0] : "",
          phone: c.tel[0] ? c.tel[0] : "",
        };
      });
      dispatch(uploadContacts(contacts));
    }
  };

  const onUploadCSVFile = (csvFile: File) => {
    dispatch(uploadCSVFile(csvFile))
  }

  const onNext = () => {
    dispatch(contactsNext())
  }

  const onSelect = (id: number) => {
    dispatch(contactsSelect(id))
  }

  const onResolveWarning = (contactId: number, validId: number | null) => {
    dispatch(contactsWarningResolve({ contactId, validId }))
  }

  const onAnswer = (status: ContactStatusType) => {
    dispatch(contactsSetAnswer(status))
  }

  const onGetQuestionnaire = () => {
    dispatch(contactsGetQuestionnaire())
  }

  const onAnswerQuestionnaire = (question_id: number, a: number, isLastQuestion: boolean) => {
    dispatch(contactsSetAnswerQuestionnaire({ question: question_id, answer: a, isLastQuestion }))
  }

  const onSkipContacts = () => {
    dispatch(contactsSkipUpload())
  }

  const onResolveNameWarning = () => {
    dispatch(contactsNameWarningResolve())
  }


  const onClearNameWarning = () => {
    dispatch(contactsClearNameWarning())
  }


  return {
    onSetIsFetching,
    onUploadContacts,
    onUploadCSVFile,
    onNext,
    onResolveWarning,
    onAnswer,
    onSelect,
    onGetQuestionnaire,
    onAnswerQuestionnaire,
    onSkipContacts,
    onResolveNameWarning,
    onClearNameWarning
  };
};
