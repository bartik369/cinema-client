import React, { FC, useState } from 'react';
import { useAppDispatch} from '../../../hooks/reduxHook';
import { IUserAuth } from '../../../types/auth';
import { useSigninUserMutation } from '../../../store/authApi';
import { setCredentials, setAuth } from '../../../store/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import * as contentConst from '../../../utils/constants/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import validate from '../../../middleware/validateAuth';
import { faEye, faEyeSlash, faEnvelope, faXmark } from '@fortawesome/free-solid-svg-icons';
import style from './Auth.module.css';
import 'react-toastify/dist/ReactToastify.css';

interface ISigninProps {
  signupHandler: () => void;
  closeFormHandler: () => void;
}
const Signin: FC<ISigninProps> = ({ signupHandler, closeFormHandler }) => {
  type Errors = Partial<Record<keyof IUserAuth, string>>
  type Touched = Partial<Record<keyof IUserAuth, boolean>>

  const dispatch = useAppDispatch();
  const [signinUser] = useSigninUserMutation();
  const [authData, setAuthData] = useState<IUserAuth>({
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [passwordType, setPasswordType] = useState(false);
  const [errors, setErrors] = useState<Errors>(validate(authData))
  const [touched, setTouched] = useState<Touched>({})

  const showPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setPasswordType(passwordType ? false : true);
  };
  
  const login = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
      if (errors?.email?.length === 0 && errors?.password?.length === 0) {
        await signinUser(authData)
        .unwrap()
        .then((data) => {
            dispatch(setCredentials(data));
            dispatch(setAuth(true))
            closeFormHandler();
            localStorage.setItem('accessToken', data.token)
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
      <form className={style.form} action='' onSubmit={login}>
        <span className={style.title}>{contentConst.signinTitle}</span>
        <span className={style.label}>{contentConst.email}</span>
        <div className={style['input-data']}>
          <FontAwesomeIcon className={style.icon} icon={faEnvelope} />
          <input className={style.data} type='text'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAuthData({ ...authData, email: e.target.value })
              setErrors(validate({ ...authData, email: e.target.value }))
            }}
            onBlur={() => setTouched({ ...touched, email: true })}
          />
        </div>
        <div className={style.error}>
        {errors.email && touched.email 
        ? <p>{errors.email}</p> 
        : null
        }
        </div>
        <span className={style.label}>{contentConst.password}</span>
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
        </div>
        <div className={style.error}>
        {errors.password && touched.password ? <p>{errors.password}</p> : null}
        </div>
        <div className={style.switch}>
          {contentConst.havenotAccount}
          <span onClick={signupHandler} className={style.login}>
            {contentConst.registetText}
          </span>
        </div>
        <button type="submit" className={style['enter-btn']}>{contentConst.enterBtn}</button>
      </form>
      <button className={style.close} onClick={closeFormHandler}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

export default Signin;
