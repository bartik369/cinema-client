import { useState, MouseEvent } from "react";
import { IMovie } from "../types/media";

const useMovieAction = () => {
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
      const [prevImg, setPrevImg] = useState<string | null>('');
    
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

    return [movie, prevImg, setPrevImg,  setMovie, addGenre, deleteGenre, addActor, deleteActor, resetFormHandler] as const
}

export {useMovieAction}