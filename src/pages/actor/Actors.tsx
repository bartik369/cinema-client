import { FC, useState, useEffect } from "react";
import { useGetActorsQuery } from "../../store/actorApi";
import { Link } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import Loader from "../../components/loader/Loader";
import ENV from "../../env.config";
import style from "./Actor.module.css";

const Actors: FC = () => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 1000);
  const [page, setPage] = useState(1);
  const { data: actors} = useGetActorsQuery(page);

  useEffect(() => {
    if (debouncedSearch) {
      console.log(debouncedSearch);
    }
  }, [debouncedSearch]);

  console.log(actors?.data)

  return (
    <div className={style.actors}>
      <div className={style.search}>
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className={style.info}>
        {actors?.data ? actors.data.map((item) => 
          <Link to={`/actors/${item._id}`} key={item._id}>
            <div className={style.item}>
              <div className={style.portrait}>
                <img alt=""
                  src={`${ENV.API_URL_UPLOADS_ACTORS}${item.picture}`}
                />
              </div>
              <div className={style.description}>
                <div className={style["name-ru"]}>{item.nameRu}</div>
                <div className={style["name-en"]}>{item.nameEn}</div>
              </div>
            </div>
          </Link>
        ): <Loader />}
      </div>
      <button onClick={() => setPage(page - 1)}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default Actors;
