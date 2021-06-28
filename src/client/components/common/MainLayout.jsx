import React from 'react';

const links = [
  {
    title: 'Businesses',
    link: '/businesses',
  },
  {
    title: 'Certificates',
    link: '/certificates',
  },
];

export const MainLayout = ({ children }) => {
  return (
    <div>
      <div>header</div>
      <div>
        <ul>
          {links.map((link) => (
            <li key={link.link}>{link.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <div>
          <h1>Title</h1>
        </div>
        {children}
      </div>
    </div>
  );
};
