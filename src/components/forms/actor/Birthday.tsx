import React, {FC} from 'react';
import * as contentConst from "../../../utils/constants/content";
import DatePicker from "react-datepicker";
import {IActor} from "../../../types/media";
import style from "../AddItemForm.module.scss";

interface IBirthdayProps {
    actor: IActor;
    setActor: (actor: IActor) => void;
}
const Birthday: FC<IBirthdayProps> = ({actor, setActor}) => {
    return (
        <div className={style.column3}>
            <span className={style['input-info']}>{contentConst.actorBirthday}</span>
            <DatePicker
                className={style.datepick}
                selected={new Date(actor.extInfo.birthday)}
                onChange={(date: Date) => {
                    (date !== null) &&
                    setActor({
                        ...actor,
                        extInfo: {
                            ...actor.extInfo,
                            birthday: date.getTime()
                        },
                    })
                }
                }
            />
        </div>
    );
};

export default Birthday;
