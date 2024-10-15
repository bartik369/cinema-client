import style from './Loader.module.scss';

const MiniLoader = () => {
    return (
      <div className={style["loader-wrap"]}>
        <div className={style.inner}>
        <span className={style['mini-loader']}></span>
        </div>
      </div>
    );
};

export default MiniLoader;