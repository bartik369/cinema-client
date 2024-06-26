import React, { FC, useState } from 'react';
import ENV from '../../env.config';
import { IMovie } from '../../types/media';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons';
import style from './MovieItem.module.css';

interface MovieItemProps {
  movie: IMovie;
  favorites: string[];
}
const MovieItem: FC<MovieItemProps> = ({ movie, favorites }) => {
const [visible, setVisible] = useState(false);

  return (
    <div className={style.wrapper}
      onMouseLeave={() => setVisible(false)}
      onMouseEnter={() => setVisible(true)}
    >
      <div className={style.item}>
        <img src={`${ENV.API_URL_UPLOADS_MOVIES}/${movie.picture}`} alt="" />
        <div className={visible ? style['item-info'] : style.hidden}>
            <div className={style['right-info']}>
            <div className={favorites && favorites.includes(movie._id as string) 
                  ? style.favorite 
                  : style.nofavorite}>
                <FontAwesomeIcon icon={faStar}/>
            </div>
            {(movie.rating && movie.rating > 0)
            ? <div className={style.rating}>{movie.rating.toFixed(1)}</div>
            : ''
            }
            </div>
            <div className={style['bottom-info']}>
                <div>{movie.ageCategory}</div>
                <span>{movie.country}</span>
                <span>{movie.year}</span>
            </div>
        </div>
      </div>
      <div className={style.title}>
        <div className={style.ru}>{movie.titleRu.length > 15
        ? `${movie.titleRu.substring(0, 15)}...` 
        : movie.titleRu}</div>
        <div className={style.en}> {movie.titleEn.length > 15
        ? `${movie.titleEn.substring(0, 15)}...` 
        : movie.titleEn}</div>
      </div>
    </div>
  );
};

export default MovieItem;
