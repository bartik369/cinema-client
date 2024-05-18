import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { profileMenuData } from '../../utils/data/data';
import { useAppSelector } from '../../hooks/reduxHook';
import { useLogoutUserMutation } from '../../store/authApi';
import * as contentConst from '../../utils/constants/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './ProfileMenu.module.css';

interface IProfileMenuProps {
    setProfileMenu: (profileMenu: boolean) => void;
    profileMenu: boolean;
}

const ProfileMenu: FC<IProfileMenuProps> = ({setProfileMenu, profileMenu}) => {
  const user = useAppSelector(state => state.auth.user);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [logoutUser] = useLogoutUserMutation();

  useEffect(() => {
    user && user.roles?.map((role) => {
      if (role === 'ADMIN') {
        setIsAdmin(true);
      }
    });
  }, [user]);

  const logoutHandler = () => {
    logoutUser()
    setProfileMenu(!profileMenu)
    localStorage.removeItem('accessToken');
    window.location.reload();
  }

  return (
    <div className={style['profile-menu']}>
        <ul className={style.items}>
          {profileMenuData.map((item, index) =>
            !isAdmin && item.url === '/admin' ? null : (
              <li key={index}>
                 <NavLink className={({ isActive }) => (isActive 
                  ? style.active 
                  : style[''])} to={item.url} key={item.id}>
                    <FontAwesomeIcon className={style.icon} icon={item.icon}/>
                    {item.title}
                  </NavLink>
              </li>
            )
          )}
        </ul>
      <div className={style.logout} onClick={logoutHandler}>
      {contentConst.logout}
      </div>
    </div>
  );
};

export default ProfileMenu;
