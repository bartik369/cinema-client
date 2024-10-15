import React, {FC} from 'react';
import * as contentConst  from '../../utils/constants/content';
import style from './Movies.module.scss';

interface IRatingScoreProps {
    movieRating: number;
    visibleRating: boolean;
    setVisibleRating: (visibleRating: boolean) => void;
}

const RatingScore:FC<IRatingScoreProps> = ({movieRating, visibleRating,  setVisibleRating
}) => {
    return (
        <div className={style['movie-rating']}
             onClick={() => setVisibleRating(true)}>
            <div className={style.number}>
                {movieRating && movieRating.toFixed(1)}
            </div>
            <div className={style.vote}>{contentConst.vote}</div>
        </div>
    );
};

export default RatingScore;
