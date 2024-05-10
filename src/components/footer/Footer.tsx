import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { footerMenu1, footerMenu2 } from '../../utils/data/data';
import { useAppSelector } from '../../hooks/reduxHook';
import { ToastContainer, toast } from 'react-toastify';
import { useOpenChatMutation } from '../../store/chatApi';
import { IChatInfo } from '../../types/chat';
import Chat from '../chat/Chat';
import * as contentConst from '../../utils/constants/content';
import Instagram from '../../assets/pics/instagram.svg';
import Twitter from '../../assets/pics/twitter.svg';
import VK from '../../assets/pics/vk.svg';
import Telegram from '../../assets/pics/telegram.svg';
import Message from '../../assets/pics/message.svg';
import style from './Footer.module.css';

const Footer: FC = () => {
  const location = useLocation();
  const existTrailer = useAppSelector(state => state.movies.existTrailer);
  const isAuth = useAppSelector(state => state.auth.isAuth);
  const user = useAppSelector(state => state.auth.user);
  const [openChat] = useOpenChatMutation();
  const [recipientId, setRecipientId] = useState<string>('');
  const [chatInfo, setChatInfo] = useState<IChatInfo>()
  const [visibleChat, setVisibleChat] = useState(false);
  const regEx = location.pathname.match(/\/movies\/[a-zA-Z0-9]/);

  const startChat = () => {
    
    if (isAuth) {
        setVisibleChat(true);
        openChat(user._id).unwrap().then((data) => {
          setChatInfo({...data})
          setRecipientId(data.participants.filter((item:string) => item != user._id))
        })
    } else {
      toast.error(contentConst.errorAddFavotite)
    }
  }
  const visibleHandler = () => {
    setVisibleChat(false)
  }
  
  return (
    <div className={(existTrailer && regEx) ? style.container : style.notrailer}>
      <ToastContainer
            theme="colored"
            autoClose={7000}
            position="top-center"
          />
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
          <button onClick={startChat} className={style.help}>
            <img src={Message} alt="" />
            {contentConst.chatHelp}
            </button>
        </div>
        <div className={style.info}></div>
      </div>
      {visibleChat &&
       <Chat 
       visibleHandler={visibleHandler} 
       user={user} 
       chatInfo={chatInfo!} 
       recipientId={recipientId}/>}
    </div>
  );
};

export default Footer;
