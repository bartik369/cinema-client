import {FC} from 'react';
import * as contentConst from '../../utils/constants/content';
import { IChatInfo } from '../../types/chat';
import style from './Chat.module.scss';

type RequestNumberProps = {
    chatInfo: IChatInfo
}
const RequestNumber: FC<RequestNumberProps> = ({chatInfo}) => {
    return (
        <div className={style.request}>
        {contentConst.requestNumber}
        <span>{chatInfo && chatInfo.ticketNumber}</span>
      </div>
    );
};

export default RequestNumber;