import React, { useCallback, useEffect } from "react";
import {
  json,
  useLoaderData,
  useSearchParams,
  useNavigation,
} from "react-router-dom";
import { API, getUrl } from "../helpers/utility";
import Tabs from "./Tabs";
import useTabs from "../hooks/useTabs";
import Table from "./Table";
import { constructorsExtra, driversExtra } from "../helpers/extraData";
import Loader from "./Loader";

const RaceTables = () => {
  const data = useLoaderData();
  const navigation = useNavigation();
  let [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab, tabs] = useTabs([
    "Qualifying",
    "Sprint",
    "Results",
  ]);

  let results;
  if (
    activeTab === "Qualifying" &&
    data?.MRData?.RaceTable?.Races[0]?.QualifyingResults
  ) {
    results = data.MRData.RaceTable.Races[0].QualifyingResults.map((driver) => {
      return {
        name: `${
          driver.Driver.givenName
        } ${driver.Driver.familyName.toUpperCase()}`,
        image: driversExtra[driver.Driver.code]?.image,
        position: driver.position,
        team: driver.Constructor.name,
        teamLogo: constructorsExtra[driver.Constructor.constructorId]?.logo,
        q1: driver.Q1,
        q2: driver.Q2,
        q3: driver.Q3,
        url: getUrl(driver.Driver.url),
      };
    });
  }

  if (
    activeTab === "Sprint" &&
    data?.MRData?.RaceTable?.Races[0]?.SprintResults
  ) {
    results = data.MRData.RaceTable.Races[0].SprintResults.map((driver) => {
      return {
        name: `${
          driver.Driver.givenName
        } ${driver.Driver.familyName.toUpperCase()}`,
        image: driversExtra[driver.Driver.code]?.image,
        position: driver.position,
        team: driver.Constructor.name,
        teamLogo: constructorsExtra[driver.Constructor.constructorId]?.logo,
        time: driver.Time?.time,
        status: driver.status,
        points: driver.points,
        url: getUrl(driver.Driver.url),
      };
    });
  }

  if (activeTab === "Results" && data?.MRData?.RaceTable?.Races[0]?.Results) {
    results = data.MRData.RaceTable.Races[0].Results.map((driver) => {
      return {
        name: `${
          driver.Driver.givenName
        } ${driver.Driver.familyName.toUpperCase()}`,
        image: driversExtra[driver.Driver.code]?.image,
        position: driver.position,
        team: driver.Constructor.name,
        teamLogo: constructorsExtra[driver.Constructor.constructorId]?.logo,
        time: driver.Time?.time,
        status: driver.status,
        points: driver.points,
        url: getUrl(driver.Driver.url),
      };
    });
  }

  const handleTabSwitch = useCallback(
    (tab) => {
      setActiveTab(tab);
      setSearchParams({ table: tab.toLowerCase() });
    },
    [setActiveTab, setSearchParams]
  );

  useEffect(() => {
    if (!searchParams.get("table")) {
      handleTabSwitch("Qualifying");
    }
  }, [searchParams, handleTabSwitch]);

  return (
    <div>
      <Tabs tabs={tabs} onTabSwitch={handleTabSwitch} activeTab={activeTab} />
      <div className="races__table">
        {navigation.state !== "loading" ? (
          results ? (
            <Table data={results} tab={activeTab} className="races-table" />
          ) : (
            <div className="races__na">
              <p>There is no data currently available for this race.</p>
            </div>
          )
        ) : (
          <div className="races__loading">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default RaceTables;

export async function loader({ request, params }) {
  const round = params.raceRound;
  const tableType = new URL(request.url).searchParams.get("table");
  const response = await fetch(
    API(`/f1/current/${round}/${tableType || "qualifying"}`)
  );

  switch (response.status) {
    case 500:
      throw json(
        {
          message:
            "We are currently unable to retrieve this data. Please try again later!",
        },
        {
          status: 500,
        }
      );
    default:
      return response;
  }
}
