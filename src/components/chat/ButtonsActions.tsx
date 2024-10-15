import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperclip} from "@fortawesome/free-solid-svg-icons";
import * as contentConst from "../../utils/constants/content";
import style from "./Chat.module.scss";

interface ButtonsActionsProps {
    file: string | Blob;
    setFile: (file: string | Blob) => void;
    sendMessageHandler: () => void;
    isUpdating: boolean;
}

const ButtonsActions:FC<ButtonsActionsProps> = ({
    file,
    setFile,
    sendMessageHandler,
    isUpdating
}) => {
    return (
        <div className={style.buttons}>
            <label className={style.file} htmlFor={"upload"}>
                <FontAwesomeIcon className={style["photo-icon"]} icon={faPaperclip}/>
            </label>
            <input type="file" name="file" id="upload" hidden
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                       e.target.files && setFile(e.target.files[0])
                   }
            />
            <button className={style.btn} onClick={sendMessageHandler}>
                {isUpdating ? contentConst.updateBtn : contentConst.sendData}
            </button>
        </div>
    );
};

export default ButtonsActions;
