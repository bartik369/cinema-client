import {FC, useRef} from 'react';
import { IChatInfo, IMessage, IMessageMedia } from '../../types/chat';
import { IUser } from '../../types/auth';
import SenderMessageMenu from './SenderMessageMenu';
import Time from '../../pages/admin/SupportChats/messages/Time';
import MediaFile from '../../pages/admin/SupportChats/messages/MediaFile';
import ENV from '../../env.config';
import * as contentConst from '../../utils/constants/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck, faCheckDouble, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import style from './Chat.module.css';

interface ISenderProps {
    user: IUser;
    messages: IMessage[];
    message: IMessage;
    media: IMessageMedia[];
    chatInfo: IChatInfo
    messageMenu: string;
    deleteMessageHandler: (id: string) => void;
    editMessageHandler: (id: string) => void;
    messageIdHandler: (id: string) => void;
}

const Sender:FC<ISenderProps> = ({
    user,
    messages,
    message,
    media,
    chatInfo,
    messageMenu,
    messageIdHandler,
    editMessageHandler,
    deleteMessageHandler,
}) => {
    type IListRefObj = {
        [index: string]: HTMLDivElement | null;
      };
    const messageMenuRef = useRef<IListRefObj>({});
    console.log('chat sender')

    return (
        <div className={style.right} key={message._id}
                onClick={(e) => e.stopPropagation()}>
                <div className={style.content}>
                  <div className={style.info}>
                    <div className={ message._id == messageMenu
                        ? style.active
                        : style.inactive
                    }>
                      <SenderMessageMenu
                        messageId={message._id}
                        editMessage={editMessageHandler}
                        deleteMessage={deleteMessageHandler}
                      />
                    </div>
                    <div className={style.name}>{contentConst.you}</div>
                    <div className={style.time}>
                      <Time timeStamp={message.createdAt} />
                    </div>
                    <div className={style.menu}
                      onClick={() => messageIdHandler(message._id)}
                      ref={(elem) =>
                        (messageMenuRef.current[message._id] = elem)
                      }>
                      <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                  </div>
                  <div className={style.text}>
                    {message.replyTo && messages.map((item) =>
                      item._id == message.replyTo && (
                      <div className={style.reply} key={item._id}>
                        <span>{contentConst.support}</span>
                        {item.content.slice(0, 40)}...
                      </div>
                    ))}
                    {message.content}
                    <MediaFile media={media!} message={message} conversationId={chatInfo._id}/>
                    <div className={style.read}>
                      {message.read === "yes" ? (
                        <FontAwesomeIcon className={style.blue} icon={faCheckDouble} />
                      ) : (
                        <FontAwesomeIcon className={style.dark} icon={faCheck}/>
                      )}
                    </div>
                  </div>
                </div>
                <div className={style.block}>
                <div className={style.avatar}>
                <img src={`${ENV.API_URL_UPLOADS_USERS_AVATAR}${user.avatar}`} alt="" />
                </div>
                </div>
              </div>
    );
};

export default Sender;