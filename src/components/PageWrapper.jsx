import React from "react";

const PageWrapper = ({ className, title, children }) => {
  return (
    <main className="page">
      {title && <h2 className="page__title">{title}</h2>}
      <div className={className}>{children}</div>
    </main>
  );
};

export default PageWrapper;
