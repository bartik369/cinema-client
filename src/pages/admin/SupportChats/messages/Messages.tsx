import { FC, useState, useRef, useEffect} from "react";
import { useCreateMessageMutation, useGetMessageMutation, useDeleteMessageMutation, useUpdateMessageMutation, useGetConversationMediaQuery 
} from "../../../../store/chatApi";
import { IUser } from "../../../../types/auth";
import { IMessage } from "../../../../types/chat";
import Loader from "../../../../components/loader/Loader";
import Sender from "./Sender";
import Input from "./Input";
import Recipient from "./Recipient";
import * as contentConst from '../../../../utils/constants/content';
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
  const [message, setMessage] = useState<IMessage>({
    _id: "",
    content: "",
    conversationId: "",
    createdAt: "",
    mediaId: "",
    read: "",
    recipientId: "",
    replyTo: "",
    senderId: "",
    updatedAt: "",
  });
  const [file, setFile] = useState<string | Blob>("");
  const [replyId, setReplyId] = useState<string>("");
  const [messageMenu, setMessageMenu] = useState("");
  const [replyMessage, setReplyMessage] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [createMessage] = useCreateMessageMutation();
  const [getMessage] = useGetMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();
  const [mediaSkip, setMediaSkip] = useState(true);
  const { data: media } = useGetConversationMediaQuery(conversationId && conversationId, {
    skip: mediaSkip,
  });

  type IListRefObj = {
    [index: string]: HTMLDivElement | null;
  };
  const messageMenuRef = useRef<IListRefObj>({});

  useEffect(() => {

    if (recipientId && conversationId) {
      setMessage({
        ...message,
        recipientId: recipientId,
        conversationId: conversationId,
        senderId: user._id,
      });
      setMediaSkip(false);
    }
  }, [recipientId, conversationId, message.content]);

  useEffect(() => {
    const outsideClickhandler = (e: any) => {
      if (messageMenuRef.current) {
        Object.values(messageMenuRef).map((item) => {
          if (item !== e.target) {
            setMessageMenu("");
            setMessage({ ...message, content: "" });
            setReplyId("");
          }
        });
      }
    };
    document.addEventListener("click", outsideClickhandler);
  }, []);

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
          setMessage({ ...message, content: "", replyTo: "" });
          setReplyId('');
        });
    } else {
      createMessage(formData).then(() => {
        setMessage({ ...message, content: "", replyTo: "" });
        setReplyId('');
      });
    }
  };
  const editMessageHandler = (id: string) => {
    id && getMessage(id)
      .unwrap()
      .then((data) => {
        setMessage({ ...data });
        setIsUpdating(true);
      });
  };
  const deleteMessageHandler = (id: string) => {
    id && deleteMessage(id)
        .unwrap()
        .then(() => {
          setMessageMenu("");
        });
  };
  const replayMessageHandler = (id: string) => {
    if (id) {
      setMessage({ ...message, replyTo: id });
      messages && messages.forEach((item) => {
         if (item._id === id) {
           setReplyMessage(item.content);
         }
      })
      setReplyId(id);
    }
  };
  const messageIdHandler = (id: string) => {

    if (messageMenu === id) {
      setMessageMenu("");
    } else {
      setMessageMenu(id);
    }
  };
  const resetReplyHandler = () => {
    setMessage({ ...message, content: "", replyTo: "" });
    setReplyId('');
  };

  console.log('support chat MESSAGES')

  return (
    <>
      <div className={style["list-messages"]}>
        {messages ? messages.map((message) => message.senderId !== user._id 
          ? <div key={message._id}>
            <Recipient
              message={message}
              media={media!}
              messageMenu={messageMenu}
              replayMessageHandler={replayMessageHandler}
              messageIdHandler={messageIdHandler}
              messages={messages}
              participants={participants}
              conversationId={conversationId}
          />
          </div>
          : <div key={message._id}>
            <Sender
              message={message}
              messages={messages}
              media={media!}
              messageMenu={messageMenu}
              editMessageHandler={editMessageHandler}
              deleteMessageHandler={deleteMessageHandler}
              messageIdHandler={messageIdHandler}
              conversationId={conversationId}
            />
            </div>

        )
        : participants 
          ? <div className={style.notification}>
            {contentConst.noActiveChats}
          </div>
          : <Loader />
       }
      </div>
      <Input
        message={message}
        replyId={replyId}
        resetReplyHandler={resetReplyHandler}
        replyMessage={replyMessage}
        setMessage={setMessage}
        sendMessageHandler={sendMessageHandler}
        isUpdating={isUpdating}
        setFile={setFile}
      />
    </>
  );
};

export default Messages;