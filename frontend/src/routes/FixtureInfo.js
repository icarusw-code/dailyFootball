import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getFixturesDetailById } from "../api";

function FixtureInfo() {
  const {
    state: { fixtureId },
  } = useLocation();

  // 경기 정보
  const { isLoading: fixtureLoading, data: fixtureData } = useQuery(
    ["fixtureId", fixtureId],
    () => getFixturesDetailById(fixtureId).then((response) => response.data),
    {
      enabled: !!fixtureId,
      refetchOnMount: "always",
    }
  );

  fixtureData && console.log(fixtureData);
  return (
    <h1>
      경기 : {fixtureData.localTeam.data.name} vs{" "}
      {fixtureData.visitorTeam.data.name}
    </h1>
  );
}

export default FixtureInfo;
