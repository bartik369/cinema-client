import {FC} from 'react';
import { IUser } from '../../../../types/auth';
import { IParticipantInfo } from '../../../../types/chat';
import { IConversation } from '../../../../types/chat';
import defaultAvatar from '../../../../assets/pics/profile-circle.svg'
import style from './Participants.module.css';

interface IParticipantsProps {
    participants:IParticipantInfo[] ;
    user: IUser;
    lastMessages: any;
    activeConversation: string;
    getMessagesById:(id: string) => void;
}

const Participants: FC<IParticipantsProps> = ({
  participants,
  user,
  lastMessages,
  activeConversation,
  getMessagesById,
}) => {

  return (
    <div className={style.participants}>
      {participants &&
        participants.map((participant) => (
          <div className={ participant.conversationId == activeConversation
                ? style["item-active"]
                : style.item
            }
            onClick={() => getMessagesById(participant._id)}
            key={participant._id}>
            <div className={style.user}>
              <div className={style.avatar}>
                <img src={participant.avatar || defaultAvatar} alt="" />
              </div>
              <div className={style.info}>
                <div className={style.ticket}>№ {participant.ticketNumber}</div>
                <div className={style.email}>{participant.email}</div>
                <div className={style.message}>
                  {lastMessages && lastMessages.flatMap((message: any) => {
                        if (message._id.includes(participant.conversationId)) {
                            return <div key={participant._id}>{message.content}</div>
                        }
                    })}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Participants;