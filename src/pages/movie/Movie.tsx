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
import Rating from '../../components/rating/Rating';
import MovieInfo from "./MovieInfo";
import Casts from './Casts';
import Loader from '../../components/loader/Loader';
import RatingScore from "./RatingScore";
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import VideoLayer from "./VideoLayer";
import Poster from "./Poster";
import style from './Movies.module.scss';

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
  }, [id]);

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

    if (window.innerWidth < 1125) {
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
      .catch((error) => console.log(error));
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
      .catch((error) => console.log(error));
    } else {
      toast.error(contentConst.errorAddFavotite);
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
          <VideoLayer movie={movie} />
          <div className={style.inner}>
            <Poster movie={movie} />
            <div className={style.info}>
              <MovieInfo movie={movie} />
              <div className={style.action}>
                <div className={style.watch}>{contentConst.watch}</div>
                <div className={favorites && favorites.movies.includes(movie._id as string)
                      ? style.favorite
                      : style.nofavorite
                }>
                  <FontAwesomeIcon icon={faStar}
                    onClick={() => favoriteHandler(movie._id as string)}
                  />
                </div>
                <RatingScore
                    movieRating={movieRating!}
                    visibleRating={visibleRating}
                    setVisibleRating={setVisibleRating}
                />
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
