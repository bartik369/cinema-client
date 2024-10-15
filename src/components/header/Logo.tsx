import React from 'react';
import {Link} from "react-router-dom";
import Glasses from "../../assets/pics/cinema.png";
import * as contentConst from "../../utils/constants/content";
import style from "./Header.module.scss";

const Logo = () => {
    return (
        <>
            <Link className={style.logo} to={'/'}>
                <img src={Glasses} alt='' />
                <div className={style.bold}>{contentConst.film}</div>
                <span>{contentConst.library}</span>
            </Link>
        </>
    );
};

export default Logo;
