import React, {FC} from 'react';
import * as contentConst from "../../../utils/constants/content";
import {IMovie} from "../../../types/media";
import style from "../AddItemForm.module.scss";

interface  IDescriptionProps {
    movie: IMovie;
    setMovie: (movie: IMovie) => void;
}

const Description:FC<IDescriptionProps> = ({movie, setMovie}) => {
    return (
        <div className={style.block}>
          <span className={style['input-info']}>
          {contentConst.movieDescription}
        </span>
            <textarea
                placeholder={contentConst.fill} value={movie.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setMovie({...movie, description: e.target.value})
                }
            />
        </div>
    );
};

export default Description;
