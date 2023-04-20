import { Outlet } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import ScrollToTop from "../components/scrollToTop";

function RootLayout() {
  return (
    <>
      <main>
        <div className="background-pattern"></div>
        <ScrollToTop />
        <Outlet />
        <MainNavigation />
      </main>
    </>
  );
}

export default RootLayout;
