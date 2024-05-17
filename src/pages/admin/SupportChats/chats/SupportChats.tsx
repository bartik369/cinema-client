import {FC, useState, useEffect} from 'react';
import { useAppSelector } from '../../../../hooks/reduxHook';
import { 
    useGetConversationsQuery, 
    useGetRecipientMessagesQuery,
    useGetConversationIdMutation,
    useGetActiveConverstionMutation,
    useGetActiveConverstionMessagesQuery,
    useMarkAsReadMutation,
 } from '../../../../store/chatApi';
import Messages from '../messages/Messages';
import Participants from '../participants/Participants';
import style from './SupportChats.module.css'

const SupportChats:FC = () => {
    const user = useAppSelector(state => state.auth.user);
    const [recipientId, setRecipientId] = useState<string>('');
    const [active, setActive] = useState<string>('');
    const [skip, setSkip] = useState(true);
    const [skipActive, setSkipActive] = useState(true);
    const {data: participants} = useGetConversationsQuery(user && user._id);
    const [getConversationId] = useGetConversationIdMutation();
    const [getActiveConversation] = useGetActiveConverstionMutation();
    const {data: messages} = useGetRecipientMessagesQuery(recipientId && recipientId, {skip: skip});
    const {data: activeMessages} = useGetActiveConverstionMessagesQuery(active && active, {skip: skipActive} );
    const [markMessageAsRead] = useMarkAsReadMutation();

    useEffect(() => {
        getActiveConversation(user._id).unwrap().then((data) => {
            setActive(data.conversationId);
            setRecipientId(data.senderId);
            setSkipActive(false);
            markMessageAsRead({
                conversationId: data.conversationId, 
                userId: user._id,
            });
        })
    }, [user])

    const setRecipientHandler = (id:string) => {
        setRecipientId(id)
        getConversationId(id).unwrap().then((data) => {
            setActive(data);
            setSkip(false);
        });
    }
    return (
        <div className={style.chats}>
            <div className={style.conversations}>
                <Participants 
                participants={participants && participants?.usersInfo} 
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
                messages={activeMessages || messages!}
                />
            </div>
        </div>
    );
};

export default SupportChats;