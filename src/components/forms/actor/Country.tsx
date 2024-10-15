import React, {FC} from 'react';
import * as contentConst from "../../../utils/constants/content";
import {countryList} from "../../../utils/data/coutry";
import {IActor} from "../../../types/media";
import style from "../AddItemForm.module.scss";

interface ICountryProps {
    actor: IActor;
    setActor: (actor: IActor) => void;
}

const Country: FC<ICountryProps> = ({actor, setActor}) => {
    return (
        <div className={style.column2}>
            <span className={style['input-info']}>{contentConst.actorCountry}</span>
            <select
                defaultValue=""
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setActor({
                        ...actor,
                        extInfo: {
                            ...actor.extInfo,
                            country: e.target.value,
                        },
                    })
                }
            >
                <option value="" disabled>
                    {contentConst.select}
                </option>
                {countryList.map((item) => (
                    <option key={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
    );
};

export default Country;
