import React, {FC} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark} from '@fortawesome/free-solid-svg-icons';
import { ratingMovie } from '../../utils/data/data';
import * as contentConst from '../../utils/constants/content'
import { IMovie } from '../../types/media';
import style from './Rating.module.scss';

interface IRatingProps  {
    visibleRating: boolean;
    successVote: boolean;
    movie: IMovie;
    setVisibleRating: (visibleRating: boolean) => void;
    ratingHandler: (value: number) => void;
}
const Rating: FC<IRatingProps> = ({
    visibleRating,
    successVote,
    movie,
    setVisibleRating,
    ratingHandler,
}) => {
    return (
        <div className={style.rating}>
            {successVote && 
            <div className={style.message}>{contentConst.gratitudeRating}</div>
            }
            <div className={style.inner}>
                <div className={style.ru}>{movie.titleRu}</div>
                <div className={style.en}>{movie.titleEn}</div>
                <div className={style.numbers}>
                {ratingMovie.map((item) =>
                 <div className={style.item} 
                    onClick={() => ratingHandler(item.value)} key={item.id}>{item.value}</div>
                )}
                </div>
            </div>
            <button className={style.close} 
                onClick={() => setVisibleRating(!visibleRating)}>
            <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    );
};

export default Rating;