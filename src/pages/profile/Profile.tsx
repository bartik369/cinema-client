import { FC} from 'react';
import { useProfileUserQuery } from '../../store/authApi';
import { useAppSelector } from '../../hooks/reduxHook';
import * as contentConst from '../../utils/constants/content';
import viewed from '../../assets/pics/viewed.svg';
import paymethod from '../../assets/pics/paymethod.svg';
import favorites from '../../assets/pics/favorites.svg';
import devices from '../../assets/pics/devices.svg';
import gift from '../../assets/pics/gift.svg';
import receipt from '../../assets/pics/receipt.svg';
import history from '../../assets/pics/history.svg';
import bill from '../../assets/pics/bill.svg';
import messages from '../../assets/pics/messages.svg';
import events from '../../assets/pics/events.svg';
import invite from '../../assets/pics/invite.svg';
import settings from '../../assets/pics/settings.svg';
import plan from '../../assets/pics/plan.svg';
import certificate from '../../assets/pics/certificate.svg';
import style from './Profile.module.scss';

const Profile: FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { data: profile } = useProfileUserQuery(user._id);

  return (
    <div className={style.container}>
      {profile && (
        <div className={style['profile-inner']}>
          <div className={style.subscription}>
            <div className={style.title}>
              <img src={plan} alt='' />
              {contentConst.subscription}
            </div>
            {user && user.member.includes(contentConst.START) ? (
              <div className={style.info}>Plan-1</div>
            ) : (
              contentConst.VIP
            )}
          </div>
          <div className={style.bill}>
            <div className={style.title}>
              <img src={bill} alt='' />
              {contentConst.bill}
            </div>
            <div className={style.inner}>
              <div className={style.count}>1230</div>
              <div className={style.currency}> {contentConst.ruble}</div>
            </div>
          </div>
          <div className={style.gift}>
            <div className={style.title}>
              <img src={gift} alt="" />
              {contentConst.gift}
            </div>
          </div>
          <div className={style.purchases}>
            <div className={style.title}>
              <img src={history} alt="" />
              {contentConst.purchases}
            </div>
          </div>
          <div className={style.receipt}>
            <div className={style.title}>
              <img src={receipt} alt="" />
              {contentConst.receipt}
            </div>
          </div>
          <div className={style.messages}>
            <div className={style.title}>
              <img src={messages} alt="" />
              {contentConst.messages}
            </div>
            <div className={style.inner}>
              <div className={style.count}>
                0<div className={style.new}> {contentConst.newItems}</div>
              </div>
            </div>
          </div>
          <div className={style.promo}>
            <img src={certificate} alt="" />
            <div className={style['extra-title']}>
              {contentConst.certificate}
            </div>
          </div>
          <div className={style.favorites}>
            <img src={favorites} alt="" />
            <div className={style['extra-title']}>
              {contentConst.favorites}
            </div>
          </div>
          <div className={style.devices}>
            <img src={devices} alt="" />
            <div className={style['extra-title']}> {contentConst.devices}</div>
          </div>
          <div className={style.viewed}>
            <img src={viewed} alt="" />
            <div className={style['extra-title']}> {contentConst.viewed}</div>
          </div>
          <div className={style.paymethods}>
            <img src={paymethod} alt="" />
            <div className={style['extra-title']}>
              {contentConst.paymethods}
            </div>
          </div>
          <div className={style.invite}>
            <img src={invite} alt="" />
            <div className={style['extra-title']}> {contentConst.invite}</div>
          </div>
          <div className={style.events}>
            <div className={style.title}>
              <img src={events} alt="" />
              {contentConst.events}
            </div>
            <div className={style.inner}>
              <div className={style.count}>
                2
                <div className={style.new}>
                  {contentConst.newItems}
                </div>
              </div>
            </div>
          </div>
          <div className={style.settings}>
            <img src={settings} alt="" />
            <div className={style['extra-title']}> {contentConst.settings}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
