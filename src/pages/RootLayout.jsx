import { Outlet } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  return (
    <>
      <main>
        <div className="background-pattern"></div>
        <Outlet />
        <MainNavigation />
      </main>
    </>
  );
}

export default RootLayout;
