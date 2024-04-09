import React, {useState, FC, useEffect, useRef} from 'react';
import { useAppDispatch } from '../../hooks/reduxHook';
import { setMovieRating } from '../../store/movieOptionsSlice';
import { ratingRangeData } from '../../utils/data/data';
import * as contentConst from '../../utils/constants/content'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import style from './Drop.module.css'

interface IDropRatingProps {
  existRating: string[];
}

const DropRating: FC<IDropRatingProps> = ({existRating}) => {
    const dispatch = useAppDispatch()
    const [dropdownDisplay, setDropdownDisplay] = useState<boolean>(false)
    const [checkedState, setCheckedState] = useState<any>([]);
    const myRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const checkIfClickedOutside = (e:any) => {
          
          if (myRef.current && !myRef.current.contains(e.target)) {
            setDropdownDisplay(false) 
          } else {
          }
        }
        document.addEventListener('click', checkIfClickedOutside)
        return () => {
          document.removeEventListener('click', checkIfClickedOutside)
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
                <label className={style['check-container']}>
                 <input onChange={(e) => {
                     dispatch(setMovieRating(item.value))
                     setCheckedState({...checkedState,
                        [item.id]: e.target.checked
                    })
                 }} 
                id={item.title} 
                type="checkbox"
                checked={checkedState[item.id]}
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