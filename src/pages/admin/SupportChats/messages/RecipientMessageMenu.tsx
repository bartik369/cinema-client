import {FC} from 'react';
import { IMessage } from '../../../../types/chat';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply} from "@fortawesome/free-solid-svg-icons";
import style from './Messages.module.css'


interface RecipientMessageMenuProps {
    messageId: string;
    reply: (messageId: string) => void;
}
const RecipientMessageMenu:FC<RecipientMessageMenuProps> = ({
    messageId,
    reply,
}) => {
    return (
        <div className={style['menu-list']}>
           <FontAwesomeIcon onClick={() => reply(messageId)} icon={faReply}/> <span>Ответить</span>
        </div>
    );
};

export default RecipientMessageMenu;