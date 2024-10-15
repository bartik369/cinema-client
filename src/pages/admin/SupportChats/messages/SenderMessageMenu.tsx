import React, {FC} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen, faClone } from "@fortawesome/free-solid-svg-icons";
import * as contentConst from '../../../../utils/constants/content';
import style from './Messages.module.scss';

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
      <div className={style["menu-list"]} onClick={(e) => e.stopPropagation()}>
        <ul className={style.items}>
          <li onClick={() => editMessage(messageId)}>
            <FontAwesomeIcon className={style.icon} icon={faPen} />
            {contentConst.updateBtn}
          </li>
          <li onClick={() => deleteMessage(messageId)}>
            <FontAwesomeIcon className={style.icon} icon={faTrashCan} />
            {contentConst.deleteBtn}
          </li>
          <li>
            <FontAwesomeIcon className={style.icon} icon={faClone} />
            {contentConst.copyBtn}
          </li>
        </ul>
      </div>
    );
};

export default React.memo(SenderMessageMenu);