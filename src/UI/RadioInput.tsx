import styled from "styled-components";

const Input = styled.input`
  display: none;
`;

const StyledInput = styled.span`
  display: inline-block;
  position: relative;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  border: 1px solid #f06543;
  &::after {
    content: "";
    display: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background-color: #f06543;
  }
  input:checked + &::after {
    display: block;
  }
`;

interface IProps {
  selected: boolean;
  onSelect: () => void;
}

const RadioInput = ({ selected, onSelect }: IProps) => {
  return (
    <label>
      <Input
        type="checkbox"
        checked={selected}
        onChange={onSelect}
      />
      <StyledInput />
    </label>
  );
};

export default RadioInput;
