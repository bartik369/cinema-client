import { FC, useState, useCallback, useEffect } from 'react';
import Commercial from '../../components/banners/Сommercial';
import LastMovies from '../../components/sliders/LastMovies';
import TopMovies from '../../components/sliders/TopMovies';
import MainSlider from '../../components/sliders/MainSlider';
import Information from '../../components/information/Information';
import * as contentConst from '../../utils/constants/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faStar } from '@fortawesome/free-solid-svg-icons';
import style from './Home.module.css';

const Home: FC = () => {
  const [visibleInfo, setVisibleInfo] = useState<boolean>(false);
  useEffect(() => {
    if (localStorage.getItem('projectInformation') === 'true') {
      setVisibleInfo(false);
    } else {
      setVisibleInfo(true);
    }
  }, []);

  const windowHandler = () => {
    setVisibleInfo(false);
    localStorage.setItem('projectInformation', 'true');
  };

  return (
    <div className={style.main}>
      {visibleInfo && 
      <Information 
      setVisibleInfo={windowHandler}
      visibleInfo={visibleInfo}
      />}
      <MainSlider />
      <div className={style.container}>
        <div className={style.title}>
          <FontAwesomeIcon className={style.icon} icon={faStar} />
          <span>{contentConst.newMovies}</span>
        </div>
        <LastMovies />
        <Commercial />
        <div className={style.title}>
          <FontAwesomeIcon className={style.icon} icon={faTrophy} />
          <span>{contentConst.topTenMonthMovies}</span>
        </div>
        <TopMovies />
      </div>
    </div>
  );
};

export default Home;
