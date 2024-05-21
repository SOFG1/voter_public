import styled, {keyframes} from "styled-components"

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  animation: ${rotate360} 1s linear infinite;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-left: 3px solid grey;
`

export default Loader