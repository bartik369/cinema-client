import React, {FC} from 'react';
import * as contentConst from "../../../utils/constants/content";
import {categoryMovies} from "../../../utils/data/data";
import style from "../AddItemForm.module.css";

interface IGenreProps {
    addGenre: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Genre: FC<IGenreProps> = ({addGenre}) => {
    return (
        <div className={style.column2}>
            <span className={style['input-info']}>{contentConst.actorGenre}</span>
            <select defaultValue=''
                    onChange={(e) => addGenre(e)}
            >
                <option value='' disabled>
                    {contentConst.select}
                </option>
                {categoryMovies.map((item) => (
                    <option key={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
    );
};

export default Genre;
