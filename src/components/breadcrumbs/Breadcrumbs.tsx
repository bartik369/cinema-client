import React, { FC, useEffect } from 'react';
import { useLocation, Link, useNavigate} from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHook';
import { useGetMovieMutation } from '../../store/movieApi';
import { pageTitles } from '../../utils/data/data';
import * as contentConst from '../../utils/constants/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import style from './Breadcrumbs.module.scss';

const Breadcrumbs: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const regExMovie = location.pathname.match(/\/movies\/[a-zA-Z0-9]/);
  const regExActor = location.pathname.match(/\/actors\/[a-zA-Z0-9]/);
  const pathname = location.pathname.split('/').filter((x) => x);
  const [getMovie, { data: movie }] = useGetMovieMutation();
  const actorTitle = useAppSelector((state) => state.movies.movieTitle);

  useEffect(() => {
    regExMovie && getMovie(pathname[1])
        .then(data => console.log(data))
        .catch((error) => console.log(error));
  }, [pathname[1]]);

  return (
    <div className={pathname.length === 0 ? style.hidden : style.breadcrumbs}>
      {pathname.length > 0 && (
        <div className={style.home}>
          <div className={style['home-icon']}>
            <FontAwesomeIcon icon={faHome} />
          </div>
          <Link onClick={() => navigate('/')} to={''}>
            {contentConst.homePageTitle}
          </Link>
        </div>
      )}
      {pathname.map((name, index) => {
        const routeTo = `/${pathname.slice(0, index + 1).join('/')}`;
        const isLast = index === pathname.length - 1;

        return isLast 
        ? (
          <div className={style['last-link']} key={name}>
            {(regExMovie && movie)
              ? movie.titleRu
              : (regExActor && actorTitle)
                ? actorTitle
                : pageTitles[name as keyof typeof pageTitles]}
          </div>
        ) : (
          <Link key={name} onClick={() => navigate(routeTo)} to={routeTo}>
            {pageTitles[name as keyof typeof pageTitles]}
          </Link>
        );
      })}
    </div>
  );
};

export default React.memo(Breadcrumbs);
