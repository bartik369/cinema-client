import { FC} from 'react';
import { useNavigate } from 'react-router-dom';
import * as contentConst from '../../utils/constants/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../hooks/reduxHook';
import { useGetUnreadMessagesQuery } from '../../store/chatApi';
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
  const user = useAppSelector(state => state.auth.user);
  const {data: unreadMessages} = useGetUnreadMessagesQuery(user && user._id);
  const navigate = useNavigate();

  console.log(unreadMessages && unreadMessages)

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
      <div className={style.item} onClick={() => navigate(`/admin/support-chats`)}>
        {unreadMessages && 
        unreadMessages.length > 0 && <div className={style.unread}>{unreadMessages.length}</div>}
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
            <FontAwesomeIcon icon={faNewspaper} />
          </div>
          <span>{contentConst.news}</span>
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
