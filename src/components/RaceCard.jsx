import React, { useContext, useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { CountriesContext } from "../context/CountriesContext";

const RaceCard = ({ race }) => {
  const { getFlag } = useContext(CountriesContext);
  const [time, setTime] = useState(new Date());
  const userLocale = navigator.language;

  const flag = getFlag(race.country);

  const localDate = (event, options) => {
    return new Intl.DateTimeFormat(userLocale, options).format(
      new Date(Date.parse(`${event.date}T${event.time || "00:00:00Z"}`))
    );
  };

  const refreshClock = () => {
    setTime(new Date());
  };

  useEffect(() => {
    const timer = setInterval(refreshClock, 60000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="race">
      <div className="race__country">
        {flag && <img src={flag} alt={`${race.country} flag`} />}
        <h2>{race.country}</h2>
      </div>
      <div className="race__date">
        <p className="text-faint">
          {race.firstPractice &&
            localDate(race.firstPractice, {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }) + " - "}
          {localDate(race, {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
      <h3 className="race__title">{race.name}</h3>
      {race.time ? (
        <>
          <div className="race__time">
            <div>
              <p>{race.locale}</p>
              <p>{localDate(race, { hour: "numeric", minute: "numeric" })}</p>
            </div>
            <div className="divider" />
            <div>
              <p>Your Time</p>
              <p>
                {new Intl.DateTimeFormat(userLocale, {
                  hour: "numeric",
                  minute: "numeric",
                }).format(new Date(time))}
              </p>
            </div>
          </div>
          <div className="race__grid">
            {race.sprint ? (
              <>
                <EventCard
                  eventName="Practice 1"
                  day={localDate(race.firstPractice, { weekday: "short" })}
                  time={localDate(race.firstPractice, {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                />
                <EventCard
                  eventName="Qualifying"
                  day={localDate(race.qualifying, { weekday: "short" })}
                  time={localDate(race.qualifying, {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                />
                <EventCard
                  eventName="Practice 2"
                  day={localDate(race.secondPractice, { weekday: "short" })}
                  time={localDate(race.secondPractice, {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                />
                <EventCard
                  eventName="Sprint"
                  day={localDate(race.sprint, {
                    weekday: "short",
                  })}
                  time={localDate(race.sprint, {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                />

                <EventCard
                  className="race"
                  eventName="Race"
                  day={localDate(race, { weekday: "short" })}
                  time={localDate(race, {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                />
              </>
            ) : (
              <>
                <EventCard
                  eventName="Practice 1"
                  day={localDate(race.firstPractice, { weekday: "short" })}
                  time={localDate(race.firstPractice, {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                />
                <EventCard
                  eventName="Practice 2"
                  day={localDate(race.secondPractice, { weekday: "short" })}
                  time={localDate(race.secondPractice, {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                />
                <EventCard
                  eventName="Practice 3"
                  day={localDate(race.thirdPractice, {
                    weekday: "short",
                  })}
                  time={localDate(race.thirdPractice, {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                />
                <EventCard
                  eventName="Qualifying"
                  day={localDate(race.qualifying, { weekday: "short" })}
                  time={localDate(race.qualifying, {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                />
                <EventCard
                  className="race"
                  eventName="Race"
                  day={localDate(race, { weekday: "short" })}
                  time={localDate(race, {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                />
              </>
            )}
          </div>
        </>
      ) : (
        <p style={{ marginTop: "20px" }}>No time currently available</p>
      )}
    </div>
  );
};

export default RaceCard;
