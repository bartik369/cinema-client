import React, {FC, useRef} from 'react';
import SenderMessageMenu from './SenderMessageMenu';
import { IMessage, IMessageMedia } from '../../../../types/chat';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Time from './Time';
import MediaFile from './MediaFile';
import * as contentConst from '../../../../utils/constants/content';
import { faCheck, faCheckDouble, faEllipsis} from "@fortawesome/free-solid-svg-icons";
import supportIcon from '../../../../assets/pics/support.png'
import style from './Messages.module.css';

interface ISenderProps {
    message: IMessage;
    messages: IMessage[];
    media: IMessageMedia[];
    messageMenu: string;
    messageIdHandler: (id:string) => void;
    editMessageHandler: (id:string) => void;
    deleteMessageHandler: (id:string) => void;
    conversationId: string;
}

const Sender:FC<ISenderProps> = ({
    message,
    messages,
    media,
    messageMenu,
    messageIdHandler,
    editMessageHandler,
    deleteMessageHandler,
    conversationId,
}) => {
    type IListRefObj = {
        [index: string]: HTMLDivElement | null;
      };
    const messageMenuRef = useRef<IListRefObj>({});

    return (
        <div className={style.right}
                onClick={(e) => e.stopPropagation()}>
                <div className={style.content}>
                  <div className={style.info}>
                    <div className={message._id === messageMenu
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
                    <div
                      className={style.menu}
                      onClick={() => messageIdHandler(message._id)}
                      ref={(elem) =>
                        (messageMenuRef.current[message._id] = elem)
                      }
                    >
                      <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                  </div>
                  <div className={style.text}>
                  {message.replyTo && messages.map((item) =>item._id === message.replyTo && (
                    <div className={style.reply} key={item._id}>
                        <span>{contentConst.user}</span>
                        {item.content.slice(0, 40)}...
                    </div>
                  ))}
                    {message.content}
                    <MediaFile
                      media={media!}
                      message={message}
                      conversationId={conversationId}
                    />
                     <div className={style.read}>
                      {message.read === contentConst.yes
                      ? <FontAwesomeIcon className={style.blue} icon={faCheckDouble} />
                      : <FontAwesomeIcon className={style.dark} icon={faCheck} />
                      }
                  </div>
                  </div>
                </div>
                <div className={style.block}>
                  <div className={style.avatar}>
                    <img  src={supportIcon} alt="" />
                  </div>
                  </div>
              </div>
    );
};

export default React.memo(Sender);