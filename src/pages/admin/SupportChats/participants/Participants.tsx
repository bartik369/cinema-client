import {FC, useState, useRef, useEffect} from 'react';
import { IMessage } from '../../../../types/chat';
import { IUser } from '../../../../types/auth';
import { IParticipantInfo } from '../../../../types/chat';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis} from "@fortawesome/free-solid-svg-icons";
import ENV from '../../../../env.config';
import defaultAvatar from '../../../../assets/pics/profile-circle.svg'
import style from './Participants.module.css';
import Time from '../messages/Time';

interface IParticipantsProps {
    participants:IParticipantInfo[] ;
    user: IUser;
    lastMessages: any;
    unreadMessages: IMessage[];
    activeConversation: string;
    getMessagesById:(id: string) => void;
}

const Participants: FC<IParticipantsProps> = ({
  participants,
  user,
  unreadMessages,
  lastMessages,
  activeConversation,
  getMessagesById,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [messageMenu, setMessageMenu] = useState("");
  const [count, setCount] = useState('')

  type IListRefObj = {
    [index: string]: HTMLDivElement | null;
  };
  const messageMenuRef = useRef<IListRefObj>({});

  useEffect(() => {
    const outsideClickhandler = (e: any) => {
      if (messageMenuRef.current) {
        Object.values(messageMenuRef).map((item) => {
          if (item !== e.target) {
            setMessageMenu("");
          }
        });
      }
    };
    document.addEventListener("click", outsideClickhandler);
  }, []);

  const messageIdHandler = (id: string) => {

    if (messageMenu === id) {
      setMessageMenu(id);
    } else {
      setMessageMenu(id);
    }
  };

let result:any[] = [];
unreadMessages && unreadMessages.reduce((acc:any, elem:any) => {

  if (!acc[elem.conversationId]) {
    acc[elem.conversationId] = { id: elem.conversationId, qty: 0 };
    result.push(acc[elem.conversationId])
  }
  acc[elem.conversationId].qty += 1;
  return acc;
}, {});

console.log(result)

  return (
    <div className={style.participants}>
      {participants && [...participants]
      .sort((a, b) => new Date(a.updatedAt).getTime() < new Date(b.updatedAt).getTime() ? 1 : -1)
      .map((participant) => (
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
                <div className={style.time}>
                  <Time timeStamp={participant.updatedAt}/>
                </div>
        
                <div className={style.menu} onClick={(e) => e.stopPropagation()}>
                <FontAwesomeIcon icon={faEllipsis} onClick={() => messageIdHandler(participant._id)}/>
                </div>
                <div className={participant._id === messageMenu
                  ? style.active
                  : style.inactive
                }>
                </div>
                {result && result.map((elem:any) => {
                    if (elem.id === participant.conversationId) {
                      return <div className={style.count}>{elem.qty}</div>
                    }
                })}
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