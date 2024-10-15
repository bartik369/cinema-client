import React, {FC} from 'react';
import {IParticipantInfo} from "../../../../types/chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import style from "../chats/SupportChats.module.scss";

interface IChatInfoProps {
    visibleBurger: () => void;
    visibleRecipients: boolean;
    item: IParticipantInfo;
}
const ChatInfo:FC<IChatInfoProps> = ({visibleBurger, visibleRecipients, item

}) => {
    return (
        <div className={style['chat-info']}>
            <button className={style.toggle} onClick={visibleBurger}>
                {visibleRecipients
                    ? <FontAwesomeIcon icon={faXmark} />
                    : <FontAwesomeIcon icon={faArrowLeft} />
                }
            </button>
            <div className={style.number}>№ {item.ticketNumber}</div>
        </div>
    );
};

export default ChatInfo;