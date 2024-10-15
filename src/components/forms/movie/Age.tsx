import React, {FC} from 'react';
import * as contentConst from "../../../utils/constants/content";
import {ageItemsData} from "../../../utils/data/data";
import {IMovie} from "../../../types/media";
import style from "../AddItemForm.module.scss";

interface IAgeProps {
    movie: IMovie;
    setMovie: (movie: IMovie) => void;
}

const Age:FC<IAgeProps> = ({movie, setMovie}) => {
    return (
        <div className={style.column2}>
            <span className={style['input-info']}>{contentConst.movieAge}</span>
            <select
                value={movie.ageCategory}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setMovie({...movie, ageCategory: e.target.value})
                }
            >
                <option value="" disabled>
                    {contentConst.select}
                </option>
                {ageItemsData.map((item) => (
                    <option key={item.id}>{item.age}</option>
                ))}
            </select>
        </div>
    );
};

export default Age;
