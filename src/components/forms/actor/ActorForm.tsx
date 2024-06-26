import React, { FC} from 'react';
import { IActor } from '../../../types/media';
import * as contentConst from '../../../utils/constants/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCamera } from '@fortawesome/free-solid-svg-icons';
import style from '../AddItemForm.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import RuName from "./RuName";
import EngName from "./EngName";
import Country from "./Country";
import City from "./City";
import Birthday from "./Birthday";
import Height from "./Height";
import Gender from "./Gender";
import Genre from './Genre';
import Portrait from "./Portrait";

interface IActorProps {
  actor: IActor;
  setActor: (actor: IActor) => void;
  imgAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteGenre: (e: React.MouseEvent, item: string) => void;
  setFile: (file: string | Blob) => void;
  addGenre: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ActorForm: FC<IActorProps> = ({
  actor,
  setActor,
  imgAction,
  deleteGenre,
  addGenre,
  }) => {

  return (
    <form className={style.form}>
        <RuName actor={actor} setActor={setActor}/>
        <EngName actor={actor} setActor={setActor} />
      <div className={style['main-column']}>
          <Country actor={actor} setActor={setActor}/>
          <City actor={actor} setActor={setActor} />
      </div>
      <div className={style['main-column']}>
          <Birthday actor={actor} setActor={setActor} />
          <Height actor={actor} setActor={setActor} />
          <Gender actor={actor} setActor={setActor} />
      </div>
      <div className={style['main-column']}>
          <Genre addGenre={addGenre}/>
          <Portrait imgAction={imgAction} />
      </div>
      <div className={style.genre}>
        {actor.extInfo.genre.map((item) => (
          <div className={style.item}>
            {item}
            <FontAwesomeIcon className={style['close-btn']}
              onClick={(e: React.MouseEvent) => deleteGenre(e, item)}
              icon={faXmark}
            />
          </div>
        ))}
      </div>
    </form>
  );
};

export default ActorForm;
