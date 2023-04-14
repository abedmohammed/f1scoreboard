import React, { useContext } from "react";
import {
  useLoaderData,
  json,
  useRouteLoaderData,
  useParams,
} from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { CountriesContext } from "../context/CountriesContext";

import { driversExtra, constructorsExtra } from "../helpers/extraData";

const DriverPage = () => {
  const { getFlag, getNationality } = useContext(CountriesContext);

  const wikiData = useLoaderData().parse.text;
  const data = useRouteLoaderData("drivers");
  const params = useParams();

  const getInfoboxData = (term) => {
    const startStr = `${term}</th><td class="infobox-data">`;
    const pos = wikiData.indexOf(startStr) + startStr.length;

    if (wikiData.indexOf(startStr) === -1) {
      const startStr = `${term}</a></th><td class="infobox-data">`;
      const pos = wikiData.indexOf(startStr) + startStr.length;

      if (term === "Wins") {
        const wins = wikiData.substring(
          pos,
          wikiData.indexOf("</td></tr><tr>", pos)
        );
        if (Number.isNaN(+wins)) {
          return wikiData
            .substring(pos, wikiData.indexOf("</td></tr><tr>", pos))
            .substring(wins.indexOf(">") + 1, wins.lastIndexOf("<"));
        }
      }

      return wikiData
        .substring(pos, wikiData.indexOf("</td></tr><tr>", pos))
        .substring(">" + 1);
    }

    return wikiData.substring(pos, wikiData.indexOf("</td>", pos));
  };

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
  console.log(data);
  const year = data.MRData.StandingsTable.season;
  const driver = {
    name: `${driverData.Driver.givenName} ${driverData.Driver.familyName}`,
    birthDay: driverData.Driver.dateOfBirth,
    nationality: driverData.Driver.nationality,
    country: getNationality(driverData.Driver.nationality)?.country,
    flag: getFlag(getNationality(driverData.Driver.nationality)?.country),
    image: driversExtra[driverData.Driver.code]?.image,
    fullImage: driversExtra[driverData.Driver.code]?.fullBodyImage,
    team: driverData.Constructors[0].name,
    teamLogo: constructorsExtra[driverData.Constructors[0].constructorId]?.logo,
    position: +driverData.position,
    points: +driverData.points,
    number:
      driversExtra[driverData.Driver.code]?.number ||
      driverData.Driver.permanentNumber,
    totalRaces: +getInfoboxData("Entries").split(" ")[0],
    championships: getInfoboxData("Championships")
      .split(" (<a")
      .map((entry, i) => {
        if (i === 0) {
          return entry;
        }

        return entry.split("</a>, <a").map((championship) => {
          const pos = championship.indexOf('">') + '">'.length;
          return championship.substring(pos, pos + 4);
        });
      }),
    totalPodiums: +getInfoboxData("Podiums"),
    totalWins: +getInfoboxData("Wins"),
    careerPoints: +getInfoboxData("Career points"),
    polePositions: +getInfoboxData("Pole positions"),
    fastestLaps: +getInfoboxData("Fastest laps"),
  };
  console.log(driver);

  return (
    <PageWrapper className="driver" title={driver.name}>
      <div className="driver__container">
        <div className="driver__image">
          <img src={driver.fullImage} alt={`${driver.name} standing`} />
        </div>

        <div className="driver__content">
          <div className="driver__header">
            <div className="driver__team">
              <h3>{driver.team}</h3>
              <img src={driver.teamLogo} alt="" />
            </div>
            <div className="driver__flag">
              <img src={driver.flag} alt={`Flag of ${driver.country}`} />
            </div>
          </div>
          <div className="stats">
            <ul>
              <li className="stats__row">
                <p className="stats__title">Birth Date:</p>
                <p className="stats__data">
                  {new Intl.DateTimeFormat("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date(driver.birthDay))}
                </p>
              </li>
              <li className="stats__row">
                <p className="stats__title">Country:</p>
                <p className="stats__data">{driver.country}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">Car Number:</p>
                <p className="stats__data">{driver.number}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">Grand Prix Entered:</p>
                <p className="stats__data">{driver.totalRaces}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">Career Points:</p>
                <p className="stats__data">{driver.careerPoints}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">Total Wins:</p>
                <p className="stats__data">{driver.totalWins}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">Total Podiums:</p>
                <p className="stats__data">{driver.totalPodiums}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">Fastest Laps:</p>
                <p className="stats__data">{driver.fastestLaps}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">Pole Positions:</p>
                <p className="stats__data">{driver.polePositions}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">{year} Points:</p>
                <p className="stats__data">{driver.points}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">{year} Position:</p>
                <p className="stats__data">{driver.position}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {driver.championships[1] && (
        <div className="champion">
          <p>World Champion:</p>
          <div className="champion__list">
            {driver.championships[1].map((championship) => {
              return <p className="champion__year">{championship}</p>;
            })}
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

export default DriverPage;

export async function loader({ params }) {
  let driverName = params.driverName;

  switch (driverName) {
    case "Carlos_Sainz":
      driverName = "Carlos_Sainz_Jr.";
      break;
    case "George_Russell":
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
