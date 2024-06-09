import React, {FC, MouseEvent, FormEvent } from 'react';
import { ISlider } from '../../../types/media';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCamera } from '@fortawesome/free-solid-svg-icons';
import * as contentConst from '../../../utils/constants/content';
import defaultPreview from '../../../assets/pics/zaglushka.png';
import style from './EditSliderForm.module.css';

interface IEditSliderForm {
  slider: ISlider;
  updateImg: string | null;
  prevImg: string | null;
  updateStatus: boolean;
  setSlider: (slider: ISlider) => void;
  setPrevImg: (prevImg: string | null) => void;
  addSlideHandler: (e: FormEvent<HTMLFormElement>) => void;
  updateSlideHandler: (e: FormEvent<HTMLFormElement>) => void;
  setFile: (file: string | Blob) => void;
  modalHandler: (e: MouseEvent<HTMLButtonElement>) => void;
  resetFormHandler: (e: MouseEvent<HTMLButtonElement>) => void;
}

const EditSliderForm: FC<IEditSliderForm> = ({
  slider,
  prevImg,
  updateImg,
  updateStatus,
  setSlider,
  setPrevImg,
  addSlideHandler,
  updateSlideHandler,
  setFile,
  modalHandler,
  resetFormHandler,
}) => {
  return (
    <div className={style['slider-wrapper']}>
      <div className={style['slider-size']}>{contentConst.slideSize}</div>
      <div className={style.inner}>
        <form className={style['form-slider']}
          onClick={(e) => e.stopPropagation()}
          onSubmit={
            updateStatus
              ? (e: FormEvent<HTMLFormElement>) => updateSlideHandler(e)
              : (e: FormEvent<HTMLFormElement>) => addSlideHandler(e)
          }
        >
          <div className={style['input-info']}>{contentConst.movieNameRu}</div>
          <input type="text" defaultValue={slider.movieTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSlider({
                ...slider,
                movieTitle: e.target.value.trim(),
              })
            }
          />
          <div className={style['input-info']}>
            {contentConst.movieDescription}
          </div>
          <textarea defaultValue={slider.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setSlider({
                ...slider,
                description: e.target.value.trim(),
              })
            }
          />
          <div className={style['slide-btns']}>
            <label className={style['photo-layer']} htmlFor={"upload"}>
              <FontAwesomeIcon
                className={style['photo-icon']}
                icon={faCamera}
              />
              <label className={style['select-photo']}>
                {contentConst.selectSlide}
              </label>
            </label>
            <input type="file" name="file" id="upload" hidden
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.files && setFile(e.target.files[0]);
                e.target.files &&
                  setPrevImg(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <button onClick={(e: MouseEvent<HTMLButtonElement>) => resetFormHandler(e)}
              className={style.reset}>
              {contentConst.resetForm}
            </button>
          </div>
          <button className={style.add} type="submit">
            {updateStatus ? contentConst.updateBtn : contentConst.addBtn}
          </button>
        </form>
        <div className={style.preview}>
          <div className={style.description}>
            {slider && slider.description}
          </div>
          <button className={style.watch}>{contentConst.watch}</button>
          {prevImg 
          ? (<img src={prevImg} alt="" />) 
          : updateImg 
            ? (<img src={`data:image/jpeg;base64,${updateImg}`} alt="" />) 
            : (<div className={style.zaglushka}>
                <img src={defaultPreview} alt="" />
              </div>)
          }
        </div>
      </div>
      <button className={style.close} onClick={modalHandler}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

export default EditSliderForm;
