import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHook';
import { useGetMoviesQuery, useGetFavoritesMutation } from '../../store/movieApi';
import MovieItem from '../../components/items/MovieItem';
import MovieFilter from '../../components/filter/MovieFilter';
import Loader from '../../components/loader/Loader';
import ENV from '../../env.config';
import style from './Movies.module.css';

const Movies = () => {
  const filter = useAppSelector((state) => state.movies.filter);
  const {data: movies, isLoading} = useGetMoviesQuery(filter && filter);
  const [getFavorites, {data: favorites}] = useGetFavoritesMutation();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    user && getFavorites({ id: user._id });
  }, [filter, user]);

  return (
    <div className={style.container}>
      <MovieFilter />
      <div className={style.movies}>
        {movies && movies.length > 0 && (
          movies.map((movie) => (
            <div key={movie._id}>
              <Link to={`${ENV.MOVIES}${movie._id}`}>
                <MovieItem movie={movie} favorites={favorites?.movies!} />
              </Link>
            </div>
          ))
        )}
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Movies;
