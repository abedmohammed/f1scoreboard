import React from "react";
import { NavLink } from "react-router-dom";

import standingsIcon from "../assets/icons/leaderboards.svg";
import driversIcon from "../assets/icons/helmet.svg";
import teamsIcon from "../assets/icons/car.svg";
import racesIcon from "../assets/icons/calendar.svg";
import homeIcon from "../assets/icons/home.svg";

const MainNavigation = () => {
  const activeLinkClass = ({ isActive }) => {
    return isActive
      ? "navigation__link navigation__link--active"
      : "navigation__link";
  };

  return (
    <nav className="navigation">
      <div className="navigation__links">
        <div className="navigation__home--mobile">
          <NavLink to="/" className={activeLinkClass} end>
            <img className="navigation__icon" src={homeIcon} alt="" />
            <p>Home</p>
          </NavLink>
        </div>

        <div className="navigation__standings">
          <NavLink to="/standings" className={activeLinkClass} end>
            <img className="navigation__icon" src={standingsIcon} alt="" />
            <p>Standings</p>
          </NavLink>
        </div>

        <div className="navigation__drivers">
          <NavLink to="/drivers" className={activeLinkClass}>
            <img className="navigation__icon" src={driversIcon} alt="" />
            <p>Drivers</p>
          </NavLink>
        </div>

        <div className="navigation__home">
          <NavLink to="/" end>
            <h1>
              <div className="navigation__logo">
                <span
                  role="img"
                  aria-label="Formula 1 logo link to home page"
                ></span>
              </div>
            </h1>
          </NavLink>
        </div>

        <div className="navigation__constructors">
          <NavLink to="/constructors" className={activeLinkClass}>
            <img className="navigation__icon" src={teamsIcon} alt="" />
            <p>Constructors</p>
          </NavLink>
        </div>

        <div className="navigation__races">
          <NavLink to="/races" className={activeLinkClass}>
            <img className="navigation__icon" src={racesIcon} alt="" />
            <p>Races</p>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
