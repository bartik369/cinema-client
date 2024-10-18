import {FC, useRef} from 'react';
import { useAppDispatch } from '../../hooks/reduxHook';
import {categoryMovies} from '../../utils/data/data';
import * as contentConst from '../../utils/constants/content';
import { setMovieCategory } from '../../store/movieOptionsSlice';
import { useDropdownMenu } from '../../hooks/useDropdownMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import style from './Drop.module.scss';

interface IDropCategoryProps {
  existGenre: string[];
  checkedGenre: any;
  setCheckedGenre: (checkedGenre:any) => void;
}

const DropCategory: FC<IDropCategoryProps> = ({
  existGenre,
  checkedGenre,
  setCheckedGenre,
}) => {
  const dispatch = useAppDispatch();
  const myRef = useRef<HTMLButtonElement>(null);
  const [dropdownDisplay, setDropdownDisplay] = useDropdownMenu(myRef);

  return (
    <>
      <fieldset>
        <button
          ref={myRef}
          className={style["drop-btn"]}
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
          <div className={style["panel-three"]} onClick={(e) => e.stopPropagation()}>
            {categoryMovies && categoryMovies.map((item) => (
              <label className={style["check-container"]} key={item.id}>
                <input
                  onChange={(e) => {
                    dispatch(setMovieCategory(item.name));
                    setCheckedGenre({
                      ...checkedGenre,
                        [item.id]: e.target.checked,
                    });
                  }}
                  id={item.name}
                  value="12"
                  type="checkbox"
                  checked={checkedGenre[item.id]}
                  disabled={existGenre && !existGenre.includes(item.name)}
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