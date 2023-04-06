import React from "react";
import { NavLink } from "react-router-dom";

import f1logo from "../assets/images/f1logo.png";

const MainNavigation = () => {
  const activeLinkClass = ({ isActive }) => {
    return isActive
      ? "navigation__link navigation__link--active"
      : "navigation__link";
  };

  return (
    <nav className="navigation">
      <NavLink to="/" end>
        <div className="navigation__logo">
          <span role="img" aria-label="Formula 1 logo link to home page"></span>
        </div>
      </NavLink>
      <div className="navigation__links">
        <NavLink to="/news" className={activeLinkClass} end>
          News
        </NavLink>
        <NavLink to="/standings" className={activeLinkClass} end>
          Standings
        </NavLink>
        <NavLink to="/drivers" className={activeLinkClass} end>
          Drivers
        </NavLink>
        <NavLink to="/constructors" className={activeLinkClass} end>
          Constructors
        </NavLink>
        <NavLink to="/races" className={activeLinkClass} end>
          Races
        </NavLink>
      </div>
    </nav>
  );
};

export default MainNavigation;
