import {FC, useRef} from 'react';
import { IChatInfo, IMessage, IMessageMedia } from '../../types/chat';
import RecipientMessageMenu from './RecipientMessageMenu';
import Time from '../../pages/admin/SupportChats/messages/Time';
import MediaFile from '../../pages/admin/SupportChats/messages/MediaFile';
import * as contentConst from '../../utils/constants/content';
import supportAvatar from '../../assets/pics/support.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEllipsis } from '@fortawesome/free-solid-svg-icons';
import style from './Chat.module.css';

interface IRecipientProps {
    messages: IMessage[];
    message: IMessage;
    media: IMessageMedia[];
    chatInfo: IChatInfo
    messageMenu: string;
    replayMessageHandler: (id: string) => void;
    messageIdHandler: (id: string) => void;
}

const Recipient:FC<IRecipientProps> = ({
    messages,
    message,
    media,
    chatInfo,
    messageMenu,
    replayMessageHandler,
    messageIdHandler,
}) => {
    type IListRefObj = {
        [index: string]: HTMLDivElement | null;
      };
    const messageMenuRef = useRef<IListRefObj>({});

    return (
        <div className={style.left} key={message._id}
                onClick={(e) => e.stopPropagation()}>
                <div className={style.block}>
                <div className={style.avatar}>
                  <img src={supportAvatar} alt="" />
                </div>
                </div>
                <div className={style.content}>
                  <div className={style.info}> 
                    <div className={message._id === messageMenu
                      ? style.active
                      : style.inactive}>
                      <RecipientMessageMenu
                        messageId={message._id}
                        reply={replayMessageHandler}
                      />
                    </div>
                    <div className={style.name}>{contentConst.support}</div>
                    <div className={style.time}>
                      <Time timeStamp={message.createdAt} />
                    </div>
                    <div className={style.menu} onClick={() => messageIdHandler(message._id)}
                      ref={(elem) => (messageMenuRef.current[message._id] = elem)}>
                      <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                  </div>
                  <div className={style.text}>
                    {message.replyTo && messages.map((item) => item._id === message.replyTo && (
                      <div className={style.reply} key={item._id}>
                        <span>{contentConst.you}</span>
                        {item.content.slice(0, 40)}...
                      </div>
                    ))}
                    {message.content}
                    <MediaFile media={media!} message={message} conversationId={chatInfo._id}/>
                  </div>
                </div>
              </div>
    );
};

export default Recipient;