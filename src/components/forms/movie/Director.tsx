import React, {FC} from 'react';
import {IMovie} from "../../../types/media";
import * as contentConst from "../../../utils/constants/content";
import {directorsList} from "../../../utils/data/directors";
import style from "../AddItemForm.module.scss";

interface IDirectorProps {
    movie: IMovie;
    setMovie: (movie: IMovie) => void;
}

const Director: FC<IDirectorProps> = ({movie, setMovie}) => {
    return (
        <div className={style.column2}>
             <span className={style['input-info']}>
            {contentConst.movieDirector}
          </span>
            <select
                value={movie.director}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setMovie({...movie, director: e.target.value})
                }
            >
                <option value="" disabled>
                    {contentConst.select}
                </option>
                {directorsList.map((item) => (
                    <option key={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
    );
};

export default Director;
