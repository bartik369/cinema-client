import {FC} from 'react';
import { IMessage } from '../../types/chat';
import { Link } from 'react-router-dom';
import * as contentConst from '../../utils/constants/content';
import notifMessages from '../../assets/pics/message-notif.svg'
import style from './Information.module.css'

interface IUnreadMessagesButton {
    unreadMessages: IMessage[];
}

const UnreadMessagesButton:FC<IUnreadMessagesButton> = ({unreadMessages}) => {
    return (
        <Link to={'/admin/support-chats'}>
        <div className={style.envelope}>
            <div className={style.count}>
                {unreadMessages && unreadMessages.length}
            </div>
            <div className={style.icon}>
                <img src={notifMessages} alt="" />
            </div>
        </div>
        </Link>
    );
};

export default UnreadMessagesButton;