import React, {FC, useState} from 'react';
import { useAddActorMutation } from '../../store/actorApi';
import { useActorAction } from '../../hooks/useActorAction';
import * as contentConst from '../../utils/constants/content';
import ActorForm from '../../components/forms/actor/ActorForm';
import PreviewActor from '../../components/preview/PreviewActor';
import {ToastContainer, toast} from "react-toastify";
import style from './AddActor.module.scss';

const AddActor: FC = () => {
  const [addActor] = useAddActorMutation();
  const [actor, setActor, resetFormHandler, addGenre, deleteGenre] = useActorAction();
  const [file, setFile] = useState<string | Blob>('');
  const [prevImg, setPrevImg] = useState<string | null>('');

  const createActorHandler = () => {
    const formData = new FormData();
    type actorKey = keyof typeof actor._id;
    type actorSubKey = keyof typeof actor._id;

    Object.keys(actor).forEach((key) => {
      if (key === 'extInfo') {
        Object.keys(actor[key]).forEach((subKey) => {
          formData.append(subKey, actor[key][subKey as actorSubKey]);
        });
      } else {
        formData.append(key, actor[key as actorKey]);
      }
    });
    formData.append('file', file);
    formData && addActor(formData)
        .then(() => {
          toast.success(contentConst.addActorSuccess)})
        .catch((error) => toast.error(error.data.message));
  };

  const imgAction = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files && setFile(e.target.files[0]);
    e.target.files && setPrevImg(URL.createObjectURL(e.target.files[0]));
  };

  return (
      <div className={style.container}>
        <div className={style.toast}>
          <ToastContainer theme="colored" autoClose={7000} position="top-center"/>
        </div>
        <div className={style['l-side']}>
          <ActorForm
              actor={actor}
              setActor={setActor}
              imgAction={imgAction}
              deleteGenre={deleteGenre}
              addGenre={addGenre}
              setFile={setFile}
              resetFormHandler={resetFormHandler}
          />
        </div>
        <div className={style['r-side']}>
          <PreviewActor
              prevImg={prevImg}
              actor={actor}
              createActorHandler={createActorHandler}
          />
        </div>
      </div>
  );
};

export default AddActor;
