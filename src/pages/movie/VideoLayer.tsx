import React, {FC} from 'react';
import ENV from '../../env.config';
import {IMovie} from "../../types/media";
import vignette from '../../assets/pics/vignette.png';
import cinema from '../../assets/pics/cinema.jpg';
import style from './Movies.module.css';

interface IVideoLayerProps {
    movie: IMovie;
}

const VideoLayer:FC<IVideoLayerProps> = ({movie}) => {
    return (
        <div className={style['video-layer']}>
            {movie.trailer
                ? (<video className={style.video} autoPlay muted loop
                          src={`${ENV.API_URL_UPLOADS_MOVIES}${movie.trailer}`}
                />)
                : (<img className={style.cinema} src={cinema} alt=""/>)}
            <img className={style.vignette} src={vignette} alt=''/>
        </div>
    );
};

export default VideoLayer;
