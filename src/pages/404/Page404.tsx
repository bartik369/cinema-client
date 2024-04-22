import React, {FC} from 'react';
import * as contentConst from '../../utils/constants/content';
import style from './Page404.module.css';

const Page404:FC = () => {
    return (
        <div className={style.container}>
            <div className={style.warning404}>
           <div className={style.error}>
                {contentConst.error404}
           </div>
           <div className={style.text}>
                {contentConst.error404text}
           </div>
           </div>
        </div>
    );
};

export default Page404;