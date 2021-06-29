import React from 'react';

export const CellListItems = ({ children }) => {
  return (
    <ul
      style={{
        lineHeight: 1.5,
        listStyleType: 'none',
        padding: 0,
        overflow: 'scroll',
      }}
    >
      {React.Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  );
};
