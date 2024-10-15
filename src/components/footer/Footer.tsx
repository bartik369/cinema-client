import { FC, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHook';
import { ToastContainer, toast } from 'react-toastify';
import { useOpenChatMutation, useGetUnreadMessagesQuery } from '../../store/chatApi';
import { IChatInfo } from '../../types/chat';
import UnreadMessagesButton from '../information/UnreadMessagesButton';
import Chat from '../chat/Chat';
import Menu from "./Menu";
import * as contentConst from '../../utils/constants/content';
import style from './Footer.module.scss';

const Footer: FC = () => {
  const location = useLocation();
  const existTrailer = useAppSelector(state => state.movies.existTrailer);
  const isAuth = useAppSelector(state => state.auth.isAuth);
  const [isAdmin, setIsAdmin] = useState(false);
  const user = useAppSelector(state => state.auth.user);
  const [openChat] = useOpenChatMutation();
  const [recipientId, setRecipientId] = useState<string>('');
  const [chatInfo, setChatInfo] = useState<IChatInfo>();
  const [visibleChat, setVisibleChat] = useState(false);
  const [skip, setSkip] = useState(true);
  const {data: unreadMessages} = useGetUnreadMessagesQuery(user && user._id, {skip: skip});
  const regEx = location.pathname.match(/\/movies\/[a-zA-Z0-9]/);

  const startChat = () => {
    if (isAuth) {
      setVisibleChat(!visibleChat);
      openChat(user._id)
          .unwrap()
          .then((data) => {
            setChatInfo({...data});
            setRecipientId(data.participants.filter((item:string) => item !== user._id));
          })
          .catch(error => console.log(error));
    } else {
      toast.error(contentConst.errorAddFavotite);
    }
  }
  const visibleHandler = () => {
    setVisibleChat(false);
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

  return (
      <div className={(existTrailer && regEx) ? style.container : style.notrailer}>
        <ToastContainer
            theme="colored"
            autoClose={7000}
            position="top-center"
        />
        <div className={style.inner}>
          <Menu />
          <div className={style.info}></div>
        </div>
          <UnreadMessagesButton
              startChat={startChat}
              visibleChat={visibleChat}
              unreadMessages={unreadMessages!}
              isAdmin={isAdmin}
          />
        {visibleChat &&
            <Chat
                visibleHandler={visibleHandler}
                user={user}
                chatInfo={chatInfo!}
                recipientId={recipientId}
            />
        }
      </div>
  );
};

export default Footer;
