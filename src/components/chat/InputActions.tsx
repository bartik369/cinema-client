import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {IMessage} from "../../types/chat";
import style from './Chat.module.scss';

interface InputActionsProps {
    message: IMessage;
    setMessage: (message: IMessage) => void;
}

const InputActions:FC<InputActionsProps> = ({message, setMessage}) => {
    return (
        <div className={style.inner}>
            <input onChange={(e) => setMessage({
                ...message,
                content: e.target.value})}
                   value={message?.content}
                   type="text"
            />
            {message && message.content.length > 0 && (
                <FontAwesomeIcon
                    onClick={() => setMessage({...message, content: ""})}
                    className={style.reset}
                    icon={faXmark}
                />
            )}
        </div>
    );
};

export default InputActions;
