import React, { useContext } from "react";
import {
  useLoaderData,
  json,
  useRouteLoaderData,
  useParams,
} from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import useInfoBoxData from "../hooks/useInfoBoxData";
import { CountriesContext } from "../context/CountriesContext";

import { driversExtra, constructorsExtra } from "../helpers/extraData";
import { getUrl } from "../helpers/utility";

const DriverPage = () => {
  const { getFlag, getNationality } = useContext(CountriesContext);

  const wikiData = useLoaderData().parse.text;

  const { getInfoBoxData } = useInfoBoxData(wikiData);

  const data = useRouteLoaderData("drivers");
  const params = useParams();

  const driverData =
    data.MRData.StandingsTable.StandingsLists[0].DriverStandings.filter(
      (driver) => {
        return getUrl(driver.Driver.url) === params.driverUrl;
      }
    )[0];

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
    totalRaces: +getInfoBoxData("Entries").split(" ")[0],
    championships: getInfoBoxData("Championships")
      .split(" (")
      .map((entry, i) => {
        if (i === 0) {
          return entry;
        }

        return entry
          .replaceAll("(", "")
          .replaceAll(")", "")
          .split(", ")
          .map((championship) => {
            return championship;
          });
      }),
    totalPodiums: +getInfoBoxData("Podiums"),
    totalWins: +getInfoBoxData("Wins"),
    careerPoints: +getInfoBoxData("Career points"),
    polePositions: +getInfoBoxData("Pole positions"),
    fastestLaps: +getInfoBoxData("Fastest laps"),
  };

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
              {driver.flag && (
                <img src={driver.flag} alt={`Flag of ${driver.country}`} />
              )}
            </div>
          </div>
          <div className="stats">
            <ul>
              <li className="stats__row">
                <p className="stats__title">Date of Birth:</p>
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
                <p className="stats__title">{year} Position:</p>
                <p className="stats__data">{driver.position}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">{year} Points:</p>
                <p className="stats__data">{driver.points}</p>
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
              return (
                <p key={championship} className="champion__year">
                  {championship}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

export default DriverPage;

export async function loader({ params }) {
  let driverUrl = params.driverUrl;

  const response = await fetch(
    `https://en.wikipedia.org/w/api.php?action=parse&format=json&redirects=1&page=${driverUrl}&prop=text&section=0&formatversion=2&origin=*`
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
