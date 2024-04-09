import React, {useState, FC, useEffect, useRef} from 'react';
import { useAppDispatch } from '../../hooks/reduxHook';
import {categoryMovies} from '../../utils/data/data';
import * as contentConst from '../../utils/constants/content';
import { setMovieCategory } from '../../store/movieOptionsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import style from './Drop.module.css'

interface IDropCategoryProps {
  existGenre: string[];
}

const DropCategory: FC<IDropCategoryProps> = ({existGenre}) => {
  const dispatch = useAppDispatch();
  const [dropdownDisplay, setDropdownDisplay] = useState<boolean>(false);
  const [checkedState, setCheckedState] = useState<any>([]);
  const myRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {

      if (myRef.current && !myRef.current.contains(e.target)) {
        setDropdownDisplay(false);
      }
    };
    document.addEventListener('click', checkIfClickedOutside);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, []);

  return (
    <>
      <fieldset>
        <button
          ref={myRef}
          className={style['drop-btn']}
          onClick={() => setDropdownDisplay(!dropdownDisplay)}
        >
          <span>{contentConst.movieCategory}</span>
          <div className={style.angle}>
            {dropdownDisplay ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </div>
        </button>
        {dropdownDisplay && (
          <div
            className={style['panel-three']}
            onClick={(e) => e.stopPropagation()}
          >
            {categoryMovies.map((item) => (
              <label className={style['check-container']}>
                <input
                  onChange={(e) => {
                    dispatch(setMovieCategory(item.name));
                    setCheckedState({
                      ...checkedState,
                      [item.id]: e.target.checked,
                    });
                  }}
                  id={item.name}
                  type="checkbox"
                  checked={checkedState[item.id]}
                  disabled={existGenre && existGenre.includes(item.name) === false}
                />
                <span className={style.checkmark}></span>
                <label htmlFor={item.value}>{item.name}</label>
              </label>
            ))}
          </div>
        )}
      </fieldset>
    </>
  );
};

export default DropCategory;