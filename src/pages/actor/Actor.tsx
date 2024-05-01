import {FC, useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetActorQuery, useGetMoviesActorQuery } from '../../store/actorApi';
import { setMovieTitle } from '../../store/movieOptionsSlice';
import { useAppDispatch } from '../../hooks/reduxHook';
import { IMovie } from '../../types/media';
import Loader from '../../components/loader/Loader';
import * as contentConst from '../../utils/constants/content';
import ENV from '../../env.config';
import style from './Actor.module.css'

const Actor:FC = () => {
    const [birthday, setBirthday] = useState<any>();
    const dispatch = useAppDispatch();
    const params = useParams();
    const {id} = params;
    const {data: actor} = useGetActorQuery(id!);
    const {data: movies} = useGetMoviesActorQuery(id!);

    console.log(movies && movies)

    useEffect(() => {
        if (actor?.extInfo?.birthday) {
            let date = new Date(parseInt(actor.extInfo.birthday)).toLocaleDateString();
            setBirthday(date);
        }
        if (actor?.nameRu) {
            dispatch(setMovieTitle(actor.nameRu));
        }
    }, [actor, id]);

    return (
        <div className={style.actor}>
            {actor ?
            <div className={style.info}>
                 <div className={style.portrait}>
                 <img src={actor.picture 
                    ? `${ENV.API_URL_UPLOADS_ACTORS}${actor.picture}` 
                    : ''
                    } alt=""/>
                </div>
                <div className={style.description}>
                    <div className={style['name-ru']}>
                        {actor.nameRu}
                    </div>
                    <div className={style['name-en']}>
                    {actor.nameEn}
                    </div>
                    
                    <div className={style.item}>
                        <span>Дата рождения</span>
                        <div>{birthday && birthday}</div>
                    </div>
                    <div className={style.item}>
                        <span>Рост</span>
                        <div>{actor.extInfo.height}</div>
                    </div>
                    <div className={style.item}>
                        <span>Место рождения</span>
                        <div>{actor.extInfo.country} {actor.extInfo.city}</div>
                    </div>
                    <div className={style.item}>
                        <span>Жанры</span>
                         <div className={style.genre}>
                         {actor.extInfo.genre.map((item:string, index:number) => 
                         <div key={index}>{item}</div>
                        )}
                         </div>
                    </div>
                    <div className={style.item}>
                        <span>Всего фильмов:</span>
                        <div>{movies && movies.length}</div>
                    </div>
                </div>
                <div className={style.movies}>
                    <div className={style.title}>Все фильмы</div>
                    {movies && movies.map((movie:IMovie) => 
                    <Link to={`/movies/${movie._id}`} key={movie._id}>
                    <li className={style.item}>{movie.titleRu}</li>
                    </Link>
                    )}
                </div>
            </div>
            : <Loader />}
        </div>
    );
};

export default Actor;