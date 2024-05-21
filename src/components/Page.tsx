import styled from "styled-components";
import bg1 from "../assets/svg/blue-bg1.svg";
import bg2 from "../assets/svg/blue-bg2.svg";


const Page = styled.div`
  min-height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px 0 40px;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    height: 352px;
    width: 253px;
    top: 0;
    left: 0;
    background-image: url(${bg1});
    background-size: contain;
    background-repeat: no-repeat;
    z-index: -1;
  }
  &::after {
    content: "";
    position: absolute;
    height: 250px;
    width: 220px;
    bottom: 0;
    right: -30px;
    background-image: url(${bg2});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: left top;
    z-index: -1;
  }
`;

export default Page
