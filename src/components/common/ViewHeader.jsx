import React from 'react';

export const ViewHeader = ({ title, subTitle, children }) => {
  return (
    <div className="view-header">
      <div className="view-header-title">
        {title && <h1>{title}</h1>}
        {subTitle && <h4>{subTitle}</h4>}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};
