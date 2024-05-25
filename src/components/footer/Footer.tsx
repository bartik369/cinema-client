import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { footerMenu1, footerMenu2 } from '../../utils/data/data';
import { useAppSelector } from '../../hooks/reduxHook';
import { ToastContainer, toast } from 'react-toastify';
import { useOpenChatMutation, useGetUnreadMessagesQuery } from '../../store/chatApi';
import { IChatInfo } from '../../types/chat';
import UnreadMessagesButton from '../information/UnreadMessagesButton';
import Chat from '../chat/Chat';
import * as contentConst from '../../utils/constants/content';
import Instagram from '../../assets/pics/instagram.svg';
import Twitter from '../../assets/pics/twitter.svg';
import VK from '../../assets/pics/vk.svg';
import Telegram from '../../assets/pics/telegram.svg';
import style from './Footer.module.css';

const Footer: FC = () => {
  const location = useLocation();
  const existTrailer = useAppSelector(state => state.movies.existTrailer);
  const isAuth = useAppSelector(state => state.auth.isAuth);
  const [isAdmin, setIsAdmin] = useState(false);
  const user = useAppSelector(state => state.auth.user);
  const [openChat] = useOpenChatMutation();
  const [recipientId, setRecipientId] = useState<string>('');
  const [chatInfo, setChatInfo] = useState<IChatInfo>()
  const [visibleChat, setVisibleChat] = useState(false);
  const [skip, setSkip] = useState(true);
  const {data: unreadMessages} = useGetUnreadMessagesQuery(user && user._id, {skip: skip});
  const regEx = location.pathname.match(/\/movies\/[a-zA-Z0-9]/);

  const startChat = () => {
    if (isAuth) {
      setVisibleChat(!visibleChat)
      openChat(user._id).unwrap().then((data) => {
        setChatInfo({...data})
        setRecipientId(data.participants.filter((item:string) => item != user._id))
      });
    } else {
      toast.error(contentConst.errorAddFavotite);
    }
  }
  const visibleHandler = () => {
    setVisibleChat(false)
  }

  useEffect(() => {
    user && user.roles?.forEach((role) => {
      if (role === contentConst.ADMIN || role === contentConst.SUPPORT) {
        setIsAdmin(true);
      }
    });
    if (isAuth) {
      setSkip(false);
    }
  }, [user, isAuth]);

  console.log(unreadMessages)

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
          <div className={style['chat-block']}>
            <UnreadMessagesButton
            startChat={startChat}
            visibleChat={visibleChat}
            unreadMessages={unreadMessages!} 
            isAdmin={isAdmin} />
          </div>
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
