import React, { FC, useEffect, useState } from 'react';
import DropCategory from '../dropdown/DropCategory';
import DropCountry from '../dropdown/DropCountry';
import DropYear from '../dropdown/DropYear';
import DropRating from '../dropdown/DropRating';
import { useGetPropertiesQuery} from '../../store/movieApi';
import { resetFilter } from '../../store/movieOptionsSlice';
import { useAppDispatch } from '../../hooks/reduxHook';
import { IMovie} from '../../types/media';
import * as contentConst from '../../utils/constants/content'
import style from './MovieFilter.module.css';

interface IMovieFilterProps {
  movies: IMovie[];
}

const MovieFilter: FC<IMovieFilterProps> = ({movies}) => {

  const dispatch = useAppDispatch()
  const { data: properties } = useGetPropertiesQuery();
  const [checkedState, setCheckedState] = useState<any>({
    genre: {},
    country: {},
    year: {},
    rating: {},
  });

  const resetFilterHandler = () => {
    dispatch(resetFilter([]));
    setCheckedState({
      genre: {},
      country: {},
      year: {},
      rating: {},
    })
  }

  return (
    <div className={style.filter}>
      <div className={style.item}>
        <DropCategory 
        existGenre={properties && properties.genreArr}
        checkedState={checkedState}
        setCheckedState={setCheckedState}
        />
      </div>
      <div className={style.item}>
      <DropCountry 
      existCountry={properties && properties.countryArr}
      checkedState={checkedState}
      setCheckedState={setCheckedState}
      />
      </div>
      <div className={style.item}>
       <DropYear 
       existYear={properties && properties.yearArr}
       checkedState={checkedState}
      setCheckedState={setCheckedState}
       />
      </div>
      <div className={style.item}>
        <DropRating
        checkedState={checkedState}
        setCheckedState={setCheckedState} 
        existRating={properties && properties.ratingArr} />
      </div>
      <div className={style.item}>
        <button className={style.reset} onClick={resetFilterHandler}>{contentConst.resetFilter}</button>
      </div>
    </div>
  );
};

export default MovieFilter;
