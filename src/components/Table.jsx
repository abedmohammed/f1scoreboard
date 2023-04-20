import React from "react";
import { Link } from "react-router-dom";

const Table = ({ data, tab }) => {
  return (
    <div className="table">
      {data.map((item) => (
        // LINKAGE
        <Link
          to={`/${tab !== "Constructors" ? "drivers" : "constructors"}/${
            item.url
          }`}
          key={item.name}
          className="table__row"
        >
          {/* POSITION */}
          <p className="table__position">{item.position}</p>

          {/* TEAM LOGO */}
          {tab === "Constructors" && (
            <img className="table__logo" src={item.logo} alt="" />
          )}

          {/* DRIVER IMAGE */}
          {tab !== "Constructors" && (
            <div className="table__driver-image">
              <img src={item.image} alt="" />
            </div>
          )}

          {/* NAME */}
          <h3 className="table__name">{item.name}</h3>

          {/* DRIVER TEAM */}
          {tab !== "Constructors" && (
            <>
              <img className="table__team-logo" src={item.teamLogo} alt="" />
              <span className="table__team">{item.team}</span>
            </>
          )}

          {/* POINTS */}
          {(tab === "Drivers" || tab === "Constructors") && (
            <div className="table__points table__right">
              <span>{`${item.points} PTS`}</span>
            </div>
          )}

          {/* QUALIFYING */}
          {tab === "Qualifying" && (
            <div className="table__qualifying table__right">
              {item.q1 ? (
                <div className="table__qualifying-round">
                  <span>Q1</span>
                  <p className="table__qualifying-time">{`${item.q1}s`}</p>
                </div>
              ) : (
                <p className="table__dnf">DNF</p>
              )}
              {item.q2 && (
                <div className="table__qualifying-round">
                  <span>Q2</span>
                  <p className="table__qualifying-time">{`${item.q2}s`}</p>
                </div>
              )}
              {item.q3 && (
                <div className="table__qualifying-round">
                  <span>Q3</span>
                  <p className="table__qualifying-time">{`${item.q3}s`}</p>
                </div>
              )}
            </div>
          )}

          {/* SPRINT */}
          {tab === "Sprint" && (
            <>
              <div className="table__sprint table__right">
                {item.status === "Finished" ? (
                  <div>{item.time}</div>
                ) : (
                  <p className="table__status">{item.status}</p>
                )}
              </div>
              <div className="table__points">
                <span>{`${item.points} PTS`}</span>
              </div>
            </>
          )}

          {/* ARROW */}
          <div className="table__arrow"></div>
        </Link>
      ))}
    </div>
  );
};

export default Table;
