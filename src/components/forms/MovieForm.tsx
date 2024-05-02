import React, { FC, MouseEvent } from 'react';
import { IMovie } from '../../types/media';
import { ageItemsData, categoryMovies, yearMedia } from '../../utils/data/data';
import { countryList } from '../../utils/data/coutry';
import { directorsList } from '../../utils/data/directors';
import { useGetActorsQuery } from '../../store/actorApi';
import * as contentConst from '../../utils/constants/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCamera, faVideo } from '@fortawesome/free-solid-svg-icons';
import style from './AddItemForm.module.css';

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
  const {data: actors} = useGetActorsQuery()

  return (
    <form className={style.form}>
      <div className={style['main-column']}>
        <div className={style.column2}>
          <span className={style['input-info']}>
            {contentConst.movieNameRu}
          </span>
          <input
            type="text" value={movie.titleRu} placeholder={contentConst.fill}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMovie({ ...movie, titleRu: e.target.value })
            }
          />
        </div>
        <div className={style.column2}>
          <span className={style['input-info']}>
            {contentConst.movieNameEn}
          </span>
          <input
            type="text" value={movie.titleEn} placeholder={contentConst.fill}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMovie({ ...movie, titleEn: e.target.value })
            }
          />
        </div>
      </div>
      <div className={style['main-column']}>
        <div className={style.column3}>
          <span className={style['input-info']}>{contentConst.movieYear}</span>
          <select
            value={movie.year}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setMovie({ ...movie, year: e.target.value })
            }
          >
            <option value="" disabled>
              {contentConst.select}
            </option>
            {yearMedia.map((item) => (
              <option key={item.id}>{item.year}</option>
            ))}
          </select>
        </div>
        <div className={style.column3}>
          <span className={style['input-info']}>
            {contentConst.movieCountry}
          </span>
          <select
            value={movie.country}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setMovie({ ...movie, country: e.target.value })
            }
          >
            <option value="" disabled>
              {contentConst.select}
            </option>
            {countryList.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className={style.column3}>
          <span className={style['input-info']}>{contentConst.movieTime}</span>
          <input
            type="text" value={movie.time} placeholder={contentConst.fill}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMovie({ ...movie, time: e.target.value })
            }
          />
        </div>
      </div>
      <div className={style.block}>
        <span className={style['input-info']}>
          {contentConst.movieDescription}
        </span>
        <textarea
          placeholder={contentConst.fill} value={movie.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMovie({ ...movie, description: e.target.value })
          }
        />
      </div>
      <div className={style['main-column']}>
        <div className={style.column2}>
          <span className={style['input-info']}>
            {contentConst.movieCategory}
          </span>
          <select
            value={{ ...movie.genre }}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => addGenre(e)}
          >
            <option value="" disabled>
              {contentConst.select}
            </option>
            {categoryMovies.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className={style.column2}>
          <span className={style['input-info']}>
            {contentConst.movieDirector}
          </span>
          <select
            value={movie.director}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setMovie({ ...movie, director: e.target.value })
            }
          >
            <option value="" disabled>
              {contentConst.select}
            </option>
            {directorsList.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
      </div>
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
      <div className={style['main-column']}>
        <div className={style.column2}>
          <span className={style['input-info']}>{contentConst.movieCast}</span>
          <select value={{ ...movie.actors }}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => addActor(e)}
          >
            <option value="" disabled>
              {contentConst.select}
            </option>
            {actors &&
              actors.data.map((item) => (
                <option key={item._id}>{item.nameRu}</option>
              ))}
          </select>
        </div>
        <div className={style.column2}>
          <span className={style['input-info']}>{contentConst.movieAge}</span>
          <select
            value={movie.ageCategory}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setMovie({ ...movie, ageCategory: e.target.value })
            }
          >
            <option value="" disabled>
              {contentConst.select}
            </option>
            {ageItemsData.map((item) => (
              <option key={item.id}>{item.age}</option>
            ))}
          </select>
        </div>
      </div>
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
      <div className={style['main-column']}>
        <div className={style.column3}>
          <span className={style['input-info']}>{contentConst.actorPhoto}</span>
          <label className={style['photo-layer']} htmlFor={"upload"}>
            <FontAwesomeIcon className={style['photo-icon']} icon={faCamera} />
            <span className={style['select-photo']}>
              {contentConst.actorSelectPhoto}
            </span>
          </label>
          <input name="file" id="upload" type="file" hidden
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { imgAction(e); }}
          />
        </div>
        <div className={style.column3}>
          <span className={style['input-info']}>
            {contentConst.movieTrailer}
          </span>
          <label className={style['photo-layer']} htmlFor={"upload-video"}>
            <FontAwesomeIcon className={style['photo-icon']} icon={faVideo} />
            <span className={style['select-photo']}>
              {contentConst.actorSelectPhoto}
            </span>
          </label>
          <input name="file" id="upload-video" type="file" hidden
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              videoAction(e);
            }}
          />
        </div>
        <div className={style.column2}>
          <button className={style.reset}
            onClick={(e: MouseEvent<HTMLButtonElement>) => resetFormHandler(e)}
          >
          {contentConst.resetForm}
          </button>
        </div>
      </div>
    </form>
  );
};

export default MovieForm;
