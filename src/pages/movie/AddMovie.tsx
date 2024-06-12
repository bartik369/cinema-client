import React, { FC, useState, MouseEvent } from 'react';
import { useAddMovieMutation } from '../../store/movieApi';
import PreviewPoster from '../../components/poster/PreviewPoster';
import { IMovie } from '../../types/media';
import MovieForm from '../../components/forms/movie/MovieForm';
import style from './AddMovie.module.css';

const AddMovie: FC = () => {
  const [addMovie] = useAddMovieMutation()
  const [movie, setMovie] = useState<IMovie>({
    _id: '',
    titleEn: '',
    titleRu: '',
    genre: [],
    picture: '',
    trailer: '',
    year: '',
    country: '',
    ageCategory: '',
    description: '',
    director: '',
    time: '',
    actors: [],
    rating: null,
  });

  const [file, setFile] = useState<string | Blob>('');
  const [trailer, setTrailer] = useState<string | Blob>();
  const [prevImg, setPrevImg] = useState<string | null>('');

  const createMovieHandler = () => {
    const formData = new FormData();
    type movieKey = keyof typeof movie._id;
    Object.keys(movie).forEach((key) => {
      formData.append(key, movie[key as movieKey]);
    });
    file && formData.append('file', file);
    trailer && formData.append('trailer', trailer);

    console.log(formData)
    formData && addMovie(formData);
  };

  const addGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMovie({
      ...movie,
      genre: [...movie.genre, e.target.value],
    });
  };

  const deleteGenre = (e: React.MouseEvent, item: string) => {
    e.preventDefault();
    setMovie({
      ...movie,
      genre: movie.genre.filter((elem) => elem !== item),
    });
  };

  const addActor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMovie({
      ...movie,
      actors: [...movie.actors, e.target.value],
    });
  };

  const deleteActor = (e: React.MouseEvent, item: string) => {
    e.preventDefault();
    setMovie({
      ...movie,
      actors: movie.actors.filter((elem) => elem !== item),
    });
  };

  const resetFormHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMovie({
      ...movie,
      titleEn: '',
      titleRu: '',
      genre: [],
      trailer: '',
      year: '',
      country: '',
      ageCategory: '',
      description: '',
      director: '',
      time: '',
      actors: [],
    });
    setPrevImg('');
  };

  const imgAction = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files && setFile(e.target.files[0]);
    e.target.files && setPrevImg(URL.createObjectURL(e.target.files[0]));
  };
  const videoAction = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files && console.log(e.target.files);
    e.target.files && setTrailer(e.target.files[0]);
  };

  
  return (
    <div className={style.container}>
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
