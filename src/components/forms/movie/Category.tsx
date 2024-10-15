import React, {FC} from 'react';
import * as contentConst from "../../../utils/constants/content";
import {categoryMovies} from "../../../utils/data/data";
import {IMovie} from "../../../types/media";
import style from "../AddItemForm.module.scss";

interface ICategoryProps {
    movie: IMovie;
    addGenre: (e:React.ChangeEvent<HTMLSelectElement>) => void;
}

const Category: FC<ICategoryProps> = ({movie, addGenre}) => {
    return (
        <div className={style.column2}>
          <span className={style['input-info']}>
            {contentConst.movieCategory}
          </span>
            <select
                value={{...movie.genre}}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => addGenre(e)}
            >
                <option value="" disabled>
                    {contentConst.select}
                </option>
                {categoryMovies.map((item) => (
                    <option key={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
    );
};

export default Category;
