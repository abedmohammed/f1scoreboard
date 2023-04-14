import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import HomePage, { loader as homeLoader } from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import StandingsPage, {
  loader as standingsLoader,
} from "./pages/StandingsPage";
import DriversPage, { loader as driversLoader } from "./pages/DriversPage";
import ConstructorsPage, {
  loader as constructorsLoader,
} from "./pages/ConstructorsPage";
import RacesPage from "./pages/RacesPage";
import DriverPage, { loader as driverLoader } from "./pages/DriverPage";
import ConstructorPage, {
  loader as constructorLoader,
} from "./pages/ConstructorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage />, loader: homeLoader },
      { path: "news", element: <NewsPage /> },
      {
        path: "standings",
        element: <StandingsPage />,
        loader: standingsLoader,
      },
      {
        path: "drivers",
        id: "drivers",
        loader: driversLoader,
        children: [
          { index: true, element: <DriversPage /> },
          {
            path: ":driverUrl",
            element: <DriverPage />,
            loader: driverLoader,
          },
        ],
      },
      {
        path: "constructors",
        id: "constructors",
        loader: constructorsLoader,
        children: [
          { index: true, element: <ConstructorsPage /> },
          {
            path: ":constructorUrl",
            element: <ConstructorPage />,
            loader: constructorLoader,
          },
        ],
      },
      { path: "races", element: <RacesPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
