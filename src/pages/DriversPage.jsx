import React, { useContext } from "react";
import { json, Link, useRouteLoaderData } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { CountriesContext } from "../context/CountriesContext";

import { API, getUrl } from "../helpers/utility";
import { driversExtra } from "../helpers/extraData";
import ListingCard from "../components/ListingCard";

const DriversPage = () => {
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
          driverUrl: getUrl(driver.Driver.url),
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
          <Link to={driver.driverUrl} key={driver.number}>
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
