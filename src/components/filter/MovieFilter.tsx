import React, { FC, useEffect } from 'react';
import DropCategory from '../dropdown/DropCategory';
import DropCountry from '../dropdown/DropCountry';
import DropYear from '../dropdown/DropYear';
import DropRating from '../dropdown/DropRating';
import { IMovie } from '../../types/media';
import style from './MovieFilter.module.css';

interface IMovieFilterProps {
  movies: IMovie[];
}

const MovieFilter: FC<IMovieFilterProps> = ({movies}) => {

  const genre: string[] = [];
  const country: string[] = [];
  const year: string[] = [];
  const rating: string[] = [];

  movies &&
    movies.map((item) => {
      item.genre.map((el) => {
        genre.push(el);
      });
      country.push(item.country);
      year.push(item.year);
    });

  const genreArr =
    genre &&
    genre.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  const countryArr =
    country &&
    country.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  const yearArr =
    year &&
    year.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  const ratingArr =
    rating &&
    rating.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });



  return (
    <div className={style.filter}>
      <div className={style.item}>
        <DropCategory existGenre={genreArr && genreArr} />
      </div>
      <div className={style.item}>
      <DropCountry existCountry={countryArr && countryArr}/>
      </div>
      <div className={style.item}>
       <DropYear existYear={yearArr && yearArr}/>
      </div>
      <div className={style.item}>
        <DropRating existRating={ratingArr && ratingArr} />
      </div>
    </div>
  );
};

export default MovieFilter;
