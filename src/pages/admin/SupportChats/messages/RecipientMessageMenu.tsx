import {FC, memo} from 'react';
import * as contentConst from '../../../../utils/constants/content';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faTrashCan, faClone} from "@fortawesome/free-solid-svg-icons";
import style from './Messages.module.css'


interface RecipientMessageMenuProps {
    messageId: string;
    reply: (messageId: string) => void;
}
const RecipientMessageMenu:FC<RecipientMessageMenuProps> = memo(({
    messageId,
    reply,
}) => {
  console.log('support chat Receipent message menu')
    return (
      <div className={style["menu-list"]} onClick={(e) => e.stopPropagation()}>
        <ul>
          <li onClick={() => reply(messageId)}>
            <FontAwesomeIcon className={style.icon} icon={faReply} />
            {contentConst.replyBtn}
          </li>
          <li>
            <FontAwesomeIcon className={style.icon} icon={faClone} />
            {contentConst.copyBtn}
          </li>
        </ul>
      </div>
    );
});

export default RecipientMessageMenu;