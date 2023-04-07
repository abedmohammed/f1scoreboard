import { createContext, useEffect, useState } from "react";

export const CountriesContext = createContext();

export const CountriesContextProvider = ({ children }) => {
  let [flags, setFlags] = useState([]);
  let [timeZones, setTimezones] = useState([]);

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
    };

    storeFlags();
  }, []);

  const getFlag = (country) => {
    return flags[country];
  };

  const getTimezone = (country) => {
    console.log(country);
    console.log(timeZones);
    return `Etc/GMT${timeZones[country]
      ?.substring(3)
      .replaceAll("0", "")
      .slice(0, -1)}`;
  };

  return (
    <CountriesContext.Provider
      value={{ flags, getFlag, timeZones, getTimezone }}
    >
      {children}
    </CountriesContext.Provider>
  );
};
