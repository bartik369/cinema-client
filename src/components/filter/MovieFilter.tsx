import React, { FC, useState } from 'react';
import DropCategory from '../dropdown/DropCategory';
import DropCountry from '../dropdown/DropCountry';
import DropYear from '../dropdown/DropYear';
import DropRating from '../dropdown/DropRating';
import { useGetPropertiesQuery} from '../../store/movieApi';
import { resetFilter } from '../../store/movieOptionsSlice';
import { useAppDispatch } from '../../hooks/reduxHook';
import { IMovie} from '../../types/media';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import * as contentConst from '../../utils/constants/content'
import style from './MovieFilter.module.scss';

interface IMovieFilterProps {
  movies: IMovie[];
}

const MovieFilter: FC<IMovieFilterProps> = ({movies}) => {

  const dispatch = useAppDispatch();
  const { data: properties } = useGetPropertiesQuery();
  const [checkedGenre, setCheckedGenre] = useState<any>('');
  const [checkedCountry, setCheckedCountry] = useState('');
  const [checkedYear, setCheckedYear] = useState('');
  const [checkedRating, setCheckedRating] = useState('');

  const resetFilterHandler = () => {
    dispatch(resetFilter([]));
    setCheckedGenre('');
    setCheckedCountry('');
    setCheckedYear('');
    setCheckedRating('');
  }

  return (
    <div className={style.filter}>
      <div className={style.item}>
        <DropCategory 
          existGenre={properties?.genre!}
          checkedGenre={checkedGenre}
          setCheckedGenre={setCheckedGenre}
        />
      </div>
      <div className={style.item}>
      <DropCountry 
        existCountry={properties?.country!}
        checkedCountry={checkedCountry!}
        setCheckedCountry={setCheckedCountry}
      />
      </div>
      <div className={style.item}>
       <DropYear 
        existYear={properties?.year!}
        checkedYear={checkedYear}
        setCheckedYear={setCheckedYear}
       />
      </div>
      <div className={style.item}>
        <DropRating
        checkedRating={checkedRating}
        setCheckedRating={setCheckedRating}
        />
      </div>
        <button className={style['reset-filter']} onClick={resetFilterHandler}>
          <FontAwesomeIcon className={style.icon} icon={faBan}/>
          {contentConst.resetFilter}
        </button>
    </div>
  );
};

export default MovieFilter;
