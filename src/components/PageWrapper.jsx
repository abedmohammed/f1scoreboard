import React from "react";

const PageWrapper = ({ className, title, children }) => {
  return (
    <>
      <main className="page">
        {title && <h2 className="page__title">{title}</h2>}
        <div className={className}>{children}</div>
      </main>
      {/* <p className="page__copyright">
        &copy; Copyright {new Date().getFullYear()}&nbsp;|&nbsp;
        <a
          href="https://github.com/abedmohammed"
          target="_blank"
          rel="noreferrer"
        >
          Mohammed Abed
        </a>
      </p> */}
    </>
  );
};

export default PageWrapper;
