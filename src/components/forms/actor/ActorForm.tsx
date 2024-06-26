import React, {FC, MouseEvent} from 'react';
import { IActor } from '../../../types/media';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark} from '@fortawesome/free-solid-svg-icons';
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
import ResetForm from "../../UI/buttons/ResetForm";

interface IActorProps {
  actor: IActor;
  setActor: (actor: IActor) => void;
  imgAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteGenre: (e: React.MouseEvent, item: string) => void;
  setFile: (file: string | Blob) => void;
  addGenre: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  resetFormHandler: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ActorForm: FC<IActorProps> = ({
  actor,
  setActor,
  imgAction,
  deleteGenre,
  addGenre, resetFormHandler,
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
          <ResetForm resetFormHandler={resetFormHandler} />
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
