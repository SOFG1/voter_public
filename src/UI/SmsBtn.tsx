import React from "react";
import styled from "styled-components";
import ico from "../assets/svg/sms-ico.svg";
import { useTranslation } from "react-i18next";

const ButtonLink = styled.a`
  width: 157px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  background-color: #2D9CDB;
  border: 0;
  font-weight: 400;
  font-size: 20px;
  border-radius: 21px;
  line-height: 27px;
  color: #ffffff;
  padding: 7px;
  text-decoration: none;
`;

interface IProps {
  onClick?: () => void;
  href: string
  className?: string;
}

const CallBtn = React.memo(({ onClick, href, className }: IProps) => {
  const { t } = useTranslation()
  return (
    <ButtonLink href={href} className={className} onClick={onClick}>
      {" "}
      <img src={ico} /> <span>{t("sms")}</span>
    </ButtonLink>
  );
});

export default CallBtn;