import React, { useContext } from "react";
import { useLoaderData, json } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { CountriesContext } from "../context/CountriesContext";

import { API } from "../helpers/utility";
import { driversExtra } from "../helpers/extraData";

const DriversPage = () => {
  const { getFlag, getNationality } = useContext(CountriesContext);

  const data = useLoaderData();

  const year = data.MRData.StandingsTable.season;

  const drivers =
    data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(
      (driver) => {
        return {
          name: `${
            driver.Driver.givenName
          } ${driver.Driver.familyName.toUpperCase()}`,
          number: driver.Driver.permanentNumber,
          position: driver.position,
          team: driver.Constructors[0].name,
          points: driver.points,
          country: getNationality(driver.Driver.nationality),
          flag: getFlag(getNationality(driver.Driver.nationality)),
          image: driversExtra[driver.Driver.code]?.image,
        };
      }
    );

  console.log(drivers);

  return (
    <PageWrapper className="drivers" title={`${year} Drivers`}></PageWrapper>
  );
};

export async function loader() {
  const response = await fetch(API("/f1/current/driverStandings"));

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for the upcoming races." },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}

export default DriversPage;
