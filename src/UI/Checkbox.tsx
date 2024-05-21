import React,{ useState } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

const WrapperLabel = styled.label`
    display: block;
  & input[type="checkbox"] {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
  & .checkbox {
    display: inline-block;
    cursor: pointer;
    height: 18px;
    width: 18px;
    background: #fff;
    border: 2px #ddd solid;
    border-radius: 5px;
  }
`;

const Input = styled.input`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledLabel = styled.span`
margin-inline-start: 6px;
`

interface IProps {
  checked: boolean;
  setIsChecked: (value: boolean) => void;
  label?: string
  className?: string;
  disabled?: boolean;
}

const Checkbox = ({ checked, setIsChecked, label, disabled, className }: IProps) => {
  const [checkmarkLength, setCheckmarkLength] = useState<any>();

  const checkboxAnimationStyle = useSpring({
    backgroundColor: checked ? "#F06543" : "#fff",
    borderColor: checked ? "#F06543" : "#F06543",
  });

  const checkmarkanimationStyle = useSpring({
    x: checked ? 0 : checkmarkLength,
  });


  return (
    <WrapperLabel className={className}>
      <Input
        type="checkbox"
        disabled={disabled}
        onChange={() => setIsChecked(!checked)}
      />
      <animated.svg
        style={checkboxAnimationStyle}
        className={`checkbox ${checked ? "checkbox__active" : ""}`}
        aria-hidden="true"
        viewBox="0 0 15 11"
        fill="none"
      >
        <animated.path
          d="M1.63635 4.8637L5.52524 9.31825L13.7273 1.68188"
          strokeWidth="2"
          stroke={checked ? "#fff" : "none"}
          strokeDasharray={checkmarkLength}
          strokeDashoffset={checkmarkanimationStyle.x}
          ref={(ref: any) => {
            if (ref) {
              setCheckmarkLength(ref.getTotalLength());
            }
          }}
        />
      </animated.svg>
      {label && <StyledLabel>{label}</StyledLabel>}
    </WrapperLabel>
  );
};

export default Checkbox;
