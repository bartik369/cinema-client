import {FC} from 'react';
import { IUser } from '../../../../types/auth';
import { IMessage } from '../../../../types/chat';
import style from './Messages.module.css';

interface IMessagesProps {
    participants: IUser[];
    user: IUser;
    messages:IMessage[];
}
const Messages: FC<IMessagesProps> = ({participants, user, messages}) => {

    return (
        <div>
            {messages && messages.map((item) =>
            <>
            <div>{item.senderId}</div>
            <div>{item.content}</div>
            </>
            )}
        </div>
    );
};

export default Messages;