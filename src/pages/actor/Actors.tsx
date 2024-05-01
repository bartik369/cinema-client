import {FC} from 'react';
import { useGetActorsQuery } from '../../store/actorApi';
import { Link } from 'react-router-dom';
import ENV from '../../env.config';
import style from './Actor.module.css'

const Actors:FC = () => {
    const {data: actors} = useGetActorsQuery()
    return (
        <div className={style.actors}>
            <div className={style.info}>
                {actors && actors.map((item) => 
                <Link to={`/actors/${item._id}`} key={item._id}>
                 <div className={style.item}>
                    <div className={style.portrait}>
                        <img src={`${ENV.API_URL_UPLOADS_ACTORS}${item.picture}`} alt="" />
                    </div>
                    <div className={style.description}>
                        <div className={style['name-ru']}>
                            {item.nameRu}
                        </div>
                        <div className={style['name-en']}>
                            {item.nameEn}
                        </div>
                    </div>
                 </div>
                </Link>
                )
                }
            </div>
        </div>
    );
};

export default Actors;