import { FC, useRef } from 'react';
import { useAppDispatch } from '../../hooks/reduxHook';
import { setMovieYear } from '../../store/movieOptionsSlice';
import { useDropdownMenu } from '../../hooks/useDropdownMenu';
import { yearMovieRageData } from '../../utils/data/data';
import * as contentConst from '../../utils/constants/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import style from './Drop.module.scss';

interface IDropYearProps {
  existYear: string[];
  checkedYear: any,
  setCheckedYear: (checkedYear:any) => void;
}

const DropYear: FC<IDropYearProps> = ({
  existYear,
  checkedYear,
  setCheckedYear,
}) => {
  const dispatch = useAppDispatch();
  const myRef = useRef<HTMLButtonElement>(null);
  const [dropdownDisplay, setDropdownDisplay] = useDropdownMenu(myRef);

  return (
    <>
      <fieldset>
        <button
          ref={myRef}
          className={style['drop-btn']}
          onClick={() => setDropdownDisplay(!dropdownDisplay)}
        >
            <span>{contentConst.movieYear}</span>
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
            {yearMovieRageData.map((item) => (
              <label className={style['check-container']} key={item.id}>
                <input
                  onChange={(e) => {
                    dispatch(setMovieYear(item.value));
                    setCheckedYear({
                      ...checkedYear,
                        [item.id]: e.target.checked,
                    });
                  }}
                  id={item.title}
                  type="checkbox"
                  checked={checkedYear[item.id]}
                  value={checkedYear[item.id] || ""}
                  disabled={existYear && !existYear.includes(item.value)}
                />
                <span className={style.checkmark}></span>
                <label htmlFor={item.value}>{item.title}</label>
              </label>
            ))}
          </div>
        )}
      </fieldset>
    </>
  );
};

export default DropYear;
