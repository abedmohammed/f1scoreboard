import React from "react";
import { json, useLoaderData } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import Table from "../components/Table";
import Tabs from "../components/Tabs";
import { constructorsExtra, driversExtra } from "../helpers/extraData";

import { API, getUrl } from "../helpers/utility";
import useTabs from "../hooks/useTabs";

const StandingsPage = () => {
  const [activeTab, setActiveTab, tabs] = useTabs(["Drivers", "Constructors"]);

  const {
    driverResponse: driverStandingData,
    constructorResponse: constructorStandingData,
  } = useLoaderData();

  const driverStandings =
    driverStandingData.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(
      (driver) => {
        return {
          name: `${
            driver.Driver.givenName
          } ${driver.Driver.familyName.toUpperCase()}`,
          image: driversExtra[driver.Driver.code]?.image,
          code: driver.Driver.code,
          position: driver.position,
          team: driver.Constructors[0].name,
          teamLogo:
            constructorsExtra[driver.Constructors[0].constructorId]?.logo,
          points: driver.points,
          url: getUrl(driver.Driver.url),
        };
      }
    );

  const constructorStandings =
    constructorStandingData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(
      (team) => {
        return {
          name: team.Constructor.name,
          logo: constructorsExtra[team.Constructor.constructorId]?.logo,
          position: team.position,
          points: team.points,
          url: getUrl(team.Constructor.url),
        };
      }
    );

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <PageWrapper className="standings" title="Current Standings">
      <Tabs tabs={tabs} onTabSwitch={handleTabSwitch} activeTab={activeTab} />
      <div className="standings__table">
        <Table
          data={
            activeTab === "Drivers" ? driverStandings : constructorStandings
          }
          tab={activeTab}
        />
      </div>
    </PageWrapper>
  );
};

export async function loader() {
  let [driverResponse, constructorResponse] = await Promise.all([
    fetch(API("/f1/current/driverStandings")),
    fetch(API("/f1/current/constructorStandings")),
  ]);

  if (!driverResponse.ok || !constructorResponse.ok) {
    throw json(
      { message: "Could not fetch details for the current standings." },
      {
        status: 500,
      }
    );
  } else {
    [driverResponse, constructorResponse] = await Promise.all([
      driverResponse.json(),
      constructorResponse.json(),
    ]);

    return { driverResponse, constructorResponse };
  }
}

export default StandingsPage;
