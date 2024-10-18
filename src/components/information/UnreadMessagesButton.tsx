import React, {FC, useEffect, useState} from 'react';
import { IUnreadMessages} from '../../types/chat';
import { Link } from 'react-router-dom';
import ENV from '../../env.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import ChatIcon from '../../assets/pics/chat.svg';
import notifMessages from '../../assets/pics/message-notif.svg';
import style from './Information.module.scss'

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
      setCount(res);
    }
  }, [unreadMessages]);

    return (
        <div className={style['chat-block']}>
            {isAdmin ? (
                <Link to={`${ENV.SUPPORT_CHATS}`}>
                    <div className={style.envelope}>
                        {unreadMessages?.length > 0 &&
                            <div className={style.count}>{count}</div>
                        }
                        <div className={style.icon}>
                            <img src={notifMessages} alt=""/>
                        </div>
                    </div>
                </Link>
            ) : (
                <div className={style.envelope} onClick={startChat}>
                    {!visibleChat
                        ? <>
                            {unreadMessages?.length > 0 &&
                                <div className={style.count}>{count}</div>}
                            <div className={style.icon}>
                                <img src={ChatIcon} alt=""/>
                            </div>
                        </>
                        : <FontAwesomeIcon icon={faChevronDown}/>
                    }
                </div>
            )}
        </div>
    );
};

export default React.memo(UnreadMessagesButton);