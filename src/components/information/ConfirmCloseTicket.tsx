import {FC, memo} from 'react';
import style from './Information.module.css';

interface IConfirmCloseTicketProps {
    ticketNumber: string;
    notification: boolean;
    setNotofication: (notification: boolean) => void
}

const ConfirmCloseTicket:FC<IConfirmCloseTicketProps> = memo(({
    ticketNumber,
    setNotofication,
}) => {
    return (
        <div className={style.confirm}>
            <div className={style.inner} onClick={(e) => e.stopPropagation()}>
                <div className={style.number}>
                   Закрыть заявку №
                    <span>{` ${ticketNumber}`}</span>
                </div>
                <div className={style.buttons}>
                    <button className={style.yes} onClick={() => setNotofication(false)}>
                            Да
                    </button>
                    <button className={style.no} onClick={() => setNotofication(false)}>
                            Нет
                    </button>
                </div>
            </div>
        </div>
    );
});

export default ConfirmCloseTicket;