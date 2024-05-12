import { FC, useState } from "react";
import { useCreateMessageMutation } from "../../../../store/chatApi";
import { IUser } from "../../../../types/auth";
import { IMessage } from "../../../../types/chat";
import Loader from "../../../../components/loader/Loader";
import style from "./Messages.module.css";

interface IMessagesProps {
  participants: IUser[];
  user: IUser;
  messages: IMessage[];
  recipientId: string;
  conversationId: string;
}
const Messages: FC<IMessagesProps> = ({
  participants,
  user,
  messages,
  recipientId,
  conversationId,
}) => {
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<string | Blob>("");
  const [replyId, setReplyId] = useState<string>("");
  const [createMessage] = useCreateMessageMutation();

  const sendMessageHandler = () => {
    if (user && conversationId) {
      const formData = new FormData();
      formData.append("senderId", user._id);
      recipientId && formData.append("recipientId", recipientId);
      formData.append("conversationId", conversationId);
      message && formData.append("message", message);
      replyId && formData.append("replyTo", replyId);
      file && formData.append("file", file);
      formData && createMessage(formData);
    }
  };

  return (
    <div>
      <>
        {messages ?
          messages.map((item) => (
            <div key={item._id}>
              <div>{item.senderId}</div>
              <div>{item.content}</div>
            </div>
          )): <Loader />}
      </>
      <div className={style.input}>
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          type="text"
        />
        <input
          type="file"
          name="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            e.target.files && setFile(e.target.files[0])
          }
        />
        <button onClick={sendMessageHandler}>send</button>
      </div>
    </div>
  );
};

export default Messages;
