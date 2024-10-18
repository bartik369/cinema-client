import {FC} from 'react';
import * as contentConst from '../../utils/constants/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faClone} from '@fortawesome/free-solid-svg-icons';
import style from './Chat.module.scss';

interface RecipientMessageMenuProps {
    messageId: string;
    reply: (messageId: string) => void;
}
const RecipientMessageMenu:FC<RecipientMessageMenuProps> = ({
    messageId,
    reply,
}) => {
    return (
        <menu className={style['menu-list']} onClick={(e) => e.stopPropagation()}>
            <ul>
                <li onClick={() => reply(messageId)}>
                    <FontAwesomeIcon className={style.icon} icon={faReply}/>
                    {contentConst.replyBtn}
                </li>
                <li>
                    <FontAwesomeIcon className={style.icon} icon={faClone}/>
                    {contentConst.copyBtn}
                </li>
            </ul>
        </menu>
    );
};

export default RecipientMessageMenu;