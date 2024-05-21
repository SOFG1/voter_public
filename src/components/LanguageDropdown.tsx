import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export const langOptions = [
  { item: "EN", value: "en" },
  { item: "HE", value: "he" },
];

const StyledDropdown = styled.div`
  position: absolute;
  top: 8px;
  inset-inline-end: 70px;
  display: flex;
  gap: 13px;
  align-items: center;
  z-index: 10;
  &:hover {
    z-index: 25;
  }
`;


const Wrapper = styled.div`
  position: relative;
  &:hover .options {
    display: block;
  }
`;

const StyledValue = styled.p`
  padding: 3px 0;
  margin: 0;
  font-size: 23px;
  line-height: 31px;
  font-weight: 700;
  color: #000;
`;

const StyledOptionsBlock = styled.div`
  top: 0;
  display: none;
  position: absolute;
  padding: 3px 4px;
  background-color: #ffffff;
  box-shadow: 0px 67px 27px rgba(0, 0, 0, 0.01),
    0px 37px 22px rgba(0, 0, 0, 0.05), 0px 17px 17px rgba(0, 0, 0, 0.09),
    0px 4px 9px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const StyledOption = styled.p`
  font-weight: 700;
  font-size: 23px;
  margin: 0;
  cursor: pointer;
  padding: 3px 4px;
  border-bottom: 1px solid #d9d9d9;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }
`;


const LanguageDropdown = React.memo(() => {
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir()

  const selectedLang = useMemo(() => {
    return langOptions.find((o) => o.value === i18n.language);
  }, [langOptions, i18n.language]);

  //Replace selected to the first order in dropdown
  const sortedOptions = useMemo(() => {
    if (selectedLang) {
      const withoutSelected = langOptions.filter(
        (o) => o.value !== selectedLang?.value
      );
      return [
        { item: selectedLang.item, value: selectedLang.value },
        ...withoutSelected,
      ];
    }
    return langOptions;
  }, [langOptions, selectedLang]);

  const handleSelect = (val: string) => {
    if (val !== i18n.language) i18n.changeLanguage(val);
  };



  return (
    <StyledDropdown>
      <Wrapper>
        <StyledValue>{selectedLang?.item}</StyledValue>
        <StyledOptionsBlock className="options">
          {sortedOptions.map((o) => (
            <StyledOption key={o.value} onClick={() => handleSelect(o.value)}>
              {o.item}
            </StyledOption>
          ))}
        </StyledOptionsBlock>
      </Wrapper>
    </StyledDropdown>
  );
});

export default LanguageDropdown;
