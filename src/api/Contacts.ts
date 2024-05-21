import { axiosInstance } from ".";
import { AnswerType, ContactStatusType, IContact } from "../store/contacts";

export const Contacts = {
  contactsUpload: async (params: { contacts: IContact[] }, token: string) => {
    return await axiosInstance.post("contacts/upload/", params, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  uploadCsv: async (file: File, token: string) => {
    const params = new FormData();
    params.append("file", file);
    return await axiosInstance.post("contacts/upload/csv/", params, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  skipUploadContacts: async (token: string) => {
    return await axiosInstance.post("/skip_upload_contacts/",{}, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getNext: async (token: string, currentContactId: number | null) => {
    return await axiosInstance.get("contacts/next/", {
      params: {
        current_contact: currentContactId
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getSelected: async (id: number, token: string) => {
    return await axiosInstance.get(`contacts/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  setAnswer: async (id: number, status: ContactStatusType, token: string) => {
    return await axiosInstance.post(
      `contacts/setanswer/${id}/`,
      { status },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  searchContact: async (token: string) => {
    return await axiosInstance.get(`contacts/search/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  warningResolve: async (
    contactId: number,
    valid_id: number | null,
    token: string
  ) => {
    return await axiosInstance.post(
      `contacts/warning_resolve/${contactId}/`,
      { valid_id },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getQuestionnaire: async (token: string) => {
    return await axiosInstance.get(`get_questionarie/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  setQuestionnaireAnswer: async (
    token: string,
    contact_id: number,
    questionarie_id: number,
    answers: { question: number; answer: number }[]
  ) => {
    return await axiosInstance.post(
      `contacts/setanswer_questionarie/${contact_id}/`,
      { questionarie: questionarie_id, answers },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  checkBallotId: async (token: string, ballot_id: number) => {
    return await axiosInstance.post(
      `check_ballot_id/`,
      { ballot_id },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  setBingo: async (
    token: string,
    ballot_id: number,
    voter_in_ballot_id: number
  ) => {
    return await axiosInstance.post(
      `set_bingo/`,
      { ballot_id, voter_in_ballot_id },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  setBingoPhoto: async (token: string, img: File) => {
    const data = new FormData();
    data.append("file", img);
    return await axiosInstance.post(`drive_upload/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  resolveNameWarning: async (token: string, contactId: number) => {
    return await axiosInstance.post(`contacts/defferent_name/${contactId}/`, {}, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
};
