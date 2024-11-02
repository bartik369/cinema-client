import React, { FC, useState } from 'react';
import { useAddMovieMutation } from '../../store/movieApi';
import PreviewPoster from '../../components/poster/PreviewPoster';
import * as contentConst from '../../utils/constants/content';
import { useMovieAction } from '../../hooks/useMovieAction';
import {ToastContainer, toast} from "react-toastify";
import MovieForm from '../../components/forms/movie/MovieForm';
import style from './AddMovie.module.scss';

const AddMovie: FC = () => {
  const [addMovie] = useAddMovieMutation()
  const [file, setFile] = useState<string | Blob>('');
  const [trailer, setTrailer] = useState<string | Blob>();
  const [movie, prevImg, setPrevImg,  setMovie, addGenre, deleteGenre, addActor, deleteActor, resetFormHandler] = useMovieAction();

  const createMovieHandler = () => {
    const formData = new FormData();
    type movieKey = keyof typeof movie._id;
    Object.keys(movie).forEach((key) => {
      formData.append(key, movie[key as movieKey]);
    });
    file && formData.append('file', file);
    trailer && formData.append('trailer', trailer);
    formData && addMovie(formData)
        .then(() => toast.success(contentConst.addMovieSuccess))
        .catch(error => toast.error(error.data.message))
  };
  
  const imgAction = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files && setFile(e.target.files[0]);
    e.target.files && setPrevImg(URL.createObjectURL(e.target.files[0]));
  };
  const videoAction = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files && setTrailer(e.target.files[0]);
  };

  return (
      <div className={style.container}>
        <div className={style.toast}>
          <ToastContainer theme="colored" autoClose={7000} position="top-center"/>
        </div>
        <div className={style['l-side']}>
          <MovieForm
              movie={movie}
              setMovie={setMovie}
              imgAction={imgAction}
              videoAction={videoAction}
              addGenre={addGenre}
              deleteGenre={deleteGenre}
              addActor={addActor}
              deleteActor={deleteActor}
              setFile={setFile}
              resetFormHandler={resetFormHandler}
          />
        </div>
        <div className={style['r-side']}>
          <PreviewPoster
              prevImg={prevImg}
              movie={movie}
              createMovieHandler={createMovieHandler}
          />
        </div>
      </div>
  );
};

export default AddMovie;
