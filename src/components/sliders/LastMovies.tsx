import React, { FC, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../../hooks/reduxHook";
import { useGetFavoritesMutation, useGetLatestMoviesQuery} from "../../store/movieApi";
import useCountLastHook from "../../hooks/useCountLastHook";
// import MovieItem from "../items/MovieItem";
import Loader from "../loader/Loader";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,
} from "pure-react-carousel";
import ENV from "../../env.config";
import "pure-react-carousel/dist/react-carousel.es.css";
import style from "./MainSlider.module.scss";

const LazyMovie = React.lazy(() => import('../items/MovieItem'));

const LastMovies: FC = () => {
  const [getFavorites, { data: favorites }] = useGetFavoritesMutation();
  const { data: movies } = useGetLatestMoviesQuery();
  const user = useAppSelector((state) => state.auth.user);
  const slidesCount = useCountLastHook();

  useEffect(() => {
    getFavorites({ id: user?._id }).catch(error => console.log(error));
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
                   <Slide className={style["carousel__inner"]} key={movie._id} index={0}>
                      <Suspense fallback={<div>Заглушка</div>}>
                    <Link to={`${ENV.MOVIES}${movie._id}`}>
                        <LazyMovie movie={movie} favorites={favorites?.movies!} />
                    </Link>
                    </Suspense>
                </Slide>
              ))}
          </Slider>
        </CarouselProvider>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default LastMovies;
