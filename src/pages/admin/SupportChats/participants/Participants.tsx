import {FC} from 'react';
import { IUser } from '../../../../types/auth';
import style from './Participants.module.css';

interface IParticipantsProps {
    participants: IUser[];
    user: IUser;
    getMessagesById:(id: string) => void;
}

const Participants:FC<IParticipantsProps> = ({
    participants, 
    user,
    getMessagesById,
}) => {

    return (
        <div className={style.participants}>
            {participants && participants.map((item) =>
            <div className={style.item} onClick={() => getMessagesById(item._id)}>
                <div className={style.user}>
                    <div className={style.avatar}>
                    </div>
                    <div className={style.info}>
                        <div className={style.ticket}></div>
                        <div className={style.email}></div>
                        <div className={style.message}></div>
                    </div>
                    {item.email}</div>
            </div>
            )}
        </div>
    );
};

export default Participants;