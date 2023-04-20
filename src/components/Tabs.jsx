import React from "react";

const Tabs = ({ tabs, onTabSwitch, activeTab }) => {
  return (
    <div className="tabs">
      {tabs.map((tab) => {
        return (
          <button
            key={tab}
            className={`tabs__tab ${
              activeTab === tab ? "tabs__tab--active" : ""
            }`}
            onClick={() => {
              onTabSwitch(tab);
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
