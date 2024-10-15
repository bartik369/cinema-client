import React, {FC} from 'react';
import {IMovie} from "../../../types/media";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import style from '../AddItemForm.module.scss';

interface IGenreProps {
    movie: IMovie;
    deleteGenre: (e: React.MouseEvent, item: string) => void;
}
const Genre: FC<IGenreProps> = ({movie, deleteGenre}) => {
    return (
        <div className={style.genre}>
            {movie &&
                movie.genre.map((item) => (
                    <div className={style.item}>
                        {item}
                        <FontAwesomeIcon
                            className={style['close-btn']}
                            onClick={(e: React.MouseEvent) => deleteGenre(e, item)}
                            icon={faXmark}
                        />
                    </div>
                ))}
        </div>
    );
};

export default Genre;
