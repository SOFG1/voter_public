import React, { createRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const StyledLabel = styled.label`
  display: block;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #455b66;
  margin-bottom: 5px;
  margin-inline-start: 14px;
`;

const StyledInput = styled.input<{ hasError: boolean, disabled?: boolean }>`
  width: 100%;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #000;
  padding: 19px 20px;
  background: #ffffff;
  border: 1px solid ${({ hasError }) => hasError ? "red" : "#d0d9de"};
  ${({ hasError }) => hasError && "outline-color: red;"}
  box-shadow: inset 0px 4px 15px "#000000c";
  border-radius: 125px;
  ${({disabled}) => disabled && "background-color: #cccccc;"}
  &::placeholder {
    color: #455b66;
  }
`;

const StyledError = styled.p`
  margin: 2px 0 0;
  color: #ff0000;
`

interface IProps {
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "password";
  label?: string;
  placeholder?: string;
  className?: string;
  errorMessage?: string
  disabled?: boolean
}

const TextInput = ({
  value,
  onChange,
  type = "text",
  label,
  placeholder,
  errorMessage,
  disabled,
  className,
}: IProps) => {
  const inputRef = React.createRef<HTMLInputElement>();
  return (
    <Wrapper className={className}>
      {label && (
        <StyledLabel onClick={() => inputRef.current?.focus()}>
          {label}
        </StyledLabel>
      )}
      <StyledInput
        hasError={!!errorMessage}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        ref={inputRef}
        placeholder={placeholder}
      />
      {errorMessage && <StyledError>{errorMessage}</StyledError>}
    </Wrapper>
  );
};

export default TextInput;
