import React, {FC, useState, useEffect} from 'react';
import { IMessage} from '../../../../types/chat';
import { IUser } from '../../../../types/auth';
import { useCreateMessageMutation, useUpdateMessageMutation} from '../../../../store/chatApi';
import ReplyMessage from "./ReplyMessage";
import InputActions from "./InputActions";
import ButtonsActions from "./ButtonsActions";
import style from './Messages.module.scss';

interface IInputProps {
    messages: IMessage[];
    replyMessage: string;
    recipientId: string;
    conversationId: string;
    replyId: string;
    mediaSkip: boolean;
    isUpdating: boolean;
    updatedMessage: IMessage;
    user: IUser;
    setMediaSkip: (mediaSkip: boolean) => void;
    setIsUpdating: (isUpdating: boolean) => void;
    setReplyId: (id: string) => void;
}
const Input: FC<IInputProps> = ({
    replyMessage,
    recipientId,
    conversationId,
    replyId,
    isUpdating,
    updatedMessage,
    user,
    setReplyId,
    setIsUpdating,
    setMediaSkip,
}) => {
  const [file, setFile] = useState<string | Blob>("");
  const [createMessage] = useCreateMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();
  const [message, setMessage] = useState<IMessage>({
    _id: '',
    content: '',
    conversationId: '',
    createdAt: '',
    mediaId: '',
    read: '',
    recipientId: '',
    replyTo: '',
    senderId: '',
    updatedAt: '',
  });
    useEffect(() => {
        setMessage({
            ...message,
            recipientId: recipientId && recipientId,
            conversationId: conversationId && conversationId,
            senderId: user?._id,
            replyTo: replyId && replyId,
        });
        setMediaSkip(false);
    }, [recipientId, conversationId, replyId])

    useEffect(() => {
        updatedMessage &&
        setMessage({ ...updatedMessage });
    }, [updatedMessage]);

  const sendMessageHandler = () => {
    const formData = new FormData();
    type messageKey = keyof typeof message;
    Object.keys(message).forEach((key) => {
      formData.append(key, message[key as messageKey]);
    });
    file && formData.append("file", file);

    if (isUpdating) {
      updateMessage(formData)
        .unwrap()
        .then(() => {
          setIsUpdating(false);
          setMessage({ ...message, content: '', replyTo: '' });
          setReplyId('');
        });
    } else {
      createMessage(formData).then(() => {
        setMessage({ ...message, content: '', replyTo: '' });
        setReplyId('');
      });
    }
  };
  const resetReplyHandler = () => {
    setMessage({ ...message, content: '', replyTo: '' });
    setReplyId('');
  };
  const resetUpdateHandler = () => {
    setIsUpdating(false);
    setMessage({...message, content: ''});
  }

    return (
      <div className={style.typing} onClick={(e) => e.stopPropagation()}>
        <div className={style.input}>
          {replyId &&
              <ReplyMessage
              replyMessage={replyMessage}
              resetReplyHandler={resetReplyHandler}
          />}
          <InputActions
              message={message}
              setMessage={setMessage}
              resetUpdate={resetUpdateHandler}
          />
            <ButtonsActions
                file={file}
                setFile={setFile}
                sendMessageHandler={sendMessageHandler}
                isUpdating={isUpdating}
            />
        </div>
      </div>
    );
};

export default React.memo(Input);