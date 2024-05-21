import React from "react";
import styled from "styled-components";
import pic1 from "../assets/svg/good.svg";
import pic2 from "../assets/svg/question.svg";
import pic3 from "../assets/svg/bad.svg";
import { useTranslation } from "react-i18next";

const Block = styled.div`
  max-width: 280px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2px;
  background: #c2fffd;
  border: 1px solid #c2fffd;
  box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  overflow: hidden;
`;

const CellL = styled.div`
  text-align: center;
  grid-column: span 3;
  background-color: #fff;
  padding: 5px;
`;
const CellS = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: span 2;
  background-color: #fff;
  padding: 5px;
`;

const Text = styled.span`
  font-size: 14px;
  margin-inline-end: 10px;
`;

const Value = styled.span<{ color: string }>`
  font-weight: 700;
  font-size: 14px;
  color: ${({ color }) => color};
`;

const Pic = styled.img`
  height: 13px;
  width: 13px;
  objec-fit: contain;
  object-position: center bottom;
  margin-inline-end: 5px;
`;

interface IProps {
  toCall: number
  called: number
  good: number
  unknown: number
  bad: number
  className?: string
}

const StatsTable = React.memo(({ toCall, called, good, unknown, bad, className }: IProps) => {
  const { t } = useTranslation()
  return (
    <Block className={className}>
      <CellL>
        <Text>{t("to_call")}</Text>
        <Value color="#27AE60">{toCall}</Value>
      </CellL>
      <CellL>
        <Text>{t("called")}</Text>
        <Value color="#2D9CDB">{called}</Value>
      </CellL>
      <CellS>
        <Pic src={pic1} />
        <Value color="#12E069">{good}</Value>
      </CellS>
      <CellS>
        <Pic src={pic2} />
        <Value color="#443E3E">{unknown}</Value>
      </CellS>
      <CellS>
        <Pic src={pic3} />
        <Value color="#FF1100">{bad}</Value>
      </CellS>
    </Block>
  );
});

export default StatsTable;
