import { createContext, useEffect, useState } from "react";

export const CountriesContext = createContext();

export const CountriesContextProvider = ({ children }) => {
  const [flags, setFlags] = useState([]);
  const [nationalities, setNationalities] = useState([]);

  useEffect(() => {
    const storeFlags = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");

        if (!response.ok) {
          throw new Error(response.status);
        }

        const data = await response.json();
        setFlags(() => {
          let dict = {};
          data.forEach((country) => {
            dict[country.name.common] = country.flags.png;
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
      } catch (err) {
        console.error(err);
      }
    };

    storeFlags();
  }, []);

  const getFlag = (country) => {
    if (country === "USA") return flags["United States"];
    if (country === "UK") return flags["United Kingdom"];
    if (country === "UAE") return flags["United Arab Emirates"];

    return flags[country];
  };

  const getNationality = (demonym) => {
    return nationalities[demonym];
  };

  return (
    <CountriesContext.Provider
      value={{
        getFlag,
        getNationality,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};
