import { createContext, useEffect, useState } from "react";

export const CountriesContext = createContext();

export const CountriesContextProvider = ({ children }) => {
  const [flags, setFlags] = useState([]);
  const [timeZones, setTimezones] = useState([]);
  const [nationalities, setNationalities] = useState([]);

  useEffect(() => {
    const storeFlags = async () => {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      setFlags(() => {
        let dict = {};
        data.forEach((country) => {
          dict[country.name.common] = country.flags.png;
        });
        return dict;
      });
      setTimezones(() => {
        let dict = {};
        data.forEach((country) => {
          dict[country.name.common] = country.timezones[0];
        });
        return dict;
      });
      setNationalities(() => {
        let dict = {};
        data.forEach((country) => {
          if (!country.demonyms?.eng?.m) return;
          if (
            dict[country.demonyms?.eng?.m] &&
            dict[country.demonyms?.eng?.m].population > country.population
          )
            return;

          dict[country.demonyms?.eng?.m] = {
            country: country.name.common,
            population: country.population,
          };
        });
        return dict;
      });
    };

    storeFlags();
  }, []);

  const getFlag = (country) => {
    return flags[country];
  };

  const getTimezone = (country) => {
    return `Etc/GMT${timeZones[country]
      ?.substring(3)
      .replaceAll("0", "")
      .slice(0, -1)}`;
  };

  const getNationality = (demonym) => {
    return nationalities[demonym];
  };

  return (
    <CountriesContext.Provider
      value={{
        flags,
        getFlag,
        timeZones,
        getTimezone,
        nationalities,
        getNationality,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};
