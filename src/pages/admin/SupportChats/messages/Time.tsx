import {FC, memo} from 'react';

interface ITimeProps {
    timeStamp: string;
}

const Time:FC<ITimeProps> = memo(({timeStamp}) => {
    let date = new Date(timeStamp);
    let dateNow = new Date();

    if (dateNow.toDateString() == date.toDateString()) {
        return <div>{date.toTimeString().slice(0, 5)}</div>
    } else {
        return <div>{date.toLocaleString("ru").slice(0, 17)}</div>
    } 
});

export default Time;