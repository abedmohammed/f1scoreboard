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

import { constructorsExtra } from "../helpers/extraData";
import { getUrl } from "../helpers/utility";

const ConstructorPage = () => {
  const { getFlag, getNationality } = useContext(CountriesContext);

  const wikiData = useLoaderData().parse.text;

  const { getInfoBoxData, getInfoBoxImage } = useInfoBoxData(wikiData);

  const data = useRouteLoaderData("constructors");
  const params = useParams();
  const constructorData =
    data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.filter(
      (constructor) => {
        return getUrl(constructor.Constructor.url) === params.constructorUrl;
      }
    )[0];

  const year = data.MRData.StandingsTable.season;
  const constructor = {
    name: constructorData.Constructor.name,
    fullName: getInfoBoxData("Full name"),
    id: constructorData.Constructor.constructorId,
    position: constructorData.position,
    points: constructorData.points,
    country: getNationality(constructorData.Constructor.nationality)?.country,
    base: getInfoBoxData("Base"),
    flag: getFlag(
      getNationality(constructorData.Constructor.nationality)?.country
    ),
    logo: constructorsExtra[constructorData.Constructor.constructorId]?.logo,
    fullLogo: getInfoBoxImage(),
    drivers:
      constructorsExtra[constructorData.Constructor.constructorId]?.drivers,
    car: constructorsExtra[constructorData.Constructor.constructorId]?.car,
    teamChief: getInfoBoxData("principal(s)</span>"),
    techChief: getInfoBoxData("Chief Technical Officer"),
    chassis: getInfoBoxData("Chassis"),
    engine: getInfoBoxData("Engine"),
    firstEntry: getInfoBoxData("First entry"),
    totalPoints: getInfoBoxData("Points"),
    totalWins: getInfoBoxData("Race victories</a>"),
    totalPodiums: getInfoBoxData("Podiums"),
    polePositions: getInfoBoxData("Pole positions</a>"),
    constructorChampionships: getInfoBoxData("Championships</a>"),
  };

  console.log(constructor);

  return (
    <PageWrapper className="constructor" title={constructor.name}>
      <div className="constructor__container">
        <div className="constructor__figures"></div>
        <div className="constructor__content">
          <div className="constructor__logo">
            <img src={constructor.fullLogo} alt="" />
          </div>
          <div className="stats">
            <ul>
              <li className="stats__row">
                <p className="stats__title">Team:</p>
                <p className="stats__data">{constructor.fullName}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">Country:</p>
                <p className="stats__data">{constructor.country}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">Base:</p>
                <p className="stats__data">{constructor.base}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">Team Chief:</p>
                <p className="stats__data">{constructor.teamChief}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">Technical Chief:</p>
                <p className="stats__data">{constructor.techChief}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">Chassis:</p>
                <p className="stats__data">{constructor.chassis}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">Engine:</p>
                <p className="stats__data">{constructor.engine}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">First Entry:</p>
                <p className="stats__data">{constructor.firstEntry}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">Total Points:</p>
                <p className="stats__data">{constructor.totalPoints}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">Total Wins:</p>
                <p className="stats__data">{constructor.totalWins}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">Total Podiums:</p>
                <p className="stats__data">{constructor.totalPodiums}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">Pole Positions:</p>
                <p className="stats__data">{constructor.polePositions}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">{year} Position:</p>
                <p className="stats__data">{constructor.position}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">{year} Points:</p>
                <p className="stats__data">{constructor.points}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ConstructorPage;

export async function loader({ params }) {
  let constructorUrl = params.constructorUrl;

  const response = await fetch(
    `https://en.wikipedia.org/w/api.php?action=parse&format=json&redirects=1&page=${constructorUrl}&prop=text&section=0&formatversion=2&origin=*`
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
