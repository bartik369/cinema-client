import * as contentConst from '../../utils/constants/content'
import style from './Loader.module.css';

const Loader = () => {
    return (
      <div className={style["loader-wrap"]}>
        <div className={style.inner}>
          <div className={style["lds-ring"]}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className={style["load-text"]}>{contentConst.loading}</div>
        </div>
      </div>
    );
};

export default Loader;