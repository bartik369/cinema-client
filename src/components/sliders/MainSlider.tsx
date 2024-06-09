import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useGetSlidesQuery } from '../../store/adminApi';
import Loader from '../loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import * as contentConst from '../../utils/constants/content';
import ENV from '../../env.config';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import style from './MainSlider.module.css';

const MainSlider: FC = () => {
  const { data: slides } = useGetSlidesQuery();

  return (
    <div className={style.carousel__container}>
    {slides 
    ? (<CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={55}
        totalSlides={slides! && slides!.length}
        visibleSlides={1}
        currentSlide={1}
        isPlaying={true}
        interval={5000}
        infinite={true}
    >
      <ButtonBack className={style.btn_prev}>
        <FontAwesomeIcon className={style.chevron} icon={faChevronLeft} />
      </ButtonBack>
      <ButtonNext className={style.btn_next}>
        <FontAwesomeIcon className={style.chevron} icon={faChevronRight} />
      </ButtonNext>
      <Slider className={style.carousel__slider}>
        {slides &&
          slides.map((slide) => (
            <Link  key={slide._id} to={`${ENV.MOVIES_URL}${slide.movieLink}`}>
              <Slide className={style['carousel__inner-slide']} index={0}>
                <div className={style.description}>{slide.description}</div>
                <button className={style.watch}>{contentConst.watch}</button>
                <img
                  src={`${ENV.API_URL_UPLOADS_MAIN_SLIDER}${slide.media}`}
                  alt=''
                />
              </Slide>
            </Link>
          ))}
      </Slider>
    </CarouselProvider>
    )
    : (<Loader />)}
    </div>
  );
};

export default MainSlider;
