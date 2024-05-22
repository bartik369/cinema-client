import {FC, useMemo} from 'react';
import { IUser } from '../../../../types/auth';
import { IParticipantInfo } from '../../../../types/chat';
import ENV from '../../../../env.config';
import defaultAvatar from '../../../../assets/pics/profile-circle.svg'
import style from './Participants.module.css';

interface IParticipantsProps {
    participants:IParticipantInfo[] ;
    user: IUser;
    lastMessages: any;
    // unreadMessages: IMessage[];
    activeConversation: string;
    getMessagesById:(id: string) => void;
}

const Participants: FC<IParticipantsProps> = ({
  participants,
  user,
  // unreadMessages,
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
                {participant.avatar 
                ? <img src={`${ENV.API_URL_UPLOADS_USERS_AVATAR}${participant.avatar}`}/>
                : <img src={defaultAvatar} alt="" />
                } 
              </div>
              <div className={style.info}>
                <div className={style.ticket}>№ {participant.ticketNumber}</div>
                <div className={style.email}>{participant.email}</div>
                <div className={style.message}>
                  {lastMessages && lastMessages.flatMap((message: any) => {
                        if (message._id.includes(participant.conversationId)) {
                            return <div key={participant._id}>{message.content.slice(0, 27)}...</div>
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