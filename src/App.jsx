import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import StandingsPage from "./pages/StandingsPage";
import DriversPage from "./pages/DriversPage";
import ConstructorsPage from "./pages/ConstructorsPage";
import RacesPage from "./pages/RacesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/news", element: <NewsPage /> },
      { path: "/standings", element: <StandingsPage /> },
      { path: "/drivers", element: <DriversPage /> },
      { path: "/constructors", element: <ConstructorsPage /> },
      { path: "/races", element: <RacesPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
