import {FC, useState, useEffect} from 'react';
import { useAppSelector } from '../../../../hooks/reduxHook';
import { 
    useGetConversationsQuery, 
    useGetRecipientMessagesMutation,
    useGetConversationIdMutation,
    useGetActiveConverstionMutation,
    useGetActiveConverstionMessagesMutation,
 } from '../../../../store/chatApi';
import Messages from '../messages/Messages';
import Participants from '../participants/Participants';
import style from './SupportChats.module.css'

const SupportChats:FC = () => {
    const user = useAppSelector(state => state.auth.user);
    const {data: participants} = useGetConversationsQuery(user && user._id);
    const [getConversationId, ] = useGetConversationIdMutation();
    const [getActiveConversation] = useGetActiveConverstionMutation();
    const [getRecipientMessages, {data: messages}] = useGetRecipientMessagesMutation();
    const [getActiveMessages, {data: activeMessages}] = useGetActiveConverstionMessagesMutation();
    const [recipientId, setRecipientId] = useState<string>('');
    const [active, setActive] = useState<string>('')


    useEffect(() => {
        getActiveConversation(user._id).unwrap().then((data) => {
            setActive(data.conversationId);
            getActiveMessages(data.conversationId);
            setActive(data.conversationId);
            setRecipientId(data.recipientId);
        })
    }, [user])

    const setRecipientHandler = (id:string) => {
        setRecipientId(id)
        getRecipientMessages(id);
        getConversationId(id).unwrap().then((data) => {
            console.log(data)
            setActive(data)
        })
    }

    return (
        <div className={style.chats}>
            <div className={style.conversations}>
                <Participants 
                participants={participants?.usersInfo} 
                user={user}
                lastMessages={participants?.lastMessages}
                activeConversation={active}
                getMessagesById={setRecipientHandler}
                />
            </div>
            <div className={style.messages}>
                <Messages 
                participants={participants?.usersInfo}
                conversationId={active}
                recipientId={recipientId}
                user={user}
                messages={messages! || activeMessages}
                />
            </div>
        </div>
    );
};

export default SupportChats;