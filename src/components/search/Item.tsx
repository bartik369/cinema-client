import {FC} from 'react';
import { Link } from 'react-router-dom';
import { IMovie } from "../../types/media";
import ENV from '../../env.config';
import style from './Search.module.scss';

interface IItemProps {
    item: IMovie
}
const Item:FC<IItemProps> = ({item}) => {
    return (
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
    );
};

export default Item;