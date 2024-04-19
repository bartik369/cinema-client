import React, { FC, useState, useEffect, MouseEvent, FormEvent } from 'react';
import { ISlider, ISliderFormData } from '../../types/media';
import {
  useAddSlideMutation,
  useGetSlidesQuery,
  useGetSlideMutation,
  useDeleteSlideMutation,
  useUpdateSideMutation,
} from '../../store/adminApi';
import EditSliderForm from '../../components/forms/EditSliderForm';
import SlidersList from '../../components/sliders/SlidersList';
import * as contentConst from '../../utils/constants/content';
import style from './EditMainSlider.module.css';
import { error } from 'console';

const EditMainSlider: FC = () => {
  const [slider, setSlider] = useState<ISlider>({
    _id: '',
    movieTitle: '',
    movieId: '',
    movieLink: '',
    media: '',
    description: '',
  });
  const [addSlide] = useAddSlideMutation();
  const [getSlide, { data: slide }] = useGetSlideMutation();
  const [deleteSlide] = useDeleteSlideMutation();
  const [updateSlide] = useUpdateSideMutation();
  const [file, setFile] = useState<string | Blob>('');
  const [prevImg, setPrevImg] = useState<string | null>('');
  const [updateImg, setUpdateImg] = useState<string | null>('');
  const [modalSlider, setModalSlider] = useState<boolean>(false);
  const [updateStatus, setUpdateStatus] = useState<boolean>(false);

  useEffect(() => {
    if (slide) {
      setSlider({ ...slider, ...slide.slideData });
      setUpdateImg(slide.file64);
    }
  }, [slide]);

  const resetFormHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSlider({
      _id: '',
      movieTitle: '',
      movieId: '',
      movieLink: '',
      media: '',
      description: '',
    });
    setPrevImg(null);
  };
  const modalHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setModalSlider(!modalSlider);
    resetFormHandler(e);
    setPrevImg(null);
    setUpdateImg(null);
    setUpdateStatus(false);
  };
  const getSlideHandler = (id: string) => {
    getSlide(id);
    setModalSlider(true);
    setUpdateStatus(true);
  };
  const removeSlideHandler = async (id: string) => {
    await deleteSlide(id);
  };

  const addSlideHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    type sliderKey = keyof typeof slider._id;
    Object.keys(slider).forEach((key) => {
      formData.append(key, slider[key as sliderKey]);
    });
    file && formData.append('file', file);
    await addSlide(formData as unknown as ISliderFormData)
    .then((payload) => {
      payload && setModalSlider(false);
    })
    .catch((error) => console.log(error));
  };
  
  const updateSlideHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    type sliderKey = keyof typeof slider._id;
    Object.keys(slider).forEach((key) => {
      formData.append(key, slider[key as sliderKey]);
    });
    file && formData.append('file', file);
    await updateSlide(formData as unknown as ISliderFormData)
    .then(
      (payload) => {
        payload && setModalSlider(false);
      }
    ).catch((error) => console.log(error))
  };

  return (
    <div className={style.container}>
      <div className={style.container__inner}>
        <div className={style.add}>
          <button
            className={style.btn}
            onClick={() => setModalSlider(!modalSlider)}
          >
            {contentConst.addSlide}
          </button>
        </div>
        <SlidersList update={getSlideHandler} remove={removeSlideHandler} />
        {modalSlider && (
          <EditSliderForm
            slider={slider}
            setSlider={setSlider}
            prevImg={prevImg}
            updateImg={updateImg}
            setPrevImg={setPrevImg}
            setFile={setFile}
            addSlideHandler={addSlideHandler}
            updateSlideHandler={updateSlideHandler}
            modalHandler={modalHandler}
            resetFormHandler={resetFormHandler}
            updateStatus={updateStatus}
          />
        )}
      </div>
    </div>
  );
};

export default EditMainSlider;
