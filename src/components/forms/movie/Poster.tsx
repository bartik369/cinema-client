import React, {FC} from 'react';
import style from "../AddItemForm.module.css";
import * as contentConst from "../../../utils/constants/content";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";

interface  IPosterPost {
    imgAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Poster:FC<IPosterPost> = ({imgAction}) => {
    return (
        <div className={style.column3}>
            <span className={style['input-info']}>{contentConst.actorPhoto}</span>
            <label className={style['photo-layer']} htmlFor={"upload"}>
                <FontAwesomeIcon className={style['photo-icon']} icon={faCamera}/>
                <span className={style['select-photo']}>
              {contentConst.actorSelectPhoto}
            </span>
            </label>
            <input name="file" id="upload" type="file" hidden
                   onChange={(e) => {
                       imgAction(e)
                   }}
            />
        </div>
    );
};

export default Poster;
