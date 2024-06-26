import React, {FC} from 'react';
import {IMovie} from "../../../types/media";
import * as contentConst from "../../../utils/constants/content";
import style from "../AddItemForm.module.css";

 interface IRuTitle {
     movie: IMovie;
     setMovie: (movie: IMovie) => void;
 }

const RuTitle: FC<IRuTitle> = ({movie, setMovie}) => {
    return (
        <div className={style.column2}>
            <span className={style['input-info']}>
            {contentConst.movieNameRu}
          </span>
            <input
                type="text" value={movie.titleRu} placeholder={contentConst.fill}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMovie({...movie, titleRu: e.target.value})
                }
            />
        </div>
    );
};

export default RuTitle;
