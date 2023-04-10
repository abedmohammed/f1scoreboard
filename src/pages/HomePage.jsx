import React, { useContext } from "react";
import { useLoaderData, json } from "react-router-dom";

import EventCard from "../components/EventCard";

import { CountriesContext } from "../context/CountriesContext";

import { API } from "../helpers/utility";

const HomePage = () => {
  const { getFlag, getTimezone, timeZones } = useContext(CountriesContext);
  const userLocale = navigator.language;

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

  const getDate = (event) => {
    return new Date(`${event.date} ${event.time}`);
  };

  const localDate = (event, options) => {
    return new Intl.DateTimeFormat(userLocale, options).format(getDate(event));
  };

  return (
    <main className="home page">
      <div className="home__country">
        <img src={getFlag(nextRace.country)} alt={`${nextRace.country} flag`} />
        <h2>{nextRace.country}</h2>
      </div>
      <div className="home__date">
        <p className="text-faint">
          {localDate(nextRace.firstPractice, {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
          {" - "}
          {localDate(nextRace, {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
      <h3 className="home__title">{nextRace.name}</h3>
      <div className="home__time">
        <div>
          <p>{nextRace.locale}</p>
          <p>
            {timeZones.length !== 0 &&
              localDate(nextRace, {
                hour: "numeric",
                minute: "numeric",
                timeZone: getTimezone(nextRace.country),
              })}
          </p>
        </div>
        <div className="divider" />
        <div>
          <p>Your Time</p>
          <p>{localDate(nextRace, { hour: "numeric", minute: "numeric" })}</p>
        </div>
      </div>
      <div className="home__grid">
        <EventCard
          eventName="Practice 1"
          day={localDate(nextRace.firstPractice, { weekday: "short" })}
          time={localDate(nextRace.firstPractice, {
            hour: "numeric",
            minute: "numeric",
          })}
        />
        <EventCard
          eventName="Practice 2"
          day={localDate(nextRace.secondPractice, { weekday: "short" })}
          time={localDate(nextRace.secondPractice, {
            hour: "numeric",
            minute: "numeric",
          })}
        />
        <EventCard
          eventName={nextRace.sprint ? "Sprint" : "Practice 3"}
          day={localDate(nextRace.sprint || nextRace.thirdPractice, {
            weekday: "short",
          })}
          time={localDate(nextRace.sprint || nextRace.thirdPractice, {
            hour: "numeric",
            minute: "numeric",
          })}
        />
        <EventCard
          eventName="Qualifying"
          day={localDate(nextRace.qualifying, { weekday: "short" })}
          time={localDate(nextRace.qualifying, {
            hour: "numeric",
            minute: "numeric",
          })}
        />
        <EventCard
          eventName="Race"
          day={localDate(nextRace, { weekday: "short" })}
          time={localDate(nextRace, {
            hour: "numeric",
            minute: "numeric",
          })}
        />
      </div>
    </main>
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
