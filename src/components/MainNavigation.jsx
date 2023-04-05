import React from "react";
import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  const activeLinkClass = ({ isActive }) => {
    return isActive
      ? "navigation__links navigation__links--active"
      : "navigation__links";
  };

  return (
    <nav className="navigation">
      <NavLink to="/" className={activeLinkClass} end>
        Home
      </NavLink>
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
    </nav>
  );
};

export default MainNavigation;
