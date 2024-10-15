import style from './Loader.module.scss';

const Loader = () => {
    return (
      <div className={style["loader-wrap"]}>
        <div className={style.inner}>
        <span className={style.loader}></span>
        </div>
      </div>
    );
};

export default Loader;