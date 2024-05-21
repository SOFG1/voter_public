import React, { useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useUserState } from "../store/user/hooks";

const HOCPage = ({ children }: { children: JSX.Element }) => {
  const { token, isAgreed, userInfo, skipped_contacts_form } = useUserState();
  const contactsNeeded = useMemo(() => {
    return (
      !userInfo?.is_contacts_uploaded && userInfo?.is_sync_contacts === true && !skipped_contacts_form
    );
  }, [userInfo, skipped_contacts_form]);
  if (!token || !isAgreed || contactsNeeded) return <Navigate to="/sign-in" />;
  return <>{children}</>;
};

export default HOCPage;
