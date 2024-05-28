import {FC, useEffect, useState} from 'react';
import { IUnreadMessages} from '../../types/chat';
import { Link } from 'react-router-dom';
import * as contentConst from '../../utils/constants/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import ChatIcon from '../../assets/pics/chat.svg';
import notifMessages from '../../assets/pics/message-notif.svg'
import style from './Information.module.css'
import el from 'date-fns/esm/locale/el/index.js';

interface IUnreadMessagesButton {
    unreadMessages: IUnreadMessages[];
    isAdmin:boolean;
    visibleChat: boolean;
    startChat: () => void;
}

const UnreadMessagesButton:FC<IUnreadMessagesButton> = ({
    unreadMessages, 
    isAdmin,
    startChat,
    visibleChat,
}) => {
  const [count, setCount] = useState();

  useEffect(() => {
    if (unreadMessages) {
      let res = unreadMessages.reduce((acc:any, el:any) => acc + el.qty, 0);
      setCount(res)
    }
  }, [unreadMessages])

    return (
      <>
        {isAdmin ? (
          <Link to={"/admin/support-chats"}>
            <div className={style.envelope}>
              {unreadMessages?.length > 0 &&
              <div className={style.count}>{count}</div>
              }
              <div className={style.icon}>
                <img src={notifMessages} alt="" />
              </div>
            </div>
          </Link>
        ) : (
          <div className={style.envelope} onClick={startChat}>
            {!visibleChat 
            ?  <>
                {unreadMessages?.length > 0 &&
                <div className={style.count}>{count}</div>}
                <div className={style.icon}>
                  <img src={ChatIcon} alt="" />
                </div>
              </>
             : <FontAwesomeIcon icon={faChevronDown} />
            }
          </div>
        )}
      </>
    );
};

export default UnreadMessagesButton;