import React, {FC} from 'react';
import * as contentConst from "../../../utils/constants/content";
import {IActor, IMovie} from "../../../types/media";
import style from "../AddItemForm.module.scss";

interface ICastsProps {
    actors: IActor[];
    movie: IMovie;
    addActor: (e:React.ChangeEvent<HTMLSelectElement>) => void;
}

const Casts: FC<ICastsProps> = ({actors, movie, addActor}) => {
    return (
        <div className={style.column2}>
            <span className={style['input-info']}>{contentConst.movieCast}</span>
            <select value={{...movie.actors}}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => addActor(e)}
            >
                <option value="" disabled>
                    {contentConst.select}
                </option>
                {actors &&
                    actors.map((item) => (
                        <option key={item._id}>{item.nameRu}</option>
                    ))}
            </select>
        </div>
    );
};

export default Casts;
