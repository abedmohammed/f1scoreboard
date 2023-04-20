import { useState } from "react";

const useTabs = (tabsList) => {
  const [activeTab, setActiveTab] = useState(tabsList[0]);

  return [activeTab, setActiveTab, tabsList];
};

export default useTabs;
