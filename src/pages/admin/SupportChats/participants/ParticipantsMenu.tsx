import {FC, memo} from 'react';
import { usePinConversationMutation } from '../../../../store/chatApi';
import * as contentConst from '../../../../utils/constants/content';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbTack, faCheck} from "@fortawesome/free-solid-svg-icons";
import style from './Participants.module.css';
import { IParticipantInfo } from '../../../../types/chat';

interface IParticipantsMenuProps {
    participant: IParticipantInfo;
    setMessageMenu: (id: string) => void;
    closeTicketHandler: (id: string) => void;
}

const ParticipantsMenu:FC<IParticipantsMenuProps> = memo(({
    closeTicketHandler,
    setMessageMenu,
    participant,
}) => {
    const [pinConversation] = usePinConversationMutation();

    const pinConversationHandler = (id: string) => {
        id && pinConversation(id);
        setMessageMenu('');
    }

    return (
        <div className={style['menu-list']} onClick={(e) => e.stopPropagation()}>
            <ul>
                <li onClick={() => pinConversationHandler(participant?.conversationId)}>
                    <FontAwesomeIcon 
                    className={style.icon} 
                    icon={faThumbTack} />
                    Закрепить
                </li>
                <li onClick={() => closeTicketHandler(participant.conversationId)}>
                    <FontAwesomeIcon className={style.icon} icon={faCheck}/>
                    Закрыть заявку
                </li>
            </ul>
        </div>
    );
});

export default ParticipantsMenu;