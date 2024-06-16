import React, {FC} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import style from "../chats/SupportChats.module.css";

interface IChatInfoProps {
    visibleBurger: () => void;
    visibleRecipients: boolean;
}

const ChatInfo:FC<IChatInfoProps> = ({visibleBurger, visibleRecipients

}) => {
    return (
        <div className={style['chat-info']}>
            <button className={style.toggle} onClick={visibleBurger}>
                {visibleRecipients
                    ? <FontAwesomeIcon icon={faXmark} />
                    : <FontAwesomeIcon icon={faArrowLeft} />
                }
            </button>
        </div>
    );
};

export default ChatInfo;