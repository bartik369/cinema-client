import React, {FC} from 'react';
import * as contentConst from "../../../utils/constants/content";
import {genderItemsData} from "../../../utils/data/data";
import {IActor} from "../../../types/media";
import style from "../AddItemForm.module.scss";

interface IGenderProps {
    actor: IActor;
    setActor: (actor: IActor) => void;
}

const Gender: FC<IGenderProps> = ({actor, setActor}) => {
    return (
        <div className={style.column3}>
            <span className={style['input-info']}>{contentConst.actorGender}</span>
            <select
                defaultValue=''
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setActor({
                        ...actor,
                        extInfo: {
                            ...actor.extInfo,
                            gender: e.target.value,
                        },
                    })
                }
            >
                <option value='' disabled>
                    {contentConst.select}
                </option>
                {genderItemsData.map((item) => (
                    <option key={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
    );
};

export default Gender;
