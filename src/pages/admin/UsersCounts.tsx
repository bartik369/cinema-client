import React, {FC} from 'react';
import * as contentConst from '../../utils/constants/content'
import {useGetUsersQuery} from '../../store/adminApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import style from './Admin.module.css'

const UsersCounts: FC = () => {
  const { data: users } = useGetUsersQuery();
  return (
    <div className={style.pink}>
      <div className={style.icon}>
        <FontAwesomeIcon icon={faUsers} />
      </div>
      <div className={style.count}>{users && users.length}</div>
      <div className={style.title}>{contentConst.totalUsers}</div>
    </div>
  );
};

export default UsersCounts;