import React, {FC} from 'react';
import * as contentConst from "../../../utils/constants/content";
import {IActor} from "../../../types/media";
import style from "../AddItemForm.module.css";

interface IRuNameProps {
    actor: IActor;
    setActor: (actor: IActor) => void;
}

const RuName: FC<IRuNameProps> = ({actor, setActor}) => {
    return (
        <div className={style.block}>
            <span className={style['input-info']}>{contentConst.actorNameRu}</span>
            <input
                type="text"
                placeholder={contentConst.fill}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setActor({...actor, nameRu: e.target.value})
                }
            />
        </div>
    );
};

export default RuName;
