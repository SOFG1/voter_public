import styled from "styled-components";
import arrowsLeft from "../assets/svg/arrows-left.svg";
import actionBad from "../assets/svg/action-bad.svg";
import arrowsRight from "../assets/svg/arrows-right.svg";
import actionGood from "../assets/svg/action-good.svg";
import arrowsTop from "../assets/svg/arrows-top.svg";
import actionUnknown from "../assets/svg/action-unknown.svg";
import actionNext from "../assets/svg/action-next.svg";
import arrowsBottom from "../assets/svg/arrows-bottom.svg";
import actionReturn from "../assets/svg/action-return.svg";

const Actions = styled.div`
  position: relative;
  height: 320px;
  width: 100%;
  max-width: 375px;
  margin-top: 20px;
`;

const ActionLeft = styled.button`
cursor: pointer;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 90px;
  width: 137px;
  border: 0;
  padding: 0;
  text-align: right;
  background-color: transparent;
  & img {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-42%);
    height: 48px;
    width: 48px;
    object-fit: contain;
    object-position: center;
    pointer-events: none;
  }
  /* &::after {
    content: "";
    position: absolute;
    height: 23px;
    width: 23px;
    left: 43px;
    top: 50%;
    transform: translateY(-50%);
    background-image: url(${arrowsLeft});
    transition: 200ms;
  } */
`;

const ActionRight = styled.button`
cursor: pointer;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 90px;
  width: 137px;
  border: 0;
  padding: 0;
  text-align: right;
  background-color: transparent;
  & img {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-42%);
    height: 48px;
    width: 48px;
    object-fit: contain;
    object-position: center;
    pointer-events: none;
  }
  /* &::after {
    content: "";
    position: absolute;
    height: 23px;
    width: 23px;
    right: 43px;
    top: 50%;
    transform: translateY(-50%);
    background-image: url(${arrowsRight});
    transition: 200ms;
  } */
`;


const ActionCenter = styled.button`
cursor: pointer;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 60px;
  width: 100px;
  border: 0;
  padding: 0;
  text-align: right;
  background-color: transparent;
  & img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -40%);
    height: 48px;
    width: 48px;
    object-fit: contain;
    object-position: center;
    pointer-events: none;
  }
`;


const ActionTop = styled.button`
cursor: pointer;
  position: absolute;
  left: 50%;
  top: -15px;
  transform: translateX(-50%);
  height: 137px;
  width: 90px;
  border: 0;
  padding: 0;
  text-align: center;
  background-color: transparent;
  & img {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 48px;
    width: 48px;
    object-fit: contain;
    object-position: center;
    pointer-events: none;
  }
  /* &::after {
    content: "";
    position: absolute;
    height: 23px;
    width: 23px;
    top: 43px;
    left: 50%;
    transform: translateX(-50%);
    background-image: url(${arrowsTop});
    transition: 200ms;
  } */
`;

const ActionBottom = styled.button`
cursor: pointer;
  position: absolute;
  left: 50%;
  bottom: -15px;
  transform: translateX(-50%);
  height: 125px;
  width: 90px;
  border: 0;
  padding: 0;
  text-align: center;
  background-color: transparent;
  & img {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 48px;
    width: 48px;
    object-fit: contain;
    object-position: center;
    pointer-events: none;
  }
  /* &::after {
    content: "";
    position: absolute;
    height: 20px;
    width: 20px;
    bottom: 43px;
    left: 50%;
    transform: translateX(-50%);
    background-image: url(${arrowsBottom});
    transition: 200ms;
  } */
`;

interface IProps {
  onLeft?: () => void;
  onRight?: () => void;
  onCenter?: () => void;
  onUp?: () => void;
  onDown?: () => void;
}

const UserActions = ({
  onLeft,
  onRight,
  onCenter,
  onUp,
  onDown
}: IProps) => {



  return (
    <Actions>
      {onLeft && <ActionLeft onClick={onLeft}>
        <img src={actionBad} />
      </ActionLeft>}
      {onRight && <ActionRight onClick={onRight}>
        <img src={actionGood} />
      </ActionRight>}

      {onCenter && <ActionCenter onClick={onCenter}>
        <img src={actionUnknown} />
      </ActionCenter>}
      {onUp && <ActionTop onClick={onUp}>
        <img src={actionNext} />
      </ActionTop>}
      { onDown && (
        <ActionBottom onClick={onDown}>
          <img src={actionReturn} />
        </ActionBottom>
      )}
    </Actions>
  );
};

export default UserActions;
