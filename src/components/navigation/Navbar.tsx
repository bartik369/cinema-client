import React, { FC } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { menuItemsData } from '../../utils/data/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import style from './Navbar.module.css';

const Navbar: FC = () => {
  return (
    <nav className={style['header-nav']}>
      <ul className={style['menu-items']}>
        {menuItemsData.map((item) => (
         
         <NavLink className={({ isActive }) => (isActive 
         ? style.active 
         : style['menu-item'])} to={item.url} key={item.id}>
            <li key={item.id}>
              <div className={style.icon}>
                  <FontAwesomeIcon icon={item.icon as IconProp}/>
              </div>
              <div className={style.title}>{item.title}</div>
            </li>
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
