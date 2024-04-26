import React, { FC, useEffect, useState } from 'react';
import { ISearch } from '../../types/media';
import { useSearchMovieMutation } from '../../store/movieApi';
import ENV from '../../env.config';
import * as contentConst from '../../utils/constants/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import style from './Search.module.css';

interface IVisibleProps {
  visibleHandler: () => void;
}

const Search: FC<IVisibleProps> = ({ visibleHandler }) => {
  const [searchMovie, {data: searchResult}] = useSearchMovieMutation()
  const [text, setText] = useState<ISearch>({
    search: '',
  });

  useEffect(() => {
    if (text.search.length > 1) {
      searchMovie(text)
    } else{
      searchMovie('')
    }
  }, [text]);

  console.log(text)

  

  return (
    <div className={style.search}>
      <div className={style.inner}>
        <div className={style.title}>{contentConst.search}</div>
        <div className={style.input}>
          <input type='text' autoFocus
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setText({ ...text, search: e.target.value })
            }
          />
        </div>
        {searchResult &&
        <div className={style.result}>
        {searchResult.map((item) => (
          <a href={`${ENV.MOVIES}${item._id}`}>
          <div className={style.item}>
            <div className={style.description}>
              <div className={style.title}>
                <div className={style.ru}>
                  {item.titleRu}
                </div>
                <div className={style.en}>{item.titleEn}</div>
              </div>
              <span>{item.year}</span>
              <span>{item.country}</span>
            </div>
          </div>
          </a>
        ))}
      </div>
        }
      </div>
      <br />
      <button className={style.close} onClick={visibleHandler}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

export default Search;
