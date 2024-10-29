import React, { FC, MouseEvent } from 'react';
import Genre from "./Genre";
import Casts from "./Casts";
import { IMovie } from '../../../types/media';
import { useGetAllActorsQuery } from '../../../store/actorApi';
import Year from "./Year";
import Country from "./Country";
import Time from "./Time";
import RuTitle from "./RuTitle";
import EngTitle from "./EngTitle";
import Category from "./Category";
import Director from "./Director";
import Description from "./Description";
import Age from "./Age";
import RemoveCasts from "./RemoveCasts";
import Poster from "./Poster";
import Trailer from "./Trailer";
import ResetForm from "../../UI/buttons/ResetForm";
import style from '../AddItemForm.module.scss';

interface IMovieProps {
  movie: IMovie;
  setMovie: (movie: IMovie) => void;
  imgAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
  videoAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addGenre: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  deleteGenre: (e: React.MouseEvent, item: string) => void;
  addActor: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  deleteActor: (e: React.MouseEvent, item: string) => void;
  setFile: (file: string | Blob) => void;
  resetFormHandler: (e: MouseEvent<HTMLButtonElement>) => void;
}

const MovieForm: FC<IMovieProps> = ({
  movie,
  setMovie,
  imgAction,
  videoAction,
  addGenre,
  deleteGenre,
  addActor,
  deleteActor,
  resetFormHandler,
}) => {
  const {data: actors} = useGetAllActorsQuery();

  return (
    <form className={style.form}>
      <div className={style['main-column']}>
          <RuTitle movie={movie} setMovie={setMovie} />
          <EngTitle movie={movie} setMovie={setMovie} />
      </div>
      <div className={style['main-column']}>
          <Year movie={movie} setMovie={setMovie}/>
          <Country movie={movie} setMovie={setMovie} />
          <Time movie={movie} setMovie={setMovie}/>
      </div>
        <Description movie={movie} setMovie={setMovie} />
      <div className={style['main-column']}>
          <Category movie={movie} addGenre={addGenre}/>
          <Director movie={movie} setMovie={setMovie} />
      </div>
      <Genre movie={movie} deleteGenre={deleteGenre}/>
      <div className={style['main-column']}>
        <Casts actors={actors!} movie={movie} addActor={addActor}/>
        <Age movie={movie} setMovie={setMovie}/>
      </div>
        <RemoveCasts movie={movie} deleteActor={deleteActor}/>
      <div className={style['main-column']}>
          <Poster imgAction={imgAction}/>
          <Trailer videoAction={videoAction}/>
          <ResetForm resetFormHandler={resetFormHandler} />
      </div>
    </form>
  );
};

export default MovieForm;
