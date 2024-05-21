export interface IUserInfo {
  to_call: number;
  called: number;
  good: number;
  bad: number;
  unknown: number;
  is_contacts_uploaded: boolean
  is_sync_contacts: boolean | undefined
  skip_upload_contacts?: boolean
  mode: "status_update" | "questionarie" | "eday_bingo" | "eday_pledge" | "simple"
  ballot_id?: number
}

export interface IUserState {
  token: string | null;
  isAgreed: boolean;
  error: string | null;
  isFetching: boolean;
  skipped_contacts_form: boolean
  userInfo: IUserInfo
}
