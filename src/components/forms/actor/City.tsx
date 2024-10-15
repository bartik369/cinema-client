import React, {FC} from 'react';
import * as contentConst from "../../../utils/constants/content";
import {IActor} from "../../../types/media";
import style from "../AddItemForm.module.scss";

interface ICityProps {
    actor: IActor;
    setActor: (actor: IActor) => void;
}

const City:FC<ICityProps> = ({actor, setActor}) => {
    return (
        <div className={style.column2}>
            <span className={style['input-info']}>{contentConst.actorCity}</span>
            <input
                type="text"
                placeholder={contentConst.fill}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setActor({
                        ...actor,
                        extInfo: {
                            ...actor.extInfo,
                            city: e.target.value,
                        },
                    })
                }
            />
        </div>
    );
};

export default City;
