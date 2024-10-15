import React, {FC, MouseEvent} from 'react';
import * as contentConst from "../../../utils/constants/content";
import style from "./Buttons.module.scss";

interface IResetForm {
    resetFormHandler: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ResetForm:FC<IResetForm> = ({resetFormHandler}) => {
    return (
        <button className={style.reset}
                onClick={(e) => resetFormHandler(e)}>
            {contentConst.resetForm}
        </button>
    );
};

export default ResetForm;
