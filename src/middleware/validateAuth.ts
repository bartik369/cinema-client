import { IAuthData } from '../types/auth';
import * as contentConst from '../utils/constants/content';

export default function validateLogin(authData: IAuthData) {
    let errors = {
      email: '',
      password: '',
      repeatPassword: '',
    };

    if (!authData.email) {
      errors.email = contentConst.inputEmail;
    } else if (!/\S+@\S+\.\S+/.test(authData.email)) {
      errors.email = contentConst.wrongEmailFormat;
    }
    
    if (!authData.password) {
      errors.password = contentConst.inputPassword;
    } else if (
      (authData.password.length !== 0  && authData.repeatPassword.length !== 0) 
      && (authData.password !== authData.repeatPassword)) {
      errors.password = contentConst.dontPasswordMatch;
      errors.repeatPassword = contentConst.dontPasswordMatch;
    }
    return errors;
  }