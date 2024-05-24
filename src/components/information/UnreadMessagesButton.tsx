import {FC} from 'react';
import { IMessage } from '../../types/chat';
import { Link } from 'react-router-dom';
import * as contentConst from '../../utils/constants/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import ChatIcon from '../../assets/pics/chat.svg';
import notifMessages from '../../assets/pics/message-notif.svg'
import style from './Information.module.css'

interface IUnreadMessagesButton {
    unreadMessages: IMessage[];
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
    return (
      <>
        {isAdmin ? (
          <Link to={"/admin/support-chats"}>
            <div className={style.envelope}>
              <div className={style.count}>
                {unreadMessages && unreadMessages.length}
              </div>
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
                <div className={style.count}>
                 {unreadMessages.length}
                </div>}
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