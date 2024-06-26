import React, {FC, MouseEvent} from 'react';
import style from "./Buttons.module.css";
import * as contentConst from "../../../utils/constants/content";

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
