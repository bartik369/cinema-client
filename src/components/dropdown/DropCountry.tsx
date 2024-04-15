import React, {useState, FC, useRef, useEffect} from 'react';
import { useAppDispatch } from '../../hooks/reduxHook';
import { countryList } from '../../utils/data/coutry';
import { setMovieCountry } from '../../store/movieOptionsSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";
import * as contentConst from '../../utils/constants/content'
import style from './Drop.module.css'

interface IDropCountryProps {
  existCountry: string[];
  checkedState: any,
  setCheckedState: (checkedState:any) => void;
}

const DropCountry: FC<IDropCountryProps> = ({
  existCountry,
  checkedState,
  setCheckedState,
}) => {
    const [dropdownDisplay, setDropdownDisplay] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const myRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const checkIfClickedOutside = (e:any) => {

          if (myRef.current && !myRef.current.contains(e.target)) {
            setDropdownDisplay(false) 
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
        <span>{contentConst.movieCountry}</span>
        <div className={style.angle}>
           {dropdownDisplay 
           ? <FontAwesomeIcon icon={faAngleUp} />
           : <FontAwesomeIcon icon={faAngleDown} />
           }
           </div>
        </button>
        {dropdownDisplay && 
        <div className={style['panel-five']} onClick={e => e.stopPropagation()}>
            {countryList.map((item) => (
                <label className={style['check-container']}>
                 <input onChange={(e) => {
                     dispatch(setMovieCountry(item.name))
                     setCheckedState({
                      ...checkedState,
                      country: {
                        ...checkedState.country,
                        [item.id]: e.target.checked,
                      },
                    });
                 }} 
                id={item.name} 
                type="checkbox"
                checked={checkedState.country[item.id]}
                disabled={existCountry.includes(item.name) === false}
                 />
                 <span className={style.checkmark}></span>
                 <label htmlFor={item.value}>{item.name}</label>
                 </label>
                
            ))
            }
        </div>}
        </fieldset>
        </>
    );
};

export default DropCountry;