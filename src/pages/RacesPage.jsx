import React, { useMemo, useContext, useEffect, useState } from "react";
import {
  useLoaderData,
  json,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import { API } from "../helpers/utility";
import RaceCard from "../components/RaceCard";
import PageWrapper from "../components/PageWrapper";
import { CountriesContext } from "../context/CountriesContext";
import Map from "../components/Map";

const RacesPage = () => {
  const [currentRace, setCurrentRace] = useState();
  const { getFlag } = useContext(CountriesContext);
  const userLocale = navigator.language;
  const data = useLoaderData();
  const racesList = data.MRData.RaceTable.Races;
  const [coords, setCoords] = useState();
  const navigate = useNavigate();

  const localDate = (event, options) => {
    return new Intl.DateTimeFormat(userLocale, options).format(
      Date.parse(`${event.date}T${event.time || "00:00:00Z"}`)
    );
  };

  const races = useMemo(() => {
    return racesList.map((race) => {
      return {
        country: race.Circuit.Location.country,
        date: race.date,
        time: race.time,
        name: race.raceName,
        round: race.round,
        locale: race.Circuit.Location.locality,
        firstPractice: race.FirstPractice,
        secondPractice: race.SecondPractice,
        thirdPractice: race.ThirdPractice,
        sprint: race.Sprint,
        qualifying: race.Qualifying,
        lat: race.Circuit.Location.lat,
        long: race.Circuit.Location.long,
      };
    });
  }, [racesList]);

  const year = data.MRData.RaceTable.season;
  useEffect(() => {
    if (!races[currentRace]) {
      const now = new Date();
      let nextRaceIndex = 0;
      races.forEach((race, i) => {
        if (new Date(race.date) > now && nextRaceIndex === 0) {
          nextRaceIndex = i;
        }
      });
      setCurrentRace(nextRaceIndex);
      setCoords([races[nextRaceIndex].lat, races[nextRaceIndex].long]);
      navigate(races[nextRaceIndex].round);
    }
  }, [races, currentRace, navigate]);

  const handleRaceChange = (raceIndex) => {
    setCurrentRace(raceIndex);
    setCoords([races[raceIndex].lat, races[raceIndex].long]);
  };

  return (
    <PageWrapper className="races" title={`${year} Races`}>
      <div className="races__listing">
        <aside className="schedule">
          <div className="schedule__box">
            <h3 className="schedule__header">Schedule</h3>
            <div className="schedule__list">
              {races.map((race, i) => {
                return (
                  <NavLink
                    to={race.round}
                    key={i}
                    onClick={() => {
                      handleRaceChange(i);
                    }}
                    className={`schedule__card ${
                      currentRace === i ? "schedule__card--active" : ""
                    }`}
                  >
                    <div className="schedule__cover"></div>
                    <div className="schedule__flag">
                      {getFlag(race.country) && (
                        <img
                          src={getFlag(race.country)}
                          alt={`${race.country} flag`}
                        />
                      )}
                    </div>
                    <p className="schedule__country">{race.country}</p>
                    <p className="schedule__date">
                      {localDate(race, {
                        day: "2-digit",
                        month: "long",
                      })}
                    </p>
                    <p className="schedule__date schedule__date--short">
                      {localDate(race, {
                        day: "2-digit",
                        month: "short",
                      })}
                    </p>
                  </NavLink>
                );
              })}
            </div>
          </div>

          <div className="schedule__pattern"></div>
        </aside>
        <div className="races__race">
          {races[currentRace] && (
            <>
              <RaceCard race={races[currentRace]} />
              <div className="races__map">
                <Map coords={coords} />
              </div>
            </>
          )}
        </div>
      </div>
      {races[currentRace] && (
        <div className="races__tables">
          <Outlet />
        </div>
      )}
    </PageWrapper>
  );
};

export default RacesPage;

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
