import React, { useContext } from "react";
import { useRouteLoaderData, json, Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { CountriesContext } from "../context/CountriesContext";

import { API, getUrl } from "../helpers/utility";
import { constructorsExtra } from "../helpers/extraData";
import ListingCard from "../components/ListingCard";

const ConstructorsPage = () => {
  const { getFlag, getNationality } = useContext(CountriesContext);

  const data = useRouteLoaderData("constructors");

  const year = data.MRData.StandingsTable.season;

  const constructors =
    data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(
      (team) => {
        return {
          name: team.Constructor.name,
          id: team.Constructor.constructorId,
          position: team.position,
          points: team.points,
          constructorUrl: getUrl(team.Constructor.url),
          country: getNationality(team.Constructor.nationality)?.country,
          flag: getFlag(getNationality(team.Constructor.nationality)?.country),
          logo: constructorsExtra[team.Constructor.constructorId]?.logo,
          drivers: constructorsExtra[team.Constructor.constructorId]?.drivers,
          car: constructorsExtra[team.Constructor.constructorId]?.car,
        };
      }
    );

  return (
    <PageWrapper className="constructors" title={`${year} Constructors`}>
      <div className="grid-responsive grid-responsive--big">
        {constructors.map((team) => (
          <Link to={team.constructorUrl} key={team.name}>
            <ListingCard data={team} key={team.position} />
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
};

export default ConstructorsPage;

export async function loader() {
  const response = await fetch(API("/f1/current/constructorStandings"));

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
