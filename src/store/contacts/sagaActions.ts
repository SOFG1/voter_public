import { createAction } from "@reduxjs/toolkit";
import { AnswerType, ContactStatusType, IContact } from "./types";

export const uploadContacts = createAction<IContact[]>('contacts/uploadContacts')
export const uploadCSVFile = createAction<File>('contacts/uploadCSVFile')

export const contactsNext = createAction('contacts/next');

export const contactsSelect = createAction<number>('contacts/select')

export const contactsWarningResolve = createAction<{contactId: number, validId: number | null}>('contacts/warningResolve')

export const contactsNameWarningResolve = createAction('contacts/nameWarningResolve')


export const contactsSetAnswer = createAction<ContactStatusType>('contacts/setAnswer')

export const contactsGetQuestionnaire = createAction('contacts/getQuestionnaire')
export const contactsSetAnswerQuestionnaire = createAction<{question: number, answer: number, isLastQuestion: boolean}>('contacts/setAnswerQuestionnaire')

export const contactsSkipUpload = createAction('contacts/skipUpload')

