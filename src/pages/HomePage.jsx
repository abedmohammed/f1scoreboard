import React from "react";
import { useLoaderData, json, Link } from "react-router-dom";

import { API } from "../helpers/utility";
import RaceCard from "../components/RaceCard";
import PageWrapper from "../components/PageWrapper";

const HomePage = () => {
  const data = useLoaderData();
  const racesList = data.MRData.RaceTable.Races;

  const now = new Date();

  let nextRaceIndex = 0;
  racesList.forEach((race, i) => {
    if (new Date(race.date) > now && nextRaceIndex === 0) {
      nextRaceIndex = i;
    }
  });

  const nextRace = {
    country: racesList[nextRaceIndex].Circuit.Location.country,
    date: racesList[nextRaceIndex].date,
    time: racesList[nextRaceIndex].time,
    name: racesList[nextRaceIndex].raceName,
    locale: racesList[nextRaceIndex].Circuit.Location.locality,
    firstPractice: racesList[nextRaceIndex].FirstPractice,
    secondPractice: racesList[nextRaceIndex].SecondPractice,
    thirdPractice: racesList[nextRaceIndex].ThirdPractice,
    sprint: racesList[nextRaceIndex].Sprint,
    qualifying: racesList[nextRaceIndex].Qualifying,
  };

  return (
    <PageWrapper className="home">
      <RaceCard race={nextRace} />
      <div className="home__more">
        <Link to="/races">
          View more details <span>&rarr;</span>
        </Link>
      </div>
    </PageWrapper>
  );
};

export default HomePage;

export async function loader() {
  const response = await fetch(API("/f1/current"));

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
