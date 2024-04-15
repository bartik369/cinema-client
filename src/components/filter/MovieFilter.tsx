import React, { FC, useEffect, useState } from 'react';
import DropCategory from '../dropdown/DropCategory';
import DropCountry from '../dropdown/DropCountry';
import DropYear from '../dropdown/DropYear';
import DropRating from '../dropdown/DropRating';
import { useGetPropertiesQuery} from '../../store/movieApi';
import { resetFilter } from '../../store/movieOptionsSlice';
import { useAppDispatch } from '../../hooks/reduxHook';
import { IMovie, IMovieCheckMenu } from '../../types/media';
import style from './MovieFilter.module.css';

interface IMovieFilterProps {
  movies: IMovie[];
}

const MovieFilter: FC<IMovieFilterProps> = ({movies}) => {
  const [checkedState, setCheckedState] = useState<any>({
    genre: {},
    country: {},
    year: {},
    rating: {},
  });
  const dispatch = useAppDispatch()
  const { data: properties } = useGetPropertiesQuery();
  // const genre: string[] = [];
  // const country: string[] = [];
  // const year: string[] = [];
  // const rating: string[] = [];

  // movies &&
  //   movies.map((item) => {
  //     item.genre.map((el) => {
  //       genre.push(el);
  //     });
  //     country.push(item.country);
  //     year.push(item.year);
  //   });

  // const genreArr = genre.filter((value, index, self) => {
  //   return self.indexOf(value) === index;
  // });
  // const countryArr = country.filter((value, index, self) => {
  //   return self.indexOf(value) === index;
  // });
  // const yearArr = year.filter((value, index, self) => {
  //   return self.indexOf(value) === index;
  // });
  // const ratingArr = rating.filter((value, index, self) => {
  //   return self.indexOf(value) === index;
  // });

  const resetFilterHandler = () => {
    dispatch(resetFilter([]));
    setCheckedState({
      genre: {},
      country: {},
      year: {},
      rating: {},
    })
  }
console.log(checkedState)
  return (
    <div className={style.filter}>
      <div className={style.item}>
        {/* <DropCategory existGenre={properties?.genreArr} /> */}
        <DropCategory 
        existGenre={properties && properties?.genreArr}
        checkedState={checkedState}
        setCheckedState={setCheckedState}
        />
      </div>
      <div className={style.item}>
      <DropCountry 
      existCountry={properties && properties?.countryArr}
      checkedState={checkedState}
      setCheckedState={setCheckedState}
      />
      </div>
      <div className={style.item}>
       <DropYear 
       existYear={properties && properties?.yearArr}
       checkedState={checkedState}
      setCheckedState={setCheckedState}
       />
      </div>
      <div className={style.item}>
        <DropRating
        checkedState={checkedState}
        setCheckedState={setCheckedState} 
        existRating={properties && properties?.ratingArr} />
      </div>
      <div className={style.item}>
        <button onClick={resetFilterHandler}>reset filter</button>
      </div>
    </div>
  );
};

export default MovieFilter;
