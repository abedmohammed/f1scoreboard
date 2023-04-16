import React from "react";
import { useLoaderData, json } from "react-router-dom";

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
    </PageWrapper>
  );
};

export default HomePage;

export async function loader() {
  const response = await fetch(API("/f1/current"));

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
