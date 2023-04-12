import React, { useContext } from "react";
import { useLoaderData, json } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { CountriesContext } from "../context/CountriesContext";

import { API } from "../helpers/utility";
import { constructorsExtra } from "../helpers/extraData";
import ListingCard from "../components/ListingCard";

const ConstructorsPage = () => {
  const { getFlag, getNationality } = useContext(CountriesContext);

  const data = useLoaderData();

  const year = data.MRData.StandingsTable.season;

  const constructors =
    data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(
      (team) => {
        return {
          name: team.Constructor.name,
          id: team.Constructor.constructorId,
          position: team.position,
          points: team.points,
          country: getNationality(team.Constructor.nationality)?.country,
          flag: getFlag(getNationality(team.Constructor.nationality)?.country),
          logo: constructorsExtra[team.Constructor.constructorId]?.logo,
          drivers: constructorsExtra[team.Constructor.constructorId]?.drivers,
          car: constructorsExtra[team.Constructor.constructorId]?.car,
        };
      }
    );

  console.log(constructors);

  return (
    <PageWrapper className="Constructors" title={`${year} Constructors`}>
      <div className="grid-responsive grid-responsive--big">
        {constructors.map((team) => (
          <ListingCard data={team} key={team.position} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default ConstructorsPage;

export async function loader() {
  const response = await fetch(API("/f1/current/constructorStandings"));

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
