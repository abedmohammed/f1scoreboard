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

  console.log(constructorData);
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
    techDirector: getInfoBoxData("Technical director"),
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
        <div className="constructor__content">
          <div className="constructor__logo">
            <img className={constructor.id} src={constructor.fullLogo} alt="" />
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
                <p className="stats__title">Team Chief:</p>
                <p className="stats__data">{constructor.teamChief}</p>
              </li>
              <li className="stats__row">
                <p className="stats__title">Technical Chief:</p>
                <p className="stats__data">{constructor.techDirector}</p>
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
        <div className="constructor__figures">
          <div className="constructor__drivers">
            <div className="constructor__driver">
              <div className="constructor__driver-image">
                <img
                  src={constructor.drivers[0].image}
                  alt={constructor.drivers[0].name}
                />
              </div>
              <div className="constructor__driver-info">
                <p className="constructor__driver-name">
                  {constructor.drivers[0].name}
                </p>
              </div>
            </div>
            <div className="constructor__driver">
              <div className="constructor__driver-image">
                <img
                  src={constructor.drivers[1].image}
                  alt={constructor.drivers[1].name}
                />
              </div>
              <div className="constructor__driver-info">
                <p className="constructor__driver-name">
                  {constructor.drivers[1].name}
                </p>
              </div>
            </div>
          </div>
          <div className="constructor__car">
            <img src={constructor.car} alt={`Car of ${constructor.name}`} />
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
