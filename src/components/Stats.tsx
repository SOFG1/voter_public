import styled from "styled-components";
import { useUserState } from "../store/user/hooks";
import { StatsTable } from "../UI";

const StyledStats = styled(StatsTable)`
  margin: 0 auto 20px;
`;

const Stats = () => {
  const { userInfo } = useUserState();
  return (
    <StyledStats
      toCall={userInfo.to_call}
      called={userInfo.called}
      good={userInfo.good}
      unknown={userInfo.unknown}
      bad={userInfo.bad}
    />
  );
};

export default Stats;
