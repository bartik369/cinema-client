import React, { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useSearchMovieMutation } from '../../store/movieApi';
import useDebounce from '../../hooks/useDebounce';
import ENV from '../../env.config';
import * as contentConst from '../../utils/constants/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import style from './Search.module.scss';

interface IVisibleProps {
  visibleHandler: () => void;
}

const Search: FC<IVisibleProps> = ({ visibleHandler }) => {
  const [searchMovie, {data: searchResult, reset}] = useSearchMovieMutation();
  const [emptySearchResult, setEmptySearchResult] = useState<boolean>(false);
  const [text, setText] = useState({
    search: '',
  });
  const debouncedSearch = useDebounce(text.search, 1000);

  useEffect(() => {

      if (debouncedSearch.length > 1) {
        searchMovie(debouncedSearch)
        .unwrap()
        .then((data) => {
          if (data.length === 0) {
            setEmptySearchResult(true)
          } else {
            setEmptySearchResult(false)
          }
        })
        .catch(error => console.log(error))
      } else {
        reset();
        setEmptySearchResult(false);
      }
      
  }, [debouncedSearch]);
  const searchModal = document.getElementById('portal') as HTMLElement;

  return ReactDOM.createPortal(
    <div className={style.search}>
      <div className={style.inner}>
        <div className={style.title}>{contentConst.search}</div>
        <div className={style.input}>
          <input type='text' autoFocus value={text.search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setText({ ...text, search: e.target.value })}
          />
          {text.search.length !== 0 &&
          <FontAwesomeIcon 
          className={style['reset-search']}
          onClick={() => setText({...text, search: ''})}
          icon={faXmark}/>
          }
        </div>
        {emptySearchResult &&
        <div className={style.noresult}>
          {contentConst.nothingFound}
        </div>
        }
        {searchResult &&
        <div className={style.result}>
        {searchResult.map((item) => (
          <Link to={`${ENV.MOVIES}${item._id}`} key={item._id} reloadDocument>
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
          </Link>
        ))}
      </div>
      }
      </div>
      <br />
      <button className={style.close} onClick={visibleHandler}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>,
    searchModal
  )
};

export default Search;
