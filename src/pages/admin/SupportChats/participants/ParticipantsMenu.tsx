import React, {FC} from 'react';
import { usePinConversationMutation } from '../../../../store/chatApi';
import * as contentConst from '../../../../utils/constants/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbTack, faCheck} from '@fortawesome/free-solid-svg-icons';
import { IParticipantInfo } from '../../../../types/chat';
import style from './Participants.module.scss';

interface IParticipantsMenuProps {
    participant: IParticipantInfo;
    setMessageMenu: (id: string) => void;
    deleteTicketHandler: (id: string) => void;
}

const ParticipantsMenu:FC<IParticipantsMenuProps> = ({
    deleteTicketHandler,
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
                    {participant.pinned 
                        ? contentConst.unpinConversation 
                        : contentConst.pinConversation
                    }
                </li>
                <li onClick={() => deleteTicketHandler(participant?.conversationId)}>
                    <FontAwesomeIcon className={style.icon} icon={faCheck}/>
                    {contentConst.closeTicket}
                </li>
            </ul>
        </div>
    );
};

export default React.memo(ParticipantsMenu);