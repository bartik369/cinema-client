import React, { FC, useState } from 'react';
import { useSignupUserMutation } from '../../../store/authApi';
import { useAppDispatch } from '../../../hooks/reduxHook';
import { setCredentials } from '../../../store/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import validate from '../../../middleware/validateAuth'
import { IUserAuth } from '../../../types/auth';
import * as contentConst from '../../../utils/constants/content';
import { ToastContainer, toast } from 'react-toastify';
import authBanner from '../../../assets/pics/authwall.jpg'
import { faEye, faEyeSlash, faEnvelope, faXmark} from '@fortawesome/free-solid-svg-icons';
import style from './Auth.module.css';
import 'react-toastify/dist/ReactToastify.css';

interface ISignupProps {
  signinHandler: () => void;
  closeFormHandler: () => void;
}

const Signup: FC<ISignupProps> = ({ signinHandler, closeFormHandler }) => {
  type Errors = Partial<Record<keyof IUserAuth, string>>
  type Touched = Partial<Record<keyof IUserAuth, boolean>>
  const [signupUser] = useSignupUserMutation();
  const dispatch = useAppDispatch();
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [passwordType, setPasswordType] = useState(false);
  const [errors, setErrors] = useState<Errors>(validate(authData));
  const [touched, setTouched] = useState<Touched>({});

  const showPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setPasswordType(passwordType ? false : true);
  };

  const create = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
    if (errors?.email?.length === 0 && errors?.password?.length === 0) {
      let userData = {
        email: authData.email,
        password: authData.password,
      };
      await signupUser(userData)
      .unwrap()
      .then((data) => {
        dispatch(setCredentials(data));
        closeFormHandler();
      })
      .catch((error) => toast.error(error.data.message));
    }
  };

  return (
    <div className={style.auth}>
       <div className={style.toast}>
      <ToastContainer
      theme="colored"
      autoClose={7000}
      position="top-center"
       />
       </div>
       <div className={style.inner}>
      <div className={style.banner}>
        <img src={authBanner} alt="" />
      </div>
      <div className={style['form-wrap']}>
      <form className={style.form} action='' onSubmit={create}>
        <div className={style.title}>{contentConst.signupTitle}</div>
        <div className={style.label}>{contentConst.email}</div>
        <div className={style['input-data']}>
          <FontAwesomeIcon className={style.icon} icon={faEnvelope} />
          <input
            className={style.data}
            type="text"
            autoFocus
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAuthData({ ...authData, email: e.target.value })
              setErrors(validate({ ...authData, email: e.target.value }))
            }}
            onBlur={() => setTouched({ ...touched, email: true })}
          />
           {(errors.email && touched.email) 
           ? <div className={style.error}>{errors.email}</div> 
           : null
           }
        </div>
        <div className={style.label}>{contentConst.password}</div>
        <div className={style['input-data']}>
          {passwordType ? (
            <FontAwesomeIcon
              className={style.icon}
              onClick={showPassword}
              icon={faEyeSlash}
            />
          ) : (
            <FontAwesomeIcon
              className={style.icon}
              onClick={showPassword}
              icon={faEye}
            />
          )}
          <input className={style.data} type={passwordType ? "text" : "password"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAuthData({ ...authData, password: e.target.value })
              setErrors(validate({...authData, password: e.target.value }))
            }}
            onBlur={() => setTouched({ ...touched, password: true })}
          />
           {(errors.password && touched.password ) 
           ? <div className={style.error}>{errors.password}</div> 
           : null
           }
        </div>
        <span className={style.label}>{contentConst.repeatPassword}</span>
        <div className={style['input-data']}>
          {passwordType ? (
            <FontAwesomeIcon
              className={style.icon}
              onClick={showPassword}
              icon={faEyeSlash}
            />
          ) : (
            <FontAwesomeIcon
              className={style.icon}
              onClick={showPassword}
              icon={faEye}
            />
          )}
          <input className={style.data} type={passwordType ? "text" : "password"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAuthData({ ...authData, repeatPassword: e.target.value })
              setErrors(validate({...authData, repeatPassword: e.target.value }))
            }}
            onBlur={() => setTouched({ ...touched, repeatPassword: true })}
          />
           {(errors.repeatPassword && touched.repeatPassword) 
           ? <div className={style.error}>{errors.repeatPassword}</div> 
           : null
           }
        </div>
        <div className={style.switch}>
          {contentConst.haveAccount}
          <span onClick={signinHandler} className={style.login}>
            {contentConst.login}
          </span>
        </div>
        <button type="submit" className={style['enter-btn']}>{contentConst.register}</button>
      </form>
      </div>
      </div>
      <button className={style.close} onClick={closeFormHandler}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

export default Signup;