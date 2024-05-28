import {FC} from 'react';
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
            <div className={style.item} onClick={() => reply(messageId)}>
           <FontAwesomeIcon className={style.icon}  icon={faReply}/>
            <span>Ответить</span>
           </div>
        </div>
    );
};

export default RecipientMessageMenu;