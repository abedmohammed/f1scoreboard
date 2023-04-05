import { Outlet } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  return (
    <>
      <main>
        <Outlet />
        <MainNavigation />
      </main>
    </>
  );
}

export default RootLayout;
