import React, {FC} from 'react';
import * as contentConst from "../../../utils/constants/content";
import {yearMedia} from "../../../utils/data/data";
import {IMovie} from "../../../types/media";
import style from "../AddItemForm.module.scss";

interface IYearProps {
    movie: IMovie;
    setMovie: (movie: IMovie) => void;
}
const Year:FC<IYearProps> = ({movie, setMovie}) => {
    return (
        <div className={style.column3}>
            <span className={style['input-info']}>{contentConst.movieYear}</span>
            <select
                value={movie.year}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setMovie({...movie, year: e.target.value})
                }
            >
                <option value="" disabled>
                    {contentConst.select}
                </option>
                {yearMedia.map((item) => (
                    <option key={item.id}>{item.year}</option>
                ))}
            </select>
        </div>
    );
};

export default Year;
