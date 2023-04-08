import React from "react";

const Table = ({ data }) => {
  return (
    <div className="table">
      {data.map((item) => (
        <div key={item.name} className="table__row">
          <p className="table__position">{item.position}</p>
          <h3 className="table__name">{item.name}</h3>
          {item.team && <span className="table__subtitle">{item.team}</span>}
          <div className="table__points">
            <span>{`${item.points} PTS`}</span>
          </div>
          <div className="table__arrow"></div>
        </div>
      ))}
    </div>
  );
};

export default Table;
