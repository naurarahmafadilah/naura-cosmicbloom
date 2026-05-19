import React from "react";

const DashboardContainer = ({ children }) => {
  return (
    <div className="min-h-screen bg-bg-main text-primary-dark font-quicksand w-full">
      {children}
    </div>
  );
};

export default DashboardContainer;