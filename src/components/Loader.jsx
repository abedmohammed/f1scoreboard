import React from "react";

import wheel from "../assets/images/loader.webp";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__spinner">
        <img src={wheel} alt="" />
      </div>
    </div>
  );
};

export default Loader;
