import {useState, FC, useEffect, useRef} from 'react';
import { useAppDispatch } from '../../hooks/reduxHook';
import { setMovieRating } from '../../store/movieOptionsSlice';
import { ratingRangeData } from '../../utils/data/data';
import * as contentConst from '../../utils/constants/content'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import style from './Drop.module.scss';

interface IDropRatingProps {
  checkedRating: any,
  setCheckedRating: (checkedRating:any) => void;
}
const DropRating: FC<IDropRatingProps> = ({
  checkedRating,
  setCheckedRating,
}) => {
    const dispatch = useAppDispatch();
    const [dropdownDisplay, setDropdownDisplay] = useState<boolean>(false);
    const myRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const checkIfClickedOutside = (e:any) => {
          
          if (myRef.current && !myRef.current.contains(e.target)) {
            setDropdownDisplay(false);
          } 
        }
        document.addEventListener('click', checkIfClickedOutside);
        return () => {
          document.removeEventListener('click', checkIfClickedOutside);
        }
      }, [])
  
    return (
        <>
        <fieldset>
        <button ref={myRef} className={style['drop-btn']} onClick={() => setDropdownDisplay(!dropdownDisplay)}>
          <span>{contentConst.movieRating}</span>
          <div className={style.angle}>
            {dropdownDisplay 
              ? <FontAwesomeIcon icon={faAngleUp} />
              : <FontAwesomeIcon icon={faAngleDown} />
            }
          </div>
        </button>
        {dropdownDisplay && 
        <div className={style['panel-one']} onClick={e => e.stopPropagation()}>
            {ratingRangeData.map((item) => (
                <label className={style['check-container']} key={item.id}>
                 <input onChange={(e) => {
                     dispatch(setMovieRating(item.value))
                     setCheckedRating({
                      ...checkedRating,
                        [item.id]: e.target.checked,
                    });
                 }} 
                id={item.title}
                type="checkbox"
                checked={checkedRating[item.id]}
                value={checkedRating[item.id] || false}
                 />
                 <span className={style.checkmark}></span>
                 <label htmlFor={item.value}>{item.title}</label>
                 </label>
            ))
            }
        </div>}
        </fieldset>
      </>
    );
};

export default DropRating;