import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector} from '../../hooks/reduxHook';
import Loader from '../loader/Loader';
import { useGetFavoritesMutation, useGetTopMoviesQuery } from '../../store/movieApi';
import MovieItem from '../items/MovieItem';
import useCountTopHook  from '../../hooks/useCountTopHook';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import ENV from '../../env.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import 'pure-react-carousel/dist/react-carousel.es.css';
import style from './MainSlider.module.css';

const TopMovies: FC = () => {
  const [getFavorites, {data: favorites}] = useGetFavoritesMutation();
  const {data: movies} = useGetTopMoviesQuery();
  const user = useAppSelector(state => state.auth.user);
  const slidesCount = useCountTopHook();

  useEffect(() => {
    getFavorites({ id: user?._id });
  }, [user]);

  return (
    <div className={style.movies__carousel}>
      {movies ? (
        <CarouselProvider
        naturalSlideWidth={70}
        naturalSlideHeight={160}
        totalSlides={movies! && movies.length + 1}
        visibleSlides={slidesCount}
        currentSlide={0}
        isPlaying={true}
        interval={6000}
        infinite={true}
      >
        <ButtonBack className={style.btn_prev}>
          <FontAwesomeIcon className={style.chevron} icon={faChevronLeft} />
        </ButtonBack>
        <ButtonNext className={style.btn_next}>
          <FontAwesomeIcon className={style.chevron} icon={faChevronRight} />
        </ButtonNext>

        <Slider className={style.movies__slider}>
          {movies &&
            movies.map((movie) => (
              <Slide
                key={movie._id}
                className={style['carousel__inner']}
                index={0}
              >
                <Link to={`${ENV.MOVIES}${movie._id}`}>
                  <MovieItem movie={movie} favorites={favorites?.movies!} />
                </Link>
              </Slide>
            ))}
        </Slider>
      </CarouselProvider>
      ) : <Loader />}
    </div>
  );
};

export default TopMovies;
