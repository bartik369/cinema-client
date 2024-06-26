import React from 'react';
import {footerMenu1, footerMenu2} from "../../utils/data/data";
import {Link} from "react-router-dom";
import Instagram from "../../assets/pics/instagram.svg";
import VK from "../../assets/pics/vk.svg";
import Telegram from "../../assets/pics/telegram.svg";
import Twitter from "../../assets/pics/twitter.svg";
import style from "./Footer.module.css";

const Menu = () => {
    return (
        <>
            <nav className={style.menu}>
                <ul>
                    {footerMenu1.map((item) => (
                        <li key={item.id}>
                            <Link to={item.url}>{item.title}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <nav className={style.menu}>
                <ul>
                    {footerMenu2.map((item) => (
                        <li key={item.id}>
                            <Link to={item.url}>{item.title}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <nav className={style.menu}>
                <div className={style.social}>
                    <div><img src={Instagram} alt=""/></div>
                    <div><img src={VK} alt=""/></div>
                    <div><img src={Telegram} alt=""/></div>
                    <div><img src={Twitter} alt=""/></div>
                </div>
            </nav>
        </>
    );
};

export default Menu;
