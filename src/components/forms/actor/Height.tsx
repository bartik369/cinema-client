import React, {FC} from 'react';
import * as contentConst from "../../../utils/constants/content";
import {IActor} from "../../../types/media";
import style from "../AddItemForm.module.scss";

interface IHeightProps {
    actor: IActor;
    setActor: (actor: IActor) => void;
}

const Height:FC<IHeightProps> = ({actor, setActor}) => {
    return (
        <div className={style.column3}>
            <span className={style['input-info']}>{contentConst.actorHeight}</span>
            <input
                type="text"
                placeholder={contentConst.fill}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setActor({
                        ...actor,
                        extInfo: {
                            ...actor.extInfo,
                            height: e.target.value,
                        },
                    })
                }
            />
        </div>
    );
};

export default Height;
