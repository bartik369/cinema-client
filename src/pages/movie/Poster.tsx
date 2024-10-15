import React, {FC} from 'react';
import {IMovie} from "../../types/media";
import ENV from "../../env.config";
import nonePoster from "../../assets/pics/blank_movie.jpg";
import style from "./Movies.module.scss";

interface IPosterProps {
    movie: IMovie
}

const Poster:FC<IPosterProps> = ({movie}) => {
    return (
        <div className={style.poster}>
            <img alt="" src={movie.picture
                ? `${ENV.API_URL_UPLOADS_MOVIES}${movie.picture}`
                : nonePoster
            }
            />
        </div>
    );
};

export default Poster;
