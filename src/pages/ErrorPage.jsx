import React from "react";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import PageWrapper from "../components/PageWrapper";

import totoGif from "../assets/gifs/toto-smash.gif";

const ErrorPage = () => {
  const error = useRouteError();
  const code = error.status;
  const errorMessage = error?.data?.message;

  let message =
    "One of the services for this site seem to be currently unavailable. Please try again later!";

  if (code === 500) {
    message = errorMessage;
  }

  return (
    <>
      <PageWrapper className="error" title="Something went wrong">
        <img src={totoGif} alt="" className="error__gif" />
        <p className="error__message">{message}</p>
      </PageWrapper>
      <MainNavigation />
    </>
  );
};

export default ErrorPage;
