import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useAppSelector, useAppDispatch } from '../../hooks/reduxHook';
import { 
  useGetFavoritesMutation, 
  useAddFavoriteMutation,
  useGetMovieMutation,
  useSetRatingMutation,
  useGetRatingQuery,
} from '../../store/movieApi';
import { useNavigate } from 'react-router-dom';
import { setExistTrailer } from '../../store/movieOptionsSlice';
import { useGetMovieActorsMutation } from '../../store/actorApi';
import { IMovie, IMovieRating, IMovieAddFavorite } from '../../types/media';
import * as contentConst from '../../utils/constants/content';
import ENV from '../../env.config';
import Rating from '../../components/rating/Rating';
import Casts from './Casts';
import Loader from '../../components/loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import nonePoster from '../../assets/pics/blank_movie.jpg';
import vignette from '../../assets/pics/vignette.png';
import cinema from '../../assets/pics/cinema.jpg';
import style from './Movies.module.css';

const Movie: FC = () => {
  const dispatch = useAppDispatch()
  const [getFavorites, {data: favorites}] = useGetFavoritesMutation();
  const [addFavorite] = useAddFavoriteMutation();
  const [setRating] = useSetRatingMutation();
  const [getMovieActors, {data: actors}] = useGetMovieActorsMutation()
  const params = useParams();
  const { id } = params;
  const [getMovie, {data: movie}] = useGetMovieMutation();
  const {data: movieRating} = useGetRatingQuery(id!);
  const user = useAppSelector(state => state.auth.user);
  const isAuth = useAppSelector(state => state.auth.isAuth);
  const [visibleRating, setVisibleRating] = useState<boolean>(false);
  const [successVote, setSuccessVote] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getMovie(id)
      .unwrap()
      .catch((error) => {
        error.status == '404' && navigate('/404')
      })
    }
  }, []);

  useEffect(() => {
    if (movie && user) {
      getMovieActors(movie.actors);
      getFavorites({ id: user._id });
    }
    if (movie && movie.trailer) {
      dispatch(setExistTrailer(true))
    } else {
      dispatch(setExistTrailer(false))
    }
  }, [movie, user]);

  const ratingHandler = async (value: number) => {

    if (movie) {
      const ratingData: IMovieRating = {
        id: movie._id!,
        value: value,
      };
      setRating(ratingData)
      .then(() => {
        setSuccessVote(true);
        setTimeout(() => {
          setVisibleRating(false);
          setSuccessVote(false);
        }, 2000);
      })
      .catch((error) => console.log(error))
    }
  };

  const favoriteHandler = async (_id: string) => {

    if (isAuth && user && movie) {
      const favoriteData: IMovieAddFavorite = {
        userId: user._id,
        movieId: movie._id!,
      };
      await addFavorite(favoriteData).then(() => {
      getFavorites({ id: user._id });
      })
      .catch((error) => console.log(error))
    } else {
      toast.error(contentConst.errorAddFavotite)
    }
  };

  return (
    <>
      {visibleRating && (
        <Rating
          setVisibleRating={setVisibleRating}
          visibleRating={visibleRating}
          ratingHandler={ratingHandler}
          movie={movie as IMovie}
          successVote={successVote}
        />
      )}
      {movie ? (
        <div className={style.movie}>
          <ToastContainer
            theme="colored"
            autoClose={7000}
            position="top-center"
          />
          <div className={style['video-layer']}>
            {movie.trailer ? (
              <video className={style.video} autoPlay muted loop
                src={`${ENV.API_URL_UPLOADS_MOVIES}${movie.trailer}`}
              />
            ) : (
              <img className={style.cinema} src={cinema} alt="" />
            )}
            <img className={style.vignette} src={vignette} alt='' />
          </div>
          <div className={style.inner}>
            <div className={style.poster}>
              <img alt="" src={ movie.picture
                    ? `${ENV.API_URL_UPLOADS_MOVIES}${movie.picture}`
                    : nonePoster
                }
              />
            </div>
            <div className={style.info}>
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
              <div className={style.action}>
                <div className={style.watch}>{contentConst.watch}</div>
                <div className={favorites && favorites.movies.includes(movie._id as string)
                      ? style.favorite
                      : style.nofavorite
                  }
                >
                  <FontAwesomeIcon
                    onClick={() => favoriteHandler(movie._id as string)}
                    icon={faStar}
                  />
                </div>
                <div 
                className={style['movie-rating']}
                onClick={() => setVisibleRating(true)}>
                  <div className={style.number}>
                    {movieRating && movieRating.toFixed(1)}
                  </div>
                  <div className={style.vote}>{contentConst.vote}</div>
                </div>
              </div>
              <div className={style['cast-title']}>
                {contentConst.movieCasts}
              </div>
              <Casts actors={actors!}/>
            </div>
          </div>
        </div>
      ) : (
         <Loader />
      )}
    </>
  );
};

export default Movie;
