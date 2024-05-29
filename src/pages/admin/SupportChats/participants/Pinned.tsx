import {FC} from 'react';
import { IParticipantInfo, IUnreadMessages} from '../../../../types/chat';
import ENV from '../../../../env.config';
import Time from '../messages/Time';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faStar} from "@fortawesome/free-solid-svg-icons";
import defaultAvatar from '../../../../assets/pics/profile-circle.svg'
import pinIcom from '../../../../assets/pics/pin.svg'
import style from './Participants.module.css';

interface IPinnedProps {
    participants:IParticipantInfo[];
    activeConversation: string,
    getMessagesById: (id: string) => void;
    messageIdHandler: (id: string) => void;
    lastMessages: any;
    messageMenu: string;
    unreadMessages: IUnreadMessages[];
}
const Pinned: FC<IPinnedProps> = ({
    participants,
    activeConversation,
    lastMessages,
    unreadMessages,
    messageMenu,
    getMessagesById,
    messageIdHandler,
}) => {
    return (
      <div className={style.pinned}>
      {participants && [...participants]
      .sort((a, b) => new Date(a.updatedAt).getTime() < new Date(b.updatedAt).getTime() ? 1 : -1)
      .map((participant) => (
         participant.pinned &&
          <div className={participant.conversationId === activeConversation
                ? style["item-active"]
                : style.item
            }
            onClick={() => getMessagesById(participant._id)}
            key={participant._id}>
            <div className={style.user}>
              <div className={style.pin}>
              <img src={pinIcom} alt="" />
              </div>
              <div className={style.avatar}>
                {participant.avatar 
                ? <img src={`${ENV.API_URL_UPLOADS_USERS_AVATAR}${participant.avatar}`}/>
                : <img src={defaultAvatar} alt="" />
                } 
              </div>
              <div className={style.info}>
                <div className={style.time}>
                  <Time timeStamp={participant.updatedAt}/>
                </div>
                {unreadMessages && unreadMessages.map((elem:any) => {
                    if (elem.id === participant.conversationId) {
                      return <div className={style.count}>{elem.qty}</div>
                    }
                })}
                <div className={style.menu} onClick={(e) => e.stopPropagation()}>
                <FontAwesomeIcon icon={faEllipsis} onClick={() => messageIdHandler(participant._id)}/>
                </div>
                <div className={participant._id === messageMenu
                  ? style.active
                  : style.inactive
                }>
                </div>
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

export default Pinned;