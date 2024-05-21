import React, { useCallback, useMemo } from "react"
import styled from "styled-components";
import searchIcon from "../assets/svg/search.svg";
import arrowIcon from "../assets/svg/arrow-bottom.svg";
import { useEffect, useState } from "react";
import goodPic from "../assets/svg/good.svg";
import badPic from "../assets/svg/bad.svg";
import unknownPic from "../assets/svg/question.svg";
import statusTruePic from "../assets/img/status-true.png";
import statusFalsePic from "../assets/img/status-false.png";
import { Loader } from ".";
import { useUserState } from "../store/user/hooks";
import { handle } from "../api";
import { Contacts } from "../api/Contacts";
import { useContactsActions } from "../store/contacts/hooks";
import { escapeRegExp } from "../utils/escapeRegExp";

const Wrapper = styled.div`
  max-width: 240px;
  margin: 0 auto;
  position: relative;
`;

const StyledInput = styled.input<{ opened: boolean }>`
  padding: 10px 30px;
  width: 100%;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #455b66;
  border: 1px solid #d0d9de;
  box-shadow: inset 0px 4px 15px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  ${({ opened }) => opened && "border-radius: 20px 20px 0 0;"}
  &:focus {
    outline: none;
  }
`;

const SearchPic = styled.img`
  position: absolute;
  top: 13px;
  left: 12px;
  height: 16px;
  width: 16px;
  object-fit: contain;
  pointer-events: none;
`;

const ArrowPic = styled.img`
  position: absolute;
  top: 18px;
  right: 17px;
  height: 7px;
  width: 14px;
  object-fit: contain;
  pointer-events: none;
`;

const Results = styled.div<{ opened: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #d0d9de;
  box-shadow: inset 0px 4px 15px rgba(0, 0, 0, 0.05);
  border-radius: 0 0 20px 20px;
  max-height: 155px;
  overflow-y: auto;
  ${({ opened }) => !opened && "display: none;"}
`;

const Result = styled.div`
  position: relative;
  line-height: 22px;
  padding: 3px 32px 3px 12px;
  margin-bottom: 5px;
  cursor: pointer;
  &:first-child {
    padding: 10px 32px 3px 10px;
  }
`;

const StyledIcon = styled.img`
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    height: 13px;
    width: 13px;
`

const LocaderWrapper = styled.div`
  height: 20px;
  width: 20px;
  margin: 4px auto;
  & > div {
    height: 100%;
    width: 100%;
  }
`;



const SimpleModeIcons: any = {
  "good": goodPic,
  "bad": badPic,
  "unknown": unknownPic,
}

const StatusModeIcons: any = {
  "unknown": statusFalsePic,
  "called": statusTruePic,
}

interface IProps {
  className?: string
}

const SearchContact = React.memo(({ className }: IProps) => {
  const { token, userInfo } = useUserState();
  const { onSelect } = useContactsActions()
  const [opened, setOpened] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [options, setOptions] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const handleFetchOptions = useCallback(async () => {
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        Contacts.searchContact(token)
      );
      if (dataRes) {
        const result = dataRes.map((c: any) => {
          return {
            id: c.id,
            name: `${c.first_name} ${c.last_name} ${c.city || ""}`,
            status: c.status,
          }
        });
        setOptions(result);
      }
      if (dataErr) {
        console.log(dataErr);
      }
      setIsFetching(false);
    }
  }, [token])

  useEffect(() => {
    handleFetchOptions()
  }, [handleFetchOptions])

  const handleSelect = (id: number) => {
    setOpened(false);
    onSelect(id);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setOpened(false);
    }, 150);
  };

  const optionsFitlered = useMemo(() => {
    const pattern = escapeRegExp(searchText);
    return options.filter(o => {
      return o.name.match(pattern)
    })
  }, [searchText, options])


  return (
    <Wrapper className={className}>
      <SearchPic src={searchIcon} />
      {!isFetching && <ArrowPic src={arrowIcon} />}

      <StyledInput
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setOpened(true)}
        onBlur={() => handleBlur()}
        opened={opened}
      />
      <Results opened={opened}>
        {optionsFitlered.map((o) => {
          const nameFormated = o.name?.replaceAll(" null ", "")
          return <Result
          key={o.id}
          onClick={(e) => handleSelect(o.id)}
        >
          {nameFormated}
          {o.status !== null && userInfo.mode !== "questionarie" && <StyledIcon src={SimpleModeIcons[o.status.description] || ""} />}
          {o.status !== null && userInfo.mode === "questionarie" && <StyledIcon src={StatusModeIcons[o.status.description] || ""} />}
        </Result>
        })}
        {isFetching && (
          <LocaderWrapper>
            <Loader />
          </LocaderWrapper>
        )}
      </Results>
    </Wrapper>
  );
});

export default SearchContact;
