import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import { useGetSlidesQuery } from '../../store/adminApi';
import * as contentConst from '../../utils/constants/content';
import ENV from '../../env.config';
import style from './SlidersList.module.scss';

interface ISliderLIstProps {
  update: (id: string) => void;
  remove: (id: string) => void;
}
const SlidersList: FC<ISliderLIstProps> = ({ update, remove }) => {
  const { data: slides } = useGetSlidesQuery();
  return (
    <div className={style['slides-wrapper']}>
      {slides &&
        slides.map((slide) => (
          <div className={style.info} key={slide._id}>
            <div className={style.poster}>
              <img src={`${ENV.API_URL_UPLOADS_MAIN_SLIDER}${slide.media}`} alt= "" />
            </div>
            <div className={style.actions}>
              <div className={style.btns}>
                <button
                  onClick={() => update(slide._id!)}
                  className={style.update}
                >
                  <FontAwesomeIcon icon={faPen} />
                  <span>{contentConst.updateBtn}</span>
                </button>
                <button
                  onClick={() => remove(slide._id!)}
                  className={style.delete}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                  <span>{contentConst.deleteBtn}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SlidersList;
