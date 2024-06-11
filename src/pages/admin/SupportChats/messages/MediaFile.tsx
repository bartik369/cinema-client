import React, {FC} from 'react';
import { Link } from 'react-router-dom';
import {IMessage, IMessageMedia} from '../../../../types/chat';
import { FileIcon, defaultStyles } from 'react-file-icon';
import ENV from '../../../../env.config';
import style from './Messages.module.css';

interface MediaFileProps {
    media: IMessageMedia[],
    message: IMessage;
    conversationId: string;
}

const MediaFile: FC<MediaFileProps> = ({ media, message, conversationId }) => {

  return (
    <>
      {media && media.map((item) => {
        const fileType: string = item.file.split(".").pop()!;
        type iconKey = keyof typeof defaultStyles;

        if (item._id === message.mediaId) {
          return (
              <Link className={style['file-info']} 
                key={item._id}
                to={`${ENV.API_URL_UPLOADS_CHAT_MEDIA}${conversationId}/${item.file}`}
                target="_blank"
              >
              <div className={style.icon}>
                <FileIcon
                  extension={fileType}
                  {...defaultStyles[fileType as iconKey]}
                  color="#c5ced9"
                  glyphColor="white"
                />
              </div>
              <div className={style.name}>
                {item.file}
              </div>
              </Link>
          );
        }
        })}
    </>
  );
};

export default React.memo(MediaFile);