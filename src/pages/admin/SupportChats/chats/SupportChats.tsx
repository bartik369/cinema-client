import {FC, useState, useEffect} from 'react';
import { useAppSelector } from '../../../../hooks/reduxHook';
import {IParticipantInfo} from "../../../../types/chat";
import {useGetConversationsQuery, useGetRecipientMessagesQuery, useGetConversationIdMutation,
useGetActiveConverstionMutation,useGetUnreadMessagesQuery, useMarkAsReadMutation,
useGetMessagesQuery } from '../../../../store/chatApi';
import Messages from '../messages/Messages';
import Participants from '../participants/Participants';
import ChatInfo from "../messages/ChatInfo";
import style from './SupportChats.module.scss';

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
    const {data: unreadMessages} = useGetUnreadMessagesQuery(user && user._id);
    const {data: activeMessages} = useGetMessagesQuery(active && active, {skip: skipActive} );
    const [markMessageAsRead] = useMarkAsReadMutation();
    const [visibleRecipients, setVisibleRecipients] = useState(true)

    useEffect(() => {
        if (user) {
            getActiveConversation(user._id).unwrap().then((data) => {
                setActive(data._id);
                data.participants.map((item) => item !== user._id && setRecipientId(item));
                setSkipActive(false);
                
                if (active) {
                     markMessageAsRead({
                    conversationId: active, 
                    userId: user._id,
                });
                }
            }).catch((err) => console.log(err));
        }
    }, [user, active]);

    const setRecipientHandler = (id:string) => {
        setRecipientId(id);
        getConversationId(id).unwrap().then((data) => {
            setActive(data);
            setSkip(false);
        });

        if (active) {
        markMessageAsRead({
            conversationId: active, 
            userId: user._id,
        });

        if (window.innerWidth < 851) {
            setVisibleRecipients(false);
        }
    }}

    const visibleBurger = () => {
        setVisibleRecipients(!visibleRecipients);
    }
    
    return (
        <div className={style.chats}>
            <div className={visibleRecipients ? style.active : style.conversations}>
                <Participants
                    participants={participants?.usersInfo!}
                    user={user}
                    lastMessages={participants?.lastMessages}
                    unreadMessages={unreadMessages!}
                    activeConversation={active}
                    getMessagesById={setRecipientHandler}
                />
            </div>
            <div className={style.messages}>
                {participants && participants.usersInfo.map((item: IParticipantInfo) =>
                    item.conversationId === active &&
                        <ChatInfo
                            key={item._id}
                            visibleBurger={visibleBurger}
                            visibleRecipients={visibleRecipients}
                            item={item}

                        />
                )}
                <Messages
                    participants={participants?.usersInfo!}
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