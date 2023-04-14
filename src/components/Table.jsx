import React from "react";
import { Link } from "react-router-dom";

const Table = ({ data }) => {
  return (
    <div className="table">
      {data.map((item) => (
        <Link
          to={`/${item.team ? "drivers" : "constructors"}/${item.url}`}
          key={item.name}
          className="table__row"
        >
          <p className="table__position">{item.position}</p>
          <h3 className="table__name">{item.name}</h3>
          {item.team && <span className="table__subtitle">{item.team}</span>}
          <div className="table__points">
            <span>{`${item.points} PTS`}</span>
          </div>
          <div className="table__arrow"></div>
        </Link>
      ))}
    </div>
  );
};

export default Table;
