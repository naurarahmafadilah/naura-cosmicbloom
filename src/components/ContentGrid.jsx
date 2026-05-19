import React from "react";

const ContentGrid = ({ leftContent, rightContent }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
      <div className="lg:col-span-8 space-y-8 w-full">
        {leftContent}
      </div>
      <div className="lg:col-span-4 space-y-8 w-full">
        {rightContent}
      </div>
    </div>
  );
};

export default ContentGrid;