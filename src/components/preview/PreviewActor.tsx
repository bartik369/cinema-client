import React, { FC } from 'react';
import { IActor } from '../../types/media';
import * as contentConst from '../../utils/constants/content';
import BlankAvatar from '../../assets/pics/blank_avatar.jpg';
import style from './PreviewActor.module.scss';

interface IPreviewActorProps {
  prevImg: string | null;
  actor: IActor;
  createActorHandler: () => void;
}

const PreviewActor: FC<IPreviewActorProps> = ({
  prevImg,
  actor,
  createActorHandler,
}) => {
  const date = new Date(actor?.extInfo.birthday);
  const currentDate = new Date();
  const myDate = currentDate.getFullYear() - date.getFullYear();

  return (
    <div className={style.wrapper}>
      <div className={style.portrait}>
        {prevImg 
        ? <img src={prevImg} alt="" /> 
        : <img src={BlankAvatar} />
        }
      </div>
      <div className={style.info}>
        <div className={style.name}>
          <span className={style.ru}>{actor.nameRu}</span>
          <span className={style.en}>{actor.nameEn}</span>
        </div>

        {(actor.extInfo.country || actor.extInfo.city) && (
          <div className={style.result}>
            <span className={style.prevText}>{contentConst.bornPlace}</span>
            {`${actor.extInfo.country}  ${actor.extInfo.city}`}
          </div>
        )}
        {actor.extInfo.birthday 
         ? <div className={style.result}>
            <span className={style.prevText}>{contentConst.actorBirthday}</span>
            {date.toLocaleDateString(contentConst.locateRu)}
            <span className={style.prevText}>{contentConst.actorAge}</span>
            {myDate}
          </div>
         : ''
        }
        {actor.extInfo.height && (
          <div className={style.result}>
            <span className={style.prevText}>{contentConst.actorHeight}</span>
            {actor.extInfo.height}
          </div>
        )}
        {actor.extInfo.gender && (
          <div className={style.result}>
            <span className={style.prevText}>{contentConst.actorGender}</span>
            {actor.extInfo.gender}
          </div>
        )}
        {actor.extInfo.genre.length ? (
          <div className={style.result}>
            <span className={style.prevText}>{contentConst.actorGenre}</span>
            <div className={style['genre-list']}>
              {actor && actor.extInfo.genre.map((item) => <div>{item}</div>)}
            </div>
          </div>
        ) : (
          ''
        )}
        {actor.nameRu && actor.nameEn && (
          <button type="button" className={style['btn-submit']} onClick={createActorHandler}>
            {contentConst.addBtn}
          </button>
        )}
      </div>
    </div>
  );
};

export default PreviewActor;
