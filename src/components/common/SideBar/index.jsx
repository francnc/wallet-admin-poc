import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { links } from './links';

export const SideBar = () => {
  const history = useHistory();
  const location = useLocation();
  const [currentItem, setCurrentItem] = useState({});

  useEffect(() => {
    if (location.pathname.replace('/', '')) {
      const item = links.find((it) => it.link === location.pathname);
      setCurrentItem(item);
    }
  }, []);

  const handleClose = (item) => {
    setCurrentItem(item);
    history.push(item.link);
  };

  return (
    <div className="sidebar">
      <MenuList id="menu-list">
        {links.map((it) => (
          <MenuItem
            key={it.link}
            selected={it.link === currentItem.link}
            onClick={() => handleClose(it)}
          >
            {it.title}
          </MenuItem>
        ))}
      </MenuList>
    </div>
  );
};
