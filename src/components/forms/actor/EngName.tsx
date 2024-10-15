import React, {FC} from 'react';
import * as contentConst from "../../../utils/constants/content";
import {IActor} from "../../../types/media";
import style from "../AddItemForm.module.scss";

interface EngNameProps {
    actor: IActor;
    setActor: (actor:IActor) => void;
}

const EngName: FC<EngNameProps> = ({actor, setActor}) => {
    return (
        <div className={style.block}>
            <span className={style['input-info']}>{contentConst.actorNameEn}</span>
            <input
                type="text"
                placeholder={contentConst.fill}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setActor({...actor, nameEn: e.target.value})
                }
            />
        </div>
    );
};

export default EngName;
