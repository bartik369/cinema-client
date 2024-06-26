import React, {FC} from 'react';
import {IMovie} from "../../../types/media";
import style from "../AddItemForm.module.css";
import * as contentConst from "../../../utils/constants/content";

interface IEngTitleProps {
    movie: IMovie;
    setMovie: (movie: IMovie) => void;
}

const EngTitle:FC<IEngTitleProps> = ({movie, setMovie}) => {
    return (
        <div className={style.column2}>
            <span className={style['input-info']}>
            {contentConst.movieNameEn}
          </span>
            <input
                type="text" value={movie.titleEn} placeholder={contentConst.fill}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMovie({...movie, titleEn: e.target.value})
                }
            />
        </div>
    );
};

export default EngTitle;
