import {FC, useState, useEffect} from 'react';
import { useAppSelector } from '../../../../hooks/reduxHook';
import { 
    useGetConversationsQuery, 
    useGetMessagesQuery,
    useGetRecipientMessagesMutation,
 } from '../../../../store/chatApi';
import Messages from '../messages/Messages';
import Participants from '../participants/Participants';
import style from './SupportChats.module.css'

const SupportChats:FC = () => {
    const user = useAppSelector(state => state.auth.user);
    const {data: participants} = useGetConversationsQuery(user && user._id);
    const [getRecipientMessages, {data: messages}] = useGetRecipientMessagesMutation();
    const [recipientId, setRecipientId] = useState<string>('')

    useEffect(() => {
        recipientId && getRecipientMessages(recipientId);
    }, [recipientId])

    const setRecipientHandler = (id:string) => {
        setRecipientId(id)
    }

    console.log(participants?.lastMessagesData)
    return (
        <div className={style.chats}>
            <div className={style.conversations}>
                <Participants 
                participants={participants?.usersInfo} 
                user={user}
                getMessagesById={setRecipientHandler}
                />
            </div>
            <div className={style.messages}>
                <Messages 
                participants={participants} 
                user={user}
                messages={messages!}
                />
            </div>
        </div>
    );
};

export default SupportChats;