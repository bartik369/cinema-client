import { FC, useState, useEffect} from 'react';
import { useGetActorsQuery } from '../../store/actorApi';
import { Link } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import Loader from '../../components/loader/Loader';
import Pagination from '../../components/pagination/Pagination';
import * as contentConst from '../../utils/constants/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ENV from '../../env.config';
import style from './Actor.module.scss';

const Actors: FC = () => {
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 1000);
  const [page, setPage] = useState(1);
  const { data: actors } = useGetActorsQuery({ page, debouncedSearch });

  useEffect(() => {
    window.scrollTo(0, 0);
}, [actors]);

  const handlePrevPage = () => {
    setPage(page - 1);
  };
  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className={style.actors}>
      <div className={style.search}>
        <input
          value={search}
          type="text"
          placeholder={contentConst.search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <FontAwesomeIcon
            className={style['reset-search']}
            onClick={() => setSearch('')}
            icon={faXmark}
          />
        )}
      </div>
      {actors?.data?.length ?
        <>
          <div className={style.info}>
            {actors?.data &&
              actors.data.map((item) => (
                <Link to={`${ENV.ACTORS}${item._id}`} key={item._id}>
                  <div className={style.item}>
                    <div className={style.portrait}>
                      <img src={`${ENV.API_URL_UPLOADS_ACTORS}${item.picture}`} alt=""/>
                    </div>
                    <div className={style.description}>
                      <div className={style['name-ru']}>{item.nameRu}</div>
                      <div className={style['name-en']}>{item.nameEn}</div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
            <Pagination
              setPage={setPage}
              onPrevPageClick={handlePrevPage}
              onNextPageClick={handleNextPage}
              disable={{
                left: page === 1,
                right: page === actors?.total_pages,
              }}
              nav={{ current: page, total: actors?.total_pages! }}
            />
        </>
        : (actors?.data.length === 0 && debouncedSearch.length > 0)
          ? <div className={style.warning}>{contentConst.nothingFound}</div>
          : <Loader />
      }
    </div>
  );
};

export default Actors;
