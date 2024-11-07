import React, { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSearchMovieMutation } from '../../store/movieApi';
import useDebounce from '../../hooks/useDebounce';
import * as contentConst from '../../utils/constants/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import style from './Search.module.scss';
import Item from './Item';

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
          <Item key={item._id} item={item} />
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
