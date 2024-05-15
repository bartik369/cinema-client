import {FC} from 'react';
import { IMessage } from '../../../../types/chat';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply} from "@fortawesome/free-solid-svg-icons";

interface RecipientMessageMenuProps {
    messageId: string;
    reply: (messageId: string) => void;
}
const RecipientMessageMenu:FC<RecipientMessageMenuProps> = ({
    messageId,
    reply,
}) => {
    return (
        <div>
           <FontAwesomeIcon onClick={() => reply(messageId)} icon={faReply}/>
        </div>
    );
};

export default RecipientMessageMenu;