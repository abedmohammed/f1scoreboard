import { Outlet, useNavigation } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import Loader from "../components/Loader";
import ScrollToTop from "../components/scrollToTop";
import PageWrapper from "../components/PageWrapper";

function RootLayout() {
  const navigation = useNavigation();

  const isRacesAgain = (navigation) => {
    const path = navigation?.location?.pathname;

    if (path.includes("races") && path.length > 7) return true;

    return false;
  };

  return (
    <>
      <main>
        <ScrollToTop />
        {navigation.state === "loading" && !isRacesAgain(navigation) ? (
          <PageWrapper>
            <Loader />
          </PageWrapper>
        ) : (
          <Outlet />
        )}
        <MainNavigation />
      </main>
    </>
  );
}

export default RootLayout;
