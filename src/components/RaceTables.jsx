import React from "react";
import { json, useLoaderData, useSearchParams } from "react-router-dom";
import { API } from "../helpers/utility";

const RaceTables = () => {
  const data = useLoaderData();
  let [searchParams, setSearchParams] = useSearchParams();

  // console.log(data.MRData.RaceTable.Races[0]?.QualifyingResults);
  // console.log(data.MRData.RaceTable.Races[0]?.SprintResults);

  const handleClick = (tableType) => {
    setSearchParams({ table: tableType });
  };

  return (
    <div>
      <ul>
        <li
          onClick={() => {
            handleClick("qualifying");
          }}
        >
          Qualifying
        </li>
        <li
          onClick={() => {
            handleClick("sprint");
          }}
        >
          Sprint
        </li>
        <li
          onClick={() => {
            handleClick("drivers");
          }}
        >
          Driver Results
        </li>
        <li
          onClick={() => {
            handleClick("constructors");
          }}
        >
          Team Results
        </li>
      </ul>
    </div>
  );
};

export default RaceTables;

export async function loader({ request, params }) {
  const round = params.raceRound;
  const tableType = new URL(request.url).searchParams.get("table");
  const response = await fetch(
    API(`/f1/current/${round}/${tableType || "qualifying"}`)
  );

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
