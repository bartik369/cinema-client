import React, {FC} from 'react';
import * as contentConst from "../../../utils/constants/content";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVideo} from "@fortawesome/free-solid-svg-icons";
import style from "../AddItemForm.module.scss";

interface ITrailerProps {
    videoAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Trailer:FC<ITrailerProps> = ({videoAction}) => {
    return (
        <div className={style.column3}>
            <span className={style['input-info']}>
            {contentConst.movieTrailer}
          </span>
            <label className={style['photo-layer']} htmlFor={"upload-video"}>
                <FontAwesomeIcon className={style['photo-icon']} icon={faVideo}/>
                <span className={style['select-photo']}>
              {contentConst.actorSelectPhoto}
            </span>
            </label>
            <input name="file" id="upload-video" type="file" hidden
                   onChange={(e) => {
                       videoAction(e)
                   }}
            />
        </div>
    );
};

export default Trailer;
