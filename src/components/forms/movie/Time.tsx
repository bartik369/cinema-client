import React, {FC} from 'react';
import {IMovie} from "../../../types/media";
import * as contentConst from "../../../utils/constants/content";
import style from "../AddItemForm.module.scss";

interface ITimeProps {
    movie: IMovie;
    setMovie:(movie: IMovie) => void;
}

const Time: FC<ITimeProps> = ({movie, setMovie}) => {
    return (
        <div className={style.column3}>
            <span className={style['input-info']}>{contentConst.movieTime}</span>
            <input
                type="text" value={movie.time} placeholder={contentConst.fill}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMovie({...movie, time: e.target.value})
                }
            />
        </div>
    );
};

export default Time;
