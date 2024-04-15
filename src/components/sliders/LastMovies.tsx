import React, { FC, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector} from '../../hooks/reduxHook';
import { useGetFavoritesMutation, useGetLatestMoviesQuery} from '../../store/movieApi';
import useCountLastHook from '../../hooks/useCountLastHook';
import MovieItem from '../items/MovieItem';
import {faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import ENV from '../../env.config';
import 'pure-react-carousel/dist/react-carousel.es.css';
import style from './MainSlider.module.css';

const LastMovies: FC = () => {
  const [getFavorites, {data: favorites}] = useGetFavoritesMutation();
  const {data: movies} = useGetLatestMoviesQuery();
  const user = useAppSelector(state => state.auth.user);
  const slidesCount = useCountLastHook();

  useEffect(() => {
    getFavorites({ id: user?._id });
  }, [user]);

  return (
    <div className={style.movies__carousel}>
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
    </div>
  );
};

export default LastMovies;
