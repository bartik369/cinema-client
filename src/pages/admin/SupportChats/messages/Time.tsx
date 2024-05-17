import {FC} from 'react';

interface ITimeProps {
    timeStamp: string;
}

const Time:FC<ITimeProps> = ({timeStamp}) => {
    let date = new Date(timeStamp);
    let dateNow = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

    console.log(date.toLocaleString("ru"));

    if (dateNow.toDateString() == date.toDateString()) {
        return <div>{date.toTimeString().slice(0, 5)}</div>
    } else {
        return <div>{date.toLocaleString("ru").slice(0, 17)}</div>
    }



    
};

export default Time;