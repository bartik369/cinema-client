import React, { FC, useEffect } from 'react';
import DropCategory from '../dropdown/DropCategory';
import DropCountry from '../dropdown/DropCountry';
import DropYear from '../dropdown/DropYear';
import DropRating from '../dropdown/DropRating';
import { useGetPropertiesQuery } from '../../store/movieApi';
import style from './MovieFilter.module.css';

const MovieFilter: FC = () => {
  const {data: properties} = useGetPropertiesQuery();

  return (
    <div className={style.filter}>
      <div className={style.item}>
        <DropCategory existGenre={properties?.genreArr} />
      </div>
      <div className={style.item}>
      <DropCountry existCountry={properties?.countryArr}/>
      </div>
      <div className={style.item}>
       <DropYear existYear={properties?.yearArr}/>
      </div>
      <div className={style.item}>
        <DropRating existRating={properties?.ratingArr} />
      </div>
    </div>
  );
};

export default MovieFilter;
