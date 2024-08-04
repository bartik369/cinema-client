import { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHook';
import { useGetMoviesQuery, useGetFavoritesMutation } from '../../store/movieApi';
import MovieItem from '../../components/items/MovieItem';
import MovieFilter from '../../components/filter/MovieFilter';
import Loader from '../../components/loader/Loader';
import Pagination from '../../components/pagination/Pagination';
import ENV from '../../env.config';
import style from './Movies.module.css';

const Movies = () => {
  const [page, setPage] = useState(1);
  const filter = useAppSelector((state) => state.movies.filter);
  const {data: movies, isLoading} = useGetMoviesQuery({filter, page});
  const [getFavorites, {data: favorites}] = useGetFavoritesMutation();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    user && getFavorites({ id: user._id });
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movies])

  const handlePrevPage = () => {
    setPage(page - 1);
  };
  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className={style.container}>
       <MovieFilter movies={movies! && movies.data} />
      {movies?.data && (
        <>
          <div className={style.movies}>
            {movies.data.map((movie) => (
              <div key={movie._id}>
                <Link to={`${ENV.MOVIES}${movie._id}`}>
                  <MovieItem movie={movie} favorites={favorites?.movies!} />
                </Link>
              </div>
            ))}
          </div>
          <Pagination
            setPage={setPage}
            onPrevPageClick={handlePrevPage}
            onNextPageClick={handleNextPage}
            disable={{
              left: page === 1,
              right: page === movies?.total_pages,
            }}
            nav={{ current: page, total: movies?.total_pages! }}
          />
        </>
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default Movies;
