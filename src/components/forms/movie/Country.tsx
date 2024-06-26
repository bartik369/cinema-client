import React, {FC} from 'react';
import * as contentConst from "../../../utils/constants/content";
import {countryList} from "../../../utils/data/coutry";
import {IMovie} from "../../../types/media";
import style from "../AddItemForm.module.css";

interface ICountryProps {
    movie: IMovie;
    setMovie: (movie: IMovie) => void;
}

const Country:FC<ICountryProps> = ({movie, setMovie}) => {
    return (
        <div className={style.column3}>
            <span className={style['input-info']}>
            {contentConst.movieCountry}
          </span>
            <select
                value={movie.country}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setMovie({...movie, country: e.target.value})
                }
            >
                <option value="" disabled>
                    {contentConst.select}
                </option>
                {countryList.map((item) => (
                    <option key={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
    );
};

export default Country;
