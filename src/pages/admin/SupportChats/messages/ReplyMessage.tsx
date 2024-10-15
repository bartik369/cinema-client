import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReply, faXmark} from "@fortawesome/free-solid-svg-icons";
import style from "./Messages.module.scss";

interface ReplyMessageProps {
    replyMessage: string;
    resetReplyHandler: () => void;
}

const ReplyMessage:FC<ReplyMessageProps> = ({replyMessage, resetReplyHandler }) => {
    return (
        <div className={style["reply-for"]}>
            <FontAwesomeIcon icon={faReply} className={style["reply-icon"]}/>
            {replyMessage}
            <FontAwesomeIcon
                onClick={resetReplyHandler}
                icon={faXmark}
                className={style["reset-reply"]}
            />
        </div>
    );
};

export default ReplyMessage;
