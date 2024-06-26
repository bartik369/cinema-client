import React, {FC} from 'react';
import {IMovie} from "../../../types/media";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import style from "../AddItemForm.module.css";

interface IRemoveCastsProps {
    movie: IMovie;
    deleteActor: (e: React.MouseEvent, item: string) => void;
}

const RemoveCasts: FC<IRemoveCastsProps> = ({movie, deleteActor}) => {
    return (
        <div className={style.genre}>
            {movie &&
                movie.actors.map((item) => (
                    <div className={style.item}>
                        {item}
                        <FontAwesomeIcon
                            className={style['close-btn']}
                            onClick={(e: React.MouseEvent) => deleteActor(e, item)}
                            icon={faXmark}
                        />
                    </div>
                ))}

        </div>
    );
};

export default RemoveCasts;
