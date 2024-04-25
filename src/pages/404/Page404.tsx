import { FC } from "react";
import * as contentConst from "../../utils/constants/content";
import video404 from "../../assets/video/404video.mp4";
import vignette from "../../assets/pics/vignette.png";
import style from "./Page404.module.css";

const Page404: FC = () => {
  return (
    <div className={style.container}>
      <div className={style.page404}>
        <video className={style.video} autoPlay muted loop src={video404} />
        <img className={style.vignette} src={vignette} alt="" />
        <div className={style.error}>
          <div className={style.number}>{contentConst.error404}</div>
          <div className={style.text}>{contentConst.error404text}</div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
