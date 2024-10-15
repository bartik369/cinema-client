import React, {FC} from 'react';
import {IMovie} from "../../types/media";
import * as contentConst from "../../utils/constants/content";
import style from "./Movies.module.scss";

interface IMovieInfoProps {
    movie: IMovie;
}

const MovieInfo:FC<IMovieInfoProps> = ({movie}) => {
    return (
        <>
            <div className={style['title-ru']}>{movie.titleRu}</div>
            <div className={style['title-en']}>{movie.titleEn}</div>
            <div className={style['ext-info']}>
                <div className={style.sub}>{movie.year}</div>
                <div className={style.sub}>{movie.country}</div>
                <div className={style.sub}>
                    {movie.time}
                    <span>{contentConst.movieMins}</span>
                </div>
            </div>
            <div className={style['ext-info']}>
                <div className={style.category}>
                    {movie &&
                        movie.genre.map((item, index) => (
                            <div className={style.item} key={index}>
                                {item}
                            </div>
                        ))}
                </div>
            </div>
            <div className={style.age}>{movie.ageCategory}</div>
            <div className={style.description}>{movie.description}</div>
        </>
    );
};

export default MovieInfo;
