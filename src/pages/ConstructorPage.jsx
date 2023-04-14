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

  const { getInfoBoxData } = useInfoBoxData(wikiData);

  const data = useRouteLoaderData("constructors");
  const params = useParams();
  console.log(data);
  const constructorData =
    data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.filter(
      (constructor) => {
        return getUrl(constructor.Constructor.url) === params.constructorUrl;
      }
    )[0];

  // const year = data.MRData.StandingsTable.season;
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
    <PageWrapper className="constructor" title={constructor.name}></PageWrapper>
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
