export interface IContact {
    first_name: string
    phone: string
}

export type ContactStatusType = 1 | 2 | 3

export type WarningType = {
    id: number
    tzid: string
    first_name: string
    last_name?: string
    phone: string
}

export interface ICurrentContact {
    id: number
    first_name: string
    last_name?: string
    phone: string
    city?: string
    name_warning?: string
    warning: WarningType[]
}

export type StateKeyType = keyof IContactsState

export type AnswerType = "unknown" | "no" | "yes"

export interface IAnswer {
    id: number
    answer_words: AnswerType
    related_question: IQuestion | null
    value_to_set: any | null
}

export interface IQuestion {
    field_to_update: string | null
    id: number
    query: string
    query_pos: number
    query_wording: string
    answers_options: IAnswer[]
}

export interface IQuestionnaire {
    id: number
    name: string
    questions: IQuestion[]
}

export interface IContactsState {
    error: string | null
    isFetching: boolean
    added_valid_contacts: number
    total_valid_contacts: number
    currentContact: ICurrentContact | null
    previousId: number | null
    questionnaire: IQuestionnaire | null
    contacts: any[]
}