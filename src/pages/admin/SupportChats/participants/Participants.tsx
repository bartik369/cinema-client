import {FC} from 'react';
import { IUser } from '../../../../types/auth';
import { IParticipantInfo } from '../../../../types/chat';
import { IConversation } from '../../../../types/chat';
import style from './Participants.module.css';

interface IParticipantsProps {
    participants:IParticipantInfo[] ;
    user: IUser;
    lastMessages: any;
    activeConversation: string;
    getMessagesById:(id: string) => void;
}

const Participants:FC<IParticipantsProps> = ({
    participants, 
    user,
    lastMessages,
    activeConversation,
    getMessagesById,
}) => {

    return (
        <div className={style.participants}>
            {participants && participants.map((item) =>
            <div className={item.conversationId === activeConversation
                ? style['item-active']
                : style.item
            } onClick={() => getMessagesById(item._id)} key={item._id}>
                <div className={style.user}>
                    <div className={style.avatar}>
                    </div>
                    <div className={style.info}>
                        <div className={style.ticket}></div>
                        <div className={style.email}>
                            {item.email}
                        </div>
                        <div className={style.message}>
                          
                        </div>
                    </div>
                    </div>
            </div>
            )}
        </div>
    );
};

export default Participants;