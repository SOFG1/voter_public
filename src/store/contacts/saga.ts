import { call, put, select, takeLatest, takeLeading } from "redux-saga/effects";
import { handle } from "../../api";
import { Contacts } from "../../api/Contacts";
import { userSelector } from "../user/hooks";
import { userGetUserInfo } from "../user/sagaActions";
import { contactsSelector } from "./hooks";
import {
  contactsClearNameWarning,
  contactsClearWarnings,
  contactsSetAddedValid,
  contactsSetCurrent,
  contactsSetError,
  contactsSetIsFetching,
  contactsSetQuestionnaire,
  contactsSetTotalValid,
} from "./reducer";
import {
  uploadContacts,
  contactsNext,
  contactsWarningResolve,
  contactsSetAnswer,
  uploadCSVFile,
  contactsSelect,
  contactsGetQuestionnaire,
  contactsSetAnswerQuestionnaire,
  contactsSkipUpload,
  contactsNameWarningResolve,
} from "./sagaActions";
import { AnswerType, ContactStatusType, IContact } from "./types";
import { appSetAlert } from "../app/reducer";

export function* contactsWatcher() {
  yield takeLatest(uploadContacts, upload);
  yield takeLatest(uploadCSVFile, uploadCSV);
  yield takeLatest(contactsNext, getNext);
  yield takeLatest(contactsSelect, getSelected);
  yield takeLatest(contactsWarningResolve, resolveWarning);
  yield takeLatest(contactsSetAnswer, setAnswer);
  yield takeLeading(contactsGetQuestionnaire, getQuestionnaire);
  yield takeLeading(contactsSetAnswerQuestionnaire, setAnswerQuestiionnaire);
  yield takeLeading(contactsSkipUpload, skipUpload);
  yield takeLeading(contactsNameWarningResolve, nameWarningResolve);


}

function* upload({ payload }: { payload: IContact[] }): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(contactsSetIsFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Contacts.contactsUpload({ contacts: payload }, token)
    );
    if (!dataErr) {
      yield put(userGetUserInfo());
      yield put(contactsSetIsFetching(false));
    }
    if (dataRes) {
      yield put(contactsSetAddedValid(dataRes.added_valid_contacts));
      yield put(contactsSetTotalValid(dataRes.total_valid_contacts));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* uploadCSV({ payload }: { payload: File }): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(contactsSetIsFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Contacts.uploadCsv(payload, token)
    );
    if (!dataErr) {
      yield put(userGetUserInfo());
      yield put(contactsSetIsFetching(false));
    }
    if (dataRes) {
      yield put(contactsSetAddedValid(dataRes.added_valid_contacts));
      yield put(contactsSetTotalValid(dataRes.total_valid_contacts));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getNext(): any {
  const { token } = yield select(userSelector);
  const { currentContact } = yield select(contactsSelector)
  if (token) {
    yield put(contactsSetIsFetching(true));
    const [dataRes, dataErr] = yield call(handle, Contacts.getNext(token, currentContact?.id || null));
    if (dataRes) {
      yield put(contactsSetCurrent(dataRes));
    }
    if (dataErr) {
      yield put(contactsSetError(dataErr.detail || "Error occured"));
      yield put(contactsSetCurrent(null));
    }
    yield put(contactsSetIsFetching(false));
  }
}

function* getSelected({ payload }: { payload: number }): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(contactsSetIsFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Contacts.getSelected(payload, token)
    );
    if (dataRes) {
      yield put(contactsSetCurrent(dataRes));
    }
    if (dataErr) {
      yield put(contactsSetCurrent(null));
      yield put(contactsSetError(dataErr.detail));
    }
    yield put(contactsSetIsFetching(false));
  }
}

function* resolveWarning({
  payload,
}: {
  payload: { contactId: number; validId: number | null };
}): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(contactsSetIsFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Contacts.warningResolve(payload.contactId, payload.validId, token)
    );
    yield put(contactsSetIsFetching(false));
    if (!dataErr) {
      yield put(contactsClearWarnings());
    }
  }
}

function* setAnswer({ payload }: { payload: ContactStatusType }): any {
  const { token } = yield select(userSelector);
  const { currentContact } = yield select(contactsSelector);
  if (token && currentContact) {
    yield put(contactsSetIsFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Contacts.setAnswer(currentContact.id, payload, token)
    );
    yield put(contactsSetIsFetching(false));
    if (dataRes) {
      yield put(contactsSetCurrent(dataRes));
      //update userinfo(stats)
      yield put(userGetUserInfo());
    }
    if (dataErr) {
      yield put(contactsSetCurrent(null));
      yield put(contactsSetError(dataErr.detail));
      console.log(dataErr);
    }
  }
}

function* getQuestionnaire(): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(contactsSetIsFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Contacts.getQuestionnaire(token)
    );
    yield put(contactsSetIsFetching(false));
    if (dataRes) {
      yield put(contactsSetQuestionnaire(dataRes));
    }
    if (dataErr) {
      yield put(contactsSetError(dataErr.detail));
    }
  }
}

function* setAnswerQuestiionnaire({ payload }: { payload: { question: number, answer: number, isLastQuestion: boolean } }): any {
  const { token } = yield select(userSelector);
  const { questionnaire, currentContact } = yield select(contactsSelector)
  if (token) {
    yield put(contactsSetIsFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Contacts.setQuestionnaireAnswer(token, currentContact.id, questionnaire.id, [payload])
    );
    yield put(contactsSetIsFetching(false));
    console.log(payload.isLastQuestion)
    if (dataRes && payload.isLastQuestion) {
      yield put(contactsSetCurrent(dataRes))
    }
    if (dataErr) {
      const message = dataErr.error || dataErr.detail || "Error"
      yield put(appSetAlert({ success: false, text: message }))
      console.log(dataErr);
    }
  }
}


function* skipUpload(): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(contactsSetIsFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Contacts.skipUploadContacts(token)
    );
    yield put(contactsSetIsFetching(false));
    if (!dataErr) {
      yield put(userGetUserInfo())
    }
    if (dataErr) {
      yield put(appSetAlert({ success: false, text: dataErr?.error || "Error occured" }))
    }
  }
}


function* nameWarningResolve(): any {
  const { token } = yield select(userSelector);
  const { currentContact } = yield select(contactsSelector)

  if (token) {
    const [dataRes, dataErr] = yield call(
      handle,
      Contacts.resolveNameWarning(token, currentContact.id)
    );
    if (!dataErr) {
      yield put(contactsClearNameWarning())
    }
    if (dataErr) {
      yield put(appSetAlert({ success: false, text: dataErr?.error || "Error occured" }))
    }
  }
}

