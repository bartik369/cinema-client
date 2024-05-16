import {FC} from 'react';
import {IMessage, IMessageMedia} from '../../../../types/chat';
import { FileIcon, defaultStyles } from 'react-file-icon';
import ENV from '../../../../env.config';

interface MediaFileProps {
    media: IMessageMedia[],
    message: IMessage;
    conversationId: string;
}

const MediaFile: FC<MediaFileProps> = ({
    media, 
    message,
    conversationId}) => {
    return (
        <>
        {media && media.map((item) => {
                    const fileType: string = item.file.split(".").pop()!;
                    type iconKey = keyof typeof defaultStyles;
                    if (item._id === message.mediaId) {
                      return <div className="fileinfo" key={item._id}>
                      <div className="icon">
                        <FileIcon 
                        extension={fileType} 
                        {...defaultStyles[fileType as iconKey]}
                        color='#c5ced9'
                        glyphColor='white'
                        />
                      </div>
                      <a href={`${ENV.API_URL_UPLOADS_CHAT_MEDIA}${conversationId}/${item.file}`}>{item.file}</a>
                    </div>
                  }}
        )}  
        </>
    );
};

export default MediaFile;