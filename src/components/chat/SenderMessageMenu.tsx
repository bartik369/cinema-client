import {FC} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import * as contentConst from '../../utils/constants/content'
import style from './Chat.module.css'

interface ISenderMessageMenuProps {
    messageId: string;
    editMessage: (messageId:string) => void;
    deleteMessage: (messageId:string) => void;
}

const SenderMessageMenu:FC<ISenderMessageMenuProps> = ({
    messageId,
    editMessage,
    deleteMessage,
}) => {
    return (
        <div className={style['menu-list']}>
        <div className={style.item} onClick={() => editMessage(messageId)}>
            <FontAwesomeIcon className={style.icon} icon={faPen}/>
            <span>{contentConst.updateBtn}</span>
        </div>
        <div className={style.item} onClick={() => deleteMessage(messageId)}>
            <FontAwesomeIcon className={style.icon} icon={faTrashCan}/>
            <span>{contentConst.deleteBtn}</span>
         </div>
        </div>
    );
};

export default SenderMessageMenu;