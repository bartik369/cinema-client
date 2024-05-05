import  React, { FC, useEffect, useState, useRef, MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../navigation/Navbar';
import Search from '../search/Search';
import Signin from '../forms/auth/Signin';
import Signup from '../forms/auth/Signup';
import { useAppSelector } from '../../hooks/reduxHook';
import ProfileMenu from '../navigation/ProfileMenu';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import * as contentConst from '../../utils/constants/content'
import Glasses from '../../assets/pics/cinema.svg';
import Login from '../../assets/pics/login.svg';
import style from './Header.module.css';

const Header: FC = () => {
  const token = useAppSelector(state => state.auth.token);
  const user = useAppSelector(state => state.auth.user);
  const [visible, setVisible] = useState<boolean>(false);
  const [profileMenu, setProfileMenu] = useState<boolean>(false);
  const [visibleSignin, setVisibleSignin] = useState<boolean>(false);
  const [visibleSignup, setVisibleSignup] = useState<boolean>(false);
  const location = useLocation();
  const regEx = location.pathname.match(/\/movies\/[a-zA-Z0-9]/);
  const regEx404 = location.pathname.match(/\/404/);
  const myRef = useRef<HTMLButtonElement>(null);

  const visibleHandler = () => {
    setVisible(!visible);
  };
  const signinHandler = () => {
    setVisibleSignin(true);
    setVisibleSignup(false);
  };
  const signupHandler = () => {
    setVisibleSignup(true);
    setVisibleSignin(false);
  };
  const closeFormHandler = () => {
    setVisibleSignup(false);
    setVisibleSignin(false);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent):void => {
      if (myRef.current && !myRef.current.contains(e.target as Node)) {
        setProfileMenu(false);
      }
    }
    document.addEventListener('click', (e:any) =>  checkIfClickedOutside(e))
    return () => {
      document.removeEventListener('click',(e:any) => checkIfClickedOutside(e))
    }
  }, []);

  return (
    <>
    {visible && <Search visibleHandler={visibleHandler} />}
      <div className={(regEx || regEx404) ? style['nav-absolute'] : style['nav-relative']}>
        <div className={style.container}>
            <Link className={style.logo} to={'/'}>
              <img src={Glasses} alt='' />
              <div className={style.bold}>film</div>
              <span>library</span>
            </Link>
          <Navbar />
          <div className={style.right}>
            <div onClick={() => setVisible(true)} className={style.search}>
              <FontAwesomeIcon
                className={style['search-icon']}
                icon={faSearch}
              />
            </div>
            {user && token ? (
              <button className={style['profile-btn']} ref={myRef} 
              onClick={() => setProfileMenu(!profileMenu)}>
                {profileMenu
                  ?  <FontAwesomeIcon className={style['bars-active']} icon={faBarsStaggered} />
                  :  <FontAwesomeIcon className={style.bars} icon={faBars} />
                }
              </button>
            ) : (
              <div className={style.auth} onClick={() => setVisibleSignin(true)}> 
                <img src={Login} alt="" />
                <span>{contentConst.enterBtn}</span>
              </div>
            )}
             {profileMenu && 
             <ProfileMenu setProfileMenu={setProfileMenu} profileMenu={profileMenu}/>
              }
          </div>
        </div>
        <div className={style.breadcrumbs}>
         <Breadcrumbs />
        </div>
      
      </div>
      {visibleSignin && (
        <Signin signupHandler={signupHandler} closeFormHandler={closeFormHandler} />
      )}
      {visibleSignup && (
        <Signup signinHandler={signinHandler} closeFormHandler={closeFormHandler} />
      )}
    </>
  );
};

export default Header;