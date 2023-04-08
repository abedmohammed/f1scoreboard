import React, { useState } from "react";
import { json, useLoaderData } from "react-router-dom";
import Table from "../components/Table";

import { API } from "../utility";

const StandingsPage = () => {
  const [activeTab, setActiveTab] = useState("drivers");
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
          position: driver.position,
          team: driver.Constructors[0].name,
          points: driver.points,
        };
      }
    );

  const constructorStandings =
    constructorStandingData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(
      (team) => {
        return {
          name: team.Constructor.name,
          position: team.position,
          points: team.points,
        };
      }
    );

  return (
    <main className="standings page">
      <h2 className="page__title">Current Standings</h2>
      <div className="standings__tabs">
        <button
          className={`standings__tab ${
            activeTab === "drivers" ? "standings__tab--active" : ""
          }`}
          onClick={() => {
            setActiveTab("drivers");
          }}
        >
          Drivers
        </button>
        <button
          className={`standings__tab ${
            activeTab === "constructors" ? "standings__tab--active" : ""
          }`}
          onClick={() => {
            setActiveTab("constructors");
          }}
        >
          Constructors
        </button>
      </div>
      <div className="standings__table">
        <Table
          data={
            activeTab === "drivers" ? driverStandings : constructorStandings
          }
        />
      </div>
    </main>
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
