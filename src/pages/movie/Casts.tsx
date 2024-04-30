import { FC } from "react";
import { Link } from "react-router-dom";
import { IActor } from "../../types/media";
import ENV from "../../env.config";
import style from "./Movies.module.css";

interface ICastsProps {
  actors: IActor[];
}

const Casts: FC<ICastsProps> = ({ actors }) => {
  return (
    <div className={style.cast}>
      {actors &&
        actors.map((item) => (
          <Link to={`/actors/${item._id}`} key={item._id}>
          <div className={style.actor}>
            <div className={style.portrait}>
              <img
                src={`${ENV.API_URL_UPLOADS_ACTORS}${item.picture}`}
                alt=""
              />
            </div>
            <div className={style.name}>
              <div>{item.nameRu}</div>
            </div>
          </div>
          </Link>
        ))}
    </div>
  );
};

export default Casts;
