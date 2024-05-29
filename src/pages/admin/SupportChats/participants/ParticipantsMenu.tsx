import {FC} from 'react';
import * as contentConst from '../../../../utils/constants/content';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbTack, faCheck} from "@fortawesome/free-solid-svg-icons";
import style from './Participants.module.css';
import { IParticipantInfo } from '../../../../types/chat';

interface IParticipantsMenuProps {
    participant: IParticipantInfo;
    closeTicketHandler: (id: string) => void;
}

const ParticipantsMenu:FC<IParticipantsMenuProps> = ({
    closeTicketHandler,
    participant,
}) => {
    return (
        <div className={style['menu-list']}>
            <ul>
                <li>
                    <FontAwesomeIcon className={style.icon} icon={faThumbTack} />
                    Закрепить
                </li>
                <li onClick={() => closeTicketHandler(participant.conversationId)}>
                    <FontAwesomeIcon className={style.icon} icon={faCheck}/>
                    Закрыть заявку
                </li>
            </ul>
        </div>
    );
};

export default ParticipantsMenu;