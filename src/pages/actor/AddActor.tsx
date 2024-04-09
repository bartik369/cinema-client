import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/reduxHook';
import { useAddActorMutation, useGetActorsQuery } from '../../store/actorApi';
// import { addActor, getActors } from '../../store/actorSlice';
import { IActor } from '../../types/media';
import ActorForm from '../../components/forms/ActorForm';
import PreviewActor from '../../components/preview/PreviewActor';
import style from './AddActor.module.css';

const AddActor: FC = () => {
  // const dispatch = useAppDispatch();
  const [addActor] = useAddActorMutation()
  const [actor, setActor] = useState<IActor>({
    _id: '',
    nameEn: '',
    nameRu: '',
    picture: '',
    extInfo: {
      birthday: 0,
      country: '',
      city: '',
      height: '',
      gender: '',
      genre: [],
    },
  });

  // useEffect(() => {
  //   dispatch(getActors());
  // }, [dispatch]);

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
    formData && addActor(formData);
  };

  const addGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActor({
      ...actor,
      extInfo: {
        ...actor.extInfo,
        genre: [...actor.extInfo.genre, e.target.value],
      },
    });
  };

  const deleteGenre = (e: React.MouseEvent, item: string) => {
    e.preventDefault();
    setActor({
      ...actor,
      extInfo: {
        ...actor.extInfo,
        genre: actor.extInfo.genre.filter((elem) => elem !== item),
      },
    });
  };
  const imgAction = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files && setFile(e.target.files[0]);
    e.target.files && setPrevImg(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className={style.container}>
      <div className={style['l-side']}>
        <ActorForm
          actor={actor}
          setActor={setActor}
          imgAction={imgAction}
          deleteGenre={deleteGenre}
          addGenre={addGenre}
          setFile={setFile}
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
