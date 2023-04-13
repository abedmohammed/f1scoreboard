import React, { useContext } from "react";
import {
  useLoaderData,
  json,
  useRouteLoaderData,
  useParams,
} from "react-router-dom";
import { CountriesContext } from "../context/CountriesContext";

import { driversExtra } from "../helpers/extraData";

const DriverPage = () => {
  const { getFlag, getNationality } = useContext(CountriesContext);

  const wikiData = useLoaderData().parse.text;
  const data = useRouteLoaderData("drivers");
  const params = useParams();

  const driverData =
    data.MRData.StandingsTable.StandingsLists[0].DriverStandings.filter(
      (driver) => {
        return (
          `${driver.Driver.givenName} ${driver.Driver.familyName}`.replaceAll(
            " ",
            "_"
          ) === params.driverName
        );
      }
    )[0];

  const year = data.MRData.StandingsTable.season;
  const driver = {
    name: `${driverData.Driver.givenName} ${driverData.Driver.familyName}`,
    birthDay: driverData.Driver.dataOfBirth,
    number:
      driversExtra[driverData.Driver.code]?.number ||
      driverData.Driver.permanentNumber,
    position: driverData.position,
    team: driverData.Constructors[0].name,
    points: driverData.points,
    nationality: driverData.Driver.nationality,
    country: getNationality(driverData.Driver.nationality)?.country,
    flag: getFlag(getNationality(driverData.Driver.nationality)?.country),
    image: driversExtra[driverData.Driver.code]?.image,
  };

  console.log(wikiData);
  const podiums = wikiData.substring(
    wikiData.indexOf("Podiums") + 1,
    wikiData.lastIndexOf("Career points")
  );
  console.log(podiums);

  // DATA
  // born
  // races
  // championships
  // wins
  // podiums
  // career points
  // pole positions
  // fastest laps

  return <div>DriverPage</div>;
};

export default DriverPage;

export async function loader({ params }) {
  let driverName = params.driverName;

  switch (driverName) {
    case "Carlos_Sainz":
      driverName = "Carlos_Sainz_Jr.";
      break;
    case "George_Russell":
      console.log("Caught!");
      driverName = "George_Russell_(racing_driver)";
      break;
    default:
      break;
  }

  const response = await fetch(
    `https://en.wikipedia.org/w/api.php?action=parse&format=json&redirects=1&page=${driverName}&prop=text&section=0&formatversion=2&origin=*`
  );

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
