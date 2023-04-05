import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <main>
        <p>Outlet</p>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
