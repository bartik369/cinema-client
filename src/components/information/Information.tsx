import {FC, memo} from 'react';
import * as contentConst from '../../utils/constants/content';
import style from './Information.module.css'

interface IINformationProps {
    setVisibleInfo: (visibleInfo:boolean) => void;
    visibleInfo: boolean;
}

const Information:FC<IINformationProps> = memo(({setVisibleInfo, visibleInfo}) => {


    return (
        <div className={style.information}>
            <div className={style.inner}>
                <div className={style.text}>
                    {contentConst.information}
                </div>
                <button className={style.close} onClick={() => setVisibleInfo(!visibleInfo)}>
                    {contentConst.close}
                </button>
            </div>
        </div>
    );
});

export default Information;