import {FC, useState, useEffect} from 'react';
import { useAppSelector } from '../../../../hooks/reduxHook';
import { 
    useGetConversationsQuery, 
    useGetRecipientMessagesQuery,
    useGetConversationIdMutation,
    useGetActiveConverstionMutation,
    useGetActiveConverstionMessagesQuery,
 } from '../../../../store/chatApi';
import Messages from '../messages/Messages';
import Participants from '../participants/Participants';
import style from './SupportChats.module.css'

const SupportChats:FC = () => {
    const user = useAppSelector(state => state.auth.user);
    const {data: participants} = useGetConversationsQuery(user && user._id);
    const [getConversationId, ] = useGetConversationIdMutation();
    const [getActiveConversation] = useGetActiveConverstionMutation();
    const [recipientId, setRecipientId] = useState<string>('');
    const [active, setActive] = useState<string>('');
    const [skip, setSkip] = useState(true);
    const [skip2, setSkip2] = useState(true);
    const {data: messages} = useGetRecipientMessagesQuery(recipientId && recipientId, {skip: skip});
    const {data: activeMessages} = useGetActiveConverstionMessagesQuery(active && active, {skip: skip2} );


    useEffect(() => {
        getActiveConversation(user._id).unwrap().then((data) => {
            setActive(data.conversationId);
            setRecipientId(data.recipientId);
            setSkip(false)
        })
    }, [user])

    const setRecipientHandler = (id:string) => {
        setRecipientId(id)
        getConversationId(id).unwrap().then((data) => {
            setActive(data);
            setSkip2(false)
        })
    }
    console.log(participants)

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