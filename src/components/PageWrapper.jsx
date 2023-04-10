import React from "react";

const PageWrapper = ({ className, title, children }) => {
  return (
    <main className={`${className} page`}>
      <h2 className="page__title">{title}</h2>
      {children}
    </main>
  );
};

export default PageWrapper;
