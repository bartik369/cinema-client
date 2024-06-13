import React, {FC, useRef} from 'react';
import { IUser } from '../../../../types/auth';
import { IMessage, IMessageMedia } from '../../../../types/chat';
import RecipientMessageMenu from './RecipientMessageMenu';
import MediaFile from './MediaFile';
import Time from './Time';
import ENV from '../../../../env.config';
import * as contentConst from '../../../../utils/constants/content';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis} from "@fortawesome/free-solid-svg-icons";
import defaultAvatar from "../../../../assets/pics/profile-circle.svg";
import style from "./Messages.module.css";

interface IRecipientProps {
    message: IMessage;
    messages: IMessage[]
    media: IMessageMedia[];
    participants: IUser[];
    messageMenu: string;
    conversationId: string;
    replayMessageHandler:(id: string) => void;
    messageIdHandler:(id: string) => void;
}

const Recipient:FC<IRecipientProps> = ({
    message,
    messages,
    media,
    participants,
    messageMenu,
    conversationId,
    replayMessageHandler,
    messageIdHandler,
}) => {

    type IListRefObj = {
        [index: string]: HTMLDivElement | null;
      };
    const messageMenuRef = useRef<IListRefObj>({});

    return (
        <div className={style.left}
          onClick={(e) => e.stopPropagation()}>
            <div className={style.block}>
            <div className={style.avatar}>
              {participants && participants.map((item) => item._id === message.senderId
              && (<img key={item._id} src={`${ENV.API_URL_UPLOADS_USERS_AVATAR}${item.avatar}`|| defaultAvatar} alt="" />)
              )}
            </div>
            </div>
            <div className={style.content}>
              <div className={style.info}>
                <div className={ message._id === messageMenu
                  ? style.active
                  : style.inactive
                }>
                  <RecipientMessageMenu
                    messageId={message._id}
                    reply={replayMessageHandler}
                  />
                </div>
                <div className={style.name}>{contentConst.user}</div>
                <div className={style.time}>
                  <Time timeStamp={message.createdAt} />
                </div>
                <div className={style.menu}
                  onClick={() => messageIdHandler(message._id)}
                  ref={(elem) => messageMenuRef.current[message._id] = elem}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
                </div>
                <div className={style.text}>
                  {message.replyTo && messages.map((item) =>
                      item._id === message.replyTo && (
                      <div className={style.reply} key={item._id}>
                        <span>{contentConst.you}</span>
                        {item.content.slice(0, 40)}...
                      </div>
                  ))}
                    {message.content}
                    <MediaFile
                      media={media!}
                      message={message}
                      conversationId={conversationId}
                    />
                  </div>
                </div>
              </div>
    );
};

export default React.memo(Recipient);