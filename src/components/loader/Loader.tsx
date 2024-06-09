import style from './Loader.module.css';

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