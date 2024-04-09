import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import * as contentConst from '../../utils/constants/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ENV from '../../env.config';
import {
  faImages,
  faFilm,
  faAddressCard,
  faNewspaper,
  faEnvelope,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
import style from './Admin.module.css';

const Menu: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={style.item} onClick={() => navigate(`${ENV.EDIT_SLIDER}`)}>
        <div className={style.icon}>
          <div className={style.img}>
            <FontAwesomeIcon icon={faImages} />
          </div>
          <span>{contentConst.slider}</span>
        </div>
      </div>
      <div className={style.item} onClick={() => navigate(`${ENV.ADD_MOVIE}`)}>
        <div className={style.icon}>
          <div className={style.img}>
            <FontAwesomeIcon icon={faFilm} />
          </div>
          <span>{contentConst.addMovie}</span>
        </div>
      </div>
      <div className={style.item} onClick={() => navigate(`${ENV.ADD_ACTOR}`)}>
        <div className={style.icon}>
          <div className={style.img}>
            <FontAwesomeIcon icon={faAddressCard} />
          </div>
          <span>{contentConst.addActor}</span>
        </div>
      </div>
      <div className={style.item} onClick={() => navigate(`${ENV.ADMIN}`)}>
        <div className={style.icon}>
          <div className={style.img}>
            <FontAwesomeIcon icon={faNewspaper} />
          </div>
          <span>{contentConst.news}</span>
        </div>
      </div>
      <div className={style.item} onClick={() => navigate(`${ENV.ADMIN}`)}>
        <div className={style.icon}>
          <div className={style.img}>
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <span>{contentConst.messages}</span>
        </div>
      </div>
      <div className={style.item} onClick={() => navigate(`${ENV.ADMIN}`)}>
        <div className={style.icon}>
          <div className={style.img}>
            <FontAwesomeIcon icon={faCreditCard} />
          </div>
          <span>{contentConst.financeHistory}</span>
        </div>
      </div>
    </>
  );
};

export default Menu;
