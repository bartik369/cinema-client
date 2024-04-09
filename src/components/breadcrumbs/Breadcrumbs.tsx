import React, {FC} from 'react';
import { useLocation, Link, useNavigate} from 'react-router-dom';
import { useGetMovieQuery } from '../../store/movieApi';
import { pageTitles } from '../../utils/data/data';
import * as contentConst from '../../utils/constants/content'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import style from './Breadcrumbs.module.css'

const Breadcrumbs: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const regEx = location.pathname.match(/\/movies\/[a-zA-Z0-9]/);
  const pathnames = location.pathname.split("/").filter((x) => x);
  const {data: movie} = useGetMovieQuery(regEx! && pathnames[1])

  return (
    <div className={pathnames.length === 0 
    ? style.hidden 
    : style.breadcrumbs}
    >
      {pathnames.length > 0 && 
        <div className={style.home}>
          <div className={style['home-icon']}>
            <FontAwesomeIcon icon={faHome} />
          </div>
          <Link onClick={() => navigate('/')} to={''}>
            {contentConst.homePageTitle}
          </Link>
        </div>
      }

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <div className={style['last-link']} key={name}>
            {regEx ? movie?.titleRu : pageTitles[name as keyof typeof pageTitles]}
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

export default Breadcrumbs;
