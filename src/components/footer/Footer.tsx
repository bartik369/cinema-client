import { FC } from 'react';
import { Link } from 'react-router-dom';
import { footerMenu1, footerMenu2 } from '../../utils/data/data';
import { useAppSelector } from '../../hooks/reduxHook';
import * as contentConst from '../../utils/constants/content'
import Instagram from '../../assets/pics/instagram.svg'
import Twitter from '../../assets/pics/twitter.svg'
import VK from '../../assets/pics/vk.svg'
import Telegram from '../../assets/pics/telegram.svg'
import Message from '../../assets/pics/message.svg'
import style from './Footer.module.css';

const Footer: FC = () => {
  const existTrailer = useAppSelector(state => state.movies.existTrailer);
  return (
    <div className={existTrailer ? style.container : style.notrailer}>
      <div className={style.inner}>
        <div className={style.menu}>
          <ul>
            {footerMenu1.map((item) => (
              <li key={item.id}>
                <Link to={item.url}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.menu}>
          <ul>
            {footerMenu2.map((item) => (
              <li key={item.id}>
                <Link to={item.url}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.menu}>
          <div className={style.social}>
            <div><img src={Instagram} alt="" /></div>
            <div><img src={VK} alt="" /></div>
            <div><img src={Telegram} alt="" /></div>
            <div><img src={Twitter} alt="" /></div>
          </div>
          <button className={style.help}>
            <img src={Message} alt="" />
            {contentConst.chatHelp}
            </button>
        </div>
        <div className={style.info}></div>
      </div>
    </div>
  );
};

export default Footer;
