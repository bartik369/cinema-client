import {FC} from 'react';
import { IActor } from '../../types/media';
import MiniLoader from '../../components/loader/MiniLoader';
import ENV from '../../env.config';
import style from './Movies.module.css';

interface ICastsProps {
    actors: IActor[];
}

const Casts:FC<ICastsProps> = ({actors}) => {
    return (
        <div className={style.cast}>
                {actors ?
                  actors.map((item) => (
                    <div className={style.item2} key={item._id}>
                      <div className={style.portrait}>
                        <img
                          src={`${ENV.API_URL_UPLOADS_ACTORS}${item.picture}`}
                          alt=''
                        />
                      </div>
                      <div className={style.name}>
                        <div>{item.nameRu}</div>
                      </div>
                    </div>
                  )) : <MiniLoader />}
              </div>
    );
};

export default Casts;