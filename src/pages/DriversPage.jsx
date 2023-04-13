import React, { useContext } from "react";
import { json, Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { CountriesContext } from "../context/CountriesContext";

import { API } from "../helpers/utility";
import { driversExtra } from "../helpers/extraData";
import ListingCard from "../components/ListingCard";

const DriversPage = () => {
  const navigate = useNavigate();

  const { getFlag, getNationality } = useContext(CountriesContext);

  const data = useRouteLoaderData("drivers");
  const year = data.MRData.StandingsTable.season;
  const drivers =
    data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(
      (driver) => {
        return {
          name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
          number:
            driversExtra[driver.Driver.code]?.number ||
            driver.Driver.permanentNumber,
          position: driver.position,
          team: driver.Constructors[0].name,
          points: driver.points,
          country: getNationality(driver.Driver.nationality)?.country,
          flag: getFlag(getNationality(driver.Driver.nationality)?.country),
          image: driversExtra[driver.Driver.code]?.image,
        };
      }
    );

  return (
    <PageWrapper className="drivers" title={`${year} Drivers`}>
      <div className="grid-responsive">
        {drivers.map((driver) => (
          <Link to={driver.name.replaceAll(" ", "_")} key={driver.number}>
            <ListingCard data={driver} />
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
};

export default DriversPage;

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
